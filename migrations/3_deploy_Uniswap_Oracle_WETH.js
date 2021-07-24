const ConvertLib = artifacts.require("ConvertLib");
const { expectEvent, send, shouldFail, time, constants, balance} = require('@openzeppelin/test-helpers');
const BigNumber = require('bignumber.js');
const MetaCoin = artifacts.require("MetaCoin");
const ERC20 = artifacts.require("ERC20");
const CEREStable = artifacts.require("Ceres/CEREStable");
const CEREShares = artifacts.require("CSS/CEREShares");
const Boardroom = artifacts.require('Boardroom');
const Pool_USDC = artifacts.require("Ceres/Pools/Pool_USDC");
const ChainlinkETHUSDPriceConsumerTest = artifacts.require("Oracle/ChainlinkETHUSDPriceConsumerTest");
const CeresDemo = artifacts.require("Ceres/CeresDemo");
const Treasury = artifacts.require('Treasury');
const CERESWETHPool = artifacts.require('Ceres/Pools/CERESWETHPool');
const CSSWETHPool = artifacts.require('Ceres/Pools/CSSWETHPool');
const SimpleFund = artifacts.require('SimpleERCFund');

const UniswapV2Factory = artifacts.require("Uniswap/UniswapV2Factory");
const UniswapV2Router02_Modified = artifacts.require("Uniswap/UniswapV2Router02_Modified");
const UniswapV2Pair = artifacts.require("Uniswap/UniswapV2Pair");
const UniswapPairOracle_CERES_WETH = artifacts.require("Oracle/Variants/UniswapPairOracle_CERES_WETH");
const UniswapPairOracle_CSS_WETH = artifacts.require("Oracle/Variants/UniswapPairOracle_CSS_WETH");
const UniswapPairOracle_USDC_WETH = artifacts.require("Oracle/Variants/UniswapPairOracle_USDC_WETH");
const SwapToPrice = artifacts.require("Uniswap/SwapToPrice");
const WETH = artifacts.require("ERC20/WETH");
const FakeCollateral_USDC = artifacts.require("FakeCollateral/FakeCollateral_USDC");
const StakingRewards_CERES_WETH = artifacts.require("Staking/Variants/Stake_CERES_WETH.sol");
const StringHelpers = artifacts.require("Utils/StringHelpers");


const DUMP_ADDRESS = constants.ZERO_ADDRESS;

const chalk = require('chalk');

// set constants
const SIX_HUNDRED_DEC18 = new BigNumber("600e18");
const EIGHT_HUNDRED_DEC18 = new BigNumber("800e18");
const ONE_DEC18 = new BigNumber("1e18");
const TWO_MILLION_DEC18 = new BigNumber("2000000e18");
const TWO_THOUSAND_DEC18 = new BigNumber("2000e18");
const COLLATERAL_SEED_DEC18 = new BigNumber("500000e18");

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
	const account4 = accounts[4];
	const account5 = accounts[5];
	const account6 = accounts[6];
	const account7 = accounts[7];
	const TEST_ACCOUNT = account7;
	const STAKING_OWNER = account0;
	const STAKING_REWARDS_DISTRIBUTOR = TEST_ACCOUNT;
	const timelockInstance = OWNER;


	let wethInstance;
	let uniswapFactoryInstance;
	let routerInstance;
	let swapToPriceInstance;
	const ceresInstance = await CEREStable.deployed();
	const cssInstance = await CEREShares.deployed();
	const col_instance_USDC = await FakeCollateral_USDC.deployed(); 

	const FIVE_MILLION_DEC18 = new BigNumber("5000000e18");


	await deployer.deploy(WETH, OWNER);
	wethInstance = await WETH.deployed();
	console.log(chalk.red.bold(`wethInstance: ${await wethInstance.address}`));

	await deployer.deploy(UniswapV2Factory, DUMP_ADDRESS);
	uniswapFactoryInstance = await UniswapV2Factory.deployed(); 
	console.log(chalk.red.bold(`uniswapFactoryInstance: ${await uniswapFactoryInstance.address}`));

	await deployer.deploy(UniswapV2Router02_Modified, UniswapV2Factory.address, wethInstance.address);
	routerInstance = await UniswapV2Router02_Modified.deployed(); 
	console.log(chalk.red.bold(`routerInstance: ${await routerInstance.address}`));
	
	await deployer.deploy(SwapToPrice, uniswapFactoryInstance.address, routerInstance.address);
	swapToPriceInstance = await SwapToPrice.deployed();

	const pool_instance_USDC = await Pool_USDC.deployed();

	await uniswapFactoryInstance.createPair(ceresInstance.address, wethInstance.address, { from: OWNER });
	await uniswapFactoryInstance.createPair(cssInstance.address, wethInstance.address, { from: OWNER });
	await uniswapFactoryInstance.createPair(col_instance_USDC.address, wethInstance.address, { from: OWNER })
	const pair_addr_CERES_WETH = await uniswapFactoryInstance.getPair(ceresInstance.address, wethInstance.address, { from: OWNER });
	const pair_addr_CSS_WETH = await uniswapFactoryInstance.getPair(cssInstance.address, wethInstance.address, { from: OWNER });
	const pair_instance_CERES_WETH = await UniswapV2Pair.at(pair_addr_CERES_WETH);
	const pair_instance_CSS_WETH = await UniswapV2Pair.at(pair_addr_CSS_WETH);

	await Promise.all([
		wethInstance.approve(routerInstance.address, new BigNumber(TWO_MILLION_DEC18), { from: OWNER }),
		ceresInstance.approve(routerInstance.address, new BigNumber(TWO_MILLION_DEC18), { from: OWNER }),
		cssInstance.approve(routerInstance.address, new BigNumber(TWO_MILLION_DEC18), { from: OWNER }),	
		col_instance_USDC.approve(routerInstance.address, new BigNumber(TWO_MILLION_DEC18), { from: OWNER }),
	]);	

	await Promise.all([
		wethInstance.approve(swapToPriceInstance.address, new BigNumber(TWO_MILLION_DEC18), { from: OWNER }),
		ceresInstance.approve(swapToPriceInstance.address, new BigNumber(TWO_MILLION_DEC18), { from: OWNER }),
		cssInstance.approve(swapToPriceInstance.address, new BigNumber(TWO_MILLION_DEC18), { from: OWNER }),	
		col_instance_USDC.approve(swapToPriceInstance.address, new BigNumber(TWO_MILLION_DEC18), { from: OWNER }),	
	]);	

	// approve for mint() & redeem() func
	await Promise.all([
		col_instance_USDC.approve(pool_instance_USDC.address, new BigNumber(TWO_MILLION_DEC18), { from: OWNER }),	
		cssInstance.approve(pool_instance_USDC.address, new BigNumber(TWO_MILLION_DEC18), { from: OWNER }),
		ceresInstance.approve(pool_instance_USDC.address, new BigNumber(TWO_MILLION_DEC18), { from: OWNER }),
	]);

	await routerInstance.addLiquidity(
		ceresInstance.address, 
		wethInstance.address,
		new BigNumber(SIX_HUNDRED_DEC18), 
		new BigNumber(ONE_DEC18), 
		new BigNumber(SIX_HUNDRED_DEC18), 
		new BigNumber(ONE_DEC18), 
		OWNER, 
		new BigNumber(2105300114), 
		{ from: OWNER }
	);

	await routerInstance.addLiquidity(
		cssInstance.address, 
		wethInstance.address,
		new BigNumber(EIGHT_HUNDRED_DEC18), 
		new BigNumber(ONE_DEC18), 
		new BigNumber(EIGHT_HUNDRED_DEC18), 
		new BigNumber(ONE_DEC18), 
		OWNER, 
		new BigNumber(2105300114), 
		{ from: OWNER }
	);

	await routerInstance.addLiquidity(
		col_instance_USDC.address, 
		wethInstance.address,
		new BigNumber(TWO_THOUSAND_DEC18), 
		new BigNumber(ONE_DEC18), 
		new BigNumber(TWO_THOUSAND_DEC18), 
		new BigNumber(ONE_DEC18), 
		OWNER, 
		new BigNumber(2105300114), 
		{ from: OWNER }
	);

	

	await deployer.deploy(UniswapPairOracle_CERES_WETH, uniswapFactoryInstance.address, ceresInstance.address, wethInstance.address, OWNER, OWNER);
	await deployer.deploy(UniswapPairOracle_CSS_WETH, uniswapFactoryInstance.address, cssInstance.address, wethInstance.address, OWNER, OWNER);
	await deployer.deploy(UniswapPairOracle_USDC_WETH, uniswapFactoryInstance.address, col_instance_USDC.address, wethInstance.address, OWNER, OWNER);

	await time.increase(86400 + 1);
	await time.advanceBlock();

	const oracle_instance_CERES_WETH = await UniswapPairOracle_CERES_WETH.deployed();
	const oracle_instance_CSS_WETH = await UniswapPairOracle_CSS_WETH.deployed();
	const oracle_instance_USDC_WETH = await UniswapPairOracle_USDC_WETH.deployed();
	await oracle_instance_CERES_WETH.update({from: OWNER});
	await oracle_instance_CSS_WETH.update({from: OWNER});
	await oracle_instance_USDC_WETH.update({from: OWNER});
	

	ceresInstance.setCeresEthOracle(oracle_instance_CERES_WETH.address, wethInstance.address, { from: OWNER });
	ceresInstance.setCSSEthOracle(oracle_instance_CSS_WETH.address, wethInstance.address, { from: OWNER });
	pool_instance_USDC.setCollatETHOracle(oracle_instance_USDC_WETH.address, wethInstance.address, { from: OWNER });

	await col_instance_USDC.transfer(pool_instance_USDC.address, COLLATERAL_SEED_DEC18, { from:  OWNER});
	// Link the FAKE collateral pool to the CERES contract
	if (!await ceresInstance.ceres_pools.call(pool_instance_USDC.address)) {
		await ceresInstance.addPool(pool_instance_USDC.address, { from: OWNER });
	}
	await cssInstance.setCERESAddress(ceresInstance.address, { from: OWNER });

	// DEPLOY STAKING_CERES_WETH
	await deployer.link(CEREStable, [StakingRewards_CERES_WETH]);
	await deployer.deploy(StringHelpers);
	await deployer.link(StringHelpers, [StakingRewards_CERES_WETH]);
	await Promise.all([
		deployer.deploy(StakingRewards_CERES_WETH, STAKING_OWNER, STAKING_REWARDS_DISTRIBUTOR, cssInstance.address, pair_instance_CERES_WETH.address, ceresInstance.address, timelockInstance, 500000,{from: OWNER}),	// 500K = 50% * 1E6 = 50%
	]);

	const instanceStakingRewards_CERES_WETH = await StakingRewards_CERES_WETH.deployed();
	console.log(chalk.red.bold(`instanceStakingRewards_CERES_WETH: ${instanceStakingRewards_CERES_WETH.address}`));

	await pair_instance_CERES_WETH.approve(instanceStakingRewards_CERES_WETH.address, TWO_MILLION_DEC18, { from: OWNER });
	await cssInstance.transfer(instanceStakingRewards_CERES_WETH.address,FIVE_MILLION_DEC18,{from: OWNER});

	await deployer.deploy(CeresDemo,routerInstance.address,{from: OWNER}); //deploy PigToken
	const ceresDemoInstance = await CeresDemo.deployed();
	console.log(chalk.red.bold(`ceresDemoInstance.address: ${await ceresDemoInstance.address}`));

	await deployer.deploy(Boardroom, ceresInstance.address, pair_instance_CERES_WETH.address);
	const boardroomInstance = await Boardroom.deployed();
	console.log(chalk.red.bold(`boardroomInstance.address: ${await boardroomInstance.address}`));
	// c-weth lp approve
	await pair_instance_CERES_WETH.approve(boardroomInstance.address,TWO_MILLION_DEC18,{from: OWNER});
	await pair_instance_CERES_WETH.approve(boardroomInstance.address,TWO_MILLION_DEC18,{from: TEST_ACCOUNT});
	// ceres.transfer & approve
	await ceresInstance.transfer(boardroomInstance.address,EIGHT_HUNDRED_DEC18,{from: OWNER});
	await ceresInstance.approve(boardroomInstance.address,TWO_MILLION_DEC18,{from: OWNER});
	await ceresInstance.approve(boardroomInstance.address,TWO_MILLION_DEC18,{from: TEST_ACCOUNT});

	// DEPLOY SimpleERCFund
	await deployer.deploy(SimpleFund,{from: OWNER});
	const simplefundInstance = await SimpleFund.deployed();
	console.log(chalk.red.bold(`simplefundInstance: ${simplefundInstance.address}`));
	
	// SET STARTTIME
	const startTime = Date.parse('2021-03-22T04:00:00Z') / 1000;
	console.log(chalk.red.bold(`startTime: ${startTime}`));

	// DEPLOY TREASURY
	await deployer.deploy(
	  Treasury,
	  ceresInstance.address,
	  ceresInstance.address,
	  cssInstance.address,
	  oracle_instance_CERES_WETH.address,
	  oracle_instance_CERES_WETH.address,
	  boardroomInstance.address,
	  boardroomInstance.address,
	  // c_lp_Boardroom.address,
	  // s_lp_Boardroom.address,
	  simplefundInstance.address,
	  startTime,
	);
	const treasuryInstance = await Treasury.deployed();
	console.log(chalk.red.bold(`treasuryInstance: ${treasuryInstance.address}`));

	await ceresInstance.approve(treasuryInstance.address,TWO_MILLION_DEC18,{from: OWNER});
	// deploy ceres_wethPool
	await deployer.deploy(CERESWETHPool,ceresInstance.address,wethInstance.address,startTime,{from: OWNER});
	const ceresWethPoolInstance = await CERESWETHPool.deployed();
	console.log(chalk.red.bold(`ceresWethPoolInstance: ${ceresWethPoolInstance.address}`));

	await wethInstance.approve(ceresWethPoolInstance.address,TWO_MILLION_DEC18,{from: OWNER});
	await ceresInstance.approve(ceresWethPoolInstance.address,TWO_MILLION_DEC18,{from: OWNER});
	ceresInstance.transfer(ceresWethPoolInstance.address,EIGHT_HUNDRED_DEC18,{from: OWNER});

	// deploy css_wethLPPool
	await deployer.deploy(CSSWETHPool, cssInstance.address, pair_instance_CERES_WETH.address, simplefundInstance.address,startTime,{from: OWNER});
	const cssWETHPoolInstance = await CSSWETHPool.deployed();
	console.log(chalk.red.bold(`cssWETHPoolInstance: ${cssWETHPoolInstance.address}`));

	await pair_instance_CERES_WETH.approve(cssWETHPoolInstance.address,TWO_MILLION_DEC18,{from: OWNER});
	await cssInstance.approve(cssWETHPoolInstance.address,TWO_MILLION_DEC18,{from: OWNER});
	cssInstance.transfer(cssWETHPoolInstance.address,EIGHT_HUNDRED_DEC18,{from: OWNER});
};
