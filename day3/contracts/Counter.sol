// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Counter {
  uint public x;
  bool unlocked = false;

  event Increment(uint by);

  function inc() public {
    require(unlocked, "Sorry, this is locked");
    x++;
    emit Increment(1);
  }

  function incBy(uint by) public {
    require(unlocked, "Sorry, this is locked");
    require(by > 0, "incBy: increment should be positive");
    x += by;
    emit Increment(by);
  }

  function toggleUnlocked() public {
    unlocked = !unlocked;
  }
}
