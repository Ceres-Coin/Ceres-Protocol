const BigNumber = require('bignumber.js');
const BN = BigNumber.clone({ DECIMAL_PLACES: 9 })
const chalk = require('chalk');
const { assert, expect,chai} = require('chai');

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

    
});
