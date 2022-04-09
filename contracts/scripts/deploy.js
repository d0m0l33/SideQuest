const hre = require("hardhat");

async function main() {
  const SoulMint = await hre.ethers.getContractFactory("SoulMint");
  const soulMint = await SoulMint.deploy();

  await soulMint.deployed();

  console.log("SoulMint deployed to:", soulMint.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
