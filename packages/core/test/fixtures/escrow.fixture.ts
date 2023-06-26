import { deployments, getNamedAccounts, getUnnamedAccounts } from "hardhat";
import type {
  Escrow,
  SwapERC20Extension,
  ERC20PresetFixedSupply,
} from "../../typechain-types";
import { setupUser, setupUsers } from "./utils";

export const escrow_fixture = deployments.createFixture(async (hre) => {
  await hre.deployments.fixture(["Escrow", "SwapERC20Extension", "testing"]);
  const { deployer } = await getNamedAccounts();
  const Escrow = await hre.ethers.getContract<Escrow>("Escrow");
  const SwapERC20Extension = await hre.ethers.getContract<SwapERC20Extension>(
    "SwapERC20Extension"
  );
  const WrappedEther = await hre.ethers.getContract<ERC20PresetFixedSupply>(
    "WrappedEther"
  );

  const Tether = await hre.ethers.getContract<ERC20PresetFixedSupply>("Tether");

  const users = await getUnnamedAccounts();

  const contracts = { Escrow, SwapERC20Extension, WrappedEther, Tether };

  return {
    ...contracts,
    deployer: await setupUser(deployer, contracts),
    users: await setupUsers(users, contracts),
  };
});
