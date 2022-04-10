const hre = require("hardhat");
require('dotenv').config();

async function main() {
  const deployer = await hre.ethers.getSigner();
  const soulMintFactory = await hre.ethers.getContractAt("SoulMintFactory", "0xf46bB4381BECf28CB0ebf7D6a5127bD04810d0cE");
  const deployedOne = await soulMintFactory.deployOne("Test", "TST", "http://foo.bar/");
  await deployedOne.wait();
  const soulMintAddress = await soulMintFactory.contractByOwner(deployer.address);

  console.log(`SoulMint instance for ${deployer.address} deployed to:`, soulMintAddress);


  const soulMint = await hre.ethers.getContractAt("SoulMint", soulMintAddress);
  console.log("Minting three...");
  await soulMint.mintOne(1, '0x22fC1E905CBD424ec1ba9447EF98F9E374Ce16e1');
  await soulMint.mintOne(2, '0x22fC1E905CBD424ec1ba9447EF98F9E374Ce16e1');
  await soulMint.mintOne(3, '0x22fC1E905CBD424ec1ba9447EF98F9E374Ce16e1');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
