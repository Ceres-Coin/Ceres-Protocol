const BigNumber = require('bignumber.js');
const BN = BigNumber.clone({ DECIMAL_PLACES: 9 })
const chalk = require('chalk');
const { assert, expect,chai} = require('chai');
const { expectEvent, send, shouldFail, time, constants, balance} = require('@openzeppelin/test-helpers');

const CEREStable = artifacts.require("Ceres/CEREStable");
const CEREShares = artifacts.require("CSS/CEREShares");
const Pool_USDC = artifacts.require("Ceres/Pools/Pool_USDC");
const UniswapPairOracle_USDC_WETH = artifacts.require("Oracle/Variants/UniswapPairOracle_USDC_WETH");
const WETH = artifacts.require("ERC20/WETH");
const FakeCollateral_USDC = artifacts.require("FakeCollateral/FakeCollateral_USDC");
const StakingRewards_CERES_WETH = artifacts.require("Staking/Variants/Stake_CERES_WETH.sol");
const UniswapV2Factory = artifacts.require("Uniswap/UniswapV2Factory");
const UniswapV2Pair = artifacts.require("Uniswap/UniswapV2Pair");
const Boardroom = artifacts.require('Boardroom');
const UniswapV2Router02_Modified = artifacts.require("Uniswap/UniswapV2Router02_Modified");
const UniswapPairOracle_CERES_WETH = artifacts.require("Oracle/Variants/UniswapPairOracle_CERES_WETH");
const CSSWETHLPPool = artifacts.require('Ceres/Pools/CSSWETHLPPool');
const ERC20 = artifacts.require("ERC20");
const BOND = artifacts.require("Bond");
const CeresDemo = artifacts.require("Ceres/CeresDemo");
const ONE_DEC18 = new BigNumber("1e18");
const ONE_HUNDRED_DEC18 = new BigNumber("100e18");
const EIGHT_HUNDRED_DEC18 = new BigNumber("800e18");
const ONE_MILLION_DEC18 = new BigNumber("1000000e18");
const TWO_MILLION_DEC18 = new BigNumber("2000000e18");
const ONE_HUNDRED_MILLION_DEC18 = new BigNumber("100000000e18");
const FIVE_MILLION_DEC18 = new BigNumber("5000000e18");
const POINT_ONE_DEC18 = new BigNumber("0.1e18"); //0.1_dec18
const POINT_THREE_DEC18 = new BigNumber("0.3e18"); //0.3_dec18
const BIG6 = new BigNumber("1e6");
const BIG18 = new BigNumber("1e18");
const Treasury = artifacts.require('Treasury');
const CERESWETHPool = artifacts.require('Ceres/Pools/CERESWETHPool');
const SimpleFund = artifacts.require('SimpleERCFund');

contract('contracts/Ceres/Pools/CSSWETHLPPool.sol P2', async (accounts) => {
    // set the deploy address
	const account0 = accounts[0];
	const account1 = accounts[1];
	const account2 = accounts[2];
	const account3 = accounts[3];
    const account4 = accounts[4];
    const account5 = accounts[5];
    const account6 = accounts[6];
    const account7 = accounts[7];

    const OWNER = account0;
	const ADMIN = account1;
    const TEST_ACCOUNT = account7;

    let cssInstance;
    let ceresInstance;
    let bondInstance;
    let instance_Pool_USDC;
    let instance_Pool_USDC_collateral_token;
    let col_instance_USDC;
    let instanceStakingRewards_CERES_WETH;
    let pair_addr_CERES_WETH;
    let pair_instance_CERES_WETH;
    let wethInstance;
    let uniswapFactoryInstance;
    let ceresDemoInstance;
    let routerInstance;
    let boardroomInstance;
    let treasuryInstance;
    let simpleFundInstance;
    let oracle_instance_CERES_WETH;
    let ceresWethPoolInstance;
    let cssWETHLPPoolInstance;
    beforeEach(async() => {
        cssInstance = await CEREShares.deployed();
        ceresInstance = await CEREStable.deployed();
        instance_Pool_USDC = await Pool_USDC.deployed();
        wethInstance = await WETH.deployed();
        bondInstance = await BOND.deployed();

        uniswapFactoryInstance = await UniswapV2Factory.deployed(); 
        routerInstance = await UniswapV2Router02_Modified.deployed(); 
        instance_Pool_USDC_collateral_token = await ERC20.at(await instance_Pool_USDC.collateral_token());
        instance_Pool_USDC_CERES = await CEREStable.at(await instance_Pool_USDC.CERES());
        instance_Pool_USDC_CSS = await CEREShares.at(await instance_Pool_USDC.CSS());
        col_instance_USDC = await FakeCollateral_USDC.deployed(); 
        instanceStakingRewards_CERES_WETH = await StakingRewards_CERES_WETH.deployed();
        pair_addr_CERES_WETH = await uniswapFactoryInstance.getPair(ceresInstance.address, wethInstance.address, { from: OWNER });
        pair_instance_CERES_WETH = await UniswapV2Pair.at(pair_addr_CERES_WETH);
        ceresDemoInstance = await CeresDemo.deployed();
        boardroomInstance = await Boardroom.deployed();
        oracle_instance_CERES_WETH = await UniswapPairOracle_CERES_WETH.deployed();

        simpleFundInstance = await SimpleFund.deployed();
        treasuryInstance = await Treasury.deployed();
        ceresWethPoolInstance = await CERESWETHPool.deployed();
        cssWETHLPPoolInstance = await CSSWETHLPPool.deployed();
    });

    it('check cssWETHLPPoolInstance.address, its value is not be empty', async () => {
        console.log(chalk.blue(`cssWETHLPPoolInstance: ${await cssWETHLPPoolInstance.address}`));
        expect(cssWETHLPPoolInstance.address).to.not.be.empty;
    });

    // it('check cssWETHLPPoolInstance.WITHDRAW(TEST_ACCOUNT) FUNC', async () => {
    //     await pair_instance_CERES_WETH.transfer(TEST_ACCOUNT,POINT_THREE_DEC18,{from: OWNER});
        
    //     console.log(chalk.yellow(`pair_instance_CERES_WETH.balanceOf.call(TEST_ACCOUNT) in BIG18: ${new BigNumber(await pair_instance_CERES_WETH.balanceOf.call(TEST_ACCOUNT)).div(BIG18)}`));
    //     await cssWETHLPPoolInstance.stake(POINT_ONE_DEC18,{from: TEST_ACCOUNT});
    //     console.log(chalk.blue(`pair_instance_CERES_WETH.balanceOf.call(TEST_ACCOUNT) IN BIG18: ${new BigNumber(await pair_instance_CERES_WETH.balanceOf.call(TEST_ACCOUNT)).div(BIG18)}`));

    //     console.log(chalk.blue(`AFTER getCurrentEpochTimestamp: ${await cssWETHLPPoolInstance.getCurrentEpochTimestamp.call()}`));
    //     console.log(chalk.blue(`AFTER canWithdraw: ${await cssWETHLPPoolInstance.canWithdraw.call(account0)}`));
    //     console.log(chalk.blue(`AFTER canWithdraw: ${await cssWETHLPPoolInstance.canWithdraw.call(account1)}`));
    //     console.log(chalk.blue(`AFTER canWithdraw: ${await cssWETHLPPoolInstance.canWithdraw.call(account2)}`));
    //     console.log(chalk.blue(`AFTER canWithdraw: ${await cssWETHLPPoolInstance.canWithdraw.call(account3)}`));
    //     console.log(chalk.blue(`AFTER canWithdraw: ${await cssWETHLPPoolInstance.canWithdraw.call(account4)}`));
    //     console.log(chalk.blue(`AFTER canWithdraw: ${await cssWETHLPPoolInstance.canWithdraw.call(account5)}`));
    //     console.log(chalk.blue(`AFTER canWithdraw: ${await cssWETHLPPoolInstance.canWithdraw.call(account6)}`));
    //     console.log(chalk.blue(`AFTER canWithdraw: ${await cssWETHLPPoolInstance.canWithdraw.call(account7)}`));

    //     await time.increase(86400);
    //     console.log(chalk.red(`=============================== SEPERATOR =============================`));
    //     console.log(chalk.blue(`AFTER canWithdraw: ${await cssWETHLPPoolInstance.canWithdraw.call(account0)}`));
    //     console.log(chalk.blue(`AFTER canWithdraw: ${await cssWETHLPPoolInstance.canWithdraw.call(account1)}`));
    //     console.log(chalk.blue(`AFTER canWithdraw: ${await cssWETHLPPoolInstance.canWithdraw.call(account2)}`));
    //     console.log(chalk.blue(`AFTER canWithdraw: ${await cssWETHLPPoolInstance.canWithdraw.call(account3)}`));
    //     console.log(chalk.blue(`AFTER canWithdraw: ${await cssWETHLPPoolInstance.canWithdraw.call(account4)}`));
    //     console.log(chalk.blue(`AFTER canWithdraw: ${await cssWETHLPPoolInstance.canWithdraw.call(account5)}`));
    //     console.log(chalk.blue(`AFTER canWithdraw: ${await cssWETHLPPoolInstance.canWithdraw.call(account6)}`));
    //     console.log(chalk.blue(`AFTER canWithdraw: ${await cssWETHLPPoolInstance.canWithdraw.call(account7)}`));

    //     await cssWETHLPPoolInstance.withdraw(POINT_ONE_DEC18,{from: TEST_ACCOUNT});
    // });

    // it('check cssWETHLPPoolInstance.getReward({from: TEST_ACCOUNT) FUNC', async () => {
    //     // PREPARE ACTION
    //     await pair_instance_CERES_WETH.transfer(TEST_ACCOUNT,POINT_THREE_DEC18,{from: OWNER});
    //     await cssWETHLPPoolInstance.stake(POINT_ONE_DEC18,{from: TEST_ACCOUNT});

    //     // PREPARE ASSERTION
    //     console.log(chalk.blue(`AFTER canWithdraw: ${await cssWETHLPPoolInstance.canWithdraw.call(TEST_ACCOUNT)}`));
    //     await time.increase(86400);
    //     console.log(chalk.red(`=============================== SEPERATOR =============================`));
    //     console.log(chalk.blue(`AFTER canWithdraw: ${await cssWETHLPPoolInstance.canWithdraw.call(TEST_ACCOUNT)}`));
    //     console.log(chalk.blue(`AFTER earned: ${new BigNumber(await cssWETHLPPoolInstance.earned.call(TEST_ACCOUNT)).div(BIG18)}`));

    //     // await cssWETHLPPoolInstance.getReward({from: TEST_ACCOUNT});
    //     console.log(chalk.blue(`rewardRate: ${await cssWETHLPPoolInstance.rewardRate.call()}`));
    //     console.log(chalk.blue(`rewardPerToken: ${await cssWETHLPPoolInstance.rewardPerToken.call()}`));

    //     await cssWETHLPPoolInstance.setRewardRate(10);
    //     console.log(chalk.red(`=============================== SEPERATOR =============================`));
    //     console.log(chalk.blue(`rewardRate: ${await cssWETHLPPoolInstance.rewardRate.call()}`));
    //     console.log(chalk.blue(`rewardPerToken: ${await cssWETHLPPoolInstance.rewardPerToken.call()}`));
    //     console.log(chalk.blue(`totalSupply: ${await cssWETHLPPoolInstance.totalSupply.call()}`));
    //     console.log(chalk.blue(`lastTimeRewardApplicable: ${await cssWETHLPPoolInstance.lastTimeRewardApplicable.call()}`));
    //     console.log(chalk.blue(`lastUpdateTime: ${await cssWETHLPPoolInstance.lastUpdateTime.call()}`));

    // });

    it('check cssWETHLPPoolInstance.getReward({from: TEST_ACCOUNT) FUNC', async () => {
        console.log(chalk.blue(`rewardRate: ${await cssWETHLPPoolInstance.rewardRate.call()}`));
        console.log(chalk.blue(`rewardPerTokenStored: ${await cssWETHLPPoolInstance.rewardPerTokenStored.call()}`));
        console.log(chalk.blue(`rewardPerToken: ${await cssWETHLPPoolInstance.rewardPerToken.call()}`));
        console.log(chalk.blue(`totalSupply: ${await cssWETHLPPoolInstance.totalSupply.call()}`));
        console.log(chalk.blue(`lastTimeRewardApplicable: ${await cssWETHLPPoolInstance.lastTimeRewardApplicable.call()}`));
        console.log(chalk.blue(`lastUpdateTime: ${await cssWETHLPPoolInstance.lastUpdateTime.call()}`));

        // PREPARE ACTION
        await pair_instance_CERES_WETH.transfer(TEST_ACCOUNT,POINT_THREE_DEC18,{from: OWNER});
        await cssWETHLPPoolInstance.stake(POINT_ONE_DEC18,{from: TEST_ACCOUNT});

        console.log(chalk.red(`=============================== SEPERATOR =============================`));
        console.log(chalk.blue(`rewardRate: ${await cssWETHLPPoolInstance.rewardRate.call()}`));
        console.log(chalk.blue(`rewardPerTokenStored: ${await cssWETHLPPoolInstance.rewardPerTokenStored.call()}`));
        console.log(chalk.blue(`rewardPerToken: ${await cssWETHLPPoolInstance.rewardPerToken.call()}`));
        console.log(chalk.blue(`totalSupply: ${await cssWETHLPPoolInstance.totalSupply.call()}`));
        console.log(chalk.blue(`lastTimeRewardApplicable: ${await cssWETHLPPoolInstance.lastTimeRewardApplicable.call()}`));
        console.log(chalk.blue(`getBlockTimestamp: ${await cssWETHLPPoolInstance.getBlockTimestamp.call()}`));
        console.log(chalk.blue(`getPeriodFinish: ${await cssWETHLPPoolInstance.getPeriodFinish.call()}`));
        console.log(chalk.blue(`lastUpdateTime: ${await cssWETHLPPoolInstance.lastUpdateTime.call()}`));

        await time.increase(86400); //1 days

        console.log(chalk.red(`=============================== SEPERATOR =============================`));
        console.log(chalk.blue(`rewardRate: ${await cssWETHLPPoolInstance.rewardRate.call()}`));
        console.log(chalk.blue(`rewardPerTokenStored: ${await cssWETHLPPoolInstance.rewardPerTokenStored.call()}`));
        console.log(chalk.blue(`rewardPerToken: ${await cssWETHLPPoolInstance.rewardPerToken.call()}`));
        console.log(chalk.blue(`totalSupply: ${await cssWETHLPPoolInstance.totalSupply.call()}`));
        console.log(chalk.blue(`lastTimeRewardApplicable: ${await cssWETHLPPoolInstance.lastTimeRewardApplicable.call()}`));
        console.log(chalk.blue(`getBlockTimestamp: ${await cssWETHLPPoolInstance.getBlockTimestamp.call()}`));
        console.log(chalk.blue(`getPeriodFinish: ${await cssWETHLPPoolInstance.getPeriodFinish.call()}`));
        console.log(chalk.blue(`lastUpdateTime: ${await cssWETHLPPoolInstance.lastUpdateTime.call()}`));

        console.log(chalk.blue(`earned: ${await cssWETHLPPoolInstance.earned.call(TEST_ACCOUNT)}`));


        await cssWETHLPPoolInstance.getReward({from: TEST_ACCOUNT});
    });







});
