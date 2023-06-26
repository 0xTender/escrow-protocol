import { ethers } from "hardhat";
import { escrow_fixture } from "../fixtures/escrow.fixture";
import { time } from "@nomicfoundation/hardhat-network-helpers";

import { PromiseType } from "../fixtures/utils";
import { expect } from "chai";
import { SwapERC20Extension } from "../../typechain-types";
enum EscrowState {
  NONE,
  BEGUN,
  COMPLETED,
  CANCELLED,
}

describe("Escrow Test", () => {
  type Fixture = PromiseType<ReturnType<typeof escrow_fixture>>;
  let deployer: Fixture["deployer"];
  let alice: Fixture["users"][number];
  let bob: Fixture["users"][number];

  beforeEach(async () => {
    ({
      deployer,
      users: [alice, bob],
    } = await escrow_fixture());
  });

  it("emit test", async () => {
    const Escrow = deployer.Escrow;
    expect(Escrow.address).to.be.properAddress;
  });

  describe("update extension", async () => {
    it("cannot update with non-owner", async () => {
      const Escrow = alice.Escrow;
      await expect(
        Escrow.updateEscrowExtension(Escrow.address, false)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("cannot be self", async () => {
      const Escrow = deployer.Escrow;
      await expect(
        Escrow.updateEscrowExtension(Escrow.address, false)
      ).to.be.revertedWith(
        "Escrow: Escrow extension cannot be same address as escrow"
      );
    });

    it("can be set if interface is valid", async () => {
      const Escrow = deployer.Escrow;
      const SwapERC20Extension = deployer.SwapERC20Extension;
      await expect(
        Escrow.updateEscrowExtension(SwapERC20Extension.address, true)
      )
        .to.emit(Escrow, "EscrowExtensionUpdated")
        .withArgs(SwapERC20Extension.address, true);
    });

    it("cannot be set if interface is invalid", async () => {
      const Escrow = deployer.Escrow;
      await expect(Escrow.updateEscrowExtension(deployer.Tether.address, false))
        .to.be.reverted;
    });
  });

  describe("swap erc20 extension", async () => {
    const initiatorAmount = ethers.utils.parseEther(`${100}`);
    const counterAmount = ethers.utils.parseEther(`${200000}`);

    beforeEach(async () => {
      const { WrappedEther, Tether } = deployer;

      await WrappedEther.transfer(alice.address, initiatorAmount);

      await Tether.transfer(bob.address, counterAmount);
    });

    it("deployment", async () => {
      const { SwapERC20Extension, Escrow } = deployer;

      expect(SwapERC20Extension.address).to.be.properAddress;

      expect(await SwapERC20Extension.escrowAddress()).to.eq(Escrow.address);
    });

    it("begin", async () => {
      const { WrappedEther, SwapERC20Extension, Tether, Escrow } = alice;
      const data = ethers.utils.defaultAbiCoder.encode(
        [
          "address",
          "address",
          "address",
          "uint256",
          "address",
          "uint256",
          "uint256",
        ],
        [
          alice.address,
          bob.address,
          WrappedEther.address,
          initiatorAmount,
          Tether.address,
          counterAmount,
          ethers.constants.MaxUint256,
        ]
      );

      await WrappedEther.approve(SwapERC20Extension.address, initiatorAmount);

      await expect(Escrow.beginEscrow(SwapERC20Extension.address, data))
        .to.emit(Escrow, "EscrowStateUpdate")
        .withArgs(
          alice.address,
          1,
          EscrowState.BEGUN,
          SwapERC20Extension.address
        )
        .to.emit(WrappedEther, "Transfer")
        .withArgs(alice.address, SwapERC20Extension.address, initiatorAmount);
    });

    it("begin with invalid extension", async () => {
      const { WrappedEther, Tether, Escrow } = alice;
      const data = ethers.utils.defaultAbiCoder.encode(
        [
          "address",
          "address",
          "address",
          "uint256",
          "address",
          "uint256",
          "uint256",
        ],
        [
          alice.address,
          bob.address,
          WrappedEther.address,
          initiatorAmount,
          Tether.address,
          counterAmount,
          ethers.constants.MaxUint256,
        ]
      );

      await expect(Escrow.beginEscrow(Escrow.address, data)).to.be.revertedWith(
        "Escrow: Escrow extension not enabled"
      );
    });

    it("begin and end", async () => {
      const { WrappedEther, Tether, Escrow, SwapERC20Extension } = alice;
      const data = ethers.utils.defaultAbiCoder.encode(
        [
          "address",
          "address",
          "address",
          "uint256",
          "address",
          "uint256",
          "uint256",
        ],
        [
          alice.address,
          bob.address,
          WrappedEther.address,
          initiatorAmount,
          Tether.address,
          counterAmount,
          ethers.constants.MaxUint256,
        ]
      );
      await WrappedEther.approve(SwapERC20Extension.address, initiatorAmount);

      await Escrow.beginEscrow(SwapERC20Extension.address, data);

      const completeData = ethers.utils.defaultAbiCoder.encode(
        ["uint256"],
        [1]
      );

      await bob.Tether.approve(SwapERC20Extension.address, counterAmount);

      await expect(bob.Escrow.completeEscrow(1, completeData))
        .to.emit(Escrow, "EscrowStateUpdate")
        .withArgs(
          bob.address,
          1,
          EscrowState.COMPLETED,
          SwapERC20Extension.address
        )
        .to.emit(WrappedEther, "Transfer")
        .withArgs(SwapERC20Extension.address, bob.address, initiatorAmount)
        .to.emit(Tether, "Transfer")
        .withArgs(bob.address, SwapERC20Extension.address, counterAmount)
        .to.emit(Tether, "Transfer")
        .withArgs(SwapERC20Extension.address, alice.address, counterAmount);
    });

    it("initiator can cancel escrow", async () => {
      const { WrappedEther, Tether, Escrow, SwapERC20Extension } = alice;
      const now = await time.latest();
      const data = ethers.utils.defaultAbiCoder.encode(
        [
          "address",
          "address",
          "address",
          "uint256",
          "address",
          "uint256",
          "uint256",
        ],
        [
          alice.address,
          bob.address,
          WrappedEther.address,
          initiatorAmount,
          Tether.address,
          counterAmount,
          now + 60 * 60 * 24 * 7,
        ]
      );

      await time.increase(60 * 60 * 24 * 7);

      await WrappedEther.approve(SwapERC20Extension.address, initiatorAmount);
      await Escrow.beginEscrow(SwapERC20Extension.address, data);

      const cancelData = ethers.utils.defaultAbiCoder.encode(["uint256"], [1]);

      await expect(alice.Escrow.cancelEscrow(1, cancelData))
        .to.emit(Escrow, "EscrowStateUpdate")
        .withArgs(
          alice.address,
          1,
          EscrowState.CANCELLED,
          SwapERC20Extension.address
        )
        .to.emit(WrappedEther, "Transfer")
        .withArgs(SwapERC20Extension.address, alice.address, initiatorAmount);
    });
  });
});
