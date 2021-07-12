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


contract('CERES.sol', async (accounts) => {

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
    let wethInstance;

    beforeEach(async() => {
        instanceCERES = await CEREStable.deployed();
        wethInstance = await WETH.at(await instanceCERES.weth_address());
    });

    it ('check wethInstance.name(), its value is "Wrapped Ether"', async() => {
        const expected_value = "Wrapped Ether";
        expect(await wethInstance.name.call()).to.equal(expected_value);
    });

    it ('check wethInstance.symbol(), its value is "WETH"', async() => {
        const expected_value = "WETH";
        expect(await wethInstance.symbol.call()).to.equal(expected_value);
    });

    it ('check wethInstance.decimals.call(), its value is 18', async() => {
        const expected_value = 18;
        expect(parseFloat(await wethInstance.decimals.call())).to.equal(expected_value);
    });

    it ('check wethInstance.balanceOf(OWNER).call(), its default value is 999999E18', async() => {
        const expected_value_owner = new BigNumber("999999e18");
        expect(parseFloat(await wethInstance.balanceOf(OWNER))).to.equal(parseFloat(expected_value_owner));
    });

    it ('check weth.transfer(test_account, 1dec18)',async() => {
        // before
        const expected_value_owner = new BigNumber("999999e18");
        expect(parseFloat(await wethInstance.balanceOf(OWNER))).to.equal(parseFloat(expected_value_owner));
        const expected_value_test_account = 0;
        expect(parseFloat(await wethInstance.balanceOf(TEST_ACCOUNT))).to.equal(parseFloat(expected_value_test_account));
        // ACTION & ASSERTION
        await wethInstance.transfer(TEST_ACCOUNT,BIG18,{from: OWNER});
        const expected_value_test_account_AFTER = BIG18;
        expect(parseFloat(await wethInstance.balanceOf(TEST_ACCOUNT))).to.equal(parseFloat(expected_value_test_account_AFTER));

        // ROLLBACK CODE
        await wethInstance.transfer(OWNER,BIG18,{from: TEST_ACCOUNT});
        expect(parseFloat(await wethInstance.balanceOf(OWNER))).to.equal(parseFloat(expected_value_owner));
    });

    
});
