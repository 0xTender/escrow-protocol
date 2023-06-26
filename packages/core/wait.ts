import { providers } from "ethers";

const try_provider = async () => {
  const provider = new providers.JsonRpcProvider("http://localhost:8545");

  try {
    await provider.getNetwork();

    const block = await provider.getBlockNumber();
    console.log(block);
  } catch (err) {
    console.log("Waiting...");
    return new Promise((resolve) =>
      setTimeout(() => {
        try_provider().then(resolve);
      }, 1_000)
    );
  }
};

try_provider().catch((err) => {
  console.error(err);
  process.exit(1);
});
