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



});
