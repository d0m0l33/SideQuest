require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");
require('dotenv').config();

const { PRIVATE_KEY } = process.env;
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    // POA used for testing only, since xDAI does not have a testnet and recommends testing there
    poa: {
      url: "https://sokol.poa.network",
      accounts: [PRIVATE_KEY],
      initialBaseFeePerGas: 0,
    }
  },
 solidity: {
    compilers: [
      {"version": "0.4.24"},
      {"version": "0.5.0"},
      {"version": "0.6.0"},
      {"version": "0.7.0"},
      {"version": "0.8.1"},
    ]
 }
};
