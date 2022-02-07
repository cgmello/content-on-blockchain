const hre = require("hardhat");

async function main() {
  const contract = await hre.ethers.getContractFactory("ContentsOnTheBlock");
  const contractOnChain = await contract.deploy("Hello Hashdexers!");

  await contractOnChain.deployed();

  console.log("Contract deployed to:", contractOnChain.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
