import { HardhatUserConfig } from "hardhat/types";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "@typechain/hardhat";
import "@nomicfoundation/hardhat-chai-matchers";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.18",
      },
    ],
  },
  networks: {
    hardhat: {
      blockGasLimit: 14_999_999,
      chainId: 1337,
      accounts: {
        mnemonic:
          process.env.MNEMONIC ??
          "test test test test test test test test test test test junk",
        count: 10,
      },
    },
    ...(process.env.MNEMONIC
      ? {
          localhost: {
            blockGasLimit: 14_999_999,
            chainId: 1337,
            accounts: {
              mnemonic: process.env.MNEMONIC,
              count: 10,
            },
          },
        }
      : {}),
    gobi: {
      url: "https://gobi-testnet.horizenlabs.io/ethv1",
      chainId: 1663,
      // accounts: {
      //   mnemonic: process.env.MNEMONIC,
      // },
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    admin: {
      default: 1,
    },
  },
};

export default config;
