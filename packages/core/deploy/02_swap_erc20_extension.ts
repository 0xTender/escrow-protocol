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

  await deploy("SwapERC20Extension", {
    contract: "SwapERC20Extension",
    from: deployer,
    log: true,
    skipIfAlreadyDeployed: true,
    args: [Escrow.address],
  });

  const SwapERC20Extension = await deployments.get("SwapERC20Extension");

  const EscrowInstance = await ethers.getContract<Escrow>("Escrow");

  if (
    (await EscrowInstance.escrowExtensions(SwapERC20Extension.address)) !== true
  ) {
    await execute(
      "Escrow",
      { from: deployer },
      "updateEscrowExtension",
      SwapERC20Extension.address,
      true
    );
  }
};

export default deploy_function;

deploy_function.tags = [
  "SwapERC20Extension",
  "production",
  "development",
  "testing",
];
deploy_function.dependencies = ["Escrow"];
