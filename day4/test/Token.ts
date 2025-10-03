import { expect } from "chai";
import { network } from "hardhat";
//you use .js extensions even when importing from .ts files 
// because the extension refers to the compiled output JavaScript file, 
// not the source TypeScript file. This ensures the import paths work 
// correctly after compilation.
import type { AslikoToken } from "../types/ethers-contracts/index.js";

const { ethers } = await network.connect();

describe("Token", function () {
  let token : AslikoToken;

  this.beforeEach(async () => {
    token = await ethers.deployContract("AslikoToken");
    await token.waitForDeployment();
  });

  it("Should be able to create token", async function () {
    const [signer0] = await ethers.getSigners();

    const createTx = await token.create(100);
    await createTx.wait();
    expect(await token.balances(signer0.address)).to.equal(100);

  });

  it("Should revert if creating more than total supply", async function () {
    const totalSupply = await token.totalSupply();
    const createTx = token.create(totalSupply + 100n);
    expect(createTx).to.be.revertedWith("totalSupply reached!");
  });

  it("Should be able to send tokens", async function () {
    const [signer0, signer1] = await ethers.getSigners();

    const createTx = await token.create(100);
    await createTx.wait();

    const sendTx = await token.send(signer1.address, 25);
    await sendTx.wait();

    expect(await token.balances(signer0.address)).to.equal(75);
    expect(await token.balances(signer1.address)).to.equal(25);
  });

});
