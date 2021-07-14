const BigNumber = require('bignumber.js');
const BN = BigNumber.clone({ DECIMAL_PLACES: 9 })
const chalk = require('chalk');
const { assert, expect,chai} = require('chai');
const { expectEvent, send, shouldFail, time, constants, balance} = require('@openzeppelin/test-helpers');

const CEREStable = artifacts.require("Ceres/CEREStable");
const WETH = artifacts.require("ERC20/WETH");
const ChainlinkETHUSDPriceConsumerTest = artifacts.require("Oracle/ChainlinkETHUSDPriceConsumerTest");
const UniswapPairOracle_CERES_WETH = artifacts.require("Oracle/Variants/UniswapPairOracle_CERES_WETH");
const UniswapPairOracle_CSS_WETH = artifacts.require("Oracle/Variants/UniswapPairOracle_CSS_WETH");

const BIG6 = new BigNumber("1e6");
const BIG18 = new BigNumber("1e18");
const ONE_MILLION_DEC18 = new BigNumber("1000000e18");
const SIX_HUNDRED_DEC6 = new BigNumber("600e6");
const EIGHT_HUNDRED_DEC6 = new BigNumber("800e6");


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
    let instanceOracle_chainlink_ETH_USD
    let wethInstance;
    beforeEach(async() => {
        instanceCERES = await CEREStable.deployed();
        instanceOracle_chainlink_ETH_USD = await ChainlinkETHUSDPriceConsumerTest.deployed();
        instance_CERES_eth_usd_pricer = await ChainlinkETHUSDPriceConsumerTest.at(await instanceCERES.eth_usd_pricer());

        wethInstance = await WETH.deployed();
        oracle_instance_CERES_WETH = await UniswapPairOracle_CERES_WETH.deployed();
        oracle_instance_CSS_WETH = await UniswapPairOracle_CSS_WETH.deployed();
    });

    it ('check ceres.getCeresEthOracle_consult(), its default value is SIX_HUNDRED_DEC6', async() => {
        const expected_value = parseFloat(SIX_HUNDRED_DEC6);
        expect(parseFloat(await instanceCERES.getCeresEthOracle_consult())).to.equal(expected_value);
    });

    it ('check ceres.getCSSEthOracle_consult(), its default value is EIGHT_HUNDRED_DEC6', async() => {
        const expected_value = parseFloat(EIGHT_HUNDRED_DEC6);
        expect(parseFloat(await instanceCERES.getCSSEthOracle_consult())).to.equal(expected_value);
    });

    it ('check ceres.css_eth_oracle_address(), its default value is oracle_instance_CSS_WETH.address', async() => {
        const expected_value = await oracle_instance_CSS_WETH.address;
        expect(await instanceCERES.css_eth_oracle_address.call()).to.equal(expected_value);
    });

    it ('check ceres.CSSEthOracle(), its default value is oracle_instance_CSS_WETH.address', async() => {
        const expected_value = await oracle_instance_CSS_WETH.address;
        expect(await instanceCERES.CSSEthOracle.call()).to.equal(expected_value);
    });
});
