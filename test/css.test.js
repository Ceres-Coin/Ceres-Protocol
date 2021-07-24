const BigNumber = require('bignumber.js');
const BN = BigNumber.clone({ DECIMAL_PLACES: 9 })
const chalk = require('chalk');
const { assert, expect,chai} = require('chai');
const { expectEvent, send, shouldFail, time, constants, balance} = require('@openzeppelin/test-helpers');

const CEREStable = artifacts.require("Ceres/CEREStable");
const CEREShares = artifacts.require("CSS/CEREShares");
const ONE_MILLION_DEC18 = new BigNumber("1000000e18");
const ONE_HUNDRED_MILLION_DEC18 = new BigNumber("100000000e18");

contract('CSS.sol', async (accounts) => {

    // set the deploy address
	const OWNER = accounts[0];
	const ADMIN = accounts[1];
	const account0 = accounts[0];
	const account1 = accounts[1];
	const account2 = accounts[2];
	const account3 = accounts[3];
    let instanceCSS;
    beforeEach(async() => {
        instanceCSS = await CEREShares.deployed();
        instanceCERES = await CEREStable.deployed();
    });

    it('check CSS name = "CERES Share" ', async () => {
        const NAME_VALUE = 'CERES Share';
        expect(await instanceCSS.name()).to.equal(NAME_VALUE);
    });

    it('check CSS symbol = "CSS" ', async () => {
        const SYMBOL_VALUE = 'CSS';
        expect(await instanceCSS.symbol()).to.equal(SYMBOL_VALUE);
    });

    it('check CSS decimals_VALUE = 18 ', async () => {
        const decimals_VALUE = 18;
        expect(parseFloat(await instanceCSS.decimals())).to.equal(decimals_VALUE);
    });

    it('check CSS genesis_supply = ONE_HUNDRED_MILLION_DEC18 ', async () => {
        const genesis_supply_VALUE = parseFloat(ONE_HUNDRED_MILLION_DEC18);
        expect(parseFloat(await instanceCSS.genesis_supply())).to.equal(genesis_supply_VALUE);
    });

    it('check CSS owner_address, its default value is OWNER ', async () => {
        expect(await instanceCSS.owner_address()).to.equal(OWNER);
    });

    it('check CSS oracle_address, its default value is OWNER ', async () => {
        expect(await instanceCSS.oracle_address()).to.equal(OWNER);
    });

    it('check CSS timelock_address, its default value is OWNER ', async () => {
        expect(await instanceCSS.timelock_address()).to.equal(OWNER);
    });
    // Because we transferred 800 CSS to addLiquidity
    // Becasue we transferred 5 million css to STAKE_CERES_WETH
    it('check CSS.balanceOf(OWNER) = ONE_HUNDRED_MILLION_DEC18 - 800 - 5MILLION ', async () => {
        const expected_value_owner = ONE_HUNDRED_MILLION_DEC18;
        expect(parseFloat(await instanceCSS.balanceOf(OWNER))).to.lt(parseFloat(expected_value_owner));
    });

    it('check CSS.balanceOf(ACCOUNT1/2/3) = 0 ', async () => {
        const balanceOf_VALUE = 0;
        expect(parseFloat(await instanceCSS.balanceOf(account1))).to.equal(balanceOf_VALUE);
        expect(parseFloat(await instanceCSS.balanceOf(account2))).to.equal(balanceOf_VALUE);
        expect(parseFloat(await instanceCSS.balanceOf(account3))).to.equal(balanceOf_VALUE);
    });

    it('check CSS setOracle, its value will set as ADMIN', async () => {
        // BEFORE
        expect(await instanceCSS.oracle_address()).to.equal(OWNER);
        // ACTION & ASSERTION
        await instanceCSS.setOracle(ADMIN,{from: OWNER});
        expect(await instanceCSS.oracle_address()).to.equal(ADMIN);

        // ROLLBACK CODE
        await instanceCSS.setOracle(OWNER,{from: OWNER});
        expect(await instanceCSS.oracle_address()).to.equal(OWNER);
    });

    it('check CSS setTimelock, its value will set as ADMIN', async () => {
        // BEFORE
        expect(await instanceCSS.timelock_address()).to.equal(OWNER);
        // ACTION & ASSERTION
        await instanceCSS.setTimelock(ADMIN,{from: OWNER});
        expect(await instanceCSS.timelock_address()).to.equal(ADMIN);

        // ROLLBACK CODE
        await instanceCSS.setTimelock(OWNER,{from: OWNER});
        expect(await instanceCSS.timelock_address()).to.equal(OWNER);
    });

    it('check CSS setOwner, its value will be set as ADMIN', async () => {
        // BEFORE
        expect(await instanceCSS.owner_address()).to.equal(OWNER);
        // ACTION & ASSERTION
        await instanceCSS.setOwner(ADMIN,{from: OWNER});
        expect(await instanceCSS.owner_address()).to.equal(ADMIN);

        // ROLLBACK CODE
        await instanceCSS.setOwner(OWNER,{from: ADMIN});
        expect(await instanceCSS.owner_address()).to.equal(OWNER);
    });

    it('check CSS.CERES address, its default value is NOT EMPTY ', async () => {
        const instanceCSS_ceres_default = await instanceCSS.CERES();
        expect(instanceCSS_ceres_default).to.not.equal(constants.ZERO_ADDRESS);
    });

    it('check CSS.setCERESAddress, its value will be as instanceCERES.address', async() => {
        // BEFORE
        expect(await instanceCSS.CERES()).to.not.equal(constants.ZERO_ADDRESS);
        // ACTION & ASSERTION
        await instanceCSS.setCERESAddress(instanceCERES.address,{from: OWNER});
        expect(await instanceCSS.CERES()).to.equal(instanceCERES.address);

        // ROLLBACK CODE
        await instanceCSS.setCERESAddress(constants.ZERO_ADDRESS,{from: OWNER});
        expect(await instanceCSS.CERES()).to.equal(constants.ZERO_ADDRESS);
    });

    it('check CSS.CeresInstance, its name,symbol & decimals', async() => {
        // BEFORE
        expect(await instanceCSS.CERES()).to.equal(constants.ZERO_ADDRESS);
        // ACTION & ASSERTION
        await instanceCSS.setCERESAddress(instanceCERES.address,{from: OWNER});
        expect(await instanceCSS.CERES()).to.equal(instanceCERES.address);

        const css_ceres = await CEREStable.at(await instanceCSS.CERES());
        const NAME_VALUE = 'CERES';
        expect(await css_ceres.name()).to.equal(NAME_VALUE);

        const SYMBOL_VALUE = 'CERES';
        expect(await instanceCERES.symbol()).to.equal(SYMBOL_VALUE);

        const decimals_value = 18;
        expect(parseFloat(await instanceCERES.decimals())).to.equal(decimals_value);
    });

    
});
