import { deployments, ethers, getNamedAccounts } from "hardhat";

import { ERC721PresetMinterPauserAutoId } from "../typechain-types";
import { randomInt } from "crypto";
import { Test } from "mocha";

const runner = async () => {
  const TestNFT = await ethers.getContract<ERC721PresetMinterPauserAutoId>(
    "TestNFT"
  );

  const { deployer } = await getNamedAccounts();

  for (let index = 0; index < 5; index++) {
    await TestNFT.mint(deployer);
  }
};

runner().catch(console.error);
