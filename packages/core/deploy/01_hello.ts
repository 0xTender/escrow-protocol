import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deploy_function: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  await deploy("Escrow", {
    contract: "Escrow",
    from: deployer,
    log: true,
    skipIfAlreadyDeployed: true,
  });
};

export default deploy_function;

deploy_function.tags = ["Escrow"];
