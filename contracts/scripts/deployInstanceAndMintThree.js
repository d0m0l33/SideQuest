const hre = require("hardhat");
require('dotenv').config();

async function main() {
  const deployer = await hre.ethers.getSigner();
  const SoulMintFactory = await hre.ethers.getContractFactory("SoulMintFactory");
  const soulMintFactory = await SoulMintFactory.deploy();

  await soulMintFactory.deployed();
  console.log("SoulMintFactory deployed to:", soulMintFactory.address);

  const deployedOne = await soulMintFactory.deployOne();
  await deployedOne.wait();
  const soulMintAddress = await soulMintFactory.contractByOwner(deployer.address);

  console.log(`SoulMint instance for ${deployer.address} deployed to:`, soulMintAddress);


  const soulMint = await hre.ethers.getContractAt("SoulMint", soulMintAddress);
  console.log("Minting three...");
   await soulMint.mintOne('someid123');
   await soulMint.mintOne('someid1234');
   await soulMint.mintOne('someid1235');

   const uri1  = await soulMint.tokenURI(1);
   const tStamp1  = await soulMint.mintTimestampByTokenId(1);
   const totalSoulMints  = await soulMintFactory.totalSoulMints();

   console.log('uri : ',uri1);
   console.log('tStamp1 : ',epochToDate(ethers.utils.formatEther(tStamp1)));
   console.log('totalSoulMints : ',totalSoulMints);

   const deployedAnotherOne = await soulMintFactory.deployOne();
   await deployedAnotherOne.wait();

}

const epochToDate = (epoch)=> {
  return new Date( epoch * 1000);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
