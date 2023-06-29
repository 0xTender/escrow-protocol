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
      await deployer.WrappedEther.transfer(alice.address, initiatorAmount);
      await deployer.Tether.transfer(bob.address, counterAmount);
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

  describe("ERC20 for ERC721", () => {
    const initiatorAmount = ethers.utils.parseEther(`${100}`);
    const counterTokenId = 0;

    beforeEach(async () => {
      await deployer.WrappedEther.transfer(alice.address, initiatorAmount);
      await expect(deployer.TestNFT.mint(bob.address))
        .to.emit(deployer.TestNFT, "Transfer")
        .withArgs(ethers.constants.AddressZero, bob.address, counterTokenId);
    });

    it("should swap erc20 for erc721", async () => {
      const { WrappedEther, TestNFT, Escrow, MultiSwapExtension } = alice;
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
          TestNFT.address,
          counterTokenId,
          ethers.constants.MaxUint256,
          ExchangeType.ERC20,
          ExchangeType.ERC721,
        ]
      );
      await WrappedEther.approve(MultiSwapExtension.address, initiatorAmount);
      await Escrow.beginEscrow(MultiSwapExtension.address, data);

      const completeData = ethers.utils.defaultAbiCoder.encode(
        ["uint256"],
        [1]
      );

      await bob.TestNFT.approve(MultiSwapExtension.address, counterTokenId);

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
        .to.emit(TestNFT, "Transfer")
        .withArgs(bob.address, MultiSwapExtension.address, counterTokenId)
        .to.emit(TestNFT, "Transfer")
        .withArgs(MultiSwapExtension.address, alice.address, counterTokenId);
    });
  });

  describe("ERC721 for ERC20", () => {
    const initiatorTokenId = 0;
    const counterAmount = ethers.utils.parseEther(`${200000}`);

    beforeEach(async () => {
      await expect(deployer.TestNFT.mint(alice.address))
        .to.emit(deployer.TestNFT, "Transfer")
        .withArgs(
          ethers.constants.AddressZero,
          alice.address,
          initiatorTokenId
        );
      await deployer.WrappedEther.transfer(bob.address, counterAmount);
    });

    it("should swap erc721 for erc20", async () => {
      const { WrappedEther, TestNFT, Escrow, MultiSwapExtension } = alice;
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
          TestNFT.address,
          initiatorTokenId,
          WrappedEther.address,
          counterAmount,
          ethers.constants.MaxUint256,
          ExchangeType.ERC721,
          ExchangeType.ERC20,
        ]
      );
      await TestNFT.approve(MultiSwapExtension.address, initiatorTokenId);
      await Escrow.beginEscrow(MultiSwapExtension.address, data);

      const completeData = ethers.utils.defaultAbiCoder.encode(
        ["uint256"],
        [1]
      );

      await bob.WrappedEther.approve(MultiSwapExtension.address, counterAmount);

      await expect(bob.Escrow.completeEscrow(1, completeData))
        .to.emit(Escrow, "EscrowStateUpdate")
        .withArgs(
          bob.address,
          1,
          EscrowState.COMPLETED,
          MultiSwapExtension.address
        )
        .to.emit(TestNFT, "Transfer")
        .withArgs(MultiSwapExtension.address, bob.address, initiatorTokenId)
        .to.emit(WrappedEther, "Transfer")
        .withArgs(bob.address, MultiSwapExtension.address, counterAmount)
        .to.emit(WrappedEther, "Transfer")
        .withArgs(MultiSwapExtension.address, alice.address, counterAmount);
    });
  });

  describe("ERC721 for ERC721", () => {
    const initiatorTokenId = 0;
    const counterTokenId = 1;

    beforeEach(async () => {
      await expect(deployer.TestNFT.mint(alice.address))
        .to.emit(deployer.TestNFT, "Transfer")
        .withArgs(
          ethers.constants.AddressZero,
          alice.address,
          initiatorTokenId
        );
      await expect(deployer.TestNFT.mint(bob.address))
        .to.emit(deployer.TestNFT, "Transfer")
        .withArgs(ethers.constants.AddressZero, bob.address, counterTokenId);
    });

    it("should swap erc721 for erc721", async () => {
      const { TestNFT, Escrow, MultiSwapExtension } = alice;
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
          TestNFT.address,
          initiatorTokenId,
          TestNFT.address,
          counterTokenId,
          ethers.constants.MaxUint256,
          ExchangeType.ERC721,
          ExchangeType.ERC721,
        ]
      );
      await TestNFT.approve(MultiSwapExtension.address, initiatorTokenId);
      await Escrow.beginEscrow(MultiSwapExtension.address, data);

      const completeData = ethers.utils.defaultAbiCoder.encode(
        ["uint256"],
        [1]
      );

      await bob.TestNFT.approve(MultiSwapExtension.address, counterTokenId);

      await expect(bob.Escrow.completeEscrow(1, completeData))
        .to.emit(Escrow, "EscrowStateUpdate")
        .withArgs(
          bob.address,
          1,
          EscrowState.COMPLETED,
          MultiSwapExtension.address
        )
        .to.emit(TestNFT, "Transfer")
        .withArgs(MultiSwapExtension.address, bob.address, initiatorTokenId)
        .to.emit(TestNFT, "Transfer")
        .withArgs(bob.address, MultiSwapExtension.address, counterTokenId)
        .to.emit(TestNFT, "Transfer")
        .withArgs(MultiSwapExtension.address, alice.address, counterTokenId);
    });
  });
});
