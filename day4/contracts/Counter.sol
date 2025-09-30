// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Counter {
  uint256 public count;
  address public owner;

  constructor(uint256 _initialCount) {
    count = _initialCount;
    owner = msg.sender;
  }
  
  // Modifier to check that the caller is the owner of
  // the contract.
  modifier onlyOwner() {
    require(msg.sender == owner, "Sorry, not the owner");
    // Underscore is a special character only used inside
    // a function modifier and it tells Solidity to
    // execute the rest of the code.
    _;
  }

  // Function to get the current count
  function get() public view returns (uint256) {
    return count;
  }

  // Function to increment count by 1
  function inc() public {
    count += 1;
  }

  // Function to increment count by 10
  function superInc() public onlyOwner{
    count += 10;
  }

  // Function to decrement count by 1
  function dec() public onlyOwner {
    require(count > 0, "You can't decrement below 0");
    count -= 1;
  }
}
