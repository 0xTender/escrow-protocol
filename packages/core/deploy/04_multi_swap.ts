import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

import { ethers } from "hardhat";
import type { Escrow } from "../typechain-types";

const deploy_function: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, execute } = deployments;

  const { deployer } = await getNamedAccounts();

  const Escrow = await deployments.get("Escrow");

  await deploy("MultiSwapExtension", {
    contract: "MultiSwapExtension",
    from: deployer,
    log: true,
    skipIfAlreadyDeployed: true,
    args: [Escrow.address],
  });

  const MultiSwapExtension = await deployments.get("MultiSwapExtension");
  const EscrowInstance = await ethers.getContract<Escrow>("Escrow");
  if (
    (await EscrowInstance.escrowExtensions(MultiSwapExtension.address)) !== true
  ) {
    await execute(
      "Escrow",
      { from: deployer },
      "updateEscrowExtension",
      MultiSwapExtension.address,
      true
    );
  }
};

export default deploy_function;

deploy_function.tags = [
  "MultiSwapExtension",
  "production",
  "development",
  "testing",
];
deploy_function.dependencies = ["Escrow"];
