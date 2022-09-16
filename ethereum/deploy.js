const {ethers} = require("hardhat"); //import the hardhat

async function main() {
  const [deployer] = await ethers.getSigners(); //get the account to deploy the contract

  console.log("Deploying contracts with the account: ", deployer.address); 

  const ContactFactory = await ethers.getContractFactory("ContactFactory"); // Getting the Contract
  const contactFactory = await ContactFactory.deploy(); //deploying the contract

  await contactFactory.deployed(); // waiting for the contract to be deployed

  console.log("ContactFactory deployed to: ", contactFactory.address); // Returning the contract address on the rinkeby
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); // Calling the function to deploy the contract 