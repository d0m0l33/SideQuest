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

  function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256) {
    SoulMint soulMint = SoulMint(contractByOwner[msg.sender]);
    soulMint.tokenOfOwnerByIndex(owner, index);
  }

  function mintOne(uint256 eventId, address to) public {
    SoulMint(contractByOwner[msg.sender]).mintOne(eventId, to);
  }

  function balanceOf(address _owner) public view returns (uint256) {
   SoulMint soulMint = SoulMint(contractByOwner[msg.sender]);
   return soulMint.balanceOf(_owner);
  }

  function metadataUrl() public view returns (string memory) {
    SoulMint soulMint = SoulMint(contractByOwner[msg.sender]);
    return soulMint.metadataUrl();
  }

  function getXpoapAddress() public view returns (XPoap xpoapAddress) {
    SoulMint soulMint = SoulMint(contractByOwner[msg.sender]);
    return soulMint.getXpoapAddress();
  }
}
