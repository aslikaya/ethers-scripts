import { ethers } from "ethers";
import { getProvider, getSigner } from "./utils.js";
import daiAbi from "./abi/daiAbi.js";

const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const provider = getProvider(true);
const signer = getSigner(true);

const daiContract = new ethers.Contract(
    daiAddress, 
    daiAbi, 
    provider
);

const daiContractWrite = new ethers.Contract(
    daiAddress, 
    daiAbi, 
    signer
);

const myAddress = "0x9Ea409585e445F3613DAA27D9FFF7Ead226e20b2";
const daiBalance = await daiContract.balanceOf(myAddress);

console.log("Dai balance:", ethers.formatEther(daiBalance));

const sendToAddress = process.env.TO_ADDRESS;
const daiTransfer = await daiContractWrite.transfer(sendToAddress, ethers.parseEther("5"));

console.log("TX SENT", daiTransfer.hash);

await daiTransfer.wait();

console.log("TX in the blockchain!");

const daiBalanceAfterTx = await daiContract.balanceOf(myAddress);
console.log("Dai balance after transfer:", ethers.formatEther(daiBalanceAfterTx));