import 'dotenv/config';
import { ethers } from "ethers";
import { getSigner } from "./utils.js";
import yourCollectibleAbi from "./abi/yourCollectibleAbi.js";

const NFTaddress = "0x6563490Df168a40DFcF5631808Bcf6A3f4A2816C";
//Need signer in order to write to a contract
const signer = getSigner();

const yourCollectibleContract = new ethers.Contract(
    NFTaddress, 
    yourCollectibleAbi, 
    signer
);

const totalSupply = await yourCollectibleContract.totalSupply();

console.log("YourCollectible total supply", totalSupply.toString());

console.log("Minting NFT!");

const URI = "https://ipfs.io/ipfs/QmfVMAmNM1kDEBYrC2TPzQDoCRFH6F5tE1e9Mr4FkkR5Xr";
//MethodID in input data or transaction or Function Selector of the "mintItem" function
//const mintCalldata = "0x110bcd45"; // didn't work because it needs arguments, 
// if it didn't need arguments this was sufficient
const mintCalldata = yourCollectibleContract.interface.encodeFunctionData("mintItem", [
    //Arguments mintItem function expects
    process.env.WALLET_PUBLIC_ADDRESS, // to address
    URI // uri
]);
//raw version for calling a function in a contract, 
//the same function used when you send money to someone 
const mintTX = await signer.sendTransaction({
    value: 0,
    to: NFTaddress,
    data: mintCalldata
    //nonce:
    //gasPrice:
}); 

//Usual way to call a function in a contract
// const mintTX = await yourCollectibleContract.mintItem({
//     to: process.env.WALLET_PUBLIC_ADDRESS, 
//     uri: URI});

console.log("TX sent", mintTX.hash);

await mintTX.wait();

console.log("MINTED!");