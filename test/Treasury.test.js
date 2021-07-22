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
const SimpleFund = artifacts.require('SimpleERCFund');

contract('contracts/Treasury.sol', async (accounts) => {
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
    });

    it('check simpleFundInstance.address, its value is not be empty', async () => {
        // console.log(chalk.blue(`simpleFundInstance: ${await simpleFundInstance.address}`));
        expect(simpleFundInstance.address).to.not.be.empty;
    });

    it('check treasuryInstance.address, its value is not be empty', async () => {
        // console.log(chalk.blue(`treasuryInstance: ${await treasuryInstance.address}`));
        expect(treasuryInstance.address).to.not.be.empty;
    });

    it('check treasuryInstance.migrated.call(), its DEFAULT value is FALSE', async () => {
        const EXPECTED_VALUE = false;
        expect(await treasuryInstance.migrated.call()).to.equal(EXPECTED_VALUE);
    });

    it('check treasuryInstance.initialized.call(), its DEFAULT value is FALSE', async () => {
        const EXPECTED_VALUE = false;
        expect(await treasuryInstance.initialized.call()).to.equal(EXPECTED_VALUE);
    });

    it('check treasuryInstance.cash.call(), its DEFAULT value is ceresInstance.address', async () => {
        const EXPECTED_VALUE = ceresInstance.address;
        expect(await treasuryInstance.cash.call()).to.equal(EXPECTED_VALUE);
    });

    it('check treasuryInstance.bond.call(), its DEFAULT value is ceresInstance.address', async () => {
        const EXPECTED_VALUE = ceresInstance.address;
        expect(await treasuryInstance.bond.call()).to.equal(EXPECTED_VALUE);
    });

    it('check treasuryInstance.share.call(), its DEFAULT value is cssInstance.address', async () => {
        const EXPECTED_VALUE = cssInstance.address;
        expect(await treasuryInstance.share.call()).to.equal(EXPECTED_VALUE);
    });

    it('check treasuryInstance.fund.call(), its DEFAULT value is simpleFundInstance.address', async () => {
        const EXPECTED_VALUE = simpleFundInstance.address;
        expect(await treasuryInstance.fund.call()).to.equal(EXPECTED_VALUE);
    });

    it('check treasuryInstance.c_lpBoardroom.call(), its DEFAULT value is boardroomInstance.address', async () => {
        const EXPECTED_VALUE = boardroomInstance.address;
        expect(await treasuryInstance.c_lpBoardroom.call()).to.equal(EXPECTED_VALUE);
    });

    it('check treasuryInstance.s_lpBoardroom.call(), its DEFAULT value is boardroomInstance.address', async () => {
        const EXPECTED_VALUE = boardroomInstance.address;
        expect(await treasuryInstance.s_lpBoardroom.call()).to.equal(EXPECTED_VALUE);
    });

    it('check treasuryInstance.c_s_percentage.call(), its DEFAULT value is 4', async () => {
        const EXPECTED_VALUE = new BigNumber("4");
        expect(parseFloat(await treasuryInstance.c_s_percentage.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check treasuryInstance.bondOracle.call(), its DEFAULT value is oracle_instance_CERES_WETH.address', async () => {
        const EXPECTED_VALUE = oracle_instance_CERES_WETH.address;
        expect(await treasuryInstance.bondOracle.call()).to.equal(EXPECTED_VALUE);
    });

    it('check treasuryInstance.seigniorageOracle.call(), its DEFAULT value is oracle_instance_CERES_WETH.address', async () => {
        const EXPECTED_VALUE = oracle_instance_CERES_WETH.address;
        expect(await treasuryInstance.seigniorageOracle.call()).to.equal(EXPECTED_VALUE);
    });

    it('check treasuryInstance.cashPriceOne.call(), its DEFAULT value is ONE_DEC18', async () => {
        const EXPECTED_VALUE = ONE_DEC18;
        expect(parseFloat(await treasuryInstance.cashPriceOne.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check treasuryInstance.cashPriceCeiling.call(), its DEFAULT value is 1.05E18', async () => {
        const EXPECTED_VALUE = new BigNumber("1.05e18");
        expect(parseFloat(await treasuryInstance.cashPriceCeiling.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check treasuryInstance.bondDepletionFloor.call(), its DEFAULT value is 1000E18', async () => {
        const EXPECTED_VALUE = new BigNumber("1000e18");
        expect(parseFloat(await treasuryInstance.bondDepletionFloor.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check treasuryInstance.accumulatedSeigniorage.call(), its DEFAULT value is 0', async () => {
        const EXPECTED_VALUE = new BigNumber("0");
        expect(parseFloat(await treasuryInstance.accumulatedSeigniorage.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check treasuryInstance.fundAllocationRate.call(), its DEFAULT value is 10', async () => {
        const EXPECTED_VALUE = new BigNumber("10");
        expect(parseFloat(await treasuryInstance.fundAllocationRate.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check treasuryInstance.referralRate.call(), its DEFAULT value is 5', async () => {
        const EXPECTED_VALUE = new BigNumber("5");
        expect(parseFloat(await treasuryInstance.referralRate.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check treasuryInstance.inflationPercentCeil.call(), its DEFAULT value is POINT_ONE_DEC18', async () => {
        const EXPECTED_VALUE = POINT_ONE_DEC18
        expect(parseFloat(await treasuryInstance.inflationPercentCeil.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check treasuryInstance.seigniorageCeil.call(), its DEFAULT value is 100K_DEC18', async () => {
        const EXPECTED_VALUE = new BigNumber("100000e18")
        expect(parseFloat(await treasuryInstance.seigniorageCeil.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    // PUBLIC VIEW FUNCS TEST SCRIPTS

    it('check treasuryInstance.getReserve.call(), its DEFAULT value is 0', async () => {
        const EXPECTED_VALUE = new BigNumber("0")
        expect(parseFloat(await treasuryInstance.getReserve.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check treasuryInstance.getBondOraclePrice.call(), its DEFAULT value is [1666666666666666]', async () => {
        // console.log(chalk.blue(`getBondOraclePrice: ${await treasuryInstance.getBondOraclePrice.call()}`));
        const EXPECTED_VALUE = new BigNumber("1666666666666666")
        expect(parseFloat(await treasuryInstance.getBondOraclePrice.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });


    it('check treasuryInstance.getSeigniorageOraclePrice.call(), its DEFAULT value is [1666666666666666]', async () => {
        // console.log(chalk.blue(`getSeigniorageOraclePrice: ${await treasuryInstance.getSeigniorageOraclePrice.call()}`));
        const EXPECTED_VALUE = new BigNumber("1666666666666666")
        expect(parseFloat(await treasuryInstance.getSeigniorageOraclePrice.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    // GOVERNANCE FUNC TEST SCRIPTS
    it('check treasuryInstance.setInflationPercentCeil.call(POINT_THREE_DEC18)', async () => {
        // BEFORE
        const DEFAULT_VALUE = POINT_ONE_DEC18;
        const NEW_VALUE = POINT_THREE_DEC18;
        expect(parseFloat(await treasuryInstance.inflationPercentCeil.call())).to.equal(parseFloat(DEFAULT_VALUE));
        // ACTION & ASSERTION
        await treasuryInstance.setInflationPercentCeil(NEW_VALUE,{from: OWNER});
        expect(parseFloat(await treasuryInstance.inflationPercentCeil.call())).to.equal(parseFloat(NEW_VALUE));

        // ROLLBACK CODE
        await treasuryInstance.setInflationPercentCeil(DEFAULT_VALUE,{from: OWNER});
        expect(parseFloat(await treasuryInstance.inflationPercentCeil.call())).to.equal(parseFloat(DEFAULT_VALUE));
    });

    // GOVERNANCE FUNC TEST SCRIPTS
    it('check treasuryInstance.setFundAllocationRate(20), and check its NEW_VALUE', async () => {
        // BEFORE
        const DEFAULT_VALUE = new BigNumber("10");
        const NEW_VALUE = new BigNumber("20");;
        expect(parseFloat(await treasuryInstance.fundAllocationRate.call())).to.equal(parseFloat(DEFAULT_VALUE));
        // ACTION & ASSERTION
        await treasuryInstance.setFundAllocationRate(NEW_VALUE,{from: OWNER});
        expect(parseFloat(await treasuryInstance.fundAllocationRate.call())).to.equal(parseFloat(NEW_VALUE));

        // ROLLBACK CODE
        await treasuryInstance.setFundAllocationRate(DEFAULT_VALUE,{from: OWNER});
        expect(parseFloat(await treasuryInstance.fundAllocationRate.call())).to.equal(parseFloat(DEFAULT_VALUE));
    });

    // GOVERNANCE FUNC TEST SCRIPTS
    it('check treasuryInstance.setFund(NEW_VALUE), and check its NEW_VALUE', async () => {
        // BEFORE
        const DEFAULT_VALUE = simpleFundInstance.address;
        const NEW_VALUE = TEST_ACCOUNT;
        expect(parseFloat(await treasuryInstance.fund.call())).to.equal(parseFloat(DEFAULT_VALUE));
        // ACTION & ASSERTION
        await treasuryInstance.setFund(NEW_VALUE,{from: OWNER});
        expect(parseFloat(await treasuryInstance.fund.call())).to.equal(parseFloat(NEW_VALUE));

        // ROLLBACK CODE
        await treasuryInstance.setFund(DEFAULT_VALUE,{from: OWNER});
        expect(parseFloat(await treasuryInstance.fund.call())).to.equal(parseFloat(DEFAULT_VALUE));
    });

    





    



});
