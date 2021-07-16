const BigNumber = require('bignumber.js');
const BN = BigNumber.clone({ DECIMAL_PLACES: 9 })
const chalk = require('chalk');
const { assert, expect,chai} = require('chai');
const { expectEvent, send, shouldFail, time, constants, balance} = require('@openzeppelin/test-helpers');

const CEREStable = artifacts.require("Ceres/CEREStable");
const CEREShares = artifacts.require("CSS/CEREShares");
const Pool_USDC = artifacts.require("Ceres/Pools/Pool_USDC");
const UniswapPairOracle_USDC_WETH = artifacts.require("Oracle/Variants/UniswapPairOracle_USDC_WETH");
const WETH = artifacts.require("ERC20/WETH");
const FakeCollateral_USDC = artifacts.require("FakeCollateral/FakeCollateral_USDC");
const ERC20 = artifacts.require("ERC20");
const ONE_DEC18 = new BigNumber("1e18");
const ONE_MILLION_DEC18 = new BigNumber("1000000e18");
const ONE_HUNDRED_MILLION_DEC18 = new BigNumber("100000000e18");
const FIVE_MILLION_DEC18 = new BigNumber("5000000e18");
const BIG6 = new BigNumber("1e6");
const BIG18 = new BigNumber("1e18");

contract('contracts/Ceres/Pools/CeresPool.sol', async (accounts) => {
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

    let cssInstance;
    let ceresInstance;
    let instance_Pool_USDC;
    let instance_Pool_USDC_collateral_token;
    let col_instance_USDC;
    beforeEach(async() => {
        cssInstance = await CEREShares.deployed();
        ceresInstance = await CEREStable.deployed();
        instance_Pool_USDC = await Pool_USDC.deployed();

        instance_Pool_USDC_collateral_token = await ERC20.at(await instance_Pool_USDC.collateral_token());
        instance_Pool_USDC_CERES = await CEREStable.at(await instance_Pool_USDC.CERES());
        instance_Pool_USDC_CSS = await CEREShares.at(await instance_Pool_USDC.CSS());
        col_instance_USDC = await FakeCollateral_USDC.deployed(); 
    });

    it('check instance_Pool_USDC.mint1t1CERES()', async() => {
        // ACTION
		const collateral_amount = ONE_DEC18;
        const collateral_price = parseFloat(new BigNumber(await instance_Pool_USDC.getCollateralPrice.call()).div(BIG6));
		const ceres_out_min = new BigNumber(collateral_amount.times(collateral_price).times(0.99)); // 1% slippage
		await instance_Pool_USDC.mint1t1CERES(collateral_amount, ceres_out_min, { from: OWNER });
    });

    it('check instance_Pool_USDC.mint1t1CERES() PART 2', async() => {
        const totalSupplyCERES = new BigNumber(await ceresInstance.totalSupply.call()).div(BIG18).toNumber();
		const totalSupplyCSS = new BigNumber(await cssInstance.totalSupply.call()).div(BIG18).toNumber();
        const global_collateral_ratio = new BigNumber(await ceresInstance.global_collateral_ratio.call()).toNumber();

		// Note the collateral and CERES amounts before minting
		const ceres_before = new BigNumber(await ceresInstance.balanceOf.call(OWNER)).div(BIG18);
		const usdc_before = new BigNumber(await col_instance_USDC.balanceOf.call(OWNER)).div(BIG18);
		const pool_usdc_before = new BigNumber(await col_instance_USDC.balanceOf.call(instance_Pool_USDC.address)).div(BIG18);
		const collateral_price = (new BigNumber(await instance_Pool_USDC.getCollateralPrice.call()).div(BIG6)).toNumber()

        console.log(chalk.yellow(`totalSupplyCERES: ${totalSupplyCERES}`));
        console.log(chalk.yellow(`totalSupplyCSS: ${totalSupplyCSS}`));
		console.log(chalk.yellow(`global_collateral_ratio: ${global_collateral_ratio}`));

		console.log(chalk.blue(`ceres_before: ${ceres_before}`));
		console.log(chalk.blue(`usdc_before: ${usdc_before}`));
		console.log(chalk.blue(`pool_usdc_before: ${pool_usdc_before}`));
		console.log(chalk.blue(`collateral_price: ${collateral_price}`));

        // ACTION
		const collateral_amount = ONE_DEC18;
		await instance_Pool_USDC.mint1t1CERES(collateral_amount, collateral_amount, { from: OWNER });

        // ASSERTION
        const totalSupplyCERES_AFTER = new BigNumber(await ceresInstance.totalSupply.call()).div(BIG18).toNumber();
		const totalSupplyCSS_AFTER = new BigNumber(await cssInstance.totalSupply.call()).div(BIG18).toNumber();
        const global_collateral_ratio_AFTER = new BigNumber(await ceresInstance.global_collateral_ratio.call()).toNumber();

		// Note the collateral and CERES amounts before minting
		const ceres_AFTER = new BigNumber(await ceresInstance.balanceOf.call(OWNER)).div(BIG18);
		const usdc_AFTER = new BigNumber(await col_instance_USDC.balanceOf.call(OWNER)).div(BIG18);
		const pool_usdc_AFTER = new BigNumber(await col_instance_USDC.balanceOf.call(instance_Pool_USDC.address)).div(BIG18);
		const collateral_price_AFTER = (new BigNumber(await instance_Pool_USDC.getCollateralPrice.call()).div(BIG6)).toNumber()

        console.log(chalk.red(`=============================== SEPERATOR ============================`));
        console.log(chalk.yellow(`totalSupplyCERES_AFTER: ${totalSupplyCERES_AFTER}`));
        console.log(chalk.yellow(`totalSupplyCSS_AFTER: ${totalSupplyCSS_AFTER}`));
		console.log(chalk.yellow(`global_collateral_ratio_AFTER: ${global_collateral_ratio_AFTER}`));

		console.log(chalk.blue(`ceres_AFTER: ${ceres_AFTER}`));
		console.log(chalk.blue(`usdc_AFTER: ${usdc_AFTER}`));
		console.log(chalk.blue(`pool_usdc_AFTER: ${pool_usdc_AFTER}`));
		console.log(chalk.blue(`collateral_price_AFTER: ${collateral_price_AFTER}`));
    });

    it('check instance_Pool_USDC.mintFractionalCERES()', async() => {
        const DEFAUT_VALUE = 1000000;
        const NEW_VALUE = 900000;
        await ceresInstance.set_global_collateral_ratio(NEW_VALUE,{from: OWNER});

        
		// PRINT BEFORE PARAMETERS
        const totalSupplyCERES_before = new BigNumber(await ceresInstance.totalSupply.call()).div(BIG18).toNumber();
		const totalSupplyCSS_before = new BigNumber(await cssInstance.totalSupply.call()).div(BIG18).toNumber();
        const global_collateral_ratio_before = new BigNumber(await ceresInstance.global_collateral_ratio.call()).toNumber();

		const ceres_before = new BigNumber(await ceresInstance.balanceOf.call(OWNER)).div(BIG18);
        const css_before = new BigNumber(await cssInstance.balanceOf.call(OWNER)).div(BIG18);
		const usdc_before = new BigNumber(await col_instance_USDC.balanceOf.call(OWNER)).div(BIG18);
		const pool_usdc_before = new BigNumber(await col_instance_USDC.balanceOf.call(instance_Pool_USDC.address)).div(BIG18);
		const collateral_price = (new BigNumber(await instance_Pool_USDC.getCollateralPrice.call()).div(BIG6)).toNumber()
        console.log(chalk.red(`=============================== SEPERATOR BEFORE ============================`));
        console.log(chalk.yellow(`totalSupplyCERES_before: ${totalSupplyCERES_before}`));
        console.log(chalk.yellow(`totalSupplyCSS_before: ${totalSupplyCSS_before}`));
		console.log(chalk.yellow(`global_collateral_ratio_before: ${global_collateral_ratio_before}`));

		console.log(chalk.blue(`ceres_before: ${ceres_before}`));
        console.log(chalk.blue(`css_before: ${css_before}`));
		console.log(chalk.blue(`usdc_before: ${usdc_before}`));
		console.log(chalk.blue(`pool_usdc_before: ${pool_usdc_before}`));
		console.log(chalk.blue(`collateral_price: ${collateral_price}`));

        // ACTION
		const collateral_amount = ONE_DEC18;
		await instance_Pool_USDC.mintFractionalCERES(collateral_amount, collateral_amount, collateral_amount, { from: OWNER });

        // ROLLBACK CODE
        await ceresInstance.set_global_collateral_ratio(DEFAUT_VALUE,{from: OWNER});
        expect(parseFloat(await ceresInstance.global_collateral_ratio.call())).to.equal(DEFAUT_VALUE);

        // PRINT AFTER PARAMETERS
        const totalSupplyCERES_AFTER = new BigNumber(await ceresInstance.totalSupply.call()).div(BIG18).toNumber();
		const totalSupplyCSS_AFTER = new BigNumber(await cssInstance.totalSupply.call()).div(BIG18).toNumber();
        const global_collateral_ratio_AFTER = new BigNumber(await ceresInstance.global_collateral_ratio.call()).toNumber();

		// Note the collateral and CERES amounts before minting
		const ceres_AFTER = new BigNumber(await ceresInstance.balanceOf.call(OWNER)).div(BIG18);
        const css_AFTER = new BigNumber(await cssInstance.balanceOf.call(OWNER)).div(BIG18);
		const usdc_AFTER = new BigNumber(await col_instance_USDC.balanceOf.call(OWNER)).div(BIG18);
		const pool_usdc_AFTER = new BigNumber(await col_instance_USDC.balanceOf.call(instance_Pool_USDC.address)).div(BIG18);
		const collateral_price_AFTER = (new BigNumber(await instance_Pool_USDC.getCollateralPrice.call()).div(BIG6)).toNumber()
        console.log(chalk.red(`=============================== SEPERATOR AFTER ============================`));
        console.log(chalk.yellow(`totalSupplyCERES_AFTER: ${totalSupplyCERES_AFTER}`));
        console.log(chalk.yellow(`totalSupplyCSS_AFTER: ${totalSupplyCSS_AFTER}`));
		console.log(chalk.yellow(`global_collateral_ratio_AFTER: ${global_collateral_ratio_AFTER}`));

		console.log(chalk.blue(`ceres_AFTER: ${ceres_AFTER}`));
        console.log(chalk.blue(`css_AFTER: ${css_AFTER}`));
		console.log(chalk.blue(`usdc_AFTER: ${usdc_AFTER}`));
		console.log(chalk.blue(`pool_usdc_AFTER: ${pool_usdc_AFTER}`));
		console.log(chalk.blue(`collateral_price_AFTER: ${collateral_price_AFTER}`));
    });

    it('check instance_Pool_USDC.mintAlgorithmicCERES()', async() => {
        // PREPARE
        const DEFAUT_VALUE = 1000000;
        const NEW_VALUE = 0;
        await ceresInstance.set_global_collateral_ratio(NEW_VALUE,{from: OWNER});

        // PRINT BEFORE PARAMETERS
        const totalSupplyCERES_before = new BigNumber(await ceresInstance.totalSupply.call()).div(BIG18).toNumber();
        const totalSupplyCSS_before = new BigNumber(await cssInstance.totalSupply.call()).div(BIG18).toNumber();
        const global_collateral_ratio_before = new BigNumber(await ceresInstance.global_collateral_ratio.call()).toNumber();

        const ceres_before = new BigNumber(await ceresInstance.balanceOf.call(OWNER)).div(BIG18);
        const css_before = new BigNumber(await cssInstance.balanceOf.call(OWNER)).div(BIG18);
        const usdc_before = new BigNumber(await col_instance_USDC.balanceOf.call(OWNER)).div(BIG18);
        const pool_usdc_before = new BigNumber(await col_instance_USDC.balanceOf.call(instance_Pool_USDC.address)).div(BIG18);
        const collateral_price = (new BigNumber(await instance_Pool_USDC.getCollateralPrice.call()).div(BIG6)).toNumber()
        console.log(chalk.red(`=============================== SEPERATOR BEFORE ============================`));
        console.log(chalk.yellow(`totalSupplyCERES_before: ${totalSupplyCERES_before}`));
        console.log(chalk.yellow(`totalSupplyCSS_before: ${totalSupplyCSS_before}`));
        console.log(chalk.yellow(`global_collateral_ratio_before: ${global_collateral_ratio_before}`));

        console.log(chalk.blue(`ceres_before: ${ceres_before}`));
        console.log(chalk.blue(`css_before: ${css_before}`));
        console.log(chalk.blue(`usdc_before: ${usdc_before}`));
        console.log(chalk.blue(`pool_usdc_before: ${pool_usdc_before}`));
        console.log(chalk.blue(`collateral_price: ${collateral_price}`));

        // ACTION
		const collateral_amount = ONE_DEC18;
		await instance_Pool_USDC.mintAlgorithmicCERES(collateral_amount, collateral_amount, { from: OWNER });

        // ROLLBACK CODE
        await ceresInstance.set_global_collateral_ratio(DEFAUT_VALUE,{from: OWNER});
        expect(parseFloat(await ceresInstance.global_collateral_ratio.call())).to.equal(DEFAUT_VALUE);

        // PRINT AFTER PARAMETERS
        const totalSupplyCERES_AFTER = new BigNumber(await ceresInstance.totalSupply.call()).div(BIG18).toNumber();
		const totalSupplyCSS_AFTER = new BigNumber(await cssInstance.totalSupply.call()).div(BIG18).toNumber();
        const global_collateral_ratio_AFTER = new BigNumber(await ceresInstance.global_collateral_ratio.call()).toNumber();
		const ceres_AFTER = new BigNumber(await ceresInstance.balanceOf.call(OWNER)).div(BIG18);
        const css_AFTER = new BigNumber(await cssInstance.balanceOf.call(OWNER)).div(BIG18);
		const usdc_AFTER = new BigNumber(await col_instance_USDC.balanceOf.call(OWNER)).div(BIG18);
		const pool_usdc_AFTER = new BigNumber(await col_instance_USDC.balanceOf.call(instance_Pool_USDC.address)).div(BIG18);
		const collateral_price_AFTER = (new BigNumber(await instance_Pool_USDC.getCollateralPrice.call()).div(BIG6)).toNumber()
        
        console.log(chalk.red(`=============================== SEPERATOR AFTER ============================`));
        console.log(chalk.yellow(`totalSupplyCERES_AFTER: ${totalSupplyCERES_AFTER}`));
        console.log(chalk.yellow(`totalSupplyCSS_AFTER: ${totalSupplyCSS_AFTER}`));
		console.log(chalk.yellow(`global_collateral_ratio_AFTER: ${global_collateral_ratio_AFTER}`));
		console.log(chalk.blue(`ceres_AFTER: ${ceres_AFTER}`));
        console.log(chalk.blue(`css_AFTER: ${css_AFTER}`));
		console.log(chalk.blue(`usdc_AFTER: ${usdc_AFTER}`));
		console.log(chalk.blue(`pool_usdc_AFTER: ${pool_usdc_AFTER}`));
		console.log(chalk.blue(`collateral_price_AFTER: ${collateral_price_AFTER}`));
    });
});
