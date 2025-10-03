// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract AslikoToken {
    uint256 public constant totalSupply = 1000;
    uint256 public totalCreated;

    uint256 public constant CREATION_PRICE = 0.01 ether;

    address public immutable owner;

    mapping(address => uint) public balances;

    constructor() {
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

    function create(uint256 quantity) public onlyOwner {
        require(quantity + totalCreated <= totalSupply, "totalSupply reached!");

        balances[msg.sender] += quantity;
        totalCreated += quantity;
    }

    function send(address to, uint256 quantity) public {
        require(quantity <= balances[msg.sender], "You don't have enough");

        balances[msg.sender] -= quantity;
        balances[to] += quantity;
    }

    function buy() public payable {
        require(msg.value == CREATION_PRICE, "Incorrect ETH amount");
        require(totalCreated < totalSupply, "totalSupply reached!");

        balances[msg.sender]++;
        totalCreated++;
    }
}
