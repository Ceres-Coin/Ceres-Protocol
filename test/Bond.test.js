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
// const CeresDemo = artifacts.require("Ceres/CeresDemo");
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
const SimpleFund = artifacts.require('SimpleERCFund');

contract('contracts/Bond.sol', async (accounts) => {
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
        // ceresDemoInstance = await CeresDemo.deployed();
        boardroomInstance = await Boardroom.deployed();
        oracle_instance_CERES_WETH = await UniswapPairOracle_CERES_WETH.deployed();

        simpleFundInstance = await SimpleFund.deployed();
        treasuryInstance = await Treasury.deployed();
    });

    it('check bondInstance.address, its value is not be empty', async () => {
        // console.log(chalk.blue(`bondInstance: ${await bondInstance.address}`));
        expect(bondInstance.address).to.not.be.empty;
    });

    it('check bondInstance.name.call(), its DEFAULT value is "CERES BOND"', async () => {
        const EXPECTED_VALUE = "CERES BOND";
        expect(await bondInstance.name.call()).to.equal(EXPECTED_VALUE);
    });

    it('check bondInstance.symbol.call(), its DEFAULT value is "CSB"', async () => {
        const EXPECTED_VALUE = "CSB";
        expect(await bondInstance.symbol.call()).to.equal(EXPECTED_VALUE);
    });

    it('check bondInstance.decimals.call(), its DEFAULT value is "18"', async () => {
        const EXPECTED_VALUE = new BigNumber("18");
        expect(parseFloat(await bondInstance.decimals.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check bondInstance.totalSupply.call(), its DEFAULT value is "ONE_HUNDRED_MILLION_DEC18"', async () => {
        const EXPECTED_VALUE = ONE_HUNDRED_MILLION_DEC18
        expect(parseFloat(await bondInstance.totalSupply.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check bondInstance.balanceOf.call(account0/1/2/3/4/5/6/7), its value of account0 is "ONE_HUNDRED_MILLION_DEC18"', async () => {
        const EXPECTED_VALUE = ONE_HUNDRED_MILLION_DEC18
        expect(parseFloat(await bondInstance.balanceOf.call(account0))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await bondInstance.balanceOf.call(account1))).to.equal(parseFloat(0));
        expect(parseFloat(await bondInstance.balanceOf.call(account2))).to.equal(parseFloat(0));
        expect(parseFloat(await bondInstance.balanceOf.call(account3))).to.equal(parseFloat(0));
        expect(parseFloat(await bondInstance.balanceOf.call(account4))).to.equal(parseFloat(0));
        expect(parseFloat(await bondInstance.balanceOf.call(account5))).to.equal(parseFloat(0));
        expect(parseFloat(await bondInstance.balanceOf.call(account6))).to.equal(parseFloat(0));
        expect(parseFloat(await bondInstance.balanceOf.call(account7))).to.equal(parseFloat(0));
    });

    it('check bondInstance.owner.call(), its DEFAULT value is OWNER', async () => {
        const EXPECTED_VALUE = OWNER;
        expect(await bondInstance.owner.call()).to.equal(EXPECTED_VALUE);
    });

    it('check bondInstance.transferOwnership(TEST_ACCOUNT,{from: OWNER})', async () => {
        const DEFAULT_VALUE = OWNER;
        const NEW_VALUE = TEST_ACCOUNT;
        // BEFORE
        expect(await bondInstance.owner.call()).to.equal(DEFAULT_VALUE);
        // ACTION && ASSERTION
        await bondInstance.transferOwnership(NEW_VALUE,{from: DEFAULT_VALUE});
        expect(await bondInstance.owner.call()).to.equal(NEW_VALUE);

        // ROLLBACK CODE
        await bondInstance.transferOwnership(DEFAULT_VALUE,{from: NEW_VALUE});
        expect(await bondInstance.owner.call()).to.equal(DEFAULT_VALUE);
    });

    it('check bondInstance.operator.call(), its DEFAULT value is OWNER', async () => {
        const EXPECTED_VALUE = OWNER;
        expect(await bondInstance.operator.call()).to.equal(EXPECTED_VALUE);
    });

    it('check bondInstance.isOperator.call({from: account0}), its DEFAULT value is true', async () => {
        const EXPECTED_VALUE = true;
        const EXPECTED_VALUE2 = false;
        expect(await bondInstance.isOperator.call({from: account0})).to.equal(EXPECTED_VALUE);
        expect(await bondInstance.isOperator.call({from: account1})).to.equal(EXPECTED_VALUE2);
        expect(await bondInstance.isOperator.call({from: account2})).to.equal(EXPECTED_VALUE2);
        expect(await bondInstance.isOperator.call({from: account3})).to.equal(EXPECTED_VALUE2);
        expect(await bondInstance.isOperator.call({from: account4})).to.equal(EXPECTED_VALUE2);
        expect(await bondInstance.isOperator.call({from: account5})).to.equal(EXPECTED_VALUE2);
        expect(await bondInstance.isOperator.call({from: account6})).to.equal(EXPECTED_VALUE2);
        expect(await bondInstance.isOperator.call({from: account7})).to.equal(EXPECTED_VALUE2);
    });

    it('check bondInstance.transferOperator(TEST_ACCOUNT,{from: OWNER})', async () => {
        const DEFAULT_VALUE = OWNER;
        const NEW_VALUE = TEST_ACCOUNT;
        // BEFORE
        expect(await bondInstance.operator.call()).to.equal(DEFAULT_VALUE);
        // ACTION && ASSERTION
        await bondInstance.transferOperator(NEW_VALUE,{from: DEFAULT_VALUE});
        expect(await bondInstance.operator.call()).to.equal(NEW_VALUE);

        // // ROLLBACK CODE
        await bondInstance.transferOperator(DEFAULT_VALUE,{from: DEFAULT_VALUE});
        expect(await bondInstance.operator.call()).to.equal(DEFAULT_VALUE);
    });
    
});
