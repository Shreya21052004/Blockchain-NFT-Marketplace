require('dotenv').config();
require('@nomicfoundation/hardhat-toolbox');

const { SEPOLIA_RPC_URL, PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.20',
    settings: {
      optimizer: { enabled: true, runs: 200 },
      viaIR: false,
    },
  },
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545',
    },
    sepolia: {
      url: SEPOLIA_RPC_URL || '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY || '',
    },
  },
};
