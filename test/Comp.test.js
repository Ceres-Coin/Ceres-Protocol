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
const CeresPoolInvestorForV2 = artifacts.require("AMOs/CeresPoolInvestorForV2");
const CSS_AMO = artifacts.require("AMOs/CSS_AMO");
const COMP = artifacts.require("ERC20/Variants/Comp");

contract('contracts/ERC20/Variants/Comp.sol', async (accounts) => {
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
    let ceresPoolInvestorForV2Instance;
    let css_AMOInstance;
    let pool_instance_USDC;
    let compInstance;
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

        ceresPoolInvestorForV2Instance = await CeresPoolInvestorForV2.deployed();
        css_AMOInstance = await CSS_AMO.deployed();
        pool_instance_USDC = await Pool_USDC.deployed();
        compInstance = await COMP.deployed();
    });

    it('check compInstance.address, its value is not be empty', async () => {
        console.log(chalk.blue(`compInstance: ${await compInstance.address}`));
        expect(compInstance.address).to.not.be.empty;
    });

    it('check compInstance.name.call(), its DEFAULT value is to equal "Compound" ', async () => {
        const EXPECTED_VALUE = "Compound";
        expect((await compInstance.name.call())).to.equal((EXPECTED_VALUE));
    });

    it('check compInstance.symbol.call(), its DEFAULT value is to equal "COMP" ', async () => {
        const EXPECTED_VALUE = "COMP";
        expect((await compInstance.symbol.call())).to.equal((EXPECTED_VALUE));
    });

    it('check compInstance.decimals.call(), its DEFAULT value is to equal "18" ', async () => {
        const EXPECTED_VALUE = new BigNumber("18");
        expect(parseFloat(await compInstance.decimals.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check compInstance.totalSupply.call(), its DEFAULT value is to equal "10000000e18" ', async () => {
        const EXPECTED_VALUE = new BigNumber("10000000e18"); //10 MILLION
        expect(parseFloat(await compInstance.totalSupply.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check compInstance.delegates.call(account0/1/2/3/4/5/6/7), its DEFAULT value is to equal "0" ', async () => {
        console.log(chalk.blue(`delegates.call(account0): ${await compInstance.delegates.call(account0)}`));

        const EXPECTED_VALUE = new BigNumber("0"); 
        expect(parseFloat(await compInstance.delegates.call(account0))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await compInstance.delegates.call(account1))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await compInstance.delegates.call(account2))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await compInstance.delegates.call(account3))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await compInstance.delegates.call(account4))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await compInstance.delegates.call(account5))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await compInstance.delegates.call(account6))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await compInstance.delegates.call(account7))).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check compInstance.balanceOf.call(account/1/2/3/4/5/6/7), its DEFAULT value is to equal "0" && balanceOf(account0) is gt(0)', async () => {
        console.log(chalk.blue(`balanceOf.call(account0): ${await compInstance.balanceOf.call(account0)}`));

        const EXPECTED_VALUE = new BigNumber("0"); 
        const EXPECTED_VALUE2 = new BigNumber("10000000e18"); 
        expect(parseFloat(await compInstance.balanceOf.call(account0))).to.equal(parseFloat(EXPECTED_VALUE2));
        expect(parseFloat(await compInstance.balanceOf.call(account1))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await compInstance.balanceOf.call(account2))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await compInstance.balanceOf.call(account3))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await compInstance.balanceOf.call(account4))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await compInstance.balanceOf.call(account5))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await compInstance.balanceOf.call(account6))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await compInstance.balanceOf.call(account7))).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check compInstance.transfer(TEST_ACCOUNT,ONE_DEC18,{from: OWNER})', async() => {
        console.log(chalk.yellow(`BEFORE: balanceOf.call(account0): ${await compInstance.balanceOf.call(OWNER)}`));
        console.log(chalk.yellow(`BEFORE: balanceOf.call(account1): ${await compInstance.balanceOf.call(TEST_ACCOUNT)}`));

        await compInstance.transfer(TEST_ACCOUNT,ONE_DEC18,{from: OWNER});

        console.log(chalk.blue(`AFTER: balanceOf.call(account0): ${await compInstance.balanceOf.call(OWNER)}`));
        console.log(chalk.blue(`AFTER: balanceOf.call(account1): ${await compInstance.balanceOf.call(TEST_ACCOUNT)}`));

        const EXPECTED_VALUE2 = new BigNumber("10000000e18"); 
        expect(parseFloat(await compInstance.balanceOf.call(OWNER))).to.lt(parseFloat(EXPECTED_VALUE2));
        expect(parseFloat(await compInstance.balanceOf.call(TEST_ACCOUNT))).to.equal(parseFloat(ONE_DEC18));
    });

    it('check compInstance.getCurrentVotes.call(account0/1/2/3/4/5/6/7), its default value is ALL equal to 0 ', async () => {
        const EXPECTED_VALUE = new BigNumber("0"); 
        expect(parseFloat(await compInstance.getCurrentVotes.call(account0))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await compInstance.getCurrentVotes.call(account1))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await compInstance.getCurrentVotes.call(account2))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await compInstance.getCurrentVotes.call(account3))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await compInstance.getCurrentVotes.call(account4))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await compInstance.getCurrentVotes.call(account5))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await compInstance.getCurrentVotes.call(account6))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await compInstance.getCurrentVotes.call(account7))).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check compInstance.delegate(TEST_ACCOUNT,{from: OWNER})', async() => {
        console.log(chalk.yellow(`delegates.call(OWNER): ${await compInstance.delegates.call(OWNER)}`));
        console.log(chalk.yellow(`delegates.call(TEST_ACCOUNT): ${await compInstance.delegates.call(TEST_ACCOUNT)}`));

        console.log(chalk.yellow(`balanceOf.call(OWNER): ${await compInstance.balanceOf.call(OWNER)}`));
        console.log(chalk.yellow(`balanceOf.call(TEST_ACCOUNT): ${await compInstance.balanceOf.call(TEST_ACCOUNT)}`));

        await compInstance.delegate(TEST_ACCOUNT,{from: OWNER});

        console.log(chalk.blue(`delegates.call(OWNER): ${await compInstance.delegates.call(OWNER)}`));
        console.log(chalk.blue(`delegates.call(TEST_ACCOUNT): ${await compInstance.delegates.call(TEST_ACCOUNT)}`));

        console.log(chalk.blue(`balanceOf.call(OWNER): ${await compInstance.balanceOf.call(OWNER)}`));
        console.log(chalk.blue(`balanceOf.call(TEST_ACCOUNT): ${await compInstance.balanceOf.call(TEST_ACCOUNT)}`));
    });

    it ('check compInstance._moveDelegates()', async() => {
        await compInstance._moveDelegates(constants.ZERO_ADDRESS,TEST_ACCOUNT,await compInstance.balanceOf.call(OWNER));
    })




});
