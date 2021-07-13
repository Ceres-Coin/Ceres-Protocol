const BigNumber = require('bignumber.js');
const BN = BigNumber.clone({ DECIMAL_PLACES: 9 })
const chalk = require('chalk');
const { assert, expect,chai} = require('chai');
const { expectEvent, send, shouldFail, time, constants, balance} = require('@openzeppelin/test-helpers');

const CEREStable = artifacts.require("Ceres/CEREStable");
const WETH = artifacts.require("ERC20/WETH");
const ChainlinkETHUSDPriceConsumerTest = artifacts.require("Oracle/ChainlinkETHUSDPriceConsumerTest");
const UniswapPairOracle_CERES_WETH = artifacts.require("Oracle/Variants/UniswapPairOracle_CERES_WETH");

const BIG6 = new BigNumber("1e6");
const BIG18 = new BigNumber("1e18");
const ONE_MILLION_DEC18 = new BigNumber("1000000e18");
const SIX_HUNDRED_DEC6 = new BigNumber("600e6");


contract('contracts/Oracle/Variants/UniswapPairOracle_CERES_WETH.sol', async (accounts) => {

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
    let instanceCERES;
    let instanceOracle_chainlink_ETH_USD
    let wethInstance;
    beforeEach(async() => { 
        oracle_instance_CERES_WETH = await UniswapPairOracle_CERES_WETH.deployed();
    });

    it('check oracle_instance_CERES_WETH.address ', async () => {
        // console.log(chalk.blue(`oracle_instance_CERES_WETH: ${oracle_instance_CERES_WETH}`));
        expect(oracle_instance_CERES_WETH).not.to.be.empty;
    });

    it('check oracle_instance_CERES_WETH.owner_address is OWNER', async() => {
        expect(await oracle_instance_CERES_WETH.owner_address.call()).to.equal(OWNER);
    });

    it('check oracle_instance_CERES_WETH.timelock_address is OWNER', async() => {
        expect(await oracle_instance_CERES_WETH.timelock_address.call()).to.equal(OWNER);
    });

    it('check oracle_instance_CERES_WETH.PERIOD is 5', async() => {
        const expected_value = 5;
        expect(parseFloat(await oracle_instance_CERES_WETH.PERIOD.call())).to.equal(expected_value);
    });

});
