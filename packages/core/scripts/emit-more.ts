// import { deployments, ethers, getNamedAccounts } from "hardhat";

// import { ERC20PresetFixedSupply } from "../typechain-types";

// const runner = async () => {
//   const WETH = await ethers.getContract<ERC20PresetFixedSupply>("WrappedEther");
//   const USDT = await ethers.getContract<ERC20PresetFixedSupply>("Tether");

//   const { admin } = await getNamedAccounts();

//   WETH.transfer(admin, ethers.utils.parseEther("100000"));
//   USDT.transfer(admin, ethers.utils.parseEther("100000"));
// };

// runner().catch(console.error);
