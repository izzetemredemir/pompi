require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {},
    neonDevnet: {
      url: "https://devnet.neonevm.org",
      chainId: 245022926,
      accounts: [process.env.NEON_DEVNET_PRIVATE_KEY],
    },
  },
};
