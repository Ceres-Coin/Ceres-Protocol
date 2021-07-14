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


contract('contracts/Ceres/Ceres.sol', async (accounts) => {

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

    it ('check ceres.ceres_price(), its default value is gt(0)', async() => {
        // console.log(chalk.blue(parseFloat(await instanceCERES.ceres_price.call())));
        const expected_value = 0;
        expect(parseFloat(await instanceCERES.ceres_price.call())).to.gt(expected_value);
    });

    it ('check ceres.css_price(), its default value is gt(0)', async() => {
        // console.log(chalk.blue(parseFloat(await instanceCERES.css_price.call())));
        const expected_value = 0;
        expect(parseFloat(await instanceCERES.css_price.call())).to.gt(expected_value);
    });

    it ('check ceres.eth_usd_price(), its default value is gt(0)', async() => {
        // console.log(chalk.blue(parseFloat(await instanceCERES.eth_usd_price.call())));
        const expected_value = 0;
        expect(parseFloat(await instanceCERES.eth_usd_price.call())).to.gt(expected_value);
    });

    it ('check ceres.ceres_step.call(), its default value is equal to 2500', async() => {
        const expected_value = 2500;
        expect(parseFloat(await instanceCERES.ceres_step.call())).to.equal(expected_value);
    });

    it ('check ceres.refresh_cooldown.call(), its default value is equal to 60', async() => {
        const expected_value = 60;
        expect(parseFloat(await instanceCERES.refresh_cooldown.call())).to.equal(expected_value);
    });

    it ('check ceres.price_target.call(), its default value is equal to 1000000', async() => {
        const expected_value = 1000000;
        expect(parseFloat(await instanceCERES.price_target.call())).to.equal(expected_value);
    });

    it ('check ceres.price_band.call(), its default value is equal to 5000', async() => {
        const expected_value = 5000;
        expect(parseFloat(await instanceCERES.price_band.call())).to.equal(expected_value);
    });

    it ('check ceres.global_collateral_ratio.call(), its default value is equal to 1000000', async() => {
        const expected_value = 1000000;
        expect(parseFloat(await instanceCERES.global_collateral_ratio.call())).to.equal(expected_value);
    });

    // TEST SCRIPTS OF RESTRICTED FUNC()
    it('check instanceCERES.setCeresStep() FUNC', async() => {
        // BEFORE
        const DEFAUT_VALUE = 2500;
        const NEW_VALUE = 5000;
        expect(parseFloat(await instanceCERES.ceres_step.call())).to.equal(DEFAUT_VALUE);
        // ACTION & ASSERTION
        await instanceCERES.setCeresStep(NEW_VALUE,{from: OWNER});
        expect(parseFloat(await instanceCERES.ceres_step.call())).to.equal(NEW_VALUE);

        // ROLLBACK CODE
        await instanceCERES.setCeresStep(DEFAUT_VALUE,{from: OWNER});
        expect(parseFloat(await instanceCERES.ceres_step.call())).to.equal(DEFAUT_VALUE);
    });

    it('check instanceCERES.setRefreshCooldown() FUNC', async() => {
        // BEFORE
        const DEFAUT_VALUE = 60;
        const NEW_VALUE = 120;
        expect(parseFloat(await instanceCERES.refresh_cooldown.call())).to.equal(DEFAUT_VALUE);
        // ACTION & ASSERTION
        await instanceCERES.setRefreshCooldown(NEW_VALUE,{from: OWNER});
        expect(parseFloat(await instanceCERES.refresh_cooldown.call())).to.equal(NEW_VALUE);

        // ROLLBACK CODE
        await instanceCERES.setRefreshCooldown(DEFAUT_VALUE,{from: OWNER});
        expect(parseFloat(await instanceCERES.refresh_cooldown.call())).to.equal(DEFAUT_VALUE);
    });
});
