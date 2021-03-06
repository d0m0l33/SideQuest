require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");
require('hardhat-deploy');
require('dotenv').config();

const { MUMBAI_API_KEY, PRIVATE_KEY } = process.env;
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  paths: {
    artifacts: '../src/artifacts'
  },
  networks: {
    // POA used for testing only, since xDAI does not have a testnet and recommends testing there
    poa: {
      url: "https://sokol.poa.network",
      accounts: [PRIVATE_KEY],
      initialBaseFeePerGas: 0,
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${MUMBAI_API_KEY}`,
      accounts: [PRIVATE_KEY],
      initialBaseFeePerGas: 0,
    }
  },
 solidity: {
    version: "0.5.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 2000
      }
    },
 }
};
