// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FILFLixCreator is ERC1155, Ownable {
    uint256 public tokenId;
    mapping(uint256 => address) tokenIdToCreator;
    uint256[] public supplies;
    uint256[] public prices;
    uint256[] public minted;

    constructor() ERC1155("") {}

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function create(uint256 price, uint256 supply) public {
        _mint(msg.sender, tokenId, 1, "");
        tokenId++;
        tokenIdToCreator[tokenId] = msg.sender;
        prices.push(price);
        supplies.push(supply);
    }

    function mint(uint256 id) public payable {
        require(id != 0, "token doesn't exist!");
        require(id <= supplies.length, "token doesn't exist!");
        require(minted[id] + 1 <= supplies[id], "token doesn't exist!");
        require(msg.value >= prices[id] * 1 ether, "not enough $$$");
        _mint(msg.sender, id, 1, "");
        minted[id]++;
    }
}
