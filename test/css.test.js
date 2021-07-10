const BigNumber = require('bignumber.js');
const BN = BigNumber.clone({ DECIMAL_PLACES: 9 })
const chalk = require('chalk');
const { assert, expect,chai} = require('chai');

const CEREStable = artifacts.require("Ceres/CEREStable");
const CEREShares = artifacts.require("CSS/CEREShares");
const ONE_MILLION_DEC18 = new BigNumber("1000000e18");

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
    });

    it('check CSS name = "CERES Share" ', async () => {
        const NAME_VALUE = 'CERES Share';
        expect(await instanceCSS.name()).to.equal(NAME_VALUE);
    });

    it('check CSS symbol = "CSS" ', async () => {
        const SYMBOL_VALUE = 'CSS';
        expect(await instanceCSS.symbol()).to.equal(SYMBOL_VALUE);
    });

    
});
