const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const { expect } = chai;
const { ethers } = require("hardhat");
const BigNumber = require("bignumber.js");
const isValidDate = require('date-fns/isValid')
const fromUnixTime = require('date-fns/fromUnixTime')


chai.use(chaiAsPromised)

describe("SoulMint", function () {
  it("deploys", async function () {
    const [alice] = await ethers.getSigners();

    const SoulMint = await ethers.getContractFactory("SoulMint", alice);
    const soulMint = await SoulMint.deploy();
    await soulMint.deployed();
  });
  it("mint one", async function () {
    const [alice, bob] = await ethers.getSigners();

    const SoulMint = await ethers.getContractFactory("SoulMint", alice);
    const soulMint = await SoulMint.deploy();
    await soulMint.deployed();

    const bobBalanceBeforeMint = await soulMint.balanceOf(bob.address);
    expect(bobBalanceBeforeMint).to.equal(0);

    const mintTx = await soulMint.mintOne(1, bob.address);
    await mintTx.wait();

    const bobBalanceAfterMint = await soulMint.balanceOf(bob.address);
    expect(bobBalanceAfterMint).to.equal(1);
  });
  it("mintTimestampByTokenId", async function () {
    const [alice, bob] = await ethers.getSigners();

    const SoulMint = await ethers.getContractFactory("SoulMint", alice);
    const soulMint = await SoulMint.deploy();
    await soulMint.deployed();

    const mintTx = await soulMint.mintOne(42, bob.address);
    await mintTx.wait();

    const mintTxx = await soulMint.mintOne(43, bob.address);
    await mintTxx.wait();


    const balanceOfBob = await soulMint.balanceOf(bob.address);
    const lastTokenId = await soulMint.tokenOfOwnerByIndex(bob.address, balanceOfBob - 1)
    const lastTimestamp = (await soulMint.mintTimestampByTokenId(lastTokenId)).toString();
    expect(isValidDate(fromUnixTime(lastTimestamp))).to.equal(true);
  });
});

