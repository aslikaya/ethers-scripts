import { network } from "hardhat";

// Another implementation of ethers, the same functionality 
// but configured for the specified network and chainType
const { ethers } = await network.connect({
  network: "sepolia",
  chainType: "l1",
});

const signer = (await ethers.getSigners())[0];
console.log(signer.address);

const myBalance = await ethers.provider.getBalance(signer.address);
console.log("My balance:", ethers.formatEther(myBalance));
