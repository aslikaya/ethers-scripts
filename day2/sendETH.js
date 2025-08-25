import { ethers } from "ethers";
import { getProvider, getSigner } from "./utils.js";

const signer = getSigner();
const provider = getProvider();

const myBalance = await provider.getBalance(signer.address);
console.log("My balance:", ethers.formatEther(myBalance));

let toAddress = process.env.TO_ADDRESS;
if (!toAddress) {
    console.error("Missing TO_ADDRESS in environment.");
    process.exit(1);
}
console.log("Sending Sepolia ETH to", toAddress);

const valueToSend = myBalance / 10n;
if (valueToSend === 0n) {
    console.error("Balance too low to send.");
    process.exit(1);
}
// This awaits the transaction is getting into the mempool
const tx = await signer.sendTransaction({
    to: toAddress,
    value: valueToSend
});

console.log("TX SENT, IT IS IN THE MEMPOOL", tx.hash);

// This awaits the transaction is included into the block
await tx.wait();

console.log("TX CONFIRMED!");