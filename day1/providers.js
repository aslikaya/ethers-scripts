import 'dotenv/config';
import {ethers} from "ethers";

// the quickest way to instantiate a provider 
// but it will break if you do 10 requests/sec
//const provider = ethers.getDefaultProvider();

// Using Infura as a provider, you need to get your key first
const infuraUrl = `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`;
console.log("Full URL:", infuraUrl);
const provider = new ethers.JsonRpcProvider(infuraUrl); 

// a direct way for Infura
// const provider = new ethers.providers.InfuraProvider(
//     "homestead",
//     process.env.INFURA_KEY
// );
 
//await is needed to get the block number, it is a promise, 
// so we need to wait for it to resolve
console.log("Current block number", await provider.getBlockNumber());

console.log("atg.eth is", await provider.resolveName("atg.eth"));

console.log(
    "0xc4ac4174aa9a93d9eef02621ce8205c75d003de5 is", 
    await provider.lookupAddress("0xc4ac4174aa9a93d9eef02621ce8205c75d003de5")
);

const vitalikBalance =  await provider.getBalance("vitalik.eth");
console.log("vitalik.eth balance is", vitalikBalance);

console.log("vitalik.eth has", ethers.formatEther(vitalikBalance));

console.log("1.5 ETH is", ethers.parseEther("1.5"), "wei");

let sanfordBalance = await provider.getBalance("sanfordstout.eth");
sanfordBalance += ethers.parseEther("4.8");
if (vitalikBalance > sanfordBalance) {
    console.log("Vitalik has more ETH than Sanford");
} else {
    console.log("Sanford has more ETH than Vitalik");
}