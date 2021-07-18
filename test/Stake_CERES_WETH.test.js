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
const ERC20 = artifacts.require("ERC20");
const ONE_DEC18 = new BigNumber("1e18");
const ONE_HUNDRED_DEC18 = new BigNumber("100e18");
const ONE_MILLION_DEC18 = new BigNumber("1000000e18");
const ONE_HUNDRED_MILLION_DEC18 = new BigNumber("100000000e18");
const FIVE_MILLION_DEC18 = new BigNumber("5000000e18");
const BIG6 = new BigNumber("1e6");
const BIG18 = new BigNumber("1e18");

contract('contracts/Staking/Variants/Stake_CERES_WETH.sol', async (accounts) => {
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
    beforeEach(async() => {
        cssInstance = await CEREShares.deployed();
        ceresInstance = await CEREStable.deployed();
        instance_Pool_USDC = await Pool_USDC.deployed();
        wethInstance = await WETH.deployed();

        uniswapFactoryInstance = await UniswapV2Factory.deployed(); 
        instance_Pool_USDC_collateral_token = await ERC20.at(await instance_Pool_USDC.collateral_token());
        instance_Pool_USDC_CERES = await CEREStable.at(await instance_Pool_USDC.CERES());
        instance_Pool_USDC_CSS = await CEREShares.at(await instance_Pool_USDC.CSS());
        col_instance_USDC = await FakeCollateral_USDC.deployed(); 
        instanceStakingRewards_CERES_WETH = await StakingRewards_CERES_WETH.deployed();
        pair_addr_CERES_WETH = await uniswapFactoryInstance.getPair(ceresInstance.address, wethInstance.address, { from: OWNER });
    });

    it('check instanceStakingRewards_CERES_WETH.address, its value is not be empty', async () => {
        // console.log(chalk.blue(`instanceStakingRewards_CERES_WETH: ${await instanceStakingRewards_CERES_WETH.address}`));
        expect(instanceStakingRewards_CERES_WETH.address).to.not.be.empty;
    });

    it('check instanceStakingRewards_CERES_WETH.owner_address, its value is OWNER', async () => {
        const EXPECTED_VALUE = OWNER;
        expect(await instanceStakingRewards_CERES_WETH.owner_address.call()).to.equal(EXPECTED_VALUE);
    });

    it('check instanceStakingRewards_CERES_WETH.timelock_address, its value is OWNER', async () => {
        const EXPECTED_VALUE = OWNER;
        expect(await instanceStakingRewards_CERES_WETH.timelock_address.call()).to.equal(EXPECTED_VALUE);
    });

    it('check instanceStakingRewards_CERES_WETH.rewardsDistribution, its value is TEST_ACCOUNT', async () => {
        const EXPECTED_VALUE = TEST_ACCOUNT;
        expect(await instanceStakingRewards_CERES_WETH.rewardsDistribution.call()).to.equal(EXPECTED_VALUE);
    });

    it('check instanceStakingRewards_CERES_WETH.rewardsToken, its value is cssInstance.address', async () => {
        const EXPECTED_VALUE = cssInstance.address;
        expect(await instanceStakingRewards_CERES_WETH.rewardsToken.call()).to.equal(EXPECTED_VALUE);
    });

    it('check instanceStakingRewards_CERES_WETH.stakingToken, its value is pair_addr_CERES_WETH', async () => {
        const EXPECTED_VALUE = pair_addr_CERES_WETH;
        expect(await instanceStakingRewards_CERES_WETH.stakingToken.call()).to.equal(EXPECTED_VALUE);
    });

    it('check instanceStakingRewards_CERES_WETH.CERES, its value is ceresInstance.address', async () => {
        const EXPECTED_VALUE = ceresInstance.address;
        expect(await instanceStakingRewards_CERES_WETH.CERES.call()).to.equal(EXPECTED_VALUE);
    });

    it('check instanceStakingRewards_CERES_WETH.periodFinish.call(), its default value is 0', async () => {
        const EXPECTED_VALUE = new BigNumber("0");
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.periodFinish.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check instanceStakingRewards_CERES_WETH.PRICE_PRECISION.call(), its default value is 1e6', async () => {
        const EXPECTED_VALUE = new BigNumber("1e6");
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.PRICE_PRECISION.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check instanceStakingRewards_CERES_WETH.MULTIPLIER_BASE.call(), its default value is 1e6', async () => {
        const EXPECTED_VALUE = new BigNumber("1e6");
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.MULTIPLIER_BASE.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check instanceStakingRewards_CERES_WETH.rewardRate.call(), its default value is gt(0)', async () => {
        // console.log(chalk.blue(`rewardRate/seconds in DEC18: ${new BigNumber(await instanceStakingRewards_CERES_WETH.rewardRate.call()).div(BIG18)}`));
        const EXPECTED_VALUE = new BigNumber("0");
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.rewardRate.call())).to.gt(parseFloat(EXPECTED_VALUE));
    });


    
});
