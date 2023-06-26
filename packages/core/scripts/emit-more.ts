import { deployments, ethers, getNamedAccounts } from "hardhat";

import { Hello } from "../typechain-types";
import { randomInt } from "crypto";

const runner = async () => {
  const HelloContract = await ethers.getContract<Hello>("Hello");

  const currentBlock = await HelloContract.provider.getBlockNumber();
  const data = await HelloContract.queryFilter(
    HelloContract.filters.StructEvent(),
    6,
    8
  );
  console.log(data.length, currentBlock);
  const emit = false;
  if (emit) {
    return;
  }

  await HelloContract.provider.getBlockNumber().then(console.log);

  for (let index = 0; index < 10; index++) {
    const tx = await HelloContract.message(`Message ${randomInt(0, 100)}`);
    await tx.wait();
  }
  await HelloContract.provider.getBlockNumber().then(console.log);
};

runner().catch(console.error);
