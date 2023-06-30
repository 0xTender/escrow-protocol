import { deployments, ethers, getNamedAccounts } from "hardhat";

import {
  ERC20PresetFixedSupply,
  ERC721PresetMinterPauserAutoId,
} from "../typechain-types";

const runner = async () => {
  const WETH = await ethers.getContract<ERC20PresetFixedSupply>("WrappedEther");
  const USDT = await ethers.getContract<ERC20PresetFixedSupply>("Tether");
  const TestNFT = await ethers.getContract<ERC721PresetMinterPauserAutoId>(
    "TestNFT"
  );

  const { admin, deployer } = await getNamedAccounts();

  await WETH.transfer(admin, ethers.utils.parseEther("100000"));
  await USDT.transfer(admin, ethers.utils.parseEther("100000"));

  for (let index = 0; index < 5; index++) {
    await TestNFT.mint(deployer);
  }
};

runner().catch(console.error);
