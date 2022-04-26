pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "./SoulMint.sol";


contract SoulMintFactory {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(address => SoulMint) public contractByOwner;

    function deployOne() public returns (SoulMint deployedContract) {
        require(address(contractByOwner[msg.sender]) == address(0),"Address has already minted a Soul Mint contract.");
        SoulMint soulMint;
        _tokenIds.increment();
        uint256 id = _tokenIds.current();
        string memory soulMintName = string(abi.encodePacked("SoulMint:", _uint2str(id)));
        soulMint = new SoulMint(msg.sender, soulMintName, "SMT", "ipfs://");
        contractByOwner[msg.sender] = soulMint;
        return soulMint;
    }


    /**
     * @dev Function to convert uint to string
     * Taken from https://github.com/oraclize/ethereum-api/blob/master/oraclizeAPI_0.5.sol
     */
    function _uint2str(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    /**
     * @dev Function to concat strings
     * Taken from https://github.com/oraclize/ethereum-api/blob/master/oraclizeAPI_0.5.sol
     */
    function _strConcat(string memory _a, string memory _b)
    internal pure returns (string memory _concatenatedString)
    {
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        string memory ab = new string(_ba.length + _bb.length);
        bytes memory concat = bytes(ab);
        uint k = 0;
        uint i = 0;
        for (i = 0; i < _ba.length; i++) {
            concat[k++] = _ba[i];
        }
        for (i = 0; i < _bb.length; i++) {
            concat[k++] = _bb[i];
        }
        return string(concat);
    }


    function totalSoulMints() public view returns (uint) {
        return _tokenIds.current();
    }
}
