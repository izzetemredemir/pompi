const hre = require("hardhat");

async function main() {
  const contractAddress = "0x64CE898e7f6BF5262491FAfa59a2CEffd44485D6";
  if (!contractAddress) {
    console.error(
      "Please provide the deployed contract address as an argument."
    );
    process.exit(1);
  }

  const ERC20ForSplFactory = await hre.ethers.getContractFactory(
    "ERC20ForSplFactory"
  );
  const erc20ForSplFactory = ERC20ForSplFactory.attach(contractAddress);

  // Token bilgileri
  const name = "MyToken";
  const symbol = "MTK";
  const decimals = 18;
  const mintAuthority = "0x42096D2046B352ae8f16C6eD13E9cB34508Faf45";

  const tx = await erc20ForSplFactory.createErc20ForSplMintable(
    name,
    symbol,
    decimals,
    mintAuthority
  );
  const receipt = await tx.wait();
  console.log(receipt);
  //const newTokenAddress = receipt.events[0].args.pair;

  //console.log("New ERC20 for SPL Mintable Token created at:", newTokenAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
