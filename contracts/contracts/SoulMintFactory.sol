pragma solidity ^0.5.0;
import "hardhat/console.sol";

import "./SoulMint.sol";

contract SoulMintFactory {
  mapping(address => SoulMint) public contractByOwner;

  function deployOne(string memory __name, string memory __symbol, string memory __baseURI) public returns (SoulMint deployedContract) {
    SoulMint soulMint;

    soulMint = new SoulMint(__name, __symbol, __baseURI);
    contractByOwner[msg.sender] = soulMint;
    return soulMint;
  }
}
