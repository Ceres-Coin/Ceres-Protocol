const ConvertLib = artifacts.require("ConvertLib");
const MetaCoin = artifacts.require("MetaCoin");
const ERC20 = artifacts.require("ERC20");
const CEREStable = artifacts.require("Ceres/CEREStable");
const CEREShares = artifacts.require("CSS/CEREShares");

const chalk = require('chalk');

module.exports = async function(deployer,network,accounts) {
  // Set the Network Settings
	const IS_MAINNET = (network == 'mainnet');
	const IS_ROPSTEN = (network == 'ropsten');
	const IS_DEV = (network == 'development');
	const IS_GANACHE = (network == 'devganache');
  	const IS_BSC_TESTNET = (network == 'testnet');
	const IS_RINKEBY = (network == 'rinkeby');

	// set the deploy address
	const OWNER = accounts[0];
	const ADMIN = accounts[1];
	const account0 = accounts[0];
	const account1 = accounts[1];
	const account2 = accounts[2];
	const account3 = accounts[3];

	deployer.deploy(ConvertLib);
	deployer.link(ConvertLib, MetaCoin);
	deployer.deploy(MetaCoin);

	await deployer.deploy(ERC20,"sample","sample");

	const sampleERC20 = await ERC20.deployed();
	//   console.log(`sampleERC20: ${sampleERC20.address}`);


	await deployer.deploy(CEREStable, "CERES", "CERES", OWNER, OWNER,{from: OWNER});
	const ceresInstance = await CEREStable.deployed();
	console.log(chalk.red.bold(`ceresInstance: ${await ceresInstance.address}`));

	await deployer.deploy(CEREShares, "CERES Share", "CSS", OWNER, OWNER,OWNER,{from: OWNER});
	const cssInstance = await CEREShares.deployed();
	console.log(chalk.red.bold(`cssInstance: ${await cssInstance.address}`));


};
