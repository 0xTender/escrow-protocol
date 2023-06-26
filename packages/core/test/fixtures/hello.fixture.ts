import { deployments, getNamedAccounts, getUnnamedAccounts } from "hardhat";
import { Hello } from "../../typechain-types";
import { setupUser, setupUsers } from "./utils";

export const hello_fixture = deployments.createFixture(async (hre) => {
  await hre.deployments.fixture(["Hello"]);
  const { deployer } = await getNamedAccounts();
  const Hello = await hre.ethers.getContract<Hello>("Hello");

  const users = await getUnnamedAccounts();

  const contracts = { Hello };

  return {
    ...contracts,
    deployer: await setupUser(deployer, contracts),
    users: await setupUsers(users, contracts),
  };
});
