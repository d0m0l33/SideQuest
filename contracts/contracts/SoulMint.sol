pragma solidity ^0.5.0;

import "./XPoap.sol";
import "./Ownable.sol";

contract SoulMint is Ownable {
  XPoap public xpoap;
  mapping(uint256 => uint256) public mintTimestampByTokenId;

  constructor(string memory __name, string memory __symbol, string memory __baseURI) public {
    address _txOrigin = tx.origin;
    address[] memory admins = new address[](1);
    admins[0] = _txOrigin;

    xpoap = new XPoap();
    // TODO: In the real-world POAP contract, this is called initialize.
    // Find out why we're getting some error and revert it to initialize, this won't be compatible with the deployed contract
    xpoap.init(__name, __symbol, __baseURI, admins); // TODO: This is currently tied to one admin. Maybe make it a factory so that each admin deploys theirs?
  }

  function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256) {
    return xpoap.tokenOfOwnerByIndex(owner, index);
  }

  function mintOne(uint256 eventId, address to) public {
    xpoap.mintToken(eventId, to);
    mintTimestampByTokenId[xpoap.tokenOfOwnerByIndex(to, xpoap.balanceOf(to) -1)] = block.timestamp;
  }

  function balanceOf(address _owner) public view returns (uint256) {
    return xpoap.balanceOf(_owner);
  }

  function metadataUrl() public pure returns (string memory) {
    // TODO: Implement when we know how to construct the URL
    return "foo";
  }
}
