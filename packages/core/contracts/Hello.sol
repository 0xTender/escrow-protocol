// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "hardhat/console.sol";

contract Hello {
  event MessageEvent(string message);

  struct EventStruct {
    string message;
    uint256 randomNumber;
  }

  event StructEvent(EventStruct eventStruct);

  constructor(string memory _message) {
    console.log(_message);
    message(_message);
  }

  function message(string memory _message) public {
    // bad way to generate random number
    // do not use in production
    uint256 _randomNumber = block.timestamp * 100;
    emit MessageEvent(_message);

    emit StructEvent(EventStruct(_message, _randomNumber));
  }
}
