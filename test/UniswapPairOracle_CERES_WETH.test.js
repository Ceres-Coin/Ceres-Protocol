const BigNumber = require('bignumber.js');
const BN = BigNumber.clone({ DECIMAL_PLACES: 9 })
const chalk = require('chalk');
const { assert, expect,chai} = require('chai');
const { expectEvent, send, shouldFail, time, constants, balance} = require('@openzeppelin/test-helpers');

const CEREStable = artifacts.require("Ceres/CEREStable");
const WETH = artifacts.require("ERC20/WETH");
const ChainlinkETHUSDPriceConsumerTest = artifacts.require("Oracle/ChainlinkETHUSDPriceConsumerTest");
const UniswapPairOracle_CERES_WETH = artifacts.require("Oracle/Variants/UniswapPairOracle_CERES_WETH");
const UniswapV2Factory = artifacts.require("Uniswap/UniswapV2Factory");
const UniswapV2Pair = artifacts.require("Uniswap/UniswapV2Pair");

// set constants
const BIG6 = new BigNumber("1e6");
const BIG18 = new BigNumber("1e18");
const ONE_MILLION_DEC18 = new BigNumber("1000000e18");
const SIX_HUNDRED_DEC18 = new BigNumber("600e18");
const ONE_DEC18 = new BigNumber("1e18");


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
    let ceresInstance;
    let instanceOracle_chainlink_ETH_USD
    let wethInstance;
    let pair_instance_CERES_WETH;
    beforeEach(async() => { 
        oracle_instance_CERES_WETH = await UniswapPairOracle_CERES_WETH.deployed();
        uniswapFactoryInstance = await UniswapV2Factory.deployed(); 
        wethInstance = await WETH.deployed();
        ceresInstance = await CEREStable.deployed();
        const pair_addr_CERES_WETH = await uniswapFactoryInstance.getPair(ceresInstance.address, wethInstance.address, { from: OWNER });
        pair_instance_CERES_WETH = await UniswapV2Pair.at(pair_addr_CERES_WETH);
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

    it('check oracle_instance_CERES_WETH.CONSULT_LENIENCY is 120', async() => {
        const expected_value = 120;
        expect(parseFloat(await oracle_instance_CERES_WETH.CONSULT_LENIENCY.call())).to.equal(expected_value);
    });

    it('check oracle_instance_CERES_WETH.ALLOW_STALE_CONSULTS is true', async() => {
        const expected_value = true;
        expect(await oracle_instance_CERES_WETH.ALLOW_STALE_CONSULTS.call()).to.equal(expected_value);
    });

    it('check oracle_instance_CERES_WETH.pair equal to pair_instance_CERES_WETH', async() => {
        expect(await oracle_instance_CERES_WETH.pair.call()).to.equal(pair_instance_CERES_WETH.address);
    });

    it('check oracle_instance_CERES_WETH.pair_address() equal to pair_instance_CERES_WETH', async() => {
        expect(await oracle_instance_CERES_WETH.pair_address.call()).to.equal(pair_instance_CERES_WETH.address);
    });

    it('check oracle_instance_CERES_WETH.token0 & token1 equal to ceres & weth', async() => {
        const token0 = await oracle_instance_CERES_WETH.token0.call();
        const token1 = await oracle_instance_CERES_WETH.token1.call();
        const first_CERES_WETH = token0 == ceresInstance.address;
        if (first_CERES_WETH) {
            expect(token0).to.equal(ceresInstance.address);
            expect(token1).to.equal(wethInstance.address);
        } else
        {
            expect(token0).to.equal(wethInstance.address);
            expect(token1).to.equal(ceresInstance.address);
        }
    });

    it ('check oracle_instance_CERES_WETH.price0CumulativeLast & price1CumulativeLast, its value is gt 0', async() => {
        const price0CumulativeLast = parseFloat(await oracle_instance_CERES_WETH.price0CumulativeLast.call());
        const price1CumulativeLast = parseFloat(await oracle_instance_CERES_WETH.price1CumulativeLast.call());

        // console.log(chalk.yellow(`price0CumulativeLast: ${price0CumulativeLast}`));
        // console.log(chalk.yellow(`price1CumulativeLast: ${price1CumulativeLast}`));

        expect(price0CumulativeLast).to.gt(0);
        expect(price1CumulativeLast).to.gt(0);
    });

    it ('check oracle_instance_CERES_WETH.price0Average & price1Average, its value is gt 0', async() => {
        const price0Average = parseFloat(await oracle_instance_CERES_WETH.price0Average.call());
        const price1Average = parseFloat(await oracle_instance_CERES_WETH.price1Average.call());

        // console.log(chalk.yellow(`price0Average: ${price0Average}`));
        // console.log(chalk.yellow(`price1Average: ${price1Average}`));

        expect(price0Average).to.gt(0);
        expect(price1Average).to.gt(0);
    });

    it ('check oracle_instance_CERES_WETH.reserve0 & reserve1, its value is gt 0', async() => {
        const reserve0 = parseFloat(await oracle_instance_CERES_WETH.reserve0.call());
        const reserve1 = parseFloat(await oracle_instance_CERES_WETH.reserve1.call());
        
        const first_CERES_WETH = (await oracle_instance_CERES_WETH.token0.call()) == ceresInstance.address;
        if (first_CERES_WETH) {
            expect(reserve0).to.equal(parseFloat(SIX_HUNDRED_DEC18));
            expect(reserve1).to.equal(parseFloat(ONE_DEC18));
        } else {
            expect(reserve0).to.equal(parseFloat(ONE_DEC18));
            expect(reserve1).to.equal(parseFloat(SIX_HUNDRED_DEC18));
        };
    });

    it('check oracle_instance_CERES_WETH.blockTimestampLast() is gt 0', async() => {
        expect(parseFloat(await oracle_instance_CERES_WETH.blockTimestampLast.call())).to.gt(0);
    });
    // FUNC TEST SCRIPTS
    it('check oracle_instance_CERES_WETH.setOwner()', async() => {
        // BEFORE
        expect(await oracle_instance_CERES_WETH.owner_address.call()).to.equal(OWNER);
        // ACTION & ASSERTION
        await oracle_instance_CERES_WETH.setOwner(TEST_ACCOUNT,{from: OWNER});
        expect(await oracle_instance_CERES_WETH.owner_address.call()).to.equal(TEST_ACCOUNT);

        // ROLLBACK CODE
        await oracle_instance_CERES_WETH.setOwner(OWNER,{from: TEST_ACCOUNT});
        expect(await oracle_instance_CERES_WETH.owner_address.call()).to.equal(OWNER);
    });

    it('check oracle_instance_CERES_WETH.setTimelock()', async() => {
        // BEFORE
        expect(await oracle_instance_CERES_WETH.timelock_address.call()).to.equal(OWNER);
        // ACTION & ASSERTION
        await oracle_instance_CERES_WETH.setTimelock(TEST_ACCOUNT,{from: OWNER});
        expect(await oracle_instance_CERES_WETH.timelock_address.call()).to.equal(TEST_ACCOUNT);

        // ROLLBACK CODE
        await oracle_instance_CERES_WETH.setTimelock(OWNER,{from: OWNER});
        expect(await oracle_instance_CERES_WETH.timelock_address.call()).to.equal(OWNER);
    });

    it('check oracle_instance_CERES_WETH.setPeriod() FUNC', async() => {
        // BEFORE
        const DEFAUT_VALUE = 5;
        const NEW_VALUE = 50;
        expect(parseFloat(await oracle_instance_CERES_WETH.PERIOD.call())).to.equal(DEFAUT_VALUE);
        // ACTION & ASSERTION
        await oracle_instance_CERES_WETH.setPeriod(NEW_VALUE,{from: OWNER});
        expect(parseFloat(await oracle_instance_CERES_WETH.PERIOD.call())).to.equal(NEW_VALUE);

        // ROLLBACK CODE
        await oracle_instance_CERES_WETH.setPeriod(DEFAUT_VALUE,{from: OWNER});
        expect(parseFloat(await oracle_instance_CERES_WETH.PERIOD.call())).to.equal(DEFAUT_VALUE);
    });

    it('check oracle_instance_CERES_WETH.setConsultLeniency() FUNC', async() => {
        // BEFORE
        const DEFAUT_VALUE = 120;
        const NEW_VALUE = 240;
        expect(parseFloat(await oracle_instance_CERES_WETH.CONSULT_LENIENCY.call())).to.equal(DEFAUT_VALUE);
        // ACTION & ASSERTION
        await oracle_instance_CERES_WETH.setConsultLeniency(NEW_VALUE,{from: OWNER});
        expect(parseFloat(await oracle_instance_CERES_WETH.CONSULT_LENIENCY.call())).to.equal(NEW_VALUE);

        // ROLLBACK CODE
        await oracle_instance_CERES_WETH.setConsultLeniency(DEFAUT_VALUE,{from: OWNER});
        expect(parseFloat(await oracle_instance_CERES_WETH.CONSULT_LENIENCY.call())).to.equal(DEFAUT_VALUE);
    });

    it('check oracle_instance_CERES_WETH.setAllowStaleConsults() FUNC', async() => {
        // BEFORE
        const DEFAUT_VALUE = true;
        const NEW_VALUE = false;
        expect(await oracle_instance_CERES_WETH.ALLOW_STALE_CONSULTS.call()).to.equal(DEFAUT_VALUE);
        // ACTION & ASSERTION
        await oracle_instance_CERES_WETH.setAllowStaleConsults(NEW_VALUE,{from: OWNER});
        expect(await oracle_instance_CERES_WETH.ALLOW_STALE_CONSULTS.call()).to.equal(NEW_VALUE);

        // ROLLBACK CODE
        await oracle_instance_CERES_WETH.setAllowStaleConsults(DEFAUT_VALUE,{from: OWNER});
        expect(await oracle_instance_CERES_WETH.ALLOW_STALE_CONSULTS.call()).to.equal(DEFAUT_VALUE);
    });





});
