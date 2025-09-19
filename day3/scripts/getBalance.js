import { network } from "hardhat";

const { ethers } = await network.connect({
  network: "hardhatOp",
  chainType: "op",
});

const localProviderUrl = `http://127.0.0.1:8545/`;
const provider = new ethers.JsonRpcProvider(localProviderUrl); 

const account0Address = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
const account0Balance = await provider.getBalance(account0Address);
console.log("account0Balance", ethers.formatEther(account0Balance));
