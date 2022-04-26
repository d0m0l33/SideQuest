
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol"; 

contract SoulMint is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  mapping(uint256 => uint256) public mintTimestampByTokenId;
  string private _baseTokenURI;


  constructor(address owner, string memory __name, string memory __symbol, string memory __baseURI)
  ERC721(__name, __symbol) 
   public {
    _baseTokenURI = __baseURI;
    _transferOwnership(owner);
  }

  function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
  }

  function mintOne(string memory metadataURI) public onlyOwner returns (uint256)
  {
    _tokenIds.increment();
    uint256 id = _tokenIds.current();
    _safeMint(msg.sender, id);
    _setTokenURI(id, metadataURI);
    mintTimestampByTokenId[id] = block.timestamp;
    return id;
  }

}
