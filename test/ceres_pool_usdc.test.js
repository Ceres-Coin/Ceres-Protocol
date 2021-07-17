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
const ERC20 = artifacts.require("ERC20");
const FakeCollateral_USDC = artifacts.require("FakeCollateral/FakeCollateral_USDC");
const ONE_MILLION_DEC18 = new BigNumber("1000000e18");
const ONE_HUNDRED_MILLION_DEC18 = new BigNumber("100000000e18");
const FIVE_MILLION_DEC18 = new BigNumber("5000000e18");
const BIG18 = new BigNumber("1e18");
const BIG6 = new BigNumber("1e6");

contract('contracts/Ceres/Pools/CeresPool.sol', async (accounts) => {
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

    let instanceCSS;
    let instanceCERES;
    let instance_Pool_USDC;
    let instance_Pool_USDC_collateral_token;
    beforeEach(async() => {
        instanceSampleERC20 = await ERC20.deployed();
        instanceCSS = await CEREShares.deployed();
        instanceCERES = await CEREStable.deployed();
        instance_Pool_USDC = await Pool_USDC.deployed();

        instance_Pool_USDC_collateral_token = await ERC20.at(await instance_Pool_USDC.collateral_token());
        instance_Pool_USDC_CERES = await CEREStable.at(await instance_Pool_USDC.CERES());
        instance_Pool_USDC_CSS = await CEREShares.at(await instance_Pool_USDC.CSS());
        col_instance_USDC = await FakeCollateral_USDC.deployed(); 
    });

    it('check instance_Pool_USDC.USDC_address is col_instance_USDC.address" ', async () => {
        // console.log(chalk.yellow(`USDC_address: ${await instance_Pool_USDC.USDC_address.call()}`));
        expect(await instance_Pool_USDC.USDC_address.call()).to.equal(col_instance_USDC.address);
    });

    it('check instance_Pool_USDC.ceres_contract_address is instanceCERES.address" ', async () => {
        expect(await instance_Pool_USDC.ceres_contract_address.call()).to.equal(instanceCERES.address);
    });

    it('check instance_Pool_USDC.css_contract_address is instanceCSS.address" ', async () => {
        expect(await instance_Pool_USDC.css_contract_address.call()).to.equal(instanceCSS.address);
    });

    it('check instance_Pool_USDC.collateral_address is col_instance_USDC.address" ', async () => {
        expect(await instance_Pool_USDC.collateral_address.call()).to.equal(col_instance_USDC.address);
    });

    it('check instance_Pool_USDC.owner_address is OWNER" ', async () => {
        expect(await instance_Pool_USDC.owner_address.call()).to.equal(OWNER);
    });

    it('check instance_Pool_USDC.timelock_address is OWNER" ', async () => {
        expect(await instance_Pool_USDC.timelock_address.call()).to.equal(OWNER);
    });

    it('check instance_Pool_USDC.pool_ceiling is FIVE_MILLION_DEC18', async() => {
        expect(parseFloat(await instance_Pool_USDC.pool_ceiling())).to.equal(parseFloat(FIVE_MILLION_DEC18));
    });

    it('check instance_Pool_USDC.missing_decimals is 0', async() => {
        expect(parseFloat(await instance_Pool_USDC.missing_decimals())).to.equal(0);
    });

    it('check collateral_token.symbol() = USDC', async() => {
        // console.log(chalk.blue(`instance_Pool_USDC_collateral_token: ${instance_Pool_USDC_collateral_token.address}`));
        // console.log(chalk.blue(`instance_Pool_USDC_CERES: ${instance_Pool_USDC_CERES.address}`));
        // console.log(chalk.blue(`instance_Pool_USDC_CSS: ${instance_Pool_USDC_CSS.address}`));
        const name_value = "USDC"
        expect(await instance_Pool_USDC_collateral_token.symbol.call()).to.equal(name_value);
    });

    it('check collateral_token.symbol() = "USDC"', async() => {
        const value = "USDC"
        expect(await instance_Pool_USDC_collateral_token.symbol.call()).to.equal(value);
    });

    it('check collateral_token.totalSupply() = ONE_HUNDRED_MILLION', async() => {
        const value = parseFloat(ONE_HUNDRED_MILLION_DEC18);
        expect(parseFloat(await instance_Pool_USDC_collateral_token.totalSupply.call())).to.equal(value);
    });

    it('check Pool_USDC.CERES.name() = CERES', async() => {
        const value = "CERES"
        expect(await instance_Pool_USDC_CERES.name.call()).to.equal(value);
    });

    it('check Pool_USDC.CERES.symbol() = CERES', async() => {
        const value = "CERES"
        expect(await instance_Pool_USDC_CERES.symbol.call()).to.equal(value);
    });

    it('check Pool_USDC.CERES.totalSupply() = ONE_MILLION_DEC18', async() => {
        const value = parseFloat(ONE_MILLION_DEC18);
        expect(parseFloat(await instance_Pool_USDC_CERES.totalSupply.call())).to.equal(value);
    });

    it('check Pool_USDC.CSS.name() = CERES Share', async() => {
        const value = "CERES Share"
        expect(await instance_Pool_USDC_CSS.name.call()).to.equal(value);
    });

    it('check Pool_USDC.CSS.symbol() = CSS', async() => {
        const value = "CSS"
        expect(await instance_Pool_USDC_CSS.symbol.call()).to.equal(value);
    });

    it('check Pool_USDC.CSS.totalSupply() = ONE_HUNDRED_MILLION_DEC18', async() => {
        const value = parseFloat(ONE_HUNDRED_MILLION_DEC18);
        expect(parseFloat(await instance_Pool_USDC_CSS.totalSupply.call())).to.equal(value);
    });

    it('check Pool_USDC.setOwner() func', async() => {
        // BEFORE
        expect(await instance_Pool_USDC.owner_address.call()).to.equal(OWNER);
        // ACTION & ASSERTION
        await instance_Pool_USDC.setOwner(TEST_ACCOUNT,{from: OWNER});
        expect(await instance_Pool_USDC.owner_address.call()).to.equal(TEST_ACCOUNT);

        // ROLLBACK CODE
        await instance_Pool_USDC.setOwner(OWNER,{from: OWNER});
        expect(await instance_Pool_USDC.owner_address.call()).to.equal(OWNER);
    });

    it('check Pool_USDC.setTimelock() func', async() => {
        // BEFORE
        expect(await instance_Pool_USDC.timelock_address.call()).to.equal(OWNER);
        // ACTION & ASSERTION
        await instance_Pool_USDC.setTimelock(TEST_ACCOUNT,{from: OWNER});
        expect(await instance_Pool_USDC.timelock_address.call()).to.equal(TEST_ACCOUNT);

        // ROLLBACK CODE
        await instance_Pool_USDC.setTimelock(OWNER,{from: OWNER});
        expect(await instance_Pool_USDC.timelock_address.call()).to.equal(OWNER);
    });

    it('check Pool_USDC.setPoolParameters() func', async() => {
        // BEFORE
        expect(parseFloat(await instance_Pool_USDC.pool_ceiling())).to.equal(parseFloat(FIVE_MILLION_DEC18));
        // ACTION & ASSERTION
        await instance_Pool_USDC.setPoolParameters(ONE_MILLION_DEC18,{from: OWNER});
        expect(parseFloat(await instance_Pool_USDC.pool_ceiling())).to.equal(parseFloat(ONE_MILLION_DEC18));

        // ROLLBACK CODE
        await instance_Pool_USDC.setPoolParameters(FIVE_MILLION_DEC18,{from: OWNER});
        expect(parseFloat(await instance_Pool_USDC.pool_ceiling())).to.equal(parseFloat(FIVE_MILLION_DEC18));
    });

    it('check instance_Pool_USDC.PRICE_PRECISION.call() = 1e6', async() => {
        const value = 1000000;
        expect(parseFloat(await instance_Pool_USDC.PRICE_PRECISION.call())).to.equal(parseFloat(value));
    });

    it('check instance_Pool_USDC.COLLATERAL_RATIO_PRECISION.call() = 1e6', async() => {
        const expected_value = new BigNumber("1e6");
        expect(parseFloat(await instance_Pool_USDC.COLLATERAL_RATIO_PRECISION.call())).to.equal(parseFloat(expected_value));
    });

    it('check instance_Pool_USDC.COLLATERAL_RATIO_MAX.call() = 1e6', async() => {
        const expected_value = new BigNumber("1e6");
        expect(parseFloat(await instance_Pool_USDC.COLLATERAL_RATIO_MAX.call())).to.equal(parseFloat(expected_value));
    });

    it('check instance_Pool_USDC.pausedPrice.call() = 0', async() => {
        const expected_value = new BigNumber("0");
        expect(parseFloat(await instance_Pool_USDC.pausedPrice.call())).to.equal(parseFloat(expected_value));
    });

    it('check instance_Pool_USDC.unclaimedPoolCollateral.call() = 0', async() => {
        const expected_value = new BigNumber("0");
        expect(parseFloat(await instance_Pool_USDC.unclaimedPoolCollateral.call())).to.equal(parseFloat(expected_value));
    });

    it('check instance_Pool_USDC.collateralPricePaused.call() = FALSE', async() => {
        const expected_value = false
        expect(await instance_Pool_USDC.collateralPricePaused.call()).to.equal(expected_value);
    });

    it('check instance_Pool_USDC.mintPaused.call() = FALSE', async() => {
        const expected_value = false
        expect(await instance_Pool_USDC.mintPaused.call()).to.equal(expected_value);
    });

    it('check instance_Pool_USDC.toggleMinting() FUNC', async() => {
        // BEFORE
        const DEFAUT_VALUE = false;
        const NEW_VALUE = true;
        expect(await instance_Pool_USDC.mintPaused.call()).to.equal(DEFAUT_VALUE);
        // ACTION & ASSERTION
        await instance_Pool_USDC.toggleMinting({from: OWNER});
        expect(await instance_Pool_USDC.mintPaused.call()).to.equal(NEW_VALUE);

        // ROLLBACK CODE
        await instance_Pool_USDC.toggleMinting({from: OWNER});
        expect(await instance_Pool_USDC.mintPaused.call()).to.equal(DEFAUT_VALUE);
    });

    it('check instance_Pool_USDC.toggleCollateralPricePaused() FUNC', async() => {
        // BEFORE
        const DEFAUT_VALUE = false;
        const NEW_VALUE = true;
        expect(await instance_Pool_USDC.collateralPricePaused.call()).to.equal(DEFAUT_VALUE);
        // ACTION & ASSERTION
        await instance_Pool_USDC.toggleCollateralPricePaused({from: OWNER});
        expect(await instance_Pool_USDC.collateralPricePaused.call()).to.equal(NEW_VALUE);

        // ROLLBACK CODE
        await instance_Pool_USDC.toggleCollateralPricePaused({from: OWNER});
        expect(await instance_Pool_USDC.collateralPricePaused.call()).to.equal(DEFAUT_VALUE);
    });

    it('check instance_Pool_USDC.setMinting_fee() FUNC', async() => {
        // BEFORE
        const DEFAUT_VALUE = 300;
        const NEW_VALUE = 600;
        expect(parseFloat(await instance_Pool_USDC.minting_fee.call())).to.equal(DEFAUT_VALUE);
        // ACTION & ASSERTION
        await instance_Pool_USDC.setMinting_fee(NEW_VALUE,{from: OWNER});
        expect(parseFloat(await instance_Pool_USDC.minting_fee.call())).to.equal(NEW_VALUE);

        // ROLLBACK CODE
        await instance_Pool_USDC.setMinting_fee(DEFAUT_VALUE,{from: OWNER});
        expect(parseFloat(await instance_Pool_USDC.minting_fee.call())).to.equal(DEFAUT_VALUE);
    });

    it('check instance_Pool_USDC.collat_eth_oracle_address.call(), its value is oracle_instance_USDC_WETH.address', async() => {
        const oracle_instance_USDC_WETH = await UniswapPairOracle_USDC_WETH.deployed();
        const expected_value = oracle_instance_USDC_WETH.address;
        expect(await instance_Pool_USDC.collat_eth_oracle_address.call()).to.equal(expected_value);
    });

    it('check instance_Pool_USDC.collatEthOracle.call(), its value is oracle_instance_USDC_WETH.address', async() => {
        const oracle_instance_USDC_WETH = await UniswapPairOracle_USDC_WETH.deployed();
        const expected_value = oracle_instance_USDC_WETH.address;
        expect(await instance_Pool_USDC.collatEthOracle.call()).to.equal(expected_value);
    });

    it('check instance_Pool_USDC.weth_address.call(), its value is wethInstance.address', async() => {
        const wethInstance = await WETH.deployed();
        const expected_value = wethInstance.address
        expect(await instance_Pool_USDC.weth_address.call()).to.equal(expected_value);
    });

    it('check instance_Pool_USDC.minting_fee.call() = 300', async() => {
        const expected_value = new BigNumber("300");
        expect(parseFloat(await instance_Pool_USDC.minting_fee.call())).to.equal(parseFloat(expected_value));
    });

    it('check instance_Pool_USDC.getCollateralPrice.call(), its default is gt(0)', async() => {
        const getCollateralPrice = parseFloat(await instance_Pool_USDC.getCollateralPrice.call());
        expect(getCollateralPrice).to.gt(0);
        // console.log(chalk.blue(`getCollateralPrice: ${getCollateralPrice}`));
    });

    it('check instance_Pool_USDC.redeemPaused.call() = FALSE', async() => {
        const expected_value = false
        expect(await instance_Pool_USDC.redeemPaused.call()).to.equal(expected_value);
    });

    it('check instance_Pool_USDC.toggleRedeeming() FUNC', async() => {
        // BEFORE
        const DEFAUT_VALUE = false;
        const NEW_VALUE = true;
        expect(await instance_Pool_USDC.redeemPaused.call()).to.equal(DEFAUT_VALUE);
        // ACTION & ASSERTION
        await instance_Pool_USDC.toggleRedeeming({from: OWNER});
        expect(await instance_Pool_USDC.redeemPaused.call()).to.equal(NEW_VALUE);

        // ROLLBACK CODE
        await instance_Pool_USDC.toggleRedeeming({from: OWNER});
        expect(await instance_Pool_USDC.redeemPaused.call()).to.equal(DEFAUT_VALUE);
    });

    it('check instance_Pool_USDC.redemption_fee.call() = 400', async() => {
        const expected_value = new BigNumber("400");
        expect(parseFloat(await instance_Pool_USDC.redemption_fee.call())).to.equal(parseFloat(expected_value));
    });

    it('check instance_Pool_USDC.lastRedeemed.call(account0/1/2/3/4/5/6/7),its default value should be ALL ZERO', async() => {
        expect(parseFloat(await instance_Pool_USDC.lastRedeemed.call(account0))).to.equal(parseFloat(0));
        expect(parseFloat(await instance_Pool_USDC.lastRedeemed.call(account1))).to.equal(parseFloat(0));
        expect(parseFloat(await instance_Pool_USDC.lastRedeemed.call(account2))).to.equal(parseFloat(0));
        expect(parseFloat(await instance_Pool_USDC.lastRedeemed.call(account3))).to.equal(parseFloat(0));
        expect(parseFloat(await instance_Pool_USDC.lastRedeemed.call(account4))).to.equal(parseFloat(0));
        expect(parseFloat(await instance_Pool_USDC.lastRedeemed.call(account5))).to.equal(parseFloat(0));
        expect(parseFloat(await instance_Pool_USDC.lastRedeemed.call(account6))).to.equal(parseFloat(0));
        expect(parseFloat(await instance_Pool_USDC.lastRedeemed.call(account7))).to.equal(parseFloat(0));
    });

    it('check instance_Pool_USDC.redeemCollateralBalances.call(account0/1/2/3/4/5/6/7),its default value should be ALL ZERO', async() => {
        expect(parseFloat(await instance_Pool_USDC.redeemCollateralBalances.call(account0))).to.equal(parseFloat(0));
        expect(parseFloat(await instance_Pool_USDC.redeemCollateralBalances.call(account1))).to.equal(parseFloat(0));
        expect(parseFloat(await instance_Pool_USDC.redeemCollateralBalances.call(account2))).to.equal(parseFloat(0));
        expect(parseFloat(await instance_Pool_USDC.redeemCollateralBalances.call(account3))).to.equal(parseFloat(0));
        expect(parseFloat(await instance_Pool_USDC.redeemCollateralBalances.call(account4))).to.equal(parseFloat(0));
        expect(parseFloat(await instance_Pool_USDC.redeemCollateralBalances.call(account5))).to.equal(parseFloat(0));
        expect(parseFloat(await instance_Pool_USDC.redeemCollateralBalances.call(account6))).to.equal(parseFloat(0));
        expect(parseFloat(await instance_Pool_USDC.redeemCollateralBalances.call(account7))).to.equal(parseFloat(0));
    });

    it('check instance_Pool_USDC.unclaimedPoolCSS.call() = 0', async() => {
        const expected_value = new BigNumber("0");
        expect(parseFloat(await instance_Pool_USDC.unclaimedPoolCSS.call())).to.equal(parseFloat(expected_value));
    });

    it('check instance_Pool_USDC.redeemCSSBalances.call(account0/1/2/3/4/5/6/7),its default value should be ALL ZERO', async() => {
        expect(parseFloat(await instance_Pool_USDC.redeemCSSBalances.call(account0))).to.equal(parseFloat(0));
        expect(parseFloat(await instance_Pool_USDC.redeemCSSBalances.call(account1))).to.equal(parseFloat(0));
        expect(parseFloat(await instance_Pool_USDC.redeemCSSBalances.call(account2))).to.equal(parseFloat(0));
        expect(parseFloat(await instance_Pool_USDC.redeemCSSBalances.call(account3))).to.equal(parseFloat(0));
        expect(parseFloat(await instance_Pool_USDC.redeemCSSBalances.call(account4))).to.equal(parseFloat(0));
        expect(parseFloat(await instance_Pool_USDC.redeemCSSBalances.call(account5))).to.equal(parseFloat(0));
        expect(parseFloat(await instance_Pool_USDC.redeemCSSBalances.call(account6))).to.equal(parseFloat(0));
        expect(parseFloat(await instance_Pool_USDC.redeemCSSBalances.call(account7))).to.equal(parseFloat(0));
    });

    it('check instance_Pool_USDC.redemption_delay.call() = 0', async() => {
        const expected_value = new BigNumber("0");
        expect(parseFloat(await instance_Pool_USDC.redemption_delay.call())).to.equal(parseFloat(expected_value));
    });

    it('check instance_Pool_USDC.buyback_fee.call() = 100', async() => {
        const expected_value = new BigNumber("100");
        expect(parseFloat(await instance_Pool_USDC.buyback_fee.call())).to.equal(parseFloat(expected_value));
    });

    it('check instance_Pool_USDC.recollat_fee.call() = 100', async() => {
        const expected_value = new BigNumber("100");
        expect(parseFloat(await instance_Pool_USDC.recollat_fee.call())).to.equal(parseFloat(expected_value));
    });

    it('check instance_Pool_USDC.bonus_rate.call() = 7500', async() => {
        const expected_value = new BigNumber("7500");
        expect(parseFloat(await instance_Pool_USDC.bonus_rate.call())).to.equal(parseFloat(expected_value));
    });

    it('check instance_Pool_USDC.recollateralizePaused.call() = FALSE', async() => {
        const expected_value = false
        expect(await instance_Pool_USDC.recollateralizePaused.call()).to.equal(expected_value);
    });

    it('check instance_Pool_USDC.setRedemption_fee() FUNC', async() => {
        // BEFORE
        const DEFAUT_VALUE = new BigNumber(400);
        const NEW_VALUE = new BigNumber(800);
        expect(parseFloat(await instance_Pool_USDC.redemption_fee.call())).to.equal(parseFloat(DEFAUT_VALUE));
        // ACTION & ASSERTION
        await instance_Pool_USDC.setRedemption_fee(NEW_VALUE,{from: OWNER});
        expect(parseFloat(await instance_Pool_USDC.redemption_fee.call())).to.equal(parseFloat(NEW_VALUE));

        // ROLLBACK CODE
        await instance_Pool_USDC.setRedemption_fee(DEFAUT_VALUE,{from: OWNER});
        expect(parseFloat(await instance_Pool_USDC.redemption_fee.call())).to.equal(parseFloat(DEFAUT_VALUE));
    });

    it('check instance_Pool_USDC.setBuyback_fee() FUNC', async() => {
        // BEFORE
        const DEFAUT_VALUE = new BigNumber(100);
        const NEW_VALUE = new BigNumber(200);
        expect(parseFloat(await instance_Pool_USDC.buyback_fee.call())).to.equal(parseFloat(DEFAUT_VALUE));
        // ACTION & ASSERTION
        await instance_Pool_USDC.setBuyback_fee(NEW_VALUE,{from: OWNER});
        expect(parseFloat(await instance_Pool_USDC.buyback_fee.call())).to.equal(parseFloat(NEW_VALUE));

        // ROLLBACK CODE
        await instance_Pool_USDC.setBuyback_fee(DEFAUT_VALUE,{from: OWNER});
        expect(parseFloat(await instance_Pool_USDC.buyback_fee.call())).to.equal(parseFloat(DEFAUT_VALUE));
    });

    it('check instance_Pool_USDC.setRecollat_fee() FUNC', async() => {
        // BEFORE
        const DEFAUT_VALUE = new BigNumber(100);
        const NEW_VALUE = new BigNumber(200);
        expect(parseFloat(await instance_Pool_USDC.recollat_fee.call())).to.equal(parseFloat(DEFAUT_VALUE));
        // ACTION & ASSERTION
        await instance_Pool_USDC.setRecollat_fee(NEW_VALUE,{from: OWNER});
        expect(parseFloat(await instance_Pool_USDC.recollat_fee.call())).to.equal(parseFloat(NEW_VALUE));

        // ROLLBACK CODE
        await instance_Pool_USDC.setRecollat_fee(DEFAUT_VALUE,{from: OWNER});
        expect(parseFloat(await instance_Pool_USDC.recollat_fee.call())).to.equal(parseFloat(DEFAUT_VALUE));
    });

    it('check instance_Pool_USDC.setBonus_rate() FUNC', async() => {
        // BEFORE
        const DEFAUT_VALUE = new BigNumber(7500);
        const NEW_VALUE = new BigNumber(10000);
        expect(parseFloat(await instance_Pool_USDC.bonus_rate.call())).to.equal(parseFloat(DEFAUT_VALUE));
        // ACTION & ASSERTION
        await instance_Pool_USDC.setBonus_rate(NEW_VALUE,{from: OWNER});
        expect(parseFloat(await instance_Pool_USDC.bonus_rate.call())).to.equal(parseFloat(NEW_VALUE));

        // ROLLBACK CODE
        await instance_Pool_USDC.setBonus_rate(DEFAUT_VALUE,{from: OWNER});
        expect(parseFloat(await instance_Pool_USDC.bonus_rate.call())).to.equal(parseFloat(DEFAUT_VALUE));
    });

    it('check instance_Pool_USDC.toggleRecollateralize() FUNC', async() => {
        // BEFORE
        const DEFAUT_VALUE = false;
        const NEW_VALUE = true;
        expect(await instance_Pool_USDC.recollateralizePaused.call()).to.equal(DEFAUT_VALUE);
        // ACTION & ASSERTION
        await instance_Pool_USDC.toggleRecollateralize({from: OWNER});
        expect(await instance_Pool_USDC.recollateralizePaused.call()).to.equal(NEW_VALUE);

        // ROLLBACK CODE
        await instance_Pool_USDC.toggleRecollateralize({from: OWNER});
        expect(await instance_Pool_USDC.recollateralizePaused.call()).to.equal(DEFAUT_VALUE);
    });

    it('check instance_Pool_USDC.collatDollarBalance()', async() => {
        const collatDollarBalance = new BigNumber(await instance_Pool_USDC.collatDollarBalance.call()).div(BIG18);
        const collatAmount = new BigNumber(await col_instance_USDC.balanceOf(instance_Pool_USDC.address)).div(BIG18);
        const getCollateralPrice = new BigNumber(await instance_Pool_USDC.getCollateralPrice.call()).div(BIG6);
        console.log(chalk.blue(`collatDollarBalance: ${collatDollarBalance}`));
        console.log(chalk.blue(`collatAmount: ${collatAmount}`));
        console.log(chalk.blue(`getCollateralPrice: ${getCollateralPrice}`));

        expect(parseFloat(collatDollarBalance)).to.gt(0);
    });

    it('check instanceCERES.globalCollateralValue()', async() => {
        const globalCollateralValue = new BigNumber(await instanceCERES.globalCollateralValue.call()).div(BIG18);
        console.log(chalk.blue(`globalCollateralValue: ${globalCollateralValue}`));
        expect(parseFloat(globalCollateralValue)).to.gt(0);
    })

});
