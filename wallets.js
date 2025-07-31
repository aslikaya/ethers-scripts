import { ethers } from "ethers";

//Creating a wallet
const wallet = ethers.Wallet.createRandom();

console.log("address:", wallet.address);
console.log("private key:", wallet.privateKey);
console.log("mnemonic:", wallet.mnemonic.phrase);

let path, myWallet;

//Creating 10 accounts from the same mnemonic/same wallet
for (let i=0; i<10; i++) {
    path = `m/44'/60'/0'/0/${i}`;
    myWallet = ethers.HDNodeWallet.fromPhrase(wallet.mnemonic.phrase, undefined, path);
    console.log("address", i, myWallet.address);
    console.log("private key", i, myWallet.privateKey);
}