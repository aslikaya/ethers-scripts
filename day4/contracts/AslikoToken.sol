// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract AslikoToken {
    uint256 public constant totalSupply = 1000;
    uint256 public totalCreated; 

    mapping (address => uint) public balances;

    function create(uint256 quantity) public {
        require(quantity + totalCreated <= totalSupply, "totalSupply reached!");

        balances[msg.sender] += quantity;
        totalCreated += quantity;
    }

    function send(address to, uint256 quantity) public {
        require(quantity <= balances[msg.sender], "You don't have enough");

        balances[msg.sender] -= quantity;
        balances[to] += quantity;
    }
}