const ConvertLib = artifacts.require("ConvertLib");
const BigNumber = require('bignumber.js');
const MetaCoin = artifacts.require("MetaCoin");
const ERC20 = artifacts.require("ERC20");
const CEREStable = artifacts.require("Ceres/CEREStable");
const CEREShares = artifacts.require("CSS/CEREShares");
const CeresPoolLibrary = artifacts.require("Ceres/Pools/CERESPoolLibrary");
const Pool_USDC = artifacts.require("Ceres/Pools/Pool_USDC");
const ChainlinkETHUSDPriceConsumerTest = artifacts.require("Oracle/ChainlinkETHUSDPriceConsumerTest");
const FakeCollateral_USDC = artifacts.require("FakeCollateral/FakeCollateral_USDC");

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

	const FIVE_MILLION_DEC18 = new BigNumber("5000000e18");
	const ONE_HUNDRED_MILLION_DEC18 = new BigNumber("100000000e18");

	deployer.deploy(ConvertLib);
	deployer.link(ConvertLib, MetaCoin);
	deployer.deploy(MetaCoin);

	await deployer.deploy(ERC20,"sample","sample");
	const sampleERC20 = await ERC20.deployed();
	console.log(chalk.red.bold(`sampleERC20: ${await sampleERC20.address}`));
	
	await deployer.deploy(CEREStable, "CERES", "CERES", OWNER, OWNER,{from: OWNER});
	const ceresInstance = await CEREStable.deployed();
	console.log(chalk.red.bold(`ceresInstance: ${await ceresInstance.address}`));

	await deployer.deploy(CEREShares, "CERES Share", "CSS", OWNER, OWNER,OWNER,{from: OWNER});
	const cssInstance = await CEREShares.deployed();
	console.log(chalk.red.bold(`cssInstance: ${await cssInstance.address}`));

	await deployer.deploy(CeresPoolLibrary);
    await deployer.link(CeresPoolLibrary, [Pool_USDC]);

	await deployer.deploy(Pool_USDC, ceresInstance.address, cssInstance.address, sampleERC20.address, OWNER, OWNER, FIVE_MILLION_DEC18);
	const pool_instance_USDC = await Pool_USDC.deployed();
	console.log(chalk.red.bold(`pool_instance_USDC: ${await pool_instance_USDC.address}`));

	await deployer.deploy(ChainlinkETHUSDPriceConsumerTest);
	const oracle_chainlink_ETH_USD = await ChainlinkETHUSDPriceConsumerTest.deployed();
	console.log(chalk.red.bold(`oracle_chainlink_ETH_USD: ${oracle_chainlink_ETH_USD.address}`));
	await ceresInstance.setETHUSDOracle(oracle_chainlink_ETH_USD.address, { from: OWNER });

	await deployer.deploy(FakeCollateral_USDC, OWNER, ONE_HUNDRED_MILLION_DEC18, "USDC", 18);
	const col_instance_USDC = await FakeCollateral_USDC.deployed(); 
	console.log(chalk.red.bold(`col_instance_USDC: ${col_instance_USDC.address}`));
};
