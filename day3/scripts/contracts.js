import { network } from "hardhat";
import { exit } from "process";

// Another implementation of ethers, the same functionality 
// but configured for the specified network and chainType
const { ethers } = await network.connect({
  network: "localhost",
});

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const counter = await ethers.getContractAt("Counter", contractAddress); //contract instance

console.log("Initial x value:", (await counter.x()).toString());

console.log("Increasing x by 5");

const incTx = await counter.incBy(5);

console.log("incTx sent");

await incTx.wait();

console.log("incTx included in a block");

console.log("Current x value:", (await counter.x()).toString());
