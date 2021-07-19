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

    it('check ceresDemoInstance.name.call(), its value is "Ceres Demo"', async () => {
        const EXPECTED_VALUE = "Ceres Demo";
        expect(await ceresDemoInstance.name.call()).to.equal(EXPECTED_VALUE);
    });

    it('check ceresDemoInstance.symbol.call(), its value is "CRSD"', async () => {
        const EXPECTED_VALUE = "CRSD";
        expect(await ceresDemoInstance.symbol.call()).to.equal(EXPECTED_VALUE);
    });

    it('check ceresDemoInstance.decimals.call(), its value is "18"', async () => {
        const EXPECTED_VALUE = new BigNumber("18");
        expect(parseFloat(await ceresDemoInstance.decimals.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check ceresDemoInstance.taxFee.call(), its value is "2"', async () => {
        const EXPECTED_VALUE = new BigNumber("2");
        expect(parseFloat(await ceresDemoInstance.taxFee.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check ceresDemoInstance.setTaxFeePercent() FUNC', async() => {
        // BEFORE
        const DEFAUT_VALUE = new BigNumber("2"); //tax = 2%
        const NEW_VALUE = new BigNumber("4"); //tax = 4%
        expect(parseFloat(await ceresDemoInstance.taxFee.call())).to.equal(parseFloat(DEFAUT_VALUE));
        // ACTION & ASSERTION
        await ceresDemoInstance.setTaxFeePercent(NEW_VALUE,{from: OWNER});
        expect(parseFloat(await ceresDemoInstance.taxFee.call())).to.equal(parseFloat(NEW_VALUE));

        // ROLLBACK CODE
        await ceresDemoInstance.setTaxFeePercent(DEFAUT_VALUE,{from: OWNER});
        expect(parseFloat(await ceresDemoInstance.taxFee.call())).to.equal(parseFloat(DEFAUT_VALUE));
    });

    it('check ceresDemoInstance.liquidityFee.call(), its DEFAULT value is "3"', async () => {
        const EXPECTED_VALUE = new BigNumber("3");
        expect(parseFloat(await ceresDemoInstance.liquidityFee.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check ceresDemoInstance.setLiquidityFeePercent() FUNC', async() => {
        // BEFORE
        const DEFAUT_VALUE = new BigNumber("3"); //tax = 3%
        const NEW_VALUE = new BigNumber("6"); //tax = 6%
        expect(parseFloat(await ceresDemoInstance.liquidityFee.call())).to.equal(parseFloat(DEFAUT_VALUE));
        // ACTION & ASSERTION
        await ceresDemoInstance.setLiquidityFeePercent(NEW_VALUE,{from: OWNER});
        expect(parseFloat(await ceresDemoInstance.liquidityFee.call())).to.equal(parseFloat(NEW_VALUE));

        // ROLLBACK CODE
        await ceresDemoInstance.setLiquidityFeePercent(DEFAUT_VALUE,{from: OWNER});
        expect(parseFloat(await ceresDemoInstance.liquidityFee.call())).to.equal(parseFloat(DEFAUT_VALUE));
    });

    it('check ceresDemoInstance.uniswapV2Router.call(), its DEFAULT value is routerInstance', async () => {
        const EXPECTED_VALUE = await routerInstance.address;
        expect((await ceresDemoInstance.uniswapV2Router.call())).to.equal((EXPECTED_VALUE));
    });

    it('check ceresDemoInstance.uniswapV2Pair.call()', async () => {
        // console.log(chalk.blue(`ceresDemoInstance.uniswapV2Router: ${(await ceresDemoInstance.uniswapV2Router.call())}`));
        
        console.log(chalk.blue(`ceresDemoInstance.uniswapV2Pair: ${await ceresDemoInstance.uniswapV2Pair.call()}`));
        const pair_addr_uniswapV2Pair = await ceresDemoInstance.uniswapV2Pair.call();
        const pair_instance_CERESDEMO_WETH = await UniswapV2Pair.at(pair_addr_uniswapV2Pair);

        console.log(chalk.blue(`pair_instance_CERESDEMO_WETH.token0: ${await pair_instance_CERESDEMO_WETH.token0.call()}`));
        console.log(chalk.blue(`pair_instance_CERESDEMO_WETH.token1: ${await pair_instance_CERESDEMO_WETH.token1.call()}`));

    });

    it('check ceresDemoInstance.swapAndLiquifyEnabled.call(), its DEFAULT value is TRUE', async () => {
        const EXPECTED_VALUE = true;
        expect((await ceresDemoInstance.swapAndLiquifyEnabled.call())).to.equal((EXPECTED_VALUE));
    });

    it('check ceresDemoInstance._maxTxAmount.call(), its value is 5million * 1 million ', async () => {
        // console.log(chalk.blue(`maxTxAmount: ${await ceresDemoInstance._maxTxAmount.call()}`));
        const EXPECTED_VALUE = new BigNumber(5000000 * 10**6 * 10**18);
        expect(parseFloat(await ceresDemoInstance._maxTxAmount.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check ceresDemoInstance.totalSupply.call(), its value is 1000000000 * 10**6 * 10**18 ', async () => {
        const EXPECTED_VALUE = new BigNumber(1000000000 * 10**6 * 10**18);
        expect(parseFloat(await ceresDemoInstance.totalSupply.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check ceresDemoInstance.MAX.call(), its value is gt(0) ', async () => {
        const EXPECTED_VALUE = new BigNumber(0);
        expect(parseFloat(await ceresDemoInstance.MAX.call())).to.gt(parseFloat(EXPECTED_VALUE));
        console.log(chalk.blue(`MAX: ${await ceresDemoInstance.MAX.call()}`));
    });

    it('check ceresDemoInstance._tTotal.call(), its value is gt(0) ', async () => {
        const EXPECTED_VALUE = new BigNumber(0);
        expect(parseFloat(await ceresDemoInstance._tTotal.call())).to.gt(parseFloat(EXPECTED_VALUE));
        console.log(chalk.blue(`_tTotal: ${await ceresDemoInstance._tTotal.call()}`));
    });

    it('check ceresDemoInstance._rTotal.call(), its value is gt(0) ', async () => {
        const EXPECTED_VALUE = new BigNumber(0);
        expect(parseFloat(await ceresDemoInstance._rTotal.call())).to.gt(parseFloat(EXPECTED_VALUE));
        console.log(chalk.blue(`_rTotal: ${await ceresDemoInstance._rTotal.call()}`));
    });

    it('check ceresDemoInstance.tFeeTotal.call(), its value is equal(0)', async () => {
        const EXPECTED_VALUE = new BigNumber(0);
        expect(parseFloat(await ceresDemoInstance.tFeeTotal.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check ceresDemoInstance.get_tOwned.call(account0/1/2/3/4/5/6/7),its default value should be ALL ZERO', async() => {
        expect(parseFloat(await ceresDemoInstance.get_tOwned.call(account0))).to.equal(parseFloat(0));
        expect(parseFloat(await ceresDemoInstance.get_tOwned.call(account1))).to.equal(parseFloat(0));
        expect(parseFloat(await ceresDemoInstance.get_tOwned.call(account2))).to.equal(parseFloat(0));
        expect(parseFloat(await ceresDemoInstance.get_tOwned.call(account3))).to.equal(parseFloat(0));
        expect(parseFloat(await ceresDemoInstance.get_tOwned.call(account4))).to.equal(parseFloat(0));
        expect(parseFloat(await ceresDemoInstance.get_tOwned.call(account5))).to.equal(parseFloat(0));
        expect(parseFloat(await ceresDemoInstance.get_tOwned.call(account6))).to.equal(parseFloat(0));
        expect(parseFloat(await ceresDemoInstance.get_tOwned.call(account7))).to.equal(parseFloat(0));
    });



});
