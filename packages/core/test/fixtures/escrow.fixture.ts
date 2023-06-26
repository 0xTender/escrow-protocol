import { deployments, getNamedAccounts, getUnnamedAccounts } from "hardhat";
import type { Escrow } from "../../typechain-types";
import { setupUser, setupUsers } from "./utils";

export const escrow_fixture = deployments.createFixture(async (hre) => {
  await hre.deployments.fixture(["Escrow"]);
  const { deployer } = await getNamedAccounts();
  const Escrow = await hre.ethers.getContract<Escrow>("Escrow");

  const users = await getUnnamedAccounts();

  const contracts = { Escrow };

  return {
    ...contracts,
    deployer: await setupUser(deployer, contracts),
    users: await setupUsers(users, contracts),
  };
});
