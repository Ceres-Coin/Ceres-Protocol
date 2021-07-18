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

    it('check instanceStakingRewards_CERES_WETH.rewardsDuration.call(), its default value is 604800', async () => {
        const EXPECTED_VALUE = new BigNumber("604800");
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.rewardsDuration.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check instanceStakingRewards_CERES_WETH.lastUpdateTime.call(), its default value is gt(0)', async () => {
        // console.log(chalk.blue(`lastUpdateTime: ${await instanceStakingRewards_CERES_WETH.lastUpdateTime.call()}`));
        const EXPECTED_VALUE = new BigNumber("0");
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.lastUpdateTime.call())).to.gt(parseFloat(EXPECTED_VALUE));
    });

    it('check instanceStakingRewards_CERES_WETH.rewardPerTokenStored.call(), its default value is equal (0)', async () => {
        const EXPECTED_VALUE = new BigNumber("0");
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.rewardPerTokenStored.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check instanceStakingRewards_CERES_WETH.pool_weight.call(), its default value is gt(0)', async () => {
        // console.log(chalk.blue(`pool_weight: ${await instanceStakingRewards_CERES_WETH.pool_weight.call()}`));
        const EXPECTED_VALUE = new BigNumber("0");
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.pool_weight.call())).to.gt(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.pool_weight.call())).to.equal(parseFloat(500000));
    });

    it('check instanceStakingRewards_CERES_WETH.locked_stake_max_multiplier.call(), its default value is equal 3000000', async () => {
        const EXPECTED_VALUE = new BigNumber("3000000");
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.locked_stake_max_multiplier.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check instanceStakingRewards_CERES_WETH.locked_stake_time_for_max_multiplier.call(), its default value is equal 3 * 365 * 86400', async () => {
        const EXPECTED_VALUE = new BigNumber(3 * 365 * 86400);
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.locked_stake_time_for_max_multiplier.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check instanceStakingRewards_CERES_WETH.locked_stake_min_time.call(), its default value is equal 604800', async () => {
        const EXPECTED_VALUE = new BigNumber(604800);
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.locked_stake_min_time.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check instanceStakingRewards_CERES_WETH.locked_stake_min_time_str.call(), its default value is equal "604800"', async () => {
        const EXPECTED_VALUE = "604800";
        expect(await instanceStakingRewards_CERES_WETH.locked_stake_min_time_str.call()).to.equal(EXPECTED_VALUE);
    });

    it('check instanceStakingRewards_CERES_WETH.cr_boost_max_multiplier.call(), its default value is equal 3000000', async () => {
        const EXPECTED_VALUE = new BigNumber(3000000);
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.cr_boost_max_multiplier.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it ("check instanceStakingRewards_CERES_WETH.userRewardPerTokenPaid(account0 - account7), check its default value for account0 - account7 should ALL be 0 ", async() => {
		// console.log(chalk.yellow(`rewards_account0: ${account0} value: ${parseFloat(await instanceStakingRewards_CERES_WETH.userRewardPerTokenPaid.call(account0))}`));
		// console.log(chalk.yellow(`rewards_account1: ${account1} value: ${parseFloat(await instanceStakingRewards_CERES_WETH.userRewardPerTokenPaid.call(account1))}`));
		// console.log(chalk.yellow(`rewards_account2: ${account2} value: ${parseFloat(await instanceStakingRewards_CERES_WETH.userRewardPerTokenPaid.call(account2))}`));
		// console.log(chalk.yellow(`rewards_account3: ${account3} value: ${parseFloat(await instanceStakingRewards_CERES_WETH.userRewardPerTokenPaid.call(account3))}`));
		// console.log(chalk.yellow(`rewards_account4: ${account4} value: ${parseFloat(await instanceStakingRewards_CERES_WETH.userRewardPerTokenPaid.call(account4))}`));
		// console.log(chalk.yellow(`rewards_account5: ${account5} value: ${parseFloat(await instanceStakingRewards_CERES_WETH.userRewardPerTokenPaid.call(account5))}`));
		// console.log(chalk.yellow(`rewards_account6: ${account6} value: ${parseFloat(await instanceStakingRewards_CERES_WETH.userRewardPerTokenPaid.call(account6))}`));
		// console.log(chalk.yellow(`rewards_account7: ${account7} value: ${parseFloat(await instanceStakingRewards_CERES_WETH.userRewardPerTokenPaid.call(account7))}`));
        const EXPECTED_VALUE = new BigNumber(0);
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.userRewardPerTokenPaid.call(account0))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.userRewardPerTokenPaid.call(account1))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.userRewardPerTokenPaid.call(account2))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.userRewardPerTokenPaid.call(account3))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.userRewardPerTokenPaid.call(account4))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.userRewardPerTokenPaid.call(account5))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.userRewardPerTokenPaid.call(account6))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.userRewardPerTokenPaid.call(account7))).to.equal(parseFloat(EXPECTED_VALUE));
	});

    it ("check Stake_CERES_WETH.rewards(account0 - account7), check its value for account0 - 7 should ALL be 0 ", async() => {
	    const EXPECTED_VALUE = new BigNumber(0);
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.rewards.call(account0))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.rewards.call(account1))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.rewards.call(account2))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.rewards.call(account3))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.rewards.call(account4))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.rewards.call(account5))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.rewards.call(account6))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.rewards.call(account7))).to.equal(parseFloat(EXPECTED_VALUE));
	});

    it('check instanceStakingRewards_CERES_WETH.unlockedStakes.call(), its default value is equal false', async () => {
        const EXPECTED_VALUE = false;
        expect(await instanceStakingRewards_CERES_WETH.unlockedStakes.call()).to.equal(EXPECTED_VALUE);
    });

    it ('check Stake_CERES_WETH.greylist(account0 - account7), check its value for account0 - 7 should ALL be FALSE ', async() => {
	    const EXPECTED_VALUE = false;
        expect(await instanceStakingRewards_CERES_WETH.greylist.call(account0)).to.equal((EXPECTED_VALUE));
        expect(await instanceStakingRewards_CERES_WETH.greylist.call(account1)).to.equal((EXPECTED_VALUE));
        expect(await instanceStakingRewards_CERES_WETH.greylist.call(account2)).to.equal((EXPECTED_VALUE));
        expect(await instanceStakingRewards_CERES_WETH.greylist.call(account3)).to.equal((EXPECTED_VALUE));
        expect(await instanceStakingRewards_CERES_WETH.greylist.call(account4)).to.equal((EXPECTED_VALUE));
        expect(await instanceStakingRewards_CERES_WETH.greylist.call(account5)).to.equal((EXPECTED_VALUE));
        expect(await instanceStakingRewards_CERES_WETH.greylist.call(account6)).to.equal((EXPECTED_VALUE));
        expect(await instanceStakingRewards_CERES_WETH.greylist.call(account7)).to.equal((EXPECTED_VALUE));
	});

    // PUBLIC FUNC TEST 
    it('check STAKE_CERES_WETH.totalSupply.call(), its default value is equal 0', async () => {
        const EXPECTED_VALUE = new BigNumber(0);
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.totalSupply.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check STAKE_CERES_WETH.totalBoostedSupply.call(), its default value is equal 0', async () => {
        const EXPECTED_VALUE = new BigNumber(0);
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.totalBoostedSupply.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check STAKE_CERES_WETH.stakingMultiplier.call(1), its default value is gt 0', async () => {
        const EXPECTED_VALUE = new BigNumber(0);
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.stakingMultiplier.call(1))).to.gt(parseFloat(EXPECTED_VALUE));

        // console.log(chalk.blue(`stakingMultiplier.call(1): ${await instanceStakingRewards_CERES_WETH.stakingMultiplier.call(1)}`));
        // console.log(chalk.blue(`stakingMultiplier.call(100): ${await instanceStakingRewards_CERES_WETH.stakingMultiplier.call(100)}`));
        // // staking for 1 day
        // console.log(chalk.blue(`stakingMultiplier.call(86400): ${await instanceStakingRewards_CERES_WETH.stakingMultiplier.call(86400)}`))

    });

    it('check STAKE_CERES_WETH.crBoostMultiplier.call(), its default value is gt 0', async () => {
        // console.log(chalk.blue(`crBoostMultiplier.call(): ${await instanceStakingRewards_CERES_WETH.crBoostMultiplier.call()}`));
        const EXPECTED_VALUE = new BigNumber(0);
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.crBoostMultiplier.call())).to.gt(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.crBoostMultiplier.call())).to.equal(parseFloat(1000000));
    });

    it ('check Stake_CERES_WETH.balanceOf(account0 - account7), check its value for account0 - 7 should ALL be 0 ', async() => {
	    const EXPECTED_VALUE = new BigNumber(0);
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.balanceOf.call(account0))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.balanceOf.call(account1))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.balanceOf.call(account2))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.balanceOf.call(account3))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.balanceOf.call(account4))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.balanceOf.call(account5))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.balanceOf.call(account6))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.balanceOf.call(account7))).to.equal(parseFloat(EXPECTED_VALUE));
	});

    it ('check Stake_CERES_WETH.unlockedBalanceOf(account0 - account7), check its value for account0 - 7 should ALL be 0 ', async() => {
	    const EXPECTED_VALUE = new BigNumber(0);
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.unlockedBalanceOf.call(account0))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.unlockedBalanceOf.call(account1))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.unlockedBalanceOf.call(account2))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.unlockedBalanceOf.call(account3))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.unlockedBalanceOf.call(account4))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.unlockedBalanceOf.call(account5))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.unlockedBalanceOf.call(account6))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.unlockedBalanceOf.call(account7))).to.equal(parseFloat(EXPECTED_VALUE));
	});

    it ('check Stake_CERES_WETH.lockedBalanceOf(account0 - account7), check its value for account0 - 7 should ALL be 0 ', async() => {
	    const EXPECTED_VALUE = new BigNumber(0);
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.lockedBalanceOf.call(account0))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.lockedBalanceOf.call(account1))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.lockedBalanceOf.call(account2))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.lockedBalanceOf.call(account3))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.lockedBalanceOf.call(account4))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.lockedBalanceOf.call(account5))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.lockedBalanceOf.call(account6))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.lockedBalanceOf.call(account7))).to.equal(parseFloat(EXPECTED_VALUE));
	});

    it ('check Stake_CERES_WETH.boostedBalanceOf(account0 - account7), check its value for account0 - 7 should ALL be 0', async() => {
	    const EXPECTED_VALUE = new BigNumber(0);
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.boostedBalanceOf.call(account0))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.boostedBalanceOf.call(account1))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.boostedBalanceOf.call(account2))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.boostedBalanceOf.call(account3))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.boostedBalanceOf.call(account4))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.boostedBalanceOf.call(account5))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.boostedBalanceOf.call(account6))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.boostedBalanceOf.call(account7))).to.equal(parseFloat(EXPECTED_VALUE));
	});

    it('check STAKE_CERES_WETH.stakingDecimals.call(), its default value is equal 18', async () => {
        const EXPECTED_VALUE = new BigNumber(18);
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.stakingDecimals.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it ('check Stake_CERES_WETH.rewardsFor(account0 - account7), check its value for account0 - 7 should ALL be 0', async() => {
	    const EXPECTED_VALUE = new BigNumber(0);
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.rewardsFor.call(account0))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.rewardsFor.call(account1))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.rewardsFor.call(account2))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.rewardsFor.call(account3))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.rewardsFor.call(account4))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.rewardsFor.call(account5))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.rewardsFor.call(account6))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.rewardsFor.call(account7))).to.equal(parseFloat(EXPECTED_VALUE));
	});

    it('check STAKE_CERES_WETH.lastTimeRewardApplicable.call(), its default value is equal 0', async () => {
        // console.log(chalk.blue(`lastTimeRewardApplicable: ${await instanceStakingRewards_CERES_WETH.lastTimeRewardApplicable.call()}`));
        // console.log(chalk.blue(`periodFinish: ${await instanceStakingRewards_CERES_WETH.periodFinish.call()}`));

        const EXPECTED_VALUE = new BigNumber(0);
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.lastTimeRewardApplicable.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it('check STAKE_CERES_WETH.lastTimeRewardApplicable.call(), after initializeDefault() its default value is gt 0', async () => {
        // UNCOMMENTED PRINT CODE
        // console.log(chalk.yellow(`lastTimeRewardApplicable: ${await instanceStakingRewards_CERES_WETH.lastTimeRewardApplicable.call()}`));
        // console.log(chalk.yellow(`periodFinish: ${await instanceStakingRewards_CERES_WETH.periodFinish.call()}`));
        await instanceStakingRewards_CERES_WETH.initializeDefault();
        // console.log(chalk.blue(`lastTimeRewardApplicable_after: ${await instanceStakingRewards_CERES_WETH.lastTimeRewardApplicable.call()}`));
        // console.log(chalk.blue(`periodFinish_after: ${await instanceStakingRewards_CERES_WETH.periodFinish.call()}`));

        const EXPECTED_VALUE = new BigNumber(0);
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.lastTimeRewardApplicable.call())).to.gt(parseFloat(EXPECTED_VALUE));
    });

    it('check STAKE_CERES_WETH.rewardPerToken.call(), its default value is equal 0', async () => {
        const EXPECTED_VALUE = new BigNumber(0);
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.rewardPerToken.call())).to.equal(parseFloat(EXPECTED_VALUE));
    });

    it ('check Stake_CERES_WETH.earned(account0 - account7), check its value for account0 - 7 should ALL be 0', async() => {
	    const EXPECTED_VALUE = new BigNumber(0);
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.earned.call(account0))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.earned.call(account1))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.earned.call(account2))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.earned.call(account3))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.earned.call(account4))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.rewardsFor.call(account5))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.earned.call(account6))).to.equal(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.earned.call(account7))).to.equal(parseFloat(EXPECTED_VALUE));
	});

    it('check STAKE_CERES_WETH.getRewardForDuration.call(), its default value is gt 0', async () => {
        // console.log(chalk.blue(`getRewardForDuration: ${await instanceStakingRewards_CERES_WETH.getRewardForDuration.call()}`));
        const EXPECTED_VALUE = new BigNumber(0);
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.getRewardForDuration.call())).to.gt(parseFloat(EXPECTED_VALUE));
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.getRewardForDuration.call())).to.equal(parseFloat(new BigNumber("1150684931506849200000")));
    });

    it('check STAKE_CERES_WETH.rewardsToken_balance.call(), its default value is equal 0', async () => {
        // console.log(chalk.blue(`getRewardForDuration IN DEC18: ${new BigNumber(await instanceStakingRewards_CERES_WETH.rewardsToken_balance.call()).div(BIG18)}`));
        const EXPECTED_VALUE = new BigNumber(0);
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.rewardsToken_balance.call())).to.equal(parseFloat(EXPECTED_VALUE));
        // expect(parseFloat(await instanceStakingRewards_CERES_WETH.getRewardForDuration.call())).to.equal(parseFloat(new BigNumber("1150684931506849200000")));
    });

    it('check STAKE_CERES_WETH.setRewardsDuration() FUNC', async() => {
        // PREPARE
        await instanceStakingRewards_CERES_WETH.setPeriodFinish(0,{from: OWNER});
        // BEFORE
        const DEFAUT_VALUE = new BigNumber("604800"); //7 days
        const NEW_VALUE = new BigNumber("1209600"); //14 days
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.rewardsDuration.call())).to.equal(parseFloat(DEFAUT_VALUE));
        // ACTION & ASSERTION
        await instanceStakingRewards_CERES_WETH.setRewardsDuration(NEW_VALUE,{from: OWNER});
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.rewardsDuration.call())).to.equal(parseFloat(NEW_VALUE));

        // ROLLBACK CODE
        await instanceStakingRewards_CERES_WETH.setRewardsDuration(DEFAUT_VALUE,{from: OWNER});
        expect(parseFloat(await instanceStakingRewards_CERES_WETH.rewardsDuration.call())).to.equal(parseFloat(DEFAUT_VALUE));
    });


});
