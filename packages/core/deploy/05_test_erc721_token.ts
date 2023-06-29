import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const deploy_function: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  await deploy("TestNFT", {
    contract: "ERC721PresetMinterPauserAutoId",
    from: deployer,
    log: true,
    skipIfAlreadyDeployed: true,
    args: [
      "TestNFT",
      "TNFT",
      "https://cyan-hollow-shark-769.mypinata.cloud/ipfs/QmRiWHSYo68DJrwVBUYQEYfHH9vCGs1NWYcLV5uPXFgw7N/",
    ],
  });
};

export default deploy_function;

deploy_function.tags = ["TestNFT", "development", "testing"];
