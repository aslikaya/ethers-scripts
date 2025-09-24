// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Counter} from "./Counter.sol";
import {Test} from "forge-std/Test.sol";

// Solidity tests are compatible with foundry, so they
// use the same syntax and offer the same functionality.

contract CounterTest is Test {
  Counter counter;
  uint256 initialValue = 10;

  function setUp() public {
    counter = new Counter(initialValue);
  }

  function test_InitialValue() public view {
    assertEq(counter.count(), initialValue);
  }

  function testFuzz_Inc(uint8 count) public {
    for (uint8 i = 0; i < count; i++) {
      counter.inc();
    }
    assertEq(counter.count(), count + initialValue);
  }

  function test_Dec() public {
    for (uint256 i = counter.count(); i > 0; i--) {
      counter.dec();
    }
    assertEq(counter.count(), 0);
  }

  function test_DecBelowZero() public {
    test_Dec();
    vm.expectRevert();
    counter.dec();
  }
}
