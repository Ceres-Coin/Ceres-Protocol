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

contract('contracts/AMOs/CSS_AMO.sol', async (accounts) => {
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
    });

    // it('check css_AMOInstance.address, its value is not be empty', async () => {
    //     console.log(chalk.blue(`css_AMOInstance: ${await css_AMOInstance.address}`));
    //     expect(css_AMOInstance.address).to.not.be.empty;
    // });

    // it('check css_AMOInstance.owner_address.call(), its DEFAULT value is to equal "OWNER" ', async () => {
    //     const EXPECTED_VALUE = OWNER;
    //     expect((await css_AMOInstance.owner_address.call())).to.equal((EXPECTED_VALUE));
    // });

    // it('check css_AMOInstance.timelock_address.call(), its DEFAULT value is to equal "OWNER" ', async () => {
    //     const EXPECTED_VALUE = OWNER;
    //     expect((await css_AMOInstance.timelock_address.call())).to.equal((EXPECTED_VALUE));
    // });

    // it('check css_AMOInstance.custodian_address.call(), its DEFAULT value is to equal "OWNER" ', async () => {
    //     const EXPECTED_VALUE = OWNER;
    //     expect((await css_AMOInstance.custodian_address.call())).to.equal((EXPECTED_VALUE));
    // });

    // it('check css_AMOInstance.ceres_address.call(), its DEFAULT value is to equal "ceresInstance" ', async () => {
    //     const EXPECTED_VALUE = ceresInstance.address;
    //     expect((await css_AMOInstance.ceres_address.call())).to.equal((EXPECTED_VALUE));
    // });

    // it('check css_AMOInstance.css_address.call(), its DEFAULT value is to equal "cssInstance" ', async () => {
    //     const EXPECTED_VALUE = cssInstance.address;
    //     expect((await css_AMOInstance.css_address.call())).to.equal((EXPECTED_VALUE));
    // });

    // it('check css_AMOInstance.collateral_address.call(), its DEFAULT value is to equal "col_instance_USDC" ', async () => {
    //     const EXPECTED_VALUE = col_instance_USDC.address;
    //     expect((await css_AMOInstance.collateral_address.call())).to.equal((EXPECTED_VALUE));
    // });

    // it('check css_AMOInstance.pool_address.call(), its DEFAULT value is to equal "pool_instance_USDC" ', async () => {
    //     const EXPECTED_VALUE = pool_instance_USDC.address;
    //     expect((await css_AMOInstance.pool_address.call())).to.equal((EXPECTED_VALUE));
    // });

    // it('check css_AMOInstance.investor_amo_address.call(), its DEFAULT value is to equal "[ceresPoolInvestorForV2Instance]" ', async () => {
    //     // console.log(chalk.blue(`investor_amo_address: ${await css_AMOInstance.investor_amo_address.call()}`));
    //     const EXPECTED_VALUE = ceresPoolInvestorForV2Instance.address;
    //     expect((await css_AMOInstance.investor_amo_address.call())).to.equal((EXPECTED_VALUE));
    // });

    // it('check css_AMOInstance.missing_decimals.call(), its DEFAULT value is to equal "[0]" ', async () => {
    //     const EXPECTED_VALUE = new BigNumber("0");
    //     expect(parseFloat(await css_AMOInstance.missing_decimals.call())).to.equal(parseFloat(EXPECTED_VALUE));
    // });

    // it('check css_AMOInstance.min_cr.call(), its DEFAULT value is to equal "[850000]" ', async () => {
    //     const EXPECTED_VALUE = new BigNumber("850000");
    //     expect(parseFloat(await css_AMOInstance.min_cr.call())).to.equal(parseFloat(EXPECTED_VALUE));
    // });

    // it('check css_AMOInstance.minted_sum_historical.call(), its DEFAULT value is to equal "[0]" ', async () => {
    //     const EXPECTED_VALUE = new BigNumber("0");
    //     expect(parseFloat(await css_AMOInstance.minted_sum_historical.call())).to.equal(parseFloat(EXPECTED_VALUE));
    // });

    // it('check css_AMOInstance.burned_sum_historical.call(), its DEFAULT value is to equal "[0]" ', async () => {
    //     const EXPECTED_VALUE = new BigNumber("0");
    //     expect(parseFloat(await css_AMOInstance.burned_sum_historical.call())).to.equal(parseFloat(EXPECTED_VALUE));
    // });

    // it('check css_AMOInstance.max_slippage.call(), its DEFAULT value is to equal "[200000]" ', async () => {
    //     const EXPECTED_VALUE = new BigNumber("200000");
    //     expect(parseFloat(await css_AMOInstance.max_slippage.call())).to.equal(parseFloat(EXPECTED_VALUE));
    // });

    // it('check css_AMOInstance.is_override_amo_profits.call(), its DEFAULT value is to equal "[false]" ', async () => {
    //     const EXPECTED_VALUE = false
    //     expect((await css_AMOInstance.is_override_amo_profits.call())).to.equal((EXPECTED_VALUE));
    // });

    // it('check css_AMOInstance.overridden_amo_profit.call(), its DEFAULT value is to equal "[0]" ', async () => {
    //     const EXPECTED_VALUE = new BigNumber("0");
    //     expect(parseFloat(await css_AMOInstance.overridden_amo_profit.call())).to.equal(parseFloat(EXPECTED_VALUE));
    // });

    // TEST CASES FOR PUBLIC FUNC()
    it('check css_AMOInstance.getTmpValue.call()', async () => {
        const getTmpValue_0 = (await css_AMOInstance.getTmpValue())[0];
        const getTmpValue_1 = (await css_AMOInstance.getTmpValue())[1];
        const getTmpValue_2 = (await css_AMOInstance.getTmpValue())[2];
        console.log(chalk.blue(`getTmpValue_0: ${getTmpValue_0}`));
        console.log(chalk.blue(`getTmpValue_1: ${getTmpValue_1}`));
        console.log(chalk.blue(`getTmpValue_2: ${getTmpValue_2}`));
        
    });



    


});
