import 'dotenv/config';
import { ethers } from "ethers";

//defining the provider on sepolia
const infuraUrl = `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`;
console.log("Full URL:", infuraUrl);
const provider = new ethers.JsonRpcProvider(infuraUrl); 

//Picked one of the account created by the mnemonic in wallets.js 
// and put its private key in the .env file
console.log("private key: ", process.env.WALLET_PRIVATE_KEY);
// creates the wallet, also connects the wallet to a provider
const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);
// what I expect to see in logs: process.env.WALLET_PUBLIC_ADDRESS
console.log("My wallet address derived from private key is:", wallet.address);

let message = "Hola!";
const signature =  await wallet.signMessage(message);
console.log("Signed message", signature);

// Verifying the signer address with message and signature 
const signerAddress = ethers.verifyMessage(message, signature);
console.log("Signer Address", signerAddress);


let walletBalance =  await provider.getBalance(wallet.address);
console.log(
    "Sepolia Balance",
    ethers.formatEther(walletBalance)
);

let toAddress = process.env.TO_ADDRESS;
console.log("Sending Sepolia ETH to", toAddress)
// This awaits the transaction is getting into the mempool
const tx = await wallet.sendTransaction({
    to: toAddress,
    value: walletBalance / 10n
});

console.log("TX SENT, IT IS IN THE MEMPOOL", tx);

// This awaits the transaction is included into the block
await tx.wait();

console.log("TX CONFIRMED!");
