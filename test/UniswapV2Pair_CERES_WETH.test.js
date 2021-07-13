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

    it('check pair_instance_CERES_WETH.address ', async () => {
        // console.log(chalk.blue(`pair_instance_CERES_WETH: ${pair_instance_CERES_WETH.address}`));
        expect(pair_instance_CERES_WETH.address).not.to.be.empty;
    });

    it('check pair_instance_CERES_WETH.name.call(), its value is "Uniswap V2"', async() => {
        const expected_value = "Uniswap V2";
        expect(await pair_instance_CERES_WETH.name.call()).to.equal(expected_value);
    });

    it('check pair_instance_CERES_WETH.symbol.call(), its value is "UNI-V2"', async() => {
        const expected_value = "UNI-V2";
        expect(await pair_instance_CERES_WETH.symbol.call()).to.equal(expected_value);
    });

    it('check pair_instance_CERES_WETH.decimals.call(), its value is 18', async() => {
        const expected_value = 18;
        expect(parseFloat(await pair_instance_CERES_WETH.decimals.call())).to.equal(expected_value);
    });

    it('check pair_instance_CERES_WETH.totalSupply.call(), its value is gt 0', async() => {
        // console.log(parseFloat(await pair_instance_CERES_WETH.totalSupply.call()));
        const expected_value = 0;
        expect(parseFloat(await pair_instance_CERES_WETH.totalSupply.call())).to.gt(expected_value);
    });

});
