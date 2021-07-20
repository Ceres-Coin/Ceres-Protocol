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
const ERC20 = artifacts.require("ERC20");
const CeresDemo = artifacts.require("Ceres/CeresDemo");
const ONE_DEC18 = new BigNumber("1e18");
const ONE_HUNDRED_DEC18 = new BigNumber("100e18");
const ONE_MILLION_DEC18 = new BigNumber("1000000e18");
const ONE_HUNDRED_MILLION_DEC18 = new BigNumber("100000000e18");
const FIVE_MILLION_DEC18 = new BigNumber("5000000e18");
const BIG6 = new BigNumber("1e6");
const BIG18 = new BigNumber("1e18");

contract('contracts/Ceres/CeresDemo.sol', async (accounts) => {
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
    let instance_Pool_USDC;
    let instance_Pool_USDC_collateral_token;
    let col_instance_USDC;
    let instanceStakingRewards_CERES_WETH;
    let pair_addr_CERES_WETH;
    let wethInstance;
    let uniswapFactoryInstance;
    let ceresDemoInstance;
    let routerInstance;
    let boardroomInstance;
    beforeEach(async() => {
        cssInstance = await CEREShares.deployed();
        ceresInstance = await CEREStable.deployed();
        instance_Pool_USDC = await Pool_USDC.deployed();
        wethInstance = await WETH.deployed();

        uniswapFactoryInstance = await UniswapV2Factory.deployed(); 
        routerInstance = await UniswapV2Router02_Modified.deployed(); 
        instance_Pool_USDC_collateral_token = await ERC20.at(await instance_Pool_USDC.collateral_token());
        instance_Pool_USDC_CERES = await CEREStable.at(await instance_Pool_USDC.CERES());
        instance_Pool_USDC_CSS = await CEREShares.at(await instance_Pool_USDC.CSS());
        col_instance_USDC = await FakeCollateral_USDC.deployed(); 
        instanceStakingRewards_CERES_WETH = await StakingRewards_CERES_WETH.deployed();
        pair_addr_CERES_WETH = await uniswapFactoryInstance.getPair(ceresInstance.address, wethInstance.address, { from: OWNER });
        ceresDemoInstance = await CeresDemo.deployed();
        boardroomInstance = await Boardroom.deployed();
    });

    it('check boardroomInstance.address, its value is not be empty', async () => {
        console.log(chalk.blue(`boardroomInstance: ${await boardroomInstance.address}`));
        expect(boardroomInstance.address).to.not.be.empty;
    });

    it('check boardroomInstance.withdrawLockupEpochs, its DEFAULT value is 2', async () => {
        const EXPECTED_VALUE = new BigNumber("2");
        expect(parseFloat(await boardroomInstance.withdrawLockupEpochs.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check boardroomInstance.rewardLockupEpochs, its DEFAULT value is 2', async () => {
        const EXPECTED_VALUE = new BigNumber("2");
        expect(parseFloat(await boardroomInstance.rewardLockupEpochs.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check boardroomInstance.epochAlignTimestamp, its DEFAULT value is 1608883200', async () => {
        const EXPECTED_VALUE = new BigNumber("1608883200");
        expect(parseFloat(await boardroomInstance.epochAlignTimestamp.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check boardroomInstance.epochPeriod, its DEFAULT value is "300"', async () => {
        const EXPECTED_VALUE = new BigNumber("300");
        expect(parseFloat(await boardroomInstance.epochPeriod.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check boardroomInstance.referralList.call(0), AFTER "addReferral(TEST_ACCOUNT,"TEST_ACCOUNT")', async () => {
        await boardroomInstance.addReferral(TEST_ACCOUNT,"TEST_ACCOUNT");
        // const tmp = await boardroomInstance.referralList.call(0);
        // console.log(chalk.blue(tmp));

        // ASSERTION FOR referralList.call(0) & referralNameList.call(0);
        const EXPECTED_ADDRESS = TEST_ACCOUNT;
        const EXPECTED_NAME = "TEST_ACCOUNT";
        expect(await boardroomInstance.referralList.call(0)).to.equal(EXPECTED_ADDRESS);
        expect(await boardroomInstance.referralNameList.call(0)).to.equal(EXPECTED_NAME);
    });

    it('check boardroomInstance.cash.call(), its DEFAULT value is equal to ceresInstance.address', async() => {
        const EXPECTED_VALUE = await ceresInstance.address;
        expect(await boardroomInstance.cash.call()).to.equal(EXPECTED_VALUE);
    });

    it('check boardroomInstance.share.call(), its DEFAULT value is equal to pair_addr_CERES_WETH', async() => {
        const EXPECTED_VALUE = pair_addr_CERES_WETH;
        expect(await boardroomInstance.share.call()).to.equal(EXPECTED_VALUE);
    });

    it('check boardroomInstance.latestSnapshotIndex.call(), its DEFAULT value is equal to 0', async() => {
        // console.log(chalk.blue(await boardroomInstance.latestSnapshotIndex.call()));
        const EXPECTED_VALUE = new BigNumber("0")
        expect(parseFloat(await boardroomInstance.latestSnapshotIndex.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check boardroomInstance.getCurrentEpochTimestamp.call(), its DEFAULT value is gt 0', async() => {
        // console.log(chalk.blue(`getCurrentEpochTimestamp: ${await boardroomInstance.getCurrentEpochTimestamp.call()}`));
        const EXPECTED_VALUE = new BigNumber("0")
        expect(parseFloat(await boardroomInstance.getCurrentEpochTimestamp.call())).to.gt(parseFloat(EXPECTED_VALUE));
    });

    it('check boardroomInstance.getCanWithdrawTime.call(TEST_ACCOUNT), its DEFAULT value is gt 0', async() => {
        console.log(chalk.blue(`getCanWithdrawTime: ${await boardroomInstance.getCanWithdrawTime.call(TEST_ACCOUNT)}`));
        const EXPECTED_VALUE = new BigNumber("0")
        expect(parseFloat(await boardroomInstance.getCanWithdrawTime.call(TEST_ACCOUNT))).to.gt(parseFloat(EXPECTED_VALUE));
    });

    it('check boardroomInstance.getCanClaimTime.call(TEST_ACCOUNT), its DEFAULT value is gt 0', async() => {
        console.log(chalk.blue(`getCanClaimTime: ${await boardroomInstance.getCanClaimTime.call(TEST_ACCOUNT)}`));
        const EXPECTED_VALUE = new BigNumber("0")
        expect(parseFloat(await boardroomInstance.getCanClaimTime.call(TEST_ACCOUNT))).to.gt(parseFloat(EXPECTED_VALUE));
    });




});
