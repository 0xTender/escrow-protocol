import { expect } from "chai";
import { escrow_fixture } from "../fixtures/escrow.fixture";
import { PromiseType, EscrowState, ExchangeType } from "../fixtures/utils";
import { ethers } from "ethers";

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

  // erc20 and erc20
  describe("ERC20 for ERC20", () => {
    const initiatorAmount = ethers.utils.parseEther(`${100}`);
    const counterAmount = ethers.utils.parseEther(`${200000}`);

    beforeEach(async () => {
      deployer.WrappedEther.transfer(alice.address, initiatorAmount);
      deployer.Tether.transfer(bob.address, counterAmount);
    });

    it("should swap erc20 for erc20", async () => {
      const { WrappedEther, Tether, Escrow, MultiSwapExtension } = alice;
      const data = ethers.utils.defaultAbiCoder.encode(
        [
          "address",
          "address",
          "address",
          "uint256",
          "address",
          "uint256",
          "uint256",
          "uint8",
          "uint8",
        ],
        [
          alice.address,
          bob.address,
          WrappedEther.address,
          initiatorAmount,
          Tether.address,
          counterAmount,
          ethers.constants.MaxUint256,
          ExchangeType.ERC20,
          ExchangeType.ERC20,
        ]
      );
      await WrappedEther.approve(MultiSwapExtension.address, initiatorAmount);

      await Escrow.beginEscrow(MultiSwapExtension.address, data);

      const completeData = ethers.utils.defaultAbiCoder.encode(
        ["uint256"],
        [1]
      );

      (
        await bob.Tether.approve(MultiSwapExtension.address, counterAmount)
      ).wait();

      await expect(bob.Escrow.completeEscrow(1, completeData))
        .to.emit(Escrow, "EscrowStateUpdate")
        .withArgs(
          bob.address,
          1,
          EscrowState.COMPLETED,
          MultiSwapExtension.address
        )
        .to.emit(WrappedEther, "Transfer")
        .withArgs(MultiSwapExtension.address, bob.address, initiatorAmount)
        .to.emit(Tether, "Transfer")
        .withArgs(bob.address, MultiSwapExtension.address, counterAmount)
        .to.emit(Tether, "Transfer")
        .withArgs(MultiSwapExtension.address, alice.address, counterAmount);
    });
  });
});
