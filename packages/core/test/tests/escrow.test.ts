import { escrow_fixture } from "../fixtures/escrow.fixture";
import { PromiseType } from "../fixtures/utils";
import { expect } from "chai";

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
});
