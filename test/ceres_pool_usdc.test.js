const BigNumber = require('bignumber.js');
const BN = BigNumber.clone({ DECIMAL_PLACES: 9 })
const chalk = require('chalk');
const { assert, expect,chai} = require('chai');
const { expectEvent, send, shouldFail, time, constants, balance} = require('@openzeppelin/test-helpers');

const CEREStable = artifacts.require("Ceres/CEREStable");
const CEREShares = artifacts.require("CSS/CEREShares");
const Pool_USDC = artifacts.require("Ceres/Pools/Pool_USDC");
const ONE_MILLION_DEC18 = new BigNumber("1000000e18");
const ONE_HUNDRED_MILLION_DEC18 = new BigNumber("100000000e18");

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
    beforeEach(async() => {
        instanceCSS = await CEREShares.deployed();
        instanceCERES = await CEREStable.deployed();
        instance_Pool_USDC = await Pool_USDC.deployed();
    });
        
});
