import { expect } from "chai";
import { network } from "hardhat";
import type { Counter } from "../types/ethers-contracts/Counter.js";

const { ethers } = await network.connect();

describe("Counter", function () {
  let counter: Counter;

  this.beforeEach( async() => {
      counter = await ethers.deployContract("Counter");
  });

  it("Should emit the Increment event when calling the inc() function when it is unlocked", async function () {
    await counter.toggleUnlocked();
    await expect(counter.inc()).to.emit(counter, "Increment").withArgs(1n);
  });

  it("Should revert when calling inc() on a locked counter", async function () {
    await expect(counter.inc()).to.be.revertedWith("Sorry, this is locked");
  });

  it("Should revert when calling incBy() on a locked counter", async function () {
    await expect(counter.incBy(5)).to.be.revertedWith("Sorry, this is locked");
  });

  it("The sum of the Increment events should match the current value when it is unlocked", async function () {
    // actually it is not the deployment block number, but the starting block number for the incoming transactions
    const deploymentBlockNumber = await ethers.provider.getBlockNumber();

    await counter.toggleUnlocked();

    // run a series of increments
    for (let i = 1; i <= 10; i++) {
      await counter.incBy(i);
    }

    const events = await counter.queryFilter(
      counter.filters.Increment(),
      deploymentBlockNumber,
      "latest",
    );

    // check that the aggregated events match the current value
    let total = 0n;
    for (const event of events) {
      total += event.args.by;
    }

    expect(await counter.x()).to.equal(total);
  });

  it("Should handle toggle unlock/lock correctly", async function () {
    expect(await counter.toggleUnlocked());
    await expect(counter.inc()).to.emit(counter, "Increment").withArgs(1n);

    await counter.toggleUnlocked(); // lock again
    await expect(counter.inc()).to.be.revertedWith("Sorry, this is locked");
  });
});
