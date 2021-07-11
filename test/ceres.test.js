const BigNumber = require('bignumber.js');
const BN = BigNumber.clone({ DECIMAL_PLACES: 9 })
const chalk = require('chalk');
const { assert, expect,chai} = require('chai');
const { expectEvent, send, shouldFail, time, constants, balance} = require('@openzeppelin/test-helpers');

const CEREStable = artifacts.require("Ceres/CEREStable");
const ONE_MILLION_DEC18 = new BigNumber("1000000e18");

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
    beforeEach(async() => {
        instanceCERES = await CEREStable.deployed();
    });

    it('check CERES name = "CERES" ', async () => {
        const NAME_VALUE = 'CERES';
        expect(await instanceCERES.name()).to.equal(NAME_VALUE);
    });

    it('check CERES symbol = "CERES" ', async () => {
        const SYMBOL_VALUE = 'CERES';
        expect(await instanceCERES.symbol()).to.equal(SYMBOL_VALUE);
    });

    it('check CERES decimals = 18 ', async () => {
        const decimals_VALUE = 18;
        expect(parseFloat(await instanceCERES.decimals())).to.equal(decimals_VALUE);
    });

    it('check CERES creator_address = OWNER ', async () => {
        expect(await instanceCERES.creator_address()).to.equal(OWNER);
    });

    it('check CERES timelock_address = OWNER ', async () => {
        expect(await instanceCERES.timelock_address()).to.equal(OWNER);
    });

    it('check CERES DEFAULT_ADMIN_ADDRESS = OWNER ', async () => {
        expect(await instanceCERES.DEFAULT_ADMIN_ADDRESS()).to.equal(OWNER);
    });

    it('check CERES owner_address = OWNER ', async () => {
        expect(await instanceCERES.owner_address()).to.equal(OWNER);
    });

    it('check CERES genesis_supply = ONE_MILLION_DEC18 ', async () => {
        expect(parseFloat(await instanceCERES.genesis_supply())).to.equal(parseFloat(ONE_MILLION_DEC18));
    });

    it('check ceres.balanceOf(creator_address) = ONE_MILLION_DEC18', async() => {
        expect(parseFloat(await instanceCERES.balanceOf(await instanceCERES.creator_address()))).to.equal(parseFloat(ONE_MILLION_DEC18));
    });

    it ('check ceres.ceres_pools(creator_address) = false', async() => {
        expect(await instanceCERES.ceres_pools.call(await instanceCERES.creator_address())).to.equal(false);
    });

    it ('check ceres.ceres_pools(owner_address) = false', async() => {
        expect(await instanceCERES.ceres_pools.call(await instanceCERES.owner_address())).to.equal(false);
    });

    it ('check ceres.ceres_pools(OWNER) = false', async() => {
        expect(await instanceCERES.ceres_pools.call(OWNER)).to.equal(false);
    });

    it ('check ceres.addPool(ADMIN,{from: OWNER}) + removePool(ADMIN,{from: OWNER})', async() => {
        // BEFORE
        expect(await instanceCERES.ceres_pools.call(ADMIN)).to.equal(false);
        // ACTION
        await instanceCERES.addPool(ADMIN,{from: OWNER});
        expect(await instanceCERES.ceres_pools.call(ADMIN)).to.equal(true);

        // ROLLBACK CODE
        await instanceCERES.removePool(ADMIN,{from: OWNER});
        expect(await instanceCERES.ceres_pools.call(ADMIN)).to.equal(false);
    });

    it ('check ceres.pool_mint(account3,100)',async() => {
        const POOL_MINT_VALUE = 1000;
        await instanceCERES.addPool(ADMIN,{from: OWNER});
        expect(await instanceCERES.ceres_pools.call(ADMIN)).to.equal(true);

        expect(parseFloat(await instanceCERES.balanceOf(account3))).to.equal(0);
        await instanceCERES.pool_mint(account3,POOL_MINT_VALUE,{from: ADMIN});
        expect(parseFloat(await instanceCERES.balanceOf(account3))).to.equal(POOL_MINT_VALUE);
        
        // ROLLBACK CODE
        await instanceCERES.removePool(ADMIN,{from: OWNER});
        expect(await instanceCERES.ceres_pools.call(ADMIN)).to.equal(false);
    });

    it ('check ceres.pool_mint(account3,100),without addPool()',async() => {
        // uncomment below code for revert error
        // uncomment below code for revert error
        // uncomment below code for revert error
        // await instanceCERES.pool_mint(account3,100,{from: ADMIN});
    });

    it('check ceres.controller_address, its default value is ZERO_ADDRESS ', async () => {
        expect(await instanceCERES.controller_address.call()).to.equal(constants.ZERO_ADDRESS);
    });

    it('check ceres.setController()', async () => {
        // BEFORE
        expect(await instanceCERES.controller_address.call()).to.equal(constants.ZERO_ADDRESS);
        // ACTION & ASSERTION
        await instanceCERES.setController(TEST_ACCOUNT,{from: OWNER});
        expect(await instanceCERES.controller_address.call()).to.equal(TEST_ACCOUNT);

        // ROLLBACK CODE
        await instanceCERES.setController(constants.ZERO_ADDRESS,{from: TEST_ACCOUNT});
        expect(await instanceCERES.controller_address.call()).to.equal(constants.ZERO_ADDRESS);
    });
});
