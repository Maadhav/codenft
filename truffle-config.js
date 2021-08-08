const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  networks: {
    develop: {
      // default with truffle unbox is 7545, but we can use develop to test changes, ex. truffle migrate --network develop 
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    matic: {
      provider: () => new HDWalletProvider("", `https://rpc-mumbai.maticvigil.com/`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },
  compilers: {
    solc: {
      version: "^0.8.0",
    },
  },
};
