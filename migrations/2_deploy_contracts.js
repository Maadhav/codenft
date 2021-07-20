const CodeNFTContract = artifacts.require("CodeNFTContract");

module.exports = function(deployer) {
  deployer.deploy(CodeNFTContract);
};
