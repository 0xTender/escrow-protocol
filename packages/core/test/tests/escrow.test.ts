import { escrow_fixture } from "../fixtures/escrow.fixture";
import { PromiseType } from "../fixtures/utils";
import { expect, use } from "chai";

describe("Hello Test", () => {
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
});
