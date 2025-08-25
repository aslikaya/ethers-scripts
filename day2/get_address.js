import { ethers } from "ethers";
import { getProvider, getSigner } from "./utils.js";

const signer = getSigner(true);
const provider = getProvider(true);

const myBalance = await provider.getBalance(signer.address);
console.log("My balance:", ethers.formatEther(myBalance));
console.log("My address:", signer.address);