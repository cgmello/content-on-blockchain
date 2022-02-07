//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract ContentsOnTheBlock {
    string private content;

    constructor(string memory _content) {
        console.log("Deploying some content: ", _content);
        content = _content;
    }

    function getContent() public view returns (string memory) {
        return content;
    }

    function setContent(string memory _content) public {
        console.log("Changing content from '%s' to '%s'", content, _content);
        content = _content;
    }
}
