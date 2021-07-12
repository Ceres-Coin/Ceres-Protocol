const BigNumber = require('bignumber.js');
const BN = BigNumber.clone({ DECIMAL_PLACES: 9 })
const chalk = require('chalk');
const { assert, expect,chai} = require('chai');
const { expectEvent, send, shouldFail, time, constants, balance} = require('@openzeppelin/test-helpers');

const CEREStable = artifacts.require("Ceres/CEREStable");
const CEREShares = artifacts.require("CSS/CEREShares");
const Pool_USDC = artifacts.require("Ceres/Pools/Pool_USDC");
const ERC20 = artifacts.require("ERC20");
const ONE_MILLION_DEC18 = new BigNumber("1000000e18");
const ONE_HUNDRED_MILLION_DEC18 = new BigNumber("100000000e18");
const FIVE_MILLION_DEC18 = new BigNumber("5000000e18");

contract('CeresPool', async (accounts) => {

    // set the deploy address
	const OWNER = accounts[0];
	const ADMIN = accounts[1];
	const account0 = accounts[0];
	const account1 = accounts[1];
	const account2 = accounts[2];
	const account3 = accounts[3];
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
    });

    it('check instance_Pool_USDC.USDC_address is instanceSampleERC20.address" ', async () => {
        // console.log(chalk.yellow(`USDC_address: ${await instance_Pool_USDC.USDC_address.call()}`));
        expect(await instance_Pool_USDC.USDC_address.call()).to.equal(instanceSampleERC20.address);
    });

    it('check instance_Pool_USDC.ceres_contract_address is instanceCERES.address" ', async () => {
        expect(await instance_Pool_USDC.ceres_contract_address.call()).to.equal(instanceCERES.address);
    });

    it('check instance_Pool_USDC.css_contract_address is instanceCSS.address" ', async () => {
        expect(await instance_Pool_USDC.css_contract_address.call()).to.equal(instanceCSS.address);
    });

    it('check instance_Pool_USDC.collateral_address is instanceSampleERC20.address" ', async () => {
        expect(await instance_Pool_USDC.collateral_address.call()).to.equal(instanceSampleERC20.address);
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

    it('check instance_Pool_USDC_collateral_token.name() = sample', async() => {
        // console.log(chalk.blue(`instance_Pool_USDC_collateral_token: ${instance_Pool_USDC_collateral_token.address}`));
        // console.log(chalk.blue(`instance_Pool_USDC_CERES: ${instance_Pool_USDC_CERES.address}`));
        // console.log(chalk.blue(`instance_Pool_USDC_CSS: ${instance_Pool_USDC_CSS.address}`));
        const name_value = "sample"
        expect(await instance_Pool_USDC_collateral_token.name.call()).to.equal(name_value);
    });

    it('check collateral_token.symbol() = "sample"', async() => {
        const value = "sample"
        expect(await instance_Pool_USDC_collateral_token.symbol.call()).to.equal(value);
    });

});
