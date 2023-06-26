import { hello_fixture } from "../fixtures/hello.fixture";
import { PromiseType } from "../fixtures/utils";
import { expect, use } from "chai";

describe("Hello Test", () => {
  type Fixture = PromiseType<ReturnType<typeof hello_fixture>>;
  let deployer: Fixture["deployer"];
  let alice: Fixture["users"][number];
  let bob: Fixture["users"][number];

  beforeEach(async () => {
    ({
      deployer,
      users: [alice, bob],
    } = await hello_fixture());
  });

  it("emit test", async () => {
    const Hello = deployer.Hello;
    await expect(Hello.message("Some Message"))
      .to.emit(Hello, "MessageEvent")
      .withArgs("Some Message");
  });

  // Often, chai emit does not match the event.
  // This validates the installation of @hardhat/toolbox.
  // Recommended to leave in at least one such test.
  it("emit incorrect test", async () => {
    let error = false;
    try {
      const Hello = deployer.Hello;
      await expect(Hello.message("Some Message"))
        .to.emit(Hello, "MessageEventFail")
        .withArgs("Some Message");
    } catch (_err) {
      error = true;
    }
    if (error === false) {
      throw new Error("Test should have failed");
    }
  });
});
