const hre = require("hardhat");

async function main() {
  const SoulMintFactory = await hre.ethers.getContractFactory("SoulMintFactory");
  const soulMintFactory = await SoulMintFactory.deploy();

  await soulMintFactory.deployed();

  console.log("SoulMintFactory deployed to:", soulMintFactory.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
