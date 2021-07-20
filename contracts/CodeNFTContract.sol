pragma solidity >=0.4.21 <0.7.0;

contract CodeNFTContract {
    event StorageSet(string _message);

    uint256 public storedData;

    function set(uint256 x) public {
        storedData = x;

        emit StorageSet("Data stored successfully!");
    }
}
