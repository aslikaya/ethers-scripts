import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("Counter", function () {
  it("Should increment by 1 when calling the inc() function", async function () {
    // Constructor arguments are passed as an array in the second parameter
    const counter = await ethers.deployContract("Counter", [10]);
    expect(await counter.count()).to.equal(10);

    const incTx = await counter.inc();
    await incTx.wait();
    expect(await counter.count()).to.equal(11);
  });
});
