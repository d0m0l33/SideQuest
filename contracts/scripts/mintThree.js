const hre = require("hardhat");
require('dotenv').config();

const { DEPLOYED_POLYGON_SOULMINT } = process.env;


async function main() {
  const soulMint = await hre.ethers.getContractAt("SoulMint", DEPLOYED_POLYGON_SOULMINT);
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
