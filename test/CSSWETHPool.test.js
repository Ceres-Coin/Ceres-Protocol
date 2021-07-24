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
const CSSWETHPool = artifacts.require('Ceres/Pools/CSSWETHPool');
const SimpleFund = artifacts.require('SimpleERCFund');

contract('contracts/Ceres/Pools/CSSWETHPool.sol', async (accounts) => {
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
    let cssWETHPoolInstance;
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
        cssWETHPoolInstance = await CSSWETHPool.deployed();
    });

    it('check cssWETHPoolInstance.address, its value is not be empty', async () => {
        console.log(chalk.blue(`cssWETHPoolInstance: ${await cssWETHPoolInstance.address}`));
        expect(cssWETHPoolInstance.address).to.not.be.empty;
    });

    it('check cssWETHPoolInstance.DURATION.call(), its DEFAULT value is 5 * 86400', async () => {
        const EXPECTED_VALUE = new BigNumber(5 * 86400); // 5 DAYS
        expect(parseFloat(await cssWETHPoolInstance.DURATION.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHPoolInstance.basAllocationPercentage.call(), its DEFAULT value is 1', async () => {
        const EXPECTED_VALUE = new BigNumber(1); 
        expect(parseFloat(await cssWETHPoolInstance.basAllocationPercentage.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHPoolInstance.foundationA.call(), its DEFAULT value is simpleFundInstance.address', async () => {
        const EXPECTED_VALUE = simpleFundInstance.address 
        expect((await cssWETHPoolInstance.foundationA.call())).to.equal((EXPECTED_VALUE));
    });

    it('check cssWETHPoolInstance.startime.call(), its DEFAULT value is 1616385600', async () => {
        const EXPECTED_VALUE = new BigNumber("1616385600"); 
        expect(parseFloat(await cssWETHPoolInstance.startime.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHPoolInstance.periodFinish.call(), its DEFAULT value is 0', async () => {
        const EXPECTED_VALUE = new BigNumber("0"); 
        expect(parseFloat(await cssWETHPoolInstance.periodFinish.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHPoolInstance.rewardRate.call(), its DEFAULT value is 0', async () => {
        const EXPECTED_VALUE = new BigNumber("0"); 
        expect(parseFloat(await cssWETHPoolInstance.rewardRate.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHPoolInstance.lastUpdateTime.call(), its DEFAULT value is 0', async () => {
        const EXPECTED_VALUE = new BigNumber("0"); 
        expect(parseFloat(await cssWETHPoolInstance.lastUpdateTime.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHPoolInstance.rewardPerTokenStored.call(), its DEFAULT value is 0', async () => {
        const EXPECTED_VALUE = new BigNumber("0"); 
        expect(parseFloat(await cssWETHPoolInstance.rewardPerTokenStored.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHPoolInstance.userRewardPerTokenPaid.call(account0/1/2/3/4/5/6/7), its DEFAULT value is 0', async () => {
        const EXPECTED_VALUE = new BigNumber("0"); 
        expect(parseFloat(await cssWETHPoolInstance.userRewardPerTokenPaid.call(account0))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHPoolInstance.userRewardPerTokenPaid.call(account1))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHPoolInstance.userRewardPerTokenPaid.call(account2))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHPoolInstance.userRewardPerTokenPaid.call(account3))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHPoolInstance.userRewardPerTokenPaid.call(account4))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHPoolInstance.userRewardPerTokenPaid.call(account5))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHPoolInstance.userRewardPerTokenPaid.call(account6))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHPoolInstance.userRewardPerTokenPaid.call(account7))).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHPoolInstance.rewards.call(account0/1/2/3/4/5/6/7), its DEFAULT value is 0', async () => {
        const EXPECTED_VALUE = new BigNumber("0"); 
        expect(parseFloat(await cssWETHPoolInstance.rewards.call(account0))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHPoolInstance.rewards.call(account1))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHPoolInstance.rewards.call(account2))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHPoolInstance.rewards.call(account3))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHPoolInstance.rewards.call(account4))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHPoolInstance.rewards.call(account5))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHPoolInstance.rewards.call(account6))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHPoolInstance.rewards.call(account7))).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHPoolInstance.lpt.call(), its DEFAULT value is pair_instance_CERES_WETH.address', async () => {
        const EXPECTED_VALUE = pair_instance_CERES_WETH.address 
        expect((await cssWETHPoolInstance.lpt.call())).to.equal((EXPECTED_VALUE));
    });

    it('check cssWETHPoolInstance.totalSupply.call(), check its default value is [0]', async () => {
        // console.log(chalk.blue(`totalSupply: ${await cssWETHPoolInstance.totalSupply.call()}`));
        const EXPECTED_VALUE = new BigNumber("0")
        expect(parseFloat(await cssWETHPoolInstance.totalSupply.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHPoolInstance.balanceOf.call(account0/1/2/3/4/5/6/7), check its default value is [0]', async () => {
        const EXPECTED_VALUE = new BigNumber("0")
        expect(parseFloat(await cssWETHPoolInstance.balanceOf.call(account0))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHPoolInstance.balanceOf.call(account1))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHPoolInstance.balanceOf.call(account2))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHPoolInstance.balanceOf.call(account3))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHPoolInstance.balanceOf.call(account4))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHPoolInstance.balanceOf.call(account5))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHPoolInstance.balanceOf.call(account6))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHPoolInstance.balanceOf.call(account7))).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHPoolInstance.lastTimeRewardApplicable.call(), check its default value is gt(0)', async () => {
        console.log(chalk.blue(`lastTimeRewardApplicable: ${await cssWETHPoolInstance.lastTimeRewardApplicable.call()}`));
        const EXPECTED_VALUE = new BigNumber("0")
        expect(parseFloat(await cssWETHPoolInstance.lastTimeRewardApplicable.call())).to.gt(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHPoolInstance.rewardPerToken.call(), check its default value is equal(0) BEFORE STAKE', async () => {
        console.log(chalk.blue(`rewardPerToken: ${await cssWETHPoolInstance.rewardPerToken.call()}`));
        const EXPECTED_VALUE = new BigNumber("0");
        expect(parseFloat(await cssWETHPoolInstance.rewardPerToken.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHPoolInstance.lastUpdateTime.call() & periodFinish.call() ', async () => {
        console.log(chalk.yellow(`rewardRate: ${await cssWETHPoolInstance.rewardRate.call()}`));
        console.log(chalk.yellow(`lastUpdateTime: ${await cssWETHPoolInstance.lastUpdateTime.call()}`));
        console.log(chalk.yellow(`periodFinish: ${await cssWETHPoolInstance.periodFinish.call()}`));
        
        await cssWETHPoolInstance.setRewardRate(1,{from: OWNER});

        console.log(chalk.blue(`rewardRate: ${await cssWETHPoolInstance.rewardRate.call()}`));
        console.log(chalk.blue(`lastUpdateTime: ${await cssWETHPoolInstance.lastUpdateTime.call()}`));
        console.log(chalk.blue(`periodFinish: ${await cssWETHPoolInstance.periodFinish.call()}`));

        const EXPECTED_VALUE = new BigNumber("0");
        expect(parseFloat(await cssWETHPoolInstance.rewardRate.call())).to.gt(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHPoolInstance.lastUpdateTime.call())).to.gt(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHPoolInstance.periodFinish.call())).to.gt(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHPoolInstance.rewardPerToken.call(), check its default value is equal(0) AFTER setRewardRate(1)', async () => {
        await cssWETHPoolInstance.setRewardRate(1,{from: OWNER});
        const EXPECTED_VALUE = new BigNumber("0");
        expect(parseFloat(await cssWETHPoolInstance.rewardPerToken.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHPoolInstance.rewardPerToken.call(), check its default value is gt(0) AFTER setRewardRate(1) & stake(one_dec18)', async () => {
        console.log(chalk.blue(`AFTER lastUpdateTime: ${await cssWETHPoolInstance.lastUpdateTime.call()}`));
        console.log(chalk.blue(`AFTER periodFinish: ${await cssWETHPoolInstance.periodFinish.call()}`));
        console.log(chalk.blue(`AFTER lastTimeRewardApplicable: ${await cssWETHPoolInstance.lastTimeRewardApplicable.call()}`));
        
        await cssWETHPoolInstance.setRewardRate(1,{from: OWNER});
        
        console.log(chalk.blue(`AFTER*2 lastUpdateTime: ${await cssWETHPoolInstance.lastUpdateTime.call()}`));
        console.log(chalk.blue(`AFTER*2 periodFinish: ${await cssWETHPoolInstance.periodFinish.call()}`));
        console.log(chalk.blue(`AFTER*2 lastTimeRewardApplicable: ${await cssWETHPoolInstance.lastTimeRewardApplicable.call()}`));

        await cssWETHPoolInstance.stake(ONE_DEC18,{from: OWNER});
        
        // await time.increase(86400 + 1);
        // await time.advanceBlock();
        await cssWETHPoolInstance.withdraw(POINT_ONE_DEC18,{from: OWNER});

        console.log(chalk.blue(`AFTER*3 lastUpdateTime: ${await cssWETHPoolInstance.lastUpdateTime.call()}`));
        console.log(chalk.blue(`AFTER*3 periodFinish: ${await cssWETHPoolInstance.periodFinish.call()}`));
        console.log(chalk.blue(`AFTER*3 lastTimeRewardApplicable: ${await cssWETHPoolInstance.lastTimeRewardApplicable.call()}`));


        console.log(chalk.blue(await cssWETHPoolInstance.rewardPerToken.call()));
        const EXPECTED_VALUE = new BigNumber("0");
        expect(parseFloat(await cssWETHPoolInstance.rewardPerToken.call())).to.gt(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHPoolInstance.earned.call(account1/2/3/4/5/6/7), check its default value is [0]', async () => {
        const EXPECTED_VALUE = new BigNumber("0")
        // console.log(chalk.blue(`earned(account0): ${await cssWETHPoolInstance.earned.call(account0)}`));
        expect(parseFloat(await cssWETHPoolInstance.earned.call(account0))).to.gt(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHPoolInstance.earned.call(account1))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHPoolInstance.earned.call(account2))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHPoolInstance.earned.call(account3))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHPoolInstance.earned.call(account4))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHPoolInstance.earned.call(account5))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHPoolInstance.earned.call(account6))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await cssWETHPoolInstance.earned.call(account7))).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check cssWETHPoolInstance.getReward({from: OWNER})', async () => {
        console.log(chalk.blue(`BEFORE: cssInstance.balanceOf.call(OWNER): ${await cssInstance.balanceOf.call(OWNER)}`));

        await cssWETHPoolInstance.getReward({from: OWNER});
        console.log(chalk.blue(`AFTER: cssInstance.balanceOf.call(OWNER): ${await cssInstance.balanceOf.call(OWNER)}`));
    });

    


});
