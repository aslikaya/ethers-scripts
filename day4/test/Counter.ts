import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("Counter", function () {
  it("Should increment by 1 when calling the inc() function", async function () {
    const [signer0] = await ethers.getSigners();
    console.log("deploying contract as", signer0.address);

    // Constructor arguments are passed as an array in the second parameter
    const counter = await ethers.deployContract("Counter", [10]);
    expect(await counter.count()).to.equal(10);

    const incTx = await counter.inc();
    await incTx.wait();
    expect(await counter.count()).to.equal(11);

    expect(await counter.owner()).to.equal(signer0.address);
  });

  it("Should revert when a non owner account calling the dec() function", async function () {
    const [signer0, signer1] = await ethers.getSigners();
    console.log("deploying contract as", signer0.address);

    // Constructor arguments are passed as an array in the second parameter
    const counter = await ethers.deployContract("Counter", [10]);

    // Send transaction with specified account otherwise it is always signer0
    await expect(counter.connect(signer1).dec()).to.be.revertedWith("Sorry, not the owner");
  });
});
