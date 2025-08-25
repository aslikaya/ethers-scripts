import { ethers } from "ethers";
import { getProvider } from "./utils.js";
import yourCollectibleAbi from "./abi/yourCollectibleAbi.js";

const NFTaddress = "0x6563490Df168a40DFcF5631808Bcf6A3f4A2816C";
const provider = getProvider();

const yourCollectibleContract = new ethers.Contract(
    NFTaddress, 
    yourCollectibleAbi, 
    provider
);

const totalSupply = await yourCollectibleContract.totalSupply();

console.log("YourCollectible total supply", totalSupply.toString());