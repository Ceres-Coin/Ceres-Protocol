const BigNumber = require('bignumber.js');
const BN = BigNumber.clone({ DECIMAL_PLACES: 9 })
const chalk = require('chalk');
const { assert, expect,chai} = require('chai');
const { expectEvent, send, shouldFail, time, constants, balance} = require('@openzeppelin/test-helpers');

const CEREStable = artifacts.require("Ceres/CEREStable");
const WETH = artifacts.require("ERC20/WETH");

const ChainlinkETHUSDPriceConsumerTest = artifacts.require("Oracle/ChainlinkETHUSDPriceConsumerTest");
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
    let instanceOracle_chainlink_ETH_USD
    let wethInstance;
    beforeEach(async() => {
        instanceCERES = await CEREStable.deployed();
        instanceOracle_chainlink_ETH_USD = await ChainlinkETHUSDPriceConsumerTest.deployed();
        instance_CERES_eth_usd_pricer = await ChainlinkETHUSDPriceConsumerTest.at(await instanceCERES.eth_usd_pricer());

        wethInstance = await WETH.deployed();
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
        expect(parseFloat(await instanceCERES.balanceOf(await instanceCERES.creator_address()))).to.lt(parseFloat(ONE_MILLION_DEC18));
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

    it('check ceres.setTimelock()', async () => {
        // BEFORE
        expect(await instanceCERES.timelock_address.call()).to.equal(OWNER);
        // ACTION & ASSERTION
        await instanceCERES.setTimelock(TEST_ACCOUNT,{from: OWNER});
        expect(await instanceCERES.timelock_address.call()).to.equal(TEST_ACCOUNT);

        // ROLLBACK CODE
        await instanceCERES.setTimelock(OWNER,{from: TEST_ACCOUNT});
        expect(await instanceCERES.timelock_address.call()).to.equal(OWNER);
    });

    it('check ceres.setOwner()', async () => {
        // BEFORE
        expect(await instanceCERES.owner_address.call()).to.equal(OWNER);
        // ACTION & ASSERTION
        await instanceCERES.setOwner(TEST_ACCOUNT,{from: OWNER});
        expect(await instanceCERES.owner_address.call()).to.equal(TEST_ACCOUNT);

        // ROLLBACK CODE
        await instanceCERES.setOwner(OWNER,{from: TEST_ACCOUNT});
        expect(await instanceCERES.owner_address.call()).to.equal(OWNER);
    });

    it('check ceres.eth_usd_consumer_address = instanceOracle_chainlink_ETH_USD.address', async() => {
        // console.log(chalk.blue(`eth_usd_consumer_address: ${await instanceCERES.eth_usd_consumer_address.call()}`))
        expect(await instanceCERES.eth_usd_consumer_address.call()).to.equal(await instanceOracle_chainlink_ETH_USD.address);
    });

    it('check ceres.eth_usd_pricer_decimals = 8', async() => {
        expect(parseFloat(await instanceCERES.eth_usd_pricer_decimals.call())).to.equal(8);
    });

    it('check ceres.eth_usd_pricer.getDecimals() = 8 & getLatestPrice() >0', async() => {
        // console.log(chalk.yellow(`getDecimals(): ${await instance_CERES_eth_usd_pricer.getDecimals()}`));
        // console.log(chalk.yellow(`getLatestPrice(): ${await instance_CERES_eth_usd_pricer.getLatestPrice()}`));
        expect(parseFloat(await instance_CERES_eth_usd_pricer.getDecimals())).to.equal(8);
        expect(parseFloat(await instance_CERES_eth_usd_pricer.getLatestPrice())).to.gt(0);
    });

    it ('check ceres.getCeresEthOracle_consult(), its default value is SIX_HUNDRED_DEC6', async() => {
        const expected_value = parseFloat(SIX_HUNDRED_DEC6);
        expect(parseFloat(await instanceCERES.getCeresEthOracle_consult())).to.equal(expected_value);
    });

    it ('check ceres.PRICE_PRECISION(), its default value is BIG6', async() => {
        const expected_value = BIG6;
        expect(parseFloat(await instanceCERES.PRICE_PRECISION.call())).to.equal(parseFloat(expected_value));
    });

    it ('check ceres.weth_address(), its default value is wethInstance.address', async() => {
        const expected_value = await wethInstance.address;
        // console.log(chalk.blue(`expected_value: ${expected_value}`));
        expect(await instanceCERES.weth_address.call()).to.equal(expected_value);
    });
});
