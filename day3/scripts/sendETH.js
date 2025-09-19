import { network } from "hardhat";
import { exit } from "process";

// Another implementation of ethers, the same functionality 
// but configured for the specified network and chainType
const { ethers } = await network.connect({
  network: "localhost",
});


const hardhatSigner = (await ethers.getSigners())[0];
console.log(hardhatSigner.address);

const myBalance = await ethers.provider.getBalance(hardhatSigner.address);
console.log("My balance:", ethers.formatEther(myBalance));

const toAddress = "0x70997970c51812dc3a010c7d01b50e0d17dc79c8";
console.log("Sending ETH to", toAddress);

// Sending %10 of the balance
const valueToSend = myBalance / 10n;
if (valueToSend === 0n) {
    console.error("Balance too low to send.");
    process.exit(1);
}
// This awaits the transaction is getting into the mempool
const tx = await hardhatSigner.sendTransaction({
    to: toAddress,
    value: valueToSend
});

console.log("TX SENT, IT IS IN THE MEMPOOL", tx.hash);

// This awaits the transaction is included into the block
await tx.wait();

console.log("TX CONFIRMED!"); // It is on the blockchain!
