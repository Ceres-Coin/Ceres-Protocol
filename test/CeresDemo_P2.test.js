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
const UniswapV2Router02_Modified = artifacts.require("Uniswap/UniswapV2Router02_Modified");
const ERC20 = artifacts.require("ERC20");
const CeresDemo = artifacts.require("Ceres/CeresDemo");
const ONE_DEC18 = new BigNumber("1e18");
const TEN_DEC18 = new BigNumber("10e18");
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
    const SENDER = account6;


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
    });

    it('check ceresDemoInstance.address, its value is not be empty', async () => {
        console.log(chalk.blue(`ceresDemoInstance: ${await ceresDemoInstance.address}`));
        expect(ceresDemoInstance.address).to.not.be.empty;
    });

    it('check ceresDemoInstance.transfer(TEST_ACCOUNT,ONE_HUNDRED_DEC18,{from: SENDER})', async () => {
        // BEFORE
        // console.log(chalk.yellow(`ceresDemoInstance.balanceOf(OWNER): ${new BigNumber(await ceresDemoInstance.balanceOf.call(OWNER)).div(BIG18)}`));
        // console.log(chalk.yellow(`ceresDemoInstance.balanceOf(SENDER): ${new BigNumber(await ceresDemoInstance.balanceOf.call(SENDER)).div(BIG18)}`));
        // console.log(chalk.yellow(`ceresDemoInstance.balanceOf(TEST_ACCOUNT): ${new BigNumber(await ceresDemoInstance.balanceOf.call(TEST_ACCOUNT)).div(BIG18)}`));
        expect(parseFloat(await ceresDemoInstance.balanceOf.call(SENDER))).to.equal(parseFloat(0));
        expect(parseFloat(await ceresDemoInstance.balanceOf.call(TEST_ACCOUNT))).to.equal(parseFloat(0));

        console.log(chalk.blue(`BEFORE _rOwned.call(SENDER) IN DEC18: ${new BigNumber(await ceresDemoInstance._rOwned.call(SENDER)).div(BIG18)}`));
        console.log(chalk.blue(`BEFORE _rOwned.call(TEST_ACCOUNT) IN DEC18: ${new BigNumber(await ceresDemoInstance._rOwned.call(TEST_ACCOUNT)).div(BIG18)}`));


        // PREPARE
        await ceresDemoInstance.transfer(SENDER,ONE_HUNDRED_DEC18,{from: OWNER});
        console.log(chalk.red(`=============================== SEPERATOR AFTER ============================`));
        console.log(chalk.yellow(`ceresDemoInstance.balanceOf(SENDER): ${new BigNumber(await ceresDemoInstance.balanceOf.call(SENDER)).div(BIG18)}`));
        console.log(chalk.yellow(`ceresDemoInstance.balanceOf(TEST_ACCOUNT): ${new BigNumber(await ceresDemoInstance.balanceOf.call(TEST_ACCOUNT)).div(BIG18)}`));
        expect(parseFloat(await ceresDemoInstance.balanceOf.call(SENDER))).to.equal(parseFloat(ONE_HUNDRED_DEC18));
        expect(parseFloat(await ceresDemoInstance.balanceOf.call(TEST_ACCOUNT))).to.equal(parseFloat(0));

        // ACTION
        await ceresDemoInstance.transfer(TEST_ACCOUNT,ONE_DEC18,{from: SENDER});
        console.log(chalk.red(`=============================== SEPERATOR AFTER ============================`));
        console.log(chalk.yellow(`ceresDemoInstance.balanceOf(SENDER): ${new BigNumber(await ceresDemoInstance.balanceOf.call(SENDER)).div(BIG18)}`));
        console.log(chalk.yellow(`ceresDemoInstance.balanceOf(TEST_ACCOUNT): ${new BigNumber(await ceresDemoInstance.balanceOf.call(TEST_ACCOUNT)).div(BIG18)}`));
        // ASSERTION
        expect(parseFloat(await ceresDemoInstance.balanceOf.call(TEST_ACCOUNT))).to.lt(parseFloat(ONE_DEC18));
        expect(parseFloat(await ceresDemoInstance.totalFees.call())).to.gt(parseFloat(0));
        console.log(chalk.blue(`totalFees IN DEC18: ${new BigNumber(await ceresDemoInstance.totalFees.call()).div(BIG18)}`));

        // PRINT _rOwned(SENDER & TEST_ACCOUNT) 
        console.log(chalk.blue(`AFTER _rOwned.call(SENDER) IN DEC18: ${new BigNumber(await ceresDemoInstance._rOwned.call(SENDER)).div(BIG18)}`));
        console.log(chalk.blue(`AFTER _rOwned.call(TEST_ACCOUNT) IN DEC18: ${new BigNumber(await ceresDemoInstance._rOwned.call(TEST_ACCOUNT)).div(BIG18)}`));

        const rOwned_SENDER = new BigNumber(await ceresDemoInstance._rOwned.call(SENDER));
        const rOwned_TEST_ACCOUNT = new BigNumber(await ceresDemoInstance._rOwned.call(TEST_ACCOUNT));
        console.log(chalk.blue(`AFTER tokenFromReflection.call(rOwned_SENDER): ${new BigNumber(await ceresDemoInstance.tokenFromReflection.call(rOwned_SENDER)).div(BIG18)}`));
        console.log(chalk.blue(`AFTER tokenFromReflection.call(rOwned_TEST_ACCOUNT): ${new BigNumber(await ceresDemoInstance.tokenFromReflection.call(rOwned_TEST_ACCOUNT)).div(BIG18)}`));
        // PRINT _tOwned(SENDER & TEST_ACCOUNT) 
        // console.log(chalk.blue(`_tOwned.call(SENDER) IN DEC18: ${new BigNumber(await ceresDemoInstance._tOwned.call(SENDER)).div(BIG18)}`));
        // console.log(chalk.blue(`_tOwned.call(TEST_ACCOUNT) IN DEC18: ${new BigNumber(await ceresDemoInstance._tOwned.call(TEST_ACCOUNT)).div(BIG18)}`));

        
    });

    it ('check MAX & _rTotal', async() => {
        console.log(chalk.blue(`${await ceresDemoInstance.MAX.call()}`));
        console.log(chalk.blue(`${await ceresDemoInstance._rTotal.call()}`));
    });

    it ('check ceresDemoInstance.balanceOf(OWNER) BEFORE & AFTER', async() => {
        const balanceOf_OWNER_BEFORE = new BigNumber(await ceresDemoInstance.balanceOf.call(OWNER)).div(BIG18);
        console.log(chalk.blue(`balanceOf_OWNER_BEFORE: ${balanceOf_OWNER_BEFORE}`));

        const balanceOf_CONTRACT_BEFORE = new BigNumber(await ceresDemoInstance.balanceOf.call(ceresDemoInstance.address)).div(BIG18);
        console.log(chalk.blue(`balanceOf_CONTRACT_BEFORE: ${balanceOf_CONTRACT_BEFORE}`));

        await ceresDemoInstance.transfer(TEST_ACCOUNT,TEN_DEC18,{from: SENDER});

        const balanceOf_OWNER_AFTER = new BigNumber(await ceresDemoInstance.balanceOf.call(OWNER)).div(BIG18);
        console.log(chalk.blue(`balanceOf_OWNER_AFTER: ${balanceOf_OWNER_AFTER}`));

        const balanceOf_CONTRACT_AFTER = new BigNumber(await ceresDemoInstance.balanceOf.call(ceresDemoInstance.address)).div(BIG18);
        console.log(chalk.blue(`balanceOf_CONTRACT_AFTER: ${balanceOf_CONTRACT_AFTER}`));
    });

    

});
