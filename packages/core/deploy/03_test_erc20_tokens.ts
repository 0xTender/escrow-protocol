import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const deploy_function: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  await deploy("WrappedEther", {
    contract: "ERC20PresetFixedSupply",
    from: deployer,
    log: true,
    skipIfAlreadyDeployed: true,
    args: [
      "Wrapped Ether",
      "WETH",
      ethers.utils.parseEther(`${1_000_000}`),
      deployer,
    ],
  });

  await deploy("Tether", {
    contract: "ERC20PresetFixedSupply",
    from: deployer,
    log: true,
    skipIfAlreadyDeployed: true,
    args: ["Tether", "USDT", ethers.utils.parseEther(`${1_000_000}`), deployer],
  });
};

export default deploy_function;

deploy_function.tags = ["USDT", "WETH", "development", "testing"];
