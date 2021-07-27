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
const ONE_HUNDRED_MILLION_DEC18 = new BigNumber("100000000e18");
const FIVE_MILLION_DEC18 = new BigNumber("5000000e18");
const POINT_ONE_DEC18 = new BigNumber("0.1e18"); //0.1_dec18
const POINT_THREE_DEC18 = new BigNumber("0.3e18"); //0.3_dec18
const BIG6 = new BigNumber("1e6");
const BIG18 = new BigNumber("1e18");
const Treasury = artifacts.require('Treasury');
const CERESWETHPool = artifacts.require('Ceres/Pools/CERESWETHPool');
const SimpleFund = artifacts.require('SimpleERCFund');

contract('contracts/Ceres/Pools/CSSWETHLPPool.sol', async (accounts) => {
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

    it('check cssWETHLPPoolInstance.foundationA.call(), its DEFAULT value is simpleFundInstance.address', async () => {
        const EXPECTED_VALUE = simpleFundInstance.address 
        expect((await cssWETHLPPoolInstance.foundationA.call())).to.equal((EXPECTED_VALUE));
    });

    it('check cssWETHLPPoolInstance.cssAllocationPercentage.call(), its DEFAULT value is "10"', async () => {
        const EXPECTED_VALUE = new BigNumber("10") 
        expect(parseFloat(await cssWETHLPPoolInstance.cssAllocationPercentage.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHLPPoolInstance.DURATION.call(), its DEFAULT value is 30 * 86400', async () => {
        const EXPECTED_VALUE = new BigNumber(30 * 86400); // 30 DAYS
        expect(parseFloat(await cssWETHLPPoolInstance.DURATION.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHLPPoolInstance.initreward.call(), its DEFAULT value is 70000e18', async () => {
        const EXPECTED_VALUE = new BigNumber("70000e18");
        expect(parseFloat(await cssWETHLPPoolInstance.initreward.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHLPPoolInstance.startime.call(), its DEFAULT value is 1616385600', async () => {
        const EXPECTED_VALUE = new BigNumber("1616385600"); 
        expect(parseFloat(await cssWETHLPPoolInstance.startime.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHLPPoolInstance.periodFinish.call(), its DEFAULT value is "0"', async () => {
        const EXPECTED_VALUE = new BigNumber("0"); 
        expect(parseFloat(await cssWETHLPPoolInstance.periodFinish.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHLPPoolInstance.rewardRate.call(), its DEFAULT value is "0"', async () => {
        const EXPECTED_VALUE = new BigNumber("0"); 
        expect(parseFloat(await cssWETHLPPoolInstance.rewardRate.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHLPPoolInstance.lastUpdateTime.call(), its DEFAULT value is "0"', async () => {
        const EXPECTED_VALUE = new BigNumber("0"); 
        expect(parseFloat(await cssWETHLPPoolInstance.lastUpdateTime.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHLPPoolInstance.rewardPerTokenStored.call(), its DEFAULT value is "0"', async () => {
        const EXPECTED_VALUE = new BigNumber("0"); 
        expect(parseFloat(await cssWETHLPPoolInstance.rewardPerTokenStored.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHLPPoolInstance.userRewardPerTokenPaid.call(account0/1/2/3/4/5/6/7), its DEFAULT value is 0', async () => {
        const EXPECTED_VALUE = new BigNumber("0"); 
        expect(parseFloat(await cssWETHLPPoolInstance.userRewardPerTokenPaid.call(account0))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHLPPoolInstance.userRewardPerTokenPaid.call(account1))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHLPPoolInstance.userRewardPerTokenPaid.call(account2))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHLPPoolInstance.userRewardPerTokenPaid.call(account3))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHLPPoolInstance.userRewardPerTokenPaid.call(account4))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHLPPoolInstance.userRewardPerTokenPaid.call(account5))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHLPPoolInstance.userRewardPerTokenPaid.call(account6))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHLPPoolInstance.userRewardPerTokenPaid.call(account7))).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHLPPoolInstance.rewards.call(account0/1/2/3/4/5/6/7), its DEFAULT value is 0', async () => {
        const EXPECTED_VALUE = new BigNumber("0"); 
        expect(parseFloat(await cssWETHLPPoolInstance.rewards.call(account0))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHLPPoolInstance.rewards.call(account1))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHLPPoolInstance.rewards.call(account2))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHLPPoolInstance.rewards.call(account3))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHLPPoolInstance.rewards.call(account4))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHLPPoolInstance.rewards.call(account5))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHLPPoolInstance.rewards.call(account6))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHLPPoolInstance.rewards.call(account7))).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHLPPoolInstance.lpt.call(), its DEFAULT value is pair_instance_CERES_WETH.address', async () => {
        const EXPECTED_VALUE = pair_instance_CERES_WETH.address 
        expect((await cssWETHLPPoolInstance.lpt.call())).to.equal((EXPECTED_VALUE));
    });

    it('check cssWETHLPPoolInstance.lastTimeRewardApplicable.call(), its DEFAULT value is "0"', async () => {
        const EXPECTED_VALUE = new BigNumber("0"); 
        expect(parseFloat(await cssWETHLPPoolInstance.lastTimeRewardApplicable.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHLPPoolInstance.getBlockTimestamp.call(), its DEFAULT value is gt(0)', async () => {
        console.log(chalk.blue(`getBlockTimestamp: ${await cssWETHLPPoolInstance.getBlockTimestamp.call()}`));
        const EXPECTED_VALUE = new BigNumber("0"); 
        expect(parseFloat(await cssWETHLPPoolInstance.getBlockTimestamp.call())).to.gt(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHLPPoolInstance.getPeriodFinish.call(), its DEFAULT value is equal(0)', async () => {
        console.log(chalk.blue(`getPeriodFinish: ${await cssWETHLPPoolInstance.getPeriodFinish.call()}`));
        const EXPECTED_VALUE = new BigNumber("0"); 
        expect(parseFloat(await cssWETHLPPoolInstance.getPeriodFinish.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHLPPoolInstance.rewardPerToken.call(), its DEFAULT value is equal(0)', async () => {
        console.log(chalk.blue(`rewardPerToken: ${await cssWETHLPPoolInstance.rewardPerToken.call()}`));
        console.log(chalk.blue(`rewardPerTokenStored: ${await cssWETHLPPoolInstance.rewardPerTokenStored.call()}`));
        console.log(chalk.blue(`totalSupply: ${await cssWETHLPPoolInstance.totalSupply.call()}`));
        const EXPECTED_VALUE = new BigNumber("0"); 
        expect(parseFloat(await cssWETHLPPoolInstance.rewardPerToken.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHLPPoolInstance.earned.call(account0/1/2/3/4/5/6/7), its DEFAULT value is equal(0)', async () => {
        // console.log(chalk.blue(`earned: ${await cssWETHLPPoolInstance.earned.call(account0)}`));
        const EXPECTED_VALUE = new BigNumber("0"); 
        expect(parseFloat(await cssWETHLPPoolInstance.earned.call(account0))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHLPPoolInstance.earned.call(account1))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHLPPoolInstance.earned.call(account2))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHLPPoolInstance.earned.call(account3))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHLPPoolInstance.earned.call(account4))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHLPPoolInstance.earned.call(account5))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHLPPoolInstance.earned.call(account6))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHLPPoolInstance.earned.call(account7))).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHLPPoolInstance.setRewardRate(1,{from: OWNER})', async() => {
        const DEFAULT_VALUE = new BigNumber("0");
        const NEW_VALUE = new BigNumber("1");
        // BEFORE
        console.log(chalk.blue(`getBlockTimestamp: ${await cssWETHLPPoolInstance.getBlockTimestamp.call()}`));
        console.log(chalk.blue(`startime: ${await cssWETHLPPoolInstance.startime.call()}`));
        console.log(chalk.blue(`lastUpdateTime: ${await cssWETHLPPoolInstance.lastUpdateTime.call()}`));
        console.log(chalk.blue(`periodFinish: ${await cssWETHLPPoolInstance.periodFinish.call()}`));
        console.log(chalk.blue(`rewardRate: ${await cssWETHLPPoolInstance.rewardRate.call()}`));

        // ACTION & ASSERTION
        await cssWETHLPPoolInstance.setRewardRate(NEW_VALUE,{from: OWNER});
        console.log(chalk.blue(`getBlockTimestamp: ${await cssWETHLPPoolInstance.getBlockTimestamp.call()}`));
        console.log(chalk.blue(`startime: ${await cssWETHLPPoolInstance.startime.call()}`));
        console.log(chalk.blue(`lastUpdateTime: ${await cssWETHLPPoolInstance.lastUpdateTime.call()}`));
        console.log(chalk.blue(`periodFinish: ${await cssWETHLPPoolInstance.periodFinish.call()}`));
        console.log(chalk.blue(`rewardRate: ${await cssWETHLPPoolInstance.rewardRate.call()}`));

        // ROLLBACK CODE
    });

    it('check cssWETHPoolInstance.stake(ONE_DEC18,{from: OWNER})', async () => {        
        console.log(chalk.yellow(`getBlockTimestamp: ${await cssWETHLPPoolInstance.getBlockTimestamp.call()}`));
        console.log(chalk.yellow(`startime: ${await cssWETHLPPoolInstance.startime.call()}`));
        console.log(chalk.yellow(`lastUpdateTime: ${await cssWETHLPPoolInstance.lastUpdateTime.call()}`));
        console.log(chalk.yellow(`periodFinish: ${await cssWETHLPPoolInstance.periodFinish.call()}`));
        console.log(chalk.yellow(`rewardRate: ${await cssWETHLPPoolInstance.rewardRate.call()}`));

        await cssWETHLPPoolInstance.stake(ONE_DEC18,{from: OWNER});

        console.log(chalk.blue(`getBlockTimestamp: ${await cssWETHLPPoolInstance.getBlockTimestamp.call()}`));
        console.log(chalk.blue(`startime: ${await cssWETHLPPoolInstance.startime.call()}`));
        console.log(chalk.blue(`lastUpdateTime: ${await cssWETHLPPoolInstance.lastUpdateTime.call()}`));
        console.log(chalk.blue(`periodFinish: ${await cssWETHLPPoolInstance.periodFinish.call()}`));
        console.log(chalk.blue(`rewardRate: ${await cssWETHLPPoolInstance.rewardRate.call()}`));
    });

    it('check cssWETHLPPoolInstance.withdrawLockupEpochs.call(), its DEFAULT value is equal(2)', async () => {
        console.log(chalk.blue(`withdrawLockupEpochs: ${await cssWETHLPPoolInstance.withdrawLockupEpochs.call()}`));
        const EXPECTED_VALUE = new BigNumber("2"); 
        expect(parseFloat(await cssWETHLPPoolInstance.withdrawLockupEpochs.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHLPPoolInstance.rewardLockupEpochs.call(), its DEFAULT value is equal(2)', async () => {
        const EXPECTED_VALUE = new BigNumber("2"); 
        expect(parseFloat(await cssWETHLPPoolInstance.rewardLockupEpochs.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHLPPoolInstance.epochAlignTimestamp.call(), its DEFAULT value is equal(1608883200)', async () => {
        const EXPECTED_VALUE = new BigNumber("1608883200"); 
        expect(parseFloat(await cssWETHLPPoolInstance.epochAlignTimestamp.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHLPPoolInstance.epochPeriod.call(), its DEFAULT value is equal("180")', async () => {
        const EXPECTED_VALUE = new BigNumber("180"); 
        expect(parseFloat(await cssWETHLPPoolInstance.epochPeriod.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHLPPoolInstance.updateWithdrawLockupEpochs()', async () => {
        // BEFORE
        const DEFAULT_VALUE = new BigNumber("2"); 
        const NEW_VALUE = new BigNumber("4"); 
        expect(parseFloat(await cssWETHLPPoolInstance.withdrawLockupEpochs.call())).to.equal(parseFloat(DEFAULT_VALUE));
        
        // ACTION & ASSERTION
        await cssWETHLPPoolInstance.updateWithdrawLockupEpochs(NEW_VALUE,{from: OWNER});
        expect(parseFloat(await cssWETHLPPoolInstance.withdrawLockupEpochs.call())).to.equal(parseFloat(NEW_VALUE));

        // ROLLBACK CODE
        await cssWETHLPPoolInstance.updateWithdrawLockupEpochs(DEFAULT_VALUE,{from: OWNER});
        expect(parseFloat(await cssWETHLPPoolInstance.withdrawLockupEpochs.call())).to.equal(parseFloat(DEFAULT_VALUE));
    });


    it('check cssWETHLPPoolInstance.updateRewardLockupEpochs()', async () => {
        // BEFORE
        const DEFAULT_VALUE = new BigNumber("2"); 
        const NEW_VALUE = new BigNumber("4"); 
        expect(parseFloat(await cssWETHLPPoolInstance.rewardLockupEpochs.call())).to.equal(parseFloat(DEFAULT_VALUE));
        
        // ACTION & ASSERTION
        await cssWETHLPPoolInstance.updateRewardLockupEpochs(NEW_VALUE,{from: OWNER});
        expect(parseFloat(await cssWETHLPPoolInstance.rewardLockupEpochs.call())).to.equal(parseFloat(NEW_VALUE));

        // ROLLBACK CODE
        await cssWETHLPPoolInstance.updateRewardLockupEpochs(DEFAULT_VALUE,{from: OWNER});
        expect(parseFloat(await cssWETHLPPoolInstance.rewardLockupEpochs.call())).to.equal(parseFloat(DEFAULT_VALUE));
    });





});
