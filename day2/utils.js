import 'dotenv/config';
import { ethers } from "ethers";

const getProvider = (mainnet = false) => {
    const providerUrl = mainnet 
        ? `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}` 
        : `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`;

    return new ethers.JsonRpcProvider(providerUrl);
};

//Checking if it is connected to the correct network
// const provider = getProvider();
// const network = await provider.getNetwork(); // returns a Promise
// console.log("Provider network:", { name: network.name, chainId: network.chainId });

const generateNewWallet = () => {
    const wallet = ethers.Wallet.createRandom();

    console.log("address:", wallet.address);
    console.log("private key:", wallet.privateKey);
    console.log("mnemonic:", wallet.mnemonic.phrase);
};


//generateNewWallet();

const getSigner = (mainnet = false) => {
    const provider = getProvider(mainnet);
    return new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);
};

//testing signer
// const signer = getSigner();
// console.log("Signer Address", signer.address);

export { getProvider, generateNewWallet, getSigner };