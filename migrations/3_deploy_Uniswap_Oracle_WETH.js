const ConvertLib = artifacts.require("ConvertLib");
const { expectEvent, send, shouldFail, time, constants, balance} = require('@openzeppelin/test-helpers');
const BigNumber = require('bignumber.js');
const MetaCoin = artifacts.require("MetaCoin");
const ERC20 = artifacts.require("ERC20");
const CEREStable = artifacts.require("Ceres/CEREStable");
const CEREShares = artifacts.require("CSS/CEREShares");
const Pool_USDC = artifacts.require("Ceres/Pools/Pool_USDC");
const ChainlinkETHUSDPriceConsumerTest = artifacts.require("Oracle/ChainlinkETHUSDPriceConsumerTest");

const UniswapV2Factory = artifacts.require("Uniswap/UniswapV2Factory");
const UniswapV2Router02_Modified = artifacts.require("Uniswap/UniswapV2Router02_Modified");
const SwapToPrice = artifacts.require("Uniswap/SwapToPrice");
const WETH = artifacts.require("ERC20/WETH");


const DUMP_ADDRESS = constants.ZERO_ADDRESS;

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

	let wethInstance;
	let uniswapFactoryInstance;
	let routerInstance;
	let swapToPriceInstance;

	const FIVE_MILLION_DEC18 = new BigNumber("5000000e18");

	
	await deployer.deploy(WETH, OWNER);
	wethInstance = await WETH.deployed();
	console.log(chalk.red.bold(`wethInstance: ${await wethInstance.address}`));

	await deployer.deploy(UniswapV2Factory, DUMP_ADDRESS);
	uniswapFactoryInstance = await UniswapV2Factory.deployed(); 

	await deployer.deploy(UniswapV2Router02_Modified, UniswapV2Factory.address, wethInstance.address);
	routerInstance = await UniswapV2Router02_Modified.deployed(); 
	
	await deployer.deploy(SwapToPrice, uniswapFactoryInstance.address, routerInstance.address);
	swapToPriceInstance = await SwapToPrice.deployed();

};
