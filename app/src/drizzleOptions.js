import Web3 from "web3";
import CodeNFT from "./contracts/CodeNFT.json";

const options = {
  web3: {
    block: false,
    customProvider: new Web3("ws://127.0.0.1:7545"),
  },
  contracts: [CodeNFT],
  events: {
    CodeNFT: ["StorageSet"],
  },
};

export default options;
