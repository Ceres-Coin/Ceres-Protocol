# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.14.0](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.13.0...v1.14.0) (2021-07-15)


### Features

* **contracts/ceres/ceres.sol:** [ADDED][CONTRACTS][FUNC]: 'ceres_info' ([f901c55](https://github.com/Ceres-Coin/Ceres-Protocol/commit/f901c556618f11738b9ec225cb98ead623abc5a9))
* **contracts/ceres/pools/cerespool.sol:** [ADDED][CONTRACTS][FUNC]: 'setMinting_fee()' FUNC ([f75c67c](https://github.com/Ceres-Coin/Ceres-Protocol/commit/f75c67c9f01dfbbb9d9789f33367b9d000d3857a))
* **contracts/ceres/pools/cerespool.sol:** [ADDED][CONTRACTS][FUNC]: ADDED 'toggleMinting()' & 'toggleCollateralPricePaused()' ([ce55504](https://github.com/Ceres-Coin/Ceres-Protocol/commit/ce55504674c32fd9df81371f5f89eb1334cfc500))
* **contracts/ceres/pools/cerespool.sol:** [ADDED][CONTRACTS][FUNC]: ADDED "import "../../Oracle/UniswapPairOracle.sol";" ([e243d14](https://github.com/Ceres-Coin/Ceres-Protocol/commit/e243d14a244f49f8993995e6dd8f9de0bf11f03c))
* **contracts/fakecollateral/fakecollateral.sol; contracts/fakecollateral/fakecollateral_6dec.sol; contracts/fakecollateral/fakecollateral_usdc.sol:** [CREATED][NEW][CONTRACTS]: 'contracts/FakeCollateral/FakeCollateral.sol' & 'FakeCollateral_6DEC.sol' & 'FakeCollateral_USDC.sol' ([5fa2ada](https://github.com/Ceres-Coin/Ceres-Protocol/commit/5fa2ada184acbec2fd35c805029d95cc348579d5))
* **contracts/oracle/variants/uniswappairoracle_usdc_weth.sol:** [CREATED][NEW][CONTRACTS]: CREATED "contracts/Oracle/Variants/UniswapPairOracle_USDC_WETH.sol" ([1af2397](https://github.com/Ceres-Coin/Ceres-Protocol/commit/1af2397b1b36f343f75c16f4ff4b535c9636a2a4))
* **migrations/2_deploy_contracts.js:** [ADDED][DEPLOYMENT SCRIPTS]: ADDED DEPLOYMENT OF 'FakeCollateral_USDC' ([ba2c588](https://github.com/Ceres-Coin/Ceres-Protocol/commit/ba2c5884e9213ea5dc47ce6f6366f2b160f830bc))
* **migrations/2_deploy_contracts.js:** [IMPORTANT][CHANGE]: ADDED CORE FUNC() "mint1t1CERES" IN "contracts/Ceres/Pools/CeresPool.sol" & Other PARAMETERS & OTHER FUNC() ([84751fe](https://github.com/Ceres-Coin/Ceres-Protocol/commit/84751fecd50be34859600b0f5e53c21ffcc90162))
* **migrations/3_deploy_uniswap_oracle_weth.js:** [ADDED][DEPLOYMENT SCRIPTS]: 'pool_instance_USDC.setCollatETHOracle' & 'await ceresInstance.addPool(pool_instance_USDC.address)' ([13da866](https://github.com/Ceres-Coin/Ceres-Protocol/commit/13da866d5239776d4a16da052da56420b5a42755))
* **migrations/3_deploy_uniswap_oracle_weth.js:** [ADDED][DEPLOYMENT SCRIPTS]: 'pool_instance_USDC.setCollatETHOracle(oracle_instance_USDC_WETH.address)' ([59497c6](https://github.com/Ceres-Coin/Ceres-Protocol/commit/59497c6f748ee6ab2f2416c0343309a2b602d9ed))
* **migrations/3_deploy_uniswap_oracle_weth.js:** [ADDED][DEPLOYMENT SCRIPTS]: await uniswapFactoryInstance.createPair(col_instance_USDC.address, wethInstance.address, { from: OWNER }) ([0203e59](https://github.com/Ceres-Coin/Ceres-Protocol/commit/0203e5993d961a47e83ca9d403fa7cff9ee310bb))


### Docs

* **contracts/ceres/ceres.sol:** [ADDED][COMMENTS][TEST CASE DONE] & [REMOVED][TODO TASKS] ([a29da1d](https://github.com/Ceres-Coin/Ceres-Protocol/commit/a29da1d06e273ae6c184126ce6843b61c3212d94))


### Tests

* **test/ceres_p2.test.js:** [ADDED][TEST SCRIPTS]: 'check instanceCERES.ceres_info.call()[0] & [1]' ([756f2f2](https://github.com/Ceres-Coin/Ceres-Protocol/commit/756f2f297a74348799f5f7648a896d82d8db8420))
* **test/ceres_p2.test.js:** [ADDED][TEST SCRIPTS]: 'check instanceCERES.ceres_info.call()[2], it default value is equal to totalSupply()' ([ccd4a9e](https://github.com/Ceres-Coin/Ceres-Protocol/commit/ccd4a9e339794dc4234b02c243515ce41bc9466e))
* **test/ceres_p2.test.js:** [ADDED][TEST SCRIPTS]: 'check instanceCERES.ceres_info.call()[3], it default value is equal to global_collateral_ratio()' ([d212ef1](https://github.com/Ceres-Coin/Ceres-Protocol/commit/d212ef19a848b2c395324fdf8fd4e77ef3f92c90))
* **test/ceres_p2.test.js:** [ADDED][TEST SCRIPTS]: 'check instanceCERES.ceres_info.call()[4], it default value is equal to eth_usd_price()' ([2c8210a](https://github.com/Ceres-Coin/Ceres-Protocol/commit/2c8210a7708a5296d18667b100d51b0893d0ed40))
* **test/ceres_pool_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC_CERES.COLLATERAL_RATIO_MAX.call() = 1e6' ([c2de02b](https://github.com/Ceres-Coin/Ceres-Protocol/commit/c2de02b03c7a6ceb8e0889d17ab85e8d06b98320))
* **test/ceres_pool_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC_CERES.COLLATERAL_RATIO_PRECISION.call() = 1e6' ([b94a792](https://github.com/Ceres-Coin/Ceres-Protocol/commit/b94a79276b5d160a18ae083c1d384d635ff35f40))
* **test/ceres_pool_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC_CERES.collateralPricePaused.call() = FALSE' ([7ff0462](https://github.com/Ceres-Coin/Ceres-Protocol/commit/7ff046255e3a42b77fc06c90be61b99c53bc5e8d))
* **test/ceres_pool_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC_CERES.mintPaused.call() = FALSE' ([0214787](https://github.com/Ceres-Coin/Ceres-Protocol/commit/02147876a0a6d859c65b70a8216cb153bc6c8ec8))
* **test/ceres_pool_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC_CERES.pausedPrice.call() = 0' ([f9ae99b](https://github.com/Ceres-Coin/Ceres-Protocol/commit/f9ae99b6d8e8f4cc9348b018917c6d443c1ff344))
* **test/ceres_pool_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC_CERES.PRICE_PRECISION.call() = 1e6' ([49e857a](https://github.com/Ceres-Coin/Ceres-Protocol/commit/49e857a86dffafae58c5b7436d0835c3541d3c73))
* **test/ceres_pool_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC_CERES.unclaimedPoolCollateral.call() = 0' ([afa6740](https://github.com/Ceres-Coin/Ceres-Protocol/commit/afa6740a64739700cb15da9b0f629bd421db18cb))
* **test/ceres_pool_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC.collat_eth_oracle_address.call()' ([5c3fb6d](https://github.com/Ceres-Coin/Ceres-Protocol/commit/5c3fb6d3a9baaee1aa33f92718d8e8e1673e48dc))
* **test/ceres_pool_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC.getCollateralPrice.call(), its default is gt(0)' ([65c9115](https://github.com/Ceres-Coin/Ceres-Protocol/commit/65c91159dc44112ad4560fd8e08d71d280997bf3))
* **test/ceres_pool_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC.minting_fee.call() = 300' ([8841d49](https://github.com/Ceres-Coin/Ceres-Protocol/commit/8841d493e81e36a55db03b49560dd71e2e8dd137))
* **test/ceres_pool_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC.setMinting_fee() FUNC' ([7e572cd](https://github.com/Ceres-Coin/Ceres-Protocol/commit/7e572cd4e3c946334b077bd91e20ab1d546047bd))
* **test/ceres_pool_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC.toggleCollateralPricePaused() FUNC' ([1341052](https://github.com/Ceres-Coin/Ceres-Protocol/commit/1341052ae98761a1a3fbf53e9a5ff2f9914f3123))
* **test/ceres_pool_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC.toggleMinting() FUNC' ([5710e89](https://github.com/Ceres-Coin/Ceres-Protocol/commit/5710e894fa2c749a6f6989e27bbe2fce50c29828))
* **test/ceres_pool_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC.weth_address.call(), its value is wethInstance.address' & 'check instance_Pool_USDC.collatEthOracle.call(), its value is oracle_instance_USDC_WETH.address' ([f4b8e16](https://github.com/Ceres-Coin/Ceres-Protocol/commit/f4b8e1699fe1a31e7accbacc8d61f5662f93d601))
* **test/fakecollateral_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check col_instance_USDC.balanceOf.call(OWNER), its default value is ONE_HUNDRED_MILLION_DEC18' ([8be1a1e](https://github.com/Ceres-Coin/Ceres-Protocol/commit/8be1a1e580e5d66ab07bfd00aa531cdab608ec59))
* **test/fakecollateral_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check col_instance_USDC.creator_address.call(), its default value is OWNER' ([649ea1a](https://github.com/Ceres-Coin/Ceres-Protocol/commit/649ea1a02fba8faf71de3ad6f5672f1d9769044c))
* **test/fakecollateral_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check col_instance_USDC.decimals.call(), its default value is 18' ([eefe34f](https://github.com/Ceres-Coin/Ceres-Protocol/commit/eefe34f9688799d1bb790806a103f7f6a79d06a2))
* **test/fakecollateral_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check col_instance_USDC.faucet()' & 'check col_instance_USDC.transfer(TEST_ACCOUNT,ONE_MILLION_DEC18)' ([3fcac6d](https://github.com/Ceres-Coin/Ceres-Protocol/commit/3fcac6d190be6b04096d4a55f885e2c3bd540e22))
* **test/fakecollateral_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check col_instance_USDC.genesis_supply.call(), its default value is ONE_HUNDRED_MILLION_DEC18' ([f4b974c](https://github.com/Ceres-Coin/Ceres-Protocol/commit/f4b974cc473aa49519b9f9b799d3711b4b3523fd))
* **test/fakecollateral_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check col_instance_USDC.symbol.call(), its default value is USDC' & [ADDED][TODO TASKS] ([c0fe4a7](https://github.com/Ceres-Coin/Ceres-Protocol/commit/c0fe4a7571fde534f5afad68fafe26551ff5534c))
* **test/fakecollateral_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check col_instance_USDC.totalSupply.call(), its default value is ONE_HUNDRED_MILLION_DEC18' ([0e7cba8](https://github.com/Ceres-Coin/Ceres-Protocol/commit/0e7cba8f5a6eab05f8699790a2a0c9f79f93d307))
* **test/fakecollateral_usdc.test.js:** [CREATED][NEW][TEST SCRIPTS FILE]: 'test/FakeCollateral_USDC.test.js' ([0dd2120](https://github.com/Ceres-Coin/Ceres-Protocol/commit/0dd2120b826009db4833d8dc111e5bb7429e313d))
* **test/fakecollateral_usdc.test.js:** [MODIFIED][TEST SCRIPTS]: TUNING TEST CASES FOR PASS ([3ef72b1](https://github.com/Ceres-Coin/Ceres-Protocol/commit/3ef72b185af0a3c1237a1853c4097e2e621ca754))
* **test/fakecollateral_usdc.test.js:** [MODIFIED][TEST SCRIPTS]: TUNING test scripts to PASS ([ff02ecc](https://github.com/Ceres-Coin/Ceres-Protocol/commit/ff02ecc19e46b3e398f70929cfc117c0b80e7c2f))
* **test/weth.test.js:** [MODIFIED][TEST SCRIPTS]: TUNING TEST CASES TO PASS ([47979ca](https://github.com/Ceres-Coin/Ceres-Protocol/commit/47979ca9358897ca8a93244add969fdd7af4414a))


### Styling

* **contracts/ceres/pools/cerespool.sol:** [ADDED][COMMENTS][TEST CASE DONE] & [REMOVED][TODO TASKS] ([3df242a](https://github.com/Ceres-Coin/Ceres-Protocol/commit/3df242ac0eaa7ccb11649909f2379c9a9c994ce6))
* **contracts/ceres/pools/cerespool.sol:** [ADDED][COMMENTS][TEST CASE DONE] & [REMOVED][TODO TASKS] ([e9a95e3](https://github.com/Ceres-Coin/Ceres-Protocol/commit/e9a95e315dd5103038a8e9a6dc31f289d14972a8))
* **contracts/ceres/pools/cerespool.sol:** [ADDED][COMMENTS][TEST CASE DONE] & [REMOVED][TODO TASKS] ([b5e984c](https://github.com/Ceres-Coin/Ceres-Protocol/commit/b5e984c0b13878cc49783cddf960bd2cca8b434a))
* **contracts/ceres/pools/cerespool.sol:** [ADDED][COMMENTS][TEST CASE DONE] & [REMOVED][TODO TASKS] ([1456b8d](https://github.com/Ceres-Coin/Ceres-Protocol/commit/1456b8d6abe05179e6e7af86b375b9ef2acb5520))
* **contracts/ceres/pools/cerespool.sol:** [ADDED][COMMENTS][TEST CASE DONE] & [REMOVED][TODO TASKS] ([da4d8f4](https://github.com/Ceres-Coin/Ceres-Protocol/commit/da4d8f45f75129b36a49f979595bb59a6fdeb158))
* **contracts/ceres/pools/cerespool.sol:** [REFORMATTING][MOVE CODE LOCATION] ([3ab152e](https://github.com/Ceres-Coin/Ceres-Protocol/commit/3ab152ef1715c27cba0c3ae9fc4ff70981c41aa5))
* **migrations/2_deploy_contracts.js:** [ADDED][COMMENTS][TEST CASE DONE] & [REMOVED][TODO TASKS] ([cd7b113](https://github.com/Ceres-Coin/Ceres-Protocol/commit/cd7b113835f9168878e26783caa7074f0ce79206))
* **test/ceres_pool_usdc.test.js:** [MODIFIED][COMMENTS] ([ba83fca](https://github.com/Ceres-Coin/Ceres-Protocol/commit/ba83fca57d55b5e2deab8c00cd9d0f82f64bda29))

## [1.13.0](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.12.6...v1.13.0) (2021-07-14)


### Features

* **contracts/ceres/ceres.sol:** [ADDED][CONTRACTS][FUNC]: 'set_last_call_time()' ([09d7c3c](https://github.com/Ceres-Coin/Ceres-Protocol/commit/09d7c3c0e3a362adab246f78e67ea4ca92122b90))
* **contracts/ceres/ceres.sol:** [ADDED][CONTRACTS][FUNC]: 'toggleCollateralRatio()' & 'refreshCollateralRatio()' & [ADDED][CONTRACTS][PARAMETERS]: 'collateral_ratio_paused' & 'last_call_time' ([b4e5baa](https://github.com/Ceres-Coin/Ceres-Protocol/commit/b4e5baa7aad4061c7b2d22b5a714061060b48733))
* **contracts/ceres/ceres.sol:** [ADDED][CONTRACTS][FUNC]: ADDED "eth_usd_price" FUNC IN contracts/Ceres/Ceres.sol ([3c2539d](https://github.com/Ceres-Coin/Ceres-Protocol/commit/3c2539d6530468ba167ad8a505e51eae0d0b2c83))
* **contracts/ceres/ceres.sol:** [ADDED][CONTRACTS][FUNC]: ADDED RESTRICTED FUNCTIONS setCeresStep()/setRefreshCooldown/setPriceTarget/setPriceBand/set_global_collateral_ratio ([8d5a230](https://github.com/Ceres-Coin/Ceres-Protocol/commit/8d5a2307d971819a1125ebee71b15585c7e36007))
* **contracts/ceres/pools:** [ADD][CONTRACTS][PARAMETERS]: ADD PARAMETERS ceres_step/refresh_cooldown/price_target/price_band/global_collateral_ratio ([9392f19](https://github.com/Ceres-Coin/Ceres-Protocol/commit/9392f198e86f7035c283d7464d2eeead9913a1ff))


### Bug Fixes

* **contracts/ceres/ceres.sol:** [ADD COMMENTS]: "TEST CASE DONE" & [REMOVE][TODO TASKS] ([96f903a](https://github.com/Ceres-Coin/Ceres-Protocol/commit/96f903af76c2213b3ec2b070e5f5f8461d3a3e84))
* **contracts/ceres/ceres.sol:** [ADD][CONTRACT CODE]: ADD PUBLIC FUNC "setCSSEthOracle" & PARAMETERS [css_eth_oracle_address]/[CSSEthOracle] ([7833af4](https://github.com/Ceres-Coin/Ceres-Protocol/commit/7833af4129aa799e7dfd09b5ada6a582418281dd))
* **contracts/ceres/ceres.sol:** [ADD][CONTRACTS FUNC]: contracts/Ceres/Ceres.sol ADD ceres_price() & css_price() public func ([42bcf72](https://github.com/Ceres-Coin/Ceres-Protocol/commit/42bcf72ab14192ec524cc13ac65e3256cdb7f28e))
* **contracts/ceres/ceres.sol:** [ADDED][FUNC][CONTRACTS]: contracts/Ceres/Ceres.sol ADDED PUBLIC func 'getCSSEthOracle_consult()' ([fcc8fd8](https://github.com/Ceres-Coin/Ceres-Protocol/commit/fcc8fd8e0b5b32f619bc85489b8ed79775fd4655))
* **contracts/ceres/ceres.sol:** [REMOVE][TODO TASK] & [ADD][COMMENTS]: "TEST CASE DONE" ([c762c62](https://github.com/Ceres-Coin/Ceres-Protocol/commit/c762c625f8c852c33608660512ddca58ba223651))
* **contracts/oracle/variants/uniswappairoracle_css_weth.sol:** [CREATED][NEW CONTRACT FILE]: 'contracts/Oracle/Variants/UniswapPairOracle_CSS_WETH.sol' ([5765920](https://github.com/Ceres-Coin/Ceres-Protocol/commit/576592064b260c999703ae4ca85ae99e6fe51887))
* **migrations/3_deploy_uniswap_oracle_weth.js:** [ADDED][DEPLOYMENT SCRIPTS]: 'migrations/3_deploy_Uniswap_Oracle_WETH.js' 1. ADDED 'deployer.deploy(UniswapPairOracle_CSS_WETH)'; 2. CERES.setCSSEthOracle(); ([84d7dc0](https://github.com/Ceres-Coin/Ceres-Protocol/commit/84d7dc08dec7d1a34ffab8d5aa1964737c4cccea))
* **migrations/3_deploy_uniswap_oracle_weth.js:** [ADDED][DEPLOYMENT SCRIPTS]: 1. 'createPair(CSS,WETH)'; 2. 'routerInstance.addLiquidity(css,weth); 3. cssInstance.approve(routerInstance & swapToPriceInstance) 4. get UniswapV2Pair.at(pair_addr_CSS_WETH); ([f57bcdc](https://github.com/Ceres-Coin/Ceres-Protocol/commit/f57bcdc1a935f2cfee84f841f2a852bb781bb688))


### Styling

* **contracts/ceres/ceres.sol:** [ADD][COMMENTS]: "TEST CASE DONE" & [REMOVED][TODO TASKS] ([b87c9be](https://github.com/Ceres-Coin/Ceres-Protocol/commit/b87c9becdb32ff19a7db47aef8ea5653305f1548))
* **contracts/ceres/ceres.sol:** [ADDED][COMMENTS]: "TEST CASE DONE" COMMENTS & [REMOVED][TODO TASKS] ([03ccd3b](https://github.com/Ceres-Coin/Ceres-Protocol/commit/03ccd3b3d9d279ed24d5c995f4135800409af895))


### Tests

* **contracts/ceres/ceres.sol:** [ADD][TEST SCRIPTS]: 'check ceres.ceres_step.call(), its default value is equal to 2500' ([6733fb1](https://github.com/Ceres-Coin/Ceres-Protocol/commit/6733fb1b6461c30129c77694d025f59ec035a849))
* **test/ceres_p2.test.js:** [ADD][TEST SCRIPTS]: 'check ceres.css_eth_oracle_address(), its default value is oracle_instance_CSS_WETH.address' ([07062fe](https://github.com/Ceres-Coin/Ceres-Protocol/commit/07062fe44e856189becad66ff96d79e8d00077b8))
* **test/ceres_p2.test.js:** [ADD][TEST SCRIPTS]: 'check ceres.css_price(), its default value is gt(0)' ([08485de](https://github.com/Ceres-Coin/Ceres-Protocol/commit/08485de903dc38018a218dd50eee99c501fa8cab))
* **test/ceres_p2.test.js:** [ADD][TEST SCRIPTS]: 'check ceres.getCeresEthOracle_consult(), its default value is SIX_HUNDRED_DEC6' ([e949348](https://github.com/Ceres-Coin/Ceres-Protocol/commit/e949348872107960e45e9f27900c7b7b2d48a29a))
* **test/ceres_p2.test.js:** [ADD][TEST SCRIPTS]: 'check ceres.getCSSEthOracle_consult(), its default value is EIGHT_HUNDRED_DEC6' ([4e3014c](https://github.com/Ceres-Coin/Ceres-Protocol/commit/4e3014caa2b7d7f24d7c61004ce3832f7d841961))
* **test/ceres_p2.test.js:** [ADD][TEST SCRIPTS]: 'check ceres.global_collateral_ratio.call(), its default value is equal to 1000000' ([ac1e7d7](https://github.com/Ceres-Coin/Ceres-Protocol/commit/ac1e7d785523d5cd7964ea28c86e29e62ca6d143))
* **test/ceres_p2.test.js:** [ADD][TEST SCRIPTS]: 'check ceres.price_band.call(), its default value is equal to 5000' ([675b242](https://github.com/Ceres-Coin/Ceres-Protocol/commit/675b24234784bad735c8e884233c186fdddf7f35))
* **test/ceres_p2.test.js:** [ADD][TEST SCRIPTS]: 'check ceres.price_target.call(), its default value is equal to 1000000' ([ab47ec3](https://github.com/Ceres-Coin/Ceres-Protocol/commit/ab47ec3fc865d45ae86795134aa914cb4cdbfa37))
* **test/ceres_p2.test.js:** [ADD][TEST SCRIPTS]: 'check ceres.refresh_cooldown.call(), its default value is equal to 60' ([f41f010](https://github.com/Ceres-Coin/Ceres-Protocol/commit/f41f01093dde013404cc676971afe3e89e2d04b0))
* **test/ceres_p2.test.js:** [ADD][TEST SCRIPTS]: 'check instanceCERES.set_global_collateral_ratio() FUNC' ([8657289](https://github.com/Ceres-Coin/Ceres-Protocol/commit/8657289a17a19e4ea54256811de0b2025459de1e))
* **test/ceres_p2.test.js:** [ADD][TEST SCRIPTS]: 'check instanceCERES.setCeresStep() FUNC' ([b04db1b](https://github.com/Ceres-Coin/Ceres-Protocol/commit/b04db1b9a3ac11a73af51c1cfbb9f916bef92a56))
* **test/ceres_p2.test.js:** [ADD][TEST SCRIPTS]: 'check instanceCERES.setPriceTarget() FUNC' ([2b6e998](https://github.com/Ceres-Coin/Ceres-Protocol/commit/2b6e998a9acd7c8cbe4aa23a410beb22b2af36ab))
* **test/ceres_p2.test.js:** [ADD][TEST SCRIPTS]: 'check instanceCERES.setRefreshCooldown() FUNC' ([4e30a7c](https://github.com/Ceres-Coin/Ceres-Protocol/commit/4e30a7c9e23e896b0b37705b8188f47350e909da))
* **test/ceres_p2.test.js:** [ADDED][TEST SCRIPTS]: 'check ceres.ceres_price(), its default value is gt(0)' & TUNING FAILED TEST SCRIPTS ([2e1ea85](https://github.com/Ceres-Coin/Ceres-Protocol/commit/2e1ea85251f642aaa6abbe6a4dedb67460660c2c))
* **test/ceres_p2.test.js:** [ADDED][TEST SCRIPTS]: 'check ceres.eth_usd_price(), its default value is gt(0)' ([22ee221](https://github.com/Ceres-Coin/Ceres-Protocol/commit/22ee221360bfa874ea8eef2344ae575842bc8941))
* **test/ceres_p2.test.js:** [ADDED][TEST SCRIPTS]: 'check instanceCERES.collateral_ratio_paused.call(), its default value is equal to FALSE' ([3e679ee](https://github.com/Ceres-Coin/Ceres-Protocol/commit/3e679eec9a38627736b62ae4fbb31b59740526a5))
* **test/ceres_p2.test.js:** [ADDED][TEST SCRIPTS]: 'check instanceCERES.last_call_time.call(), its default value is equal to 0' ([33d8dcb](https://github.com/Ceres-Coin/Ceres-Protocol/commit/33d8dcb95b723aa25c1047a8805ead9837661e1c))
* **test/ceres_p2.test.js:** [ADDED][TEST SCRIPTS]: 'check instanceCERES.refreshCollateralRatio() FUNC' ([e1b0065](https://github.com/Ceres-Coin/Ceres-Protocol/commit/e1b006594f0041bd8c1cd998336ad11ff0a569b9))
* **test/ceres_p2.test.js:** [ADDED][TEST SCRIPTS]: 'check instanceCERES.refreshCollateralRatio() FUNC' ([789793d](https://github.com/Ceres-Coin/Ceres-Protocol/commit/789793d260b13769316268655c90075d8545fb53))
* **test/ceres_p2.test.js:** [ADDED][TEST SCRIPTS]: 'check instanceCERES.toggleCollateralRatio() FUNC' ([35265dd](https://github.com/Ceres-Coin/Ceres-Protocol/commit/35265ddd711ac34f604247e6ee52489b71bbb460))


### Docs

* **contracts/ceres/ceres.sol:** [ADDED][COMMENTS]: "TEST CASE DONE" & [REMOVED][TODO TASKS] ([78f8ed7](https://github.com/Ceres-Coin/Ceres-Protocol/commit/78f8ed7d8c8fe79d8dee69c65ee1a0bd1632953e))
* **contracts/ceres/ceres.sol:** [ADDED][COMMENTS]: "TEST CASE DONE" & [REMOVED][TODO TASKS] ([5b80210](https://github.com/Ceres-Coin/Ceres-Protocol/commit/5b80210cadc9e74d52fa42636af9318bc22eb353))
* **contracts/ceres/ceres.sol:** [ADDED][COMMENTS]: "TEST CASE DONE" & [REMOVED][TODO TASKS] ([06c5e7e](https://github.com/Ceres-Coin/Ceres-Protocol/commit/06c5e7e2e47e978febf31388fb5adf92bfb070a8))
* **contracts/ceres/ceres.sol:** [ADDED][COMMENTS]: "TEST CASE DONE" & [REMOVED][TODO TASKS] ([8f55b48](https://github.com/Ceres-Coin/Ceres-Protocol/commit/8f55b48ae3270c046fc912d0cf33870ee9f247f5))
* **test/css.test.js:** [ADDED][COMMENTS]: // Because we transferred 800 CSS to addLiquidity ([2cee7fb](https://github.com/Ceres-Coin/Ceres-Protocol/commit/2cee7fbc186cae63f8a4f06ed1891a611580639d))
* **test/weth.test.js:** [ADDED][COMMENTS] ([75d3124](https://github.com/Ceres-Coin/Ceres-Protocol/commit/75d3124d3be1cac3c90a6c5f3dd491c4b1bef7e0))

### [1.12.6](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.12.5...v1.12.6) (2021-07-14)


### Tests

* **migrations/3_deploy_uniswap_oracle_weth.js:** [ADD][TEST SCRIPTS]: 'check swapToPriceInstance.swapToPrice()' ([54fc4c8](https://github.com/Ceres-Coin/Ceres-Protocol/commit/54fc4c8bad1f44803ca045d5e47a5cfeb8037887))
* **test/swaptoprice.test.js:** [ADD][TEST SCRIPTS]: 'check swapToPriceInstance.factory.call() is equal to uniswapFactoryInstance.address' ([273544f](https://github.com/Ceres-Coin/Ceres-Protocol/commit/273544fe260963c8ba028bd14e34f69d0bae8f64))
* **test/swaptoprice.test.js:** [ADD][TEST SCRIPTS]: 'check swapToPriceInstance.router.call() is equal to routerInstance.address' ([ff1cc48](https://github.com/Ceres-Coin/Ceres-Protocol/commit/ff1cc486de5a1544a31d2336ba844a596d206f72))
* **test/swaptoprice.test.js:** [CREATED][NEW TEST SCRIPTS FILE]: "test/SwapToPrice.test.js" & UPDATE NPM SCRIPTS IN package.json ([2d040fc](https://github.com/Ceres-Coin/Ceres-Protocol/commit/2d040fc0a803688acc82a1af5693af641404a671))
* **test/uniswapv2router02_modified.test.js:** [CREATED][NEW TEST SCRIPTS FILE]: 'test/UniswapV2Router02_Modified.test.js' ([b9f6820](https://github.com/Ceres-Coin/Ceres-Protocol/commit/b9f682078fba95b1ac9e955f95e6b89568ee1a9e))
* **test/uniswapv2router02_modified.test.js:** 1. 'check routerInstance.factory.call() is equal to uniswapFactoryInstance.address'; 2.'check routerInstance.WETH.call() is equal to wethInstance.address' ([648b949](https://github.com/Ceres-Coin/Ceres-Protocol/commit/648b9493e1c2af514a3c70a88d2e142b3c01d042))

### [1.12.5](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.12.4...v1.12.5) (2021-07-13)


### Tests

* **test/uniswapv2pair_ceres_weth.test.js:** [ADD][TEST SCRIPTS]: 'check pair_instance_CERES_WETH.decimals.call(), its value is 18' ([cc3fb8f](https://github.com/Ceres-Coin/Ceres-Protocol/commit/cc3fb8f854cfc31d38b63babf668e3416b199184))
* **test/uniswapv2pair_ceres_weth.test.js:** [ADD][TEST SCRIPTS]: 'check pair_instance_CERES_WETH.factory.call(), its value is uniswapFactoryInstance.address' ([178ca71](https://github.com/Ceres-Coin/Ceres-Protocol/commit/178ca71d156e22472c4eab997f70bc8888453df6))
* **test/uniswapv2pair_ceres_weth.test.js:** [ADD][TEST SCRIPTS]: 'check pair_instance_CERES_WETH.getReserves.call() FUNC' ([61dcfae](https://github.com/Ceres-Coin/Ceres-Protocol/commit/61dcfae2df00aef1dcd58bd6387a9eaed5fb9214))
* **test/uniswapv2pair_ceres_weth.test.js:** [ADD][TEST SCRIPTS]: 'check pair_instance_CERES_WETH.kLast.call(), its value is 0' ([e115a93](https://github.com/Ceres-Coin/Ceres-Protocol/commit/e115a93b694a001f285e9f5d615af4183aa3c0de))
* **test/uniswapv2pair_ceres_weth.test.js:** [ADD][TEST SCRIPTS]: 'check pair_instance_CERES_WETH.MINIMUM_LIQUIDITY.call(), its value is 10**3' ([53f54ea](https://github.com/Ceres-Coin/Ceres-Protocol/commit/53f54ea910b57c93bff479e501b23ef0e876581c))
* **test/uniswapv2pair_ceres_weth.test.js:** [ADD][TEST SCRIPTS]: 'check pair_instance_CERES_WETH.price0CumulativeLast & price1CumulativeLast, ITS DEFAULT VALUE IS 0' ([46f3295](https://github.com/Ceres-Coin/Ceres-Protocol/commit/46f329576eb0a2f8944cb90b867bef7728bab13d))
* **test/uniswapv2pair_ceres_weth.test.js:** [ADD][TEST SCRIPTS]: 'check pair_instance_CERES_WETH.SYNC() FUNC' ([1ddbd88](https://github.com/Ceres-Coin/Ceres-Protocol/commit/1ddbd88597c126cf6edb868e8758185efc2d7641))
* **test/uniswapv2pair_ceres_weth.test.js:** [ADD][TEST SCRIPTS]: 'check pair_instance_CERES_WETH.token0 & token1 equal to ceres & weth' ([0edcbb7](https://github.com/Ceres-Coin/Ceres-Protocol/commit/0edcbb74fe06fba2ce1134fd82d8ad7def1a6540))
* **test/uniswapv2pair_ceres_weth.test.js:** [ADD][TEST SCRIPTS]: ADD 'check pair_instance_CERES_WETH.balanceOf.call(OWNER), its value is equal to totalSupply' ([5996e3a](https://github.com/Ceres-Coin/Ceres-Protocol/commit/5996e3ac0137469a53b400fca750e794663b44d7))
* **test/uniswapv2pair_ceres_weth.test.js:** [ADD][TEST SCRIPTS]: ADD 'check pair_instance_CERES_WETH.name.call(), its value is "Uniswap V2"' ([8be488a](https://github.com/Ceres-Coin/Ceres-Protocol/commit/8be488a91cf919c253ace28dbbf2b8a31de58263))
* **test/uniswapv2pair_ceres_weth.test.js:** [ADD][TEST SCRIPTS]: ADD 'check pair_instance_CERES_WETH.symbol.call(), its value is "UNI-V2"' ([3bf6f45](https://github.com/Ceres-Coin/Ceres-Protocol/commit/3bf6f45251bc2940b9573638e50dbd358030515e))
* **test/uniswapv2pair_ceres_weth.test.js:** [ADD][TEST SCRIPTS]: ADD 'check pair_instance_CERES_WETH.totalSupply.call(), its value is gt 0' ([c521ed8](https://github.com/Ceres-Coin/Ceres-Protocol/commit/c521ed83ee06eab0b399cfd2f704537f1f91402a))
* **test/uniswapv2pair_ceres_weth.test.js:** [CREATED][NEW TEST SCRIPTS FILE]: 'uniswapv2pair' ([c876a18](https://github.com/Ceres-Coin/Ceres-Protocol/commit/c876a182f316b4f573c3725e9992c8f33eeb99a7))


### Styling

* **contracts/uniswap/uniswapv2pair.sol:** [ADD][COMMENTS]: ADD "TEST CASE DONE" COMMENTS IN contracts/Uniswap/UniswapV2Pair.sol ([c9db6f6](https://github.com/Ceres-Coin/Ceres-Protocol/commit/c9db6f64e21c1870d365349a577584e8fe96a07c))

### [1.12.4](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.12.3...v1.12.4) (2021-07-13)


### Tests

* **test/uniswappairoracle_ceres_weth.test.js:** [ADD][TEST SCRIPTS]: ADD 'CHECK blocktimestamplast' ([12cf9b4](https://github.com/Ceres-Coin/Ceres-Protocol/commit/12cf9b4ea958975e6688735133b27f9a90dc8b33))
* **test/uniswappairoracle_ceres_weth.test.js:** [ADD][TEST SCRIPTS]: ADD 'setAllowStaleConsults()' ([47b4fee](https://github.com/Ceres-Coin/Ceres-Protocol/commit/47b4fee227fca21e50f35686cf2f5bdd418ad02a))
* **test/uniswappairoracle_ceres_weth.test.js:** [ADD][TEST SCRIPTS]: ADD 'setConsultLeniency' func ([9133a3f](https://github.com/Ceres-Coin/Ceres-Protocol/commit/9133a3f2aadb6009a5879ee5c5201dbc68053582))
* **test/uniswappairoracle_ceres_weth.test.js:** [ADD][TEST SCRIPTS]: ADD 'setOwner()' func test ([b7ecf5b](https://github.com/Ceres-Coin/Ceres-Protocol/commit/b7ecf5be92c94c746f15509a8e8eb6346214df58))
* **test/uniswappairoracle_ceres_weth.test.js:** [ADD][TEST SCRIPTS]: ADD 'setTimelock' func test ([a93ceda](https://github.com/Ceres-Coin/Ceres-Protocol/commit/a93cedaa85bd0917aa94efb261e618e607b71488))
* **test/uniswappairoracle_ceres_weth.test.js:** [ADD][TEST SCRIPTS]: ADD "canUpdate()" FUNC TEST ([367dc22](https://github.com/Ceres-Coin/Ceres-Protocol/commit/367dc22cfb1815a19d6ef008d077b1dfb9dd101f))
* **test/uniswappairoracle_ceres_weth.test.js:** [ADD][TEST SCRIPTS]: ADD "setPeriod()" func test ([072e7c7](https://github.com/Ceres-Coin/Ceres-Protocol/commit/072e7c7af97fa66c1d766bcc6021f137e321bf25))


### Styling

* **contracts/oracle/uniswappairoracle.sol:** [ADD][COMMENTS]: ADD "TEST CASE DONE" COMMENTS ([1d5e121](https://github.com/Ceres-Coin/Ceres-Protocol/commit/1d5e1211a84d7271a127fb2d81636c664c40d1cf))
* **contracts/oracle/uniswappairoracle.sol:** [ADD][COMMENTS]: ADD "TEST CASE DONE" COMMENTS ([b7b02ce](https://github.com/Ceres-Coin/Ceres-Protocol/commit/b7b02ceac3059c000201b100952230cf3ea425a3))
* **contracts/oracle/uniswappairoracle.sol:** [ADD][COMMENTS]: ADD "TEST CASE DONE" COMMENTS ([21349d9](https://github.com/Ceres-Coin/Ceres-Protocol/commit/21349d9003e49f2db2602711ccea12d772e9761f))

### [1.12.3](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.12.2...v1.12.3) (2021-07-13)


### Styling

* **contracts/oracle/uniswappairoracle.sol:** [ADD][COMMENTS]: "TEST CASE DONE" ([8aa0c9c](https://github.com/Ceres-Coin/Ceres-Protocol/commit/8aa0c9c1e4da3768a62367b9a4ee04f143aa75af))
* **contracts/oracle/uniswappairoracle.sol:** [REMOVED][COMMENTS] & [ADD][NEW COMMENTS] ([05d33f9](https://github.com/Ceres-Coin/Ceres-Protocol/commit/05d33f9a8fec7c4d0d2d70f58ac5fea0c99eec19))


### Tests

* **test/uniswappairoracle_ceres_weth.test.js:** [ADD][TEST SCRIPTS]: 'check owner_address is OWNER' ([e1ad670](https://github.com/Ceres-Coin/Ceres-Protocol/commit/e1ad6702a5434547f50337aa28e33f95d6ef655c))
* **test/uniswappairoracle_ceres_weth.test.js:** [ADD][TEST SCRIPTS]: 'CHECK pair_address()' ([c88fbc2](https://github.com/Ceres-Coin/Ceres-Protocol/commit/c88fbc25a4768081b0c443b92c809e26be46d7eb))
* **test/uniswappairoracle_ceres_weth.test.js:** [ADD][TEST SCRIPTS]: 'CHECK price0Average > 0' ([33065b0](https://github.com/Ceres-Coin/Ceres-Protocol/commit/33065b01c40e537b6be627664cb4b653ba9b64c3))
* **test/uniswappairoracle_ceres_weth.test.js:** [ADD][TEST SCRIPTS]: 'CHECK reserve0 & reserve1' ([f2b5def](https://github.com/Ceres-Coin/Ceres-Protocol/commit/f2b5def963afe4a372802f0f54c863200f330aef))
* **test/uniswappairoracle_ceres_weth.test.js:** [ADD][TEST SCRIPTS]: 'check timelock_address' ([23f0c25](https://github.com/Ceres-Coin/Ceres-Protocol/commit/23f0c2566f3e14223cbf52333d06b9a3aeecbaff))
* **test/uniswappairoracle_ceres_weth.test.js:** [ADD][TEST SCRIPTS]: 'CHECK TOKEN0/1 = CERES/WETH' ([1dde3eb](https://github.com/Ceres-Coin/Ceres-Protocol/commit/1dde3eb7c4597cfd889ea8482e08515b011974d5))
* **test/uniswappairoracle_ceres_weth.test.js:** [ADD][TEST SCRIPTS]: ALLOW_STALE_CONSULTS is true ([0808a3d](https://github.com/Ceres-Coin/Ceres-Protocol/commit/0808a3d2fd29df3b9430ee783ec4163b68dfa58e))
* **test/uniswappairoracle_ceres_weth.test.js:** [ADD][TEST SCRIPTS]: CHECK oracle_CERES_WETH.pair ([12b0663](https://github.com/Ceres-Coin/Ceres-Protocol/commit/12b06633de390308f249a844505762d9e4c62f8b))
* **test/uniswappairoracle_ceres_weth.test.js:** [ADD][TEST SCRIPTS]: check PERIOD is 5 ([bdf6dfb](https://github.com/Ceres-Coin/Ceres-Protocol/commit/bdf6dfbc8195f7fe8065c8cbfbebfa4210266e76))
* **test/uniswappairoracle_ceres_weth.test.js:** [ADD][TEST SCRIPTS]: CHECK price0CumulativeLast ([288739c](https://github.com/Ceres-Coin/Ceres-Protocol/commit/288739cd07c6ffa88e69cba82d58711cd0737c86))
* **test/uniswappairoracle_ceres_weth.test.js:** [ADD][TEST SCRIPTS]:'CHECK CONSULT_LENIENCY is 120' ([e4dbffc](https://github.com/Ceres-Coin/Ceres-Protocol/commit/e4dbffc1dae583d13856ff2f8ec18997c7f34cd8))
* **test/uniswappairoracle_ceres_weth.test.js:** [MODIFIED][TEST SCRIPTS]: 'CHECK PAIR IS EQUAL TO ' ([0d80cbe](https://github.com/Ceres-Coin/Ceres-Protocol/commit/0d80cbedf9a5c90980226b53e181b6ece586275f))

### [1.12.2](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.12.1...v1.12.2) (2021-07-13)


### Tests

* **test/ceres_weth.test.js:** [ADD][TEST SCRIPTS]: 'check wethInstance.name() & symbol()' ([8c93ea2](https://github.com/Ceres-Coin/Ceres-Protocol/commit/8c93ea27435dc7fa7baef1874cf1e8c1ac7ac615))
* **test/ceres_weth.test.js:** [CREATED][NEW TEST FILE]: test/ceres_weth.test.js ([aea4574](https://github.com/Ceres-Coin/Ceres-Protocol/commit/aea457453bbe0ebe3562db85342a305e50cdf868))
* **test/uniswappairoracle_ceres_weth.test.js:** [CREATED][NEW FILE]: Oracle_CERES_WETH.test.js ([9734b07](https://github.com/Ceres-Coin/Ceres-Protocol/commit/9734b07ac4dae572e880f1a94f40192414661e5f))
* **test/weth.test.js:** [ADD][TEST SCRIPTS]: 'check weth.totalSupply(), its value is 0' ([5bdc3ee](https://github.com/Ceres-Coin/Ceres-Protocol/commit/5bdc3eed95140aaf1593d182db2025ea331027db))
* **test/weth.test.js:** [ADD][TEST SCRIPTS]: 'check weth.transfer(test_account, 1dec18)' ([fb80940](https://github.com/Ceres-Coin/Ceres-Protocol/commit/fb80940c5a527dcac5c790f993fec3a6504b2563))
* **test/weth.test.js:** [ADD][TEST SCRIPTS]: 'check wethInstance.balanceOf(OWNER)' ([74a3d42](https://github.com/Ceres-Coin/Ceres-Protocol/commit/74a3d42d0193309ef12c3ffa8eaa8fc29bd7122e))
* **test/weth.test.js:** [RENAME][FILE]: ceres_weth.test.js -> weth.test.js & add 'check decimals' ([94e13b8](https://github.com/Ceres-Coin/Ceres-Protocol/commit/94e13b8e8d2f3063909af7d46e069865f5d73df0))


### Build System

* **package.json:** [UPDATE][NPM SCRIPTS]: Update NPM Scripts "testSingleFile" ([60f76ee](https://github.com/Ceres-Coin/Ceres-Protocol/commit/60f76eeea09e6795e86656b78311a0bc87d340f1))

### [1.12.1](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.12.0...v1.12.1) (2021-07-12)


### Bug Fixes

* **contracts/ceres/ceres.sol:** [ADD][FUNC]: ADD getCeresEthOracle_consult in CERES.sol & added test ([9cccea3](https://github.com/Ceres-Coin/Ceres-Protocol/commit/9cccea3014994c4d1635c52c5f84f51e1d508159))


### Tests

* **test/ceres.test.js:** [ADD][TEST SCRIPTS]: ''check ceres.PRICE_PRECISION(), its value is BIG6' ([40d01d9](https://github.com/Ceres-Coin/Ceres-Protocol/commit/40d01d98a16bcd9fcfa9415d4696d9de0dfa393a))
* **test/ceres.test.js:** [ADD][TEST SCRIPTS]: 'check ceres.ceres_eth_oracle_address()' ([ae401ad](https://github.com/Ceres-Coin/Ceres-Protocol/commit/ae401ad657dcecdb17a6306418f3f24a63d9f6f6))
* **test/ceres.test.js:** [ADD][TEST SCRIPTS]: 'check ceres.CeresEthOracle() its value is CERES_WETH ([7bc9fe6](https://github.com/Ceres-Coin/Ceres-Protocol/commit/7bc9fe68cacc3d16aae6148eeca2cf55acda0600))
* **test/ceres.test.js:** [ADD][TEST SCRIPTS]: 'check ceres.weth_address()' ([920675d](https://github.com/Ceres-Coin/Ceres-Protocol/commit/920675db0d5f6e709d68ce63d3147d2e38c32e1e))


### Styling

* **contracts/ceres/ceres.sol:** [ADD][COMMENTS]: "TEST CASE DONE" & [REMOVE][TODO TASK] ([73e2a77](https://github.com/Ceres-Coin/Ceres-Protocol/commit/73e2a7767ebcbe12f3da6eb493b8f79404a5ced6))
* **contracts/ceres/ceres.sol:** [ADD][COMMENTS]: ADD "TEST CASE DONE" COMMENTS ([16121b2](https://github.com/Ceres-Coin/Ceres-Protocol/commit/16121b2fcda8a5b76f0249bb34b7fd5e15f2246f))

## [1.12.0](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.11.1...v1.12.0) (2021-07-12)


### Features

* **contracts/ceres/ceres.sol:** [ADDED][FUNC]: ADD setCeresEthOracle() IN contracts/Ceres/Ceres.sol ([531e6f2](https://github.com/Ceres-Coin/Ceres-Protocol/commit/531e6f2556e312ca98ef72d5d129f922a445d238))
* **contracts/erc20/weth.sol & contracts/erc20/iweth.sol:** [CREATED][CONTRACTS]: weth.sol & iweth ([8471c5a](https://github.com/Ceres-Coin/Ceres-Protocol/commit/8471c5ab84d4b49699a5f857304532ee0fb1bde9))
* **contracts/oracle/variants/uniswappairoracle_ceres_weth.sol:** [CREATED][CONTRACT]:CERES_WETH.sol ([e5d94ac](https://github.com/Ceres-Coin/Ceres-Protocol/commit/e5d94ac1fca44013959ef91e769fefcda4986125))
* **contracts/uniswap/:** [CREATED][CONTRACTS]: CREATED 7 NEW CONTRACTS FILE ([8e90d83](https://github.com/Ceres-Coin/Ceres-Protocol/commit/8e90d83eb3f9c2804a9e78d53d27ab572a448b69))
* **contracts/uniswap/swaptoprice.sol:** [CREATED][CONTRACTS]: contracts/Uniswap/SwapToPrice.sol ([47b92a0](https://github.com/Ceres-Coin/Ceres-Protocol/commit/47b92a0b1139c8e57f89fbd7c7972ab4a216c0c7))
* **contracts/uniswap/uniswapv2router02_modified.sol:** [CREATED][CONTRACTS]: ADDED 4 NEW CONTRACTS ([b88034d](https://github.com/Ceres-Coin/Ceres-Protocol/commit/b88034da441a9f2797954a1f81a585f34e8fa721))
* **migrations/3_deploy_uniswap_oracle_weth.js:** [ADDED][DEPLOYMENT SCRIPTS]: ADD WETH.SOL deploy ([b094efe](https://github.com/Ceres-Coin/Ceres-Protocol/commit/b094efe326f97751b1e14dce77e8a24204dfb6d5))
* **migrations/3_deploy_uniswap_oracle_weth.js:** [ADDED][DEPLOYMENT SCRIPTS]: ADDED "SwapToPrice" ([8fc3bbe](https://github.com/Ceres-Coin/Ceres-Protocol/commit/8fc3bbec9677c69f83921cfeb53b2516c0ebf11f))
* **migrations/3_deploy_uniswap_oracle_weth.js:** [ADDED][DEPLOYMENT SCRIPTS]: CERES_WETH.update ([6cc29ac](https://github.com/Ceres-Coin/Ceres-Protocol/commit/6cc29acc88ccd9c42ca9c4cbe0d15ca9f2218c39))
* **migrations/3_deploy_uniswap_oracle_weth.js:** [ADDED][DEPLOYMENT SCRIPTS]: router.addLiquidity ([60d9b66](https://github.com/Ceres-Coin/Ceres-Protocol/commit/60d9b664a935dd07639dc4efcafde124717619b1))
* **migrations/3_deploy_uniswap_oracle_weth.js:** [ADDED][DEPLOYMENT SCRIPTS]: UniswapV2Factory ([6ae5c3f](https://github.com/Ceres-Coin/Ceres-Protocol/commit/6ae5c3f4d70d84d51ea4e4fe7472b39521d7ae24))
* **migrations/3_deploy_uniswap_oracle_weth.js:** [ADDED][DEPLOYMENT SCRIPTS]:unisFactory.createPair ([8b02fbd](https://github.com/Ceres-Coin/Ceres-Protocol/commit/8b02fbda71b8cec5cbcc3e61c093c2419acb1a4e))
* **migrations/3_deploy_uniswap_oracle_weth.js:** [ADDED][DEPLOYMENT]: UniswapV2Router02_Modified ([fcec7f5](https://github.com/Ceres-Coin/Ceres-Protocol/commit/fcec7f5597d02ea5430a83ef2eb2f6bb60a0749f))


### Bug Fixes

* **migrations/3_deploy_uniswap_oracle_weth.js:** [ADDED][DEPLOYMENT SCRIPTS]: Oracle_CERES_WETH ([7497afe](https://github.com/Ceres-Coin/Ceres-Protocol/commit/7497afee81a05354e9bb529ea495cc8b1a868674))


### Tests

* **test/ceres.test.js:** [MODIFIED][TEST SCRIPTS]: eth_usd_pricer.getDecimals() & getlatestprice() ([e15cc70](https://github.com/Ceres-Coin/Ceres-Protocol/commit/e15cc702fd148caeb59c7c3f9ee529075cd20d5c))
* **test/ceres.test.js:** [TUNING][TEST CASES]: ceres.balanceOf(creator_address) = ONE_MILLION_DEC18 ([1ff0f7f](https://github.com/Ceres-Coin/Ceres-Protocol/commit/1ff0f7fa5c7fc612c4123fce65f5ea2e8811a820))

### [1.11.1](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.11.0...v1.11.1) (2021-07-12)


### Tests

* **test/ceres.test.js:** [ADD][TEST SCRIPTS]: 'check ceres.eth_usd_consumer_address' ([1360cba](https://github.com/Ceres-Coin/Ceres-Protocol/commit/1360cba72f8b9209eace0999c53ac17d785ea407))
* **test/ceres.test.js:** [ADD][TEST SCRIPTS]: 'check ceres.eth_usd_pricer_decimals = 8' ([991ac51](https://github.com/Ceres-Coin/Ceres-Protocol/commit/991ac510a02c16b8417343ff44377e6bdd70927e))
* **test/ceres.test.js:** [ADD][TEST SCRIPTS]: eth_usd_pricer.getDecimals()/getLatestPrice() ([ec5e41a](https://github.com/Ceres-Coin/Ceres-Protocol/commit/ec5e41a2071e574b0c231596fb58c22ff0c76d5e))


### Styling

* **contracts/ceres/ceres.sol:** [REMOVE][TODO] & [ADD][COMMENTS] "TEST CASE DONE" ([40c13c6](https://github.com/Ceres-Coin/Ceres-Protocol/commit/40c13c65a5ade56dfa89b1fc947eda6399ced97a))
* **contracts/ceres/ceres.sol:** [REMOVE][TODO] & [ADD][COMMENTS]: ADD "TEST CASE DONE" COMMENTS ([24c3336](https://github.com/Ceres-Coin/Ceres-Protocol/commit/24c33366d1d7c2e72ddbc3a1c0e99fd67c9ec471))

## [1.11.0](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.10.6...v1.11.0) (2021-07-12)


### Features

* **contracts/ceres/ceres.sol:** [ADD][NEW FUNC]: ADD "setETHUSDOracle" public func in ceres.sol ([a0b4ce1](https://github.com/Ceres-Coin/Ceres-Protocol/commit/a0b4ce1ffdad222a3f858d7f1748b84438f3e0ec))
* **migrations/2_deploy_contracts.js:** [ADDED][DEPLOYMENT]:ADD deploy CODE IN 2_deploy_contracts.js ([09fcc7b](https://github.com/Ceres-Coin/Ceres-Protocol/commit/09fcc7bd492353178eef5253992dcb296520ce06))
* **oracle/aggregatorv3interface.sol:** [CREATED][NEW FILE]: AggregatorV3Interface.sol ([f8f9f92](https://github.com/Ceres-Coin/Ceres-Protocol/commit/f8f9f92ddba069483b644045322403785d3dbb33))
* **oracle/chainlinkethusdpriceconsumertest.sol:** [CREATED][CONTRACTS]: ChainlinkETHUSDPrice...Test ([a43fc8c](https://github.com/Ceres-Coin/Ceres-Protocol/commit/a43fc8c2378ea4efe017f024c031a19484909692))


### Bug Fixes

* **migrations/2_deploy_contracts.js:** [ADD][DEPLOYMENT]: ADD deployment for ceres.setETHUSDOracle() ([d9d28f2](https://github.com/Ceres-Coin/Ceres-Protocol/commit/d9d28f2566b3d81db8702aea81a45140b6e5b33d))


### Styling

* **contracts/ceres/ceres.sol:** [ADD][TODO TASKS]: ADD TODO TASKS IN Ceres.sol ([36af19f](https://github.com/Ceres-Coin/Ceres-Protocol/commit/36af19f41cd2d96b74052a6c01942d834710407a))

### [1.10.6](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.10.5...v1.10.6) (2021-07-12)


### Bug Fixes

* **contracts/ceres/pools/cerespool.sol:** [ADD][FUNC]: ADD NEW PUBLIC FUNC "setPoolParameters" ([f3ef2d6](https://github.com/Ceres-Coin/Ceres-Protocol/commit/f3ef2d6d79e64dacf4704ca243734d096490c8b2))
* **contracts/ceres/pools/cerespool.sol:** [ADD][FUNC]: ADD TWO PUBLIC FUNC (setTimelock;setOwner) ([d752ca1](https://github.com/Ceres-Coin/Ceres-Protocol/commit/d752ca16137589c71b0baccf060bc262b53c6157))


### Tests

* **test/ceres_pool_usdc.test.js:** [ADD][TEST SCRIPTS]: 'check Pool_USDC.setOwner() func' ([94218b7](https://github.com/Ceres-Coin/Ceres-Protocol/commit/94218b705710aba97f01ed6159d89cc0718fc405))
* **test/ceres_pool_usdc.test.js:** [ADD][TEST SCRIPTS]: 'check Pool_USDC.setPoolParameters()' ([4988134](https://github.com/Ceres-Coin/Ceres-Protocol/commit/49881348576002eaf123d7a93bdfa0d56fca9662))
* **test/ceres_pool_usdc.test.js:** [ADD][TEST SCRIPTS]: 'check Pool_USDC.setTimelock() func' ([3c7501a](https://github.com/Ceres-Coin/Ceres-Protocol/commit/3c7501a65b32a258e5d784d9ce06990d2276acef))


### Styling

* **contracts/ceres/pools/cerespool.sol:** [MOVE][CODE] ([a96c857](https://github.com/Ceres-Coin/Ceres-Protocol/commit/a96c857a36e47e17422dde90a520e7cf3572fbac))
* **test/ceres_pool_usdc.test.js:** [MOVE][CODE] ([84ddfb0](https://github.com/Ceres-Coin/Ceres-Protocol/commit/84ddfb05b7aed469ae73f364b1144a96ba35d600))

### [1.10.5](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.10.4...v1.10.5) (2021-07-12)


### Tests

* **test/ceres_pool_usdc.test.js:** [ADD][TEST SCRIPTS]: 'check Pool_USDC.CSS.name()' ([fecfd8d](https://github.com/Ceres-Coin/Ceres-Protocol/commit/fecfd8d61d15eda53c2478154b06a802f5a51d0c))
* **test/ceres_pool_usdc.test.js:** [ADD][TEST SCRIPTS]: 'check Pool_USDC.CSS.symbol()' ([a08536b](https://github.com/Ceres-Coin/Ceres-Protocol/commit/a08536bad496e8299ef3289c66768b947cf56f44))
* **test/ceres_pool_usdc.test.js:** [ADD][TEST SCRIPTS]: 'check Pool_USDC.CSS.totalSupply()' ([85bf6df](https://github.com/Ceres-Coin/Ceres-Protocol/commit/85bf6dffea90c93b72f7e34561f01b4ad602638d))


### Others

* **contracts/ceres/pools/cerespool.sol:** [ADD][COMMENTS]: REMOVE TODO & ADD "TEST CASE DONE" ([7e8470b](https://github.com/Ceres-Coin/Ceres-Protocol/commit/7e8470b2daab42482ea95801d960fb936d8a1528))

### [1.10.4](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.10.3...v1.10.4) (2021-07-12)


### Others

* **contracts/ceres/pools/cerespool.sol:** [ADD][COMMENTS]: ADD COMMENTS IN "CeresPool.sol" & TODO ([831b45f](https://github.com/Ceres-Coin/Ceres-Protocol/commit/831b45f1297912e5baabbf36420b2ecc8d149f2f))
* **contracts/ceres/pools/cerespool.sol:** [ADD][COMMENTS]: UPDATE COMMENTS IN CeresPool.sol ([e3a1b93](https://github.com/Ceres-Coin/Ceres-Protocol/commit/e3a1b93668a21adff1ea94a1f7ad49e968bb2766))


### Tests

* **test/ceres_pool_usdc.test.js:** [ADD][TEST SCRIPTS]: 'check collateral_token.symbol() = sample' ([97ee105](https://github.com/Ceres-Coin/Ceres-Protocol/commit/97ee105971ac547394a7a05b0a02fc312518468e))
* **test/ceres_pool_usdc.test.js:** [ADD][TEST SCRIPTS]: 'check collateral_token.totalSupply() ([786cc16](https://github.com/Ceres-Coin/Ceres-Protocol/commit/786cc166e5447a1a0b88642a07cf6fdf2d3be71d))
* **test/ceres_pool_usdc.test.js:** [ADD][TEST SCRIPTS]: 'check Pool_USDC.CERES.name()' ([4775c71](https://github.com/Ceres-Coin/Ceres-Protocol/commit/4775c71af3d199b7781f3fec3c36b2dee33fe0d2))
* **test/ceres_pool_usdc.test.js:** [ADD][TEST SCRIPTS]: 'check Pool_USDC.CERES.symbol()' ([d3593c0](https://github.com/Ceres-Coin/Ceres-Protocol/commit/d3593c09ecd10546d9d15e911beb5646176d0fb2))
* **test/ceres_pool_usdc.test.js:** [ADD][TEST SCRIPTS]: 'check Pool_USDC.CERES.totalSupply()' ([9bad1c7](https://github.com/Ceres-Coin/Ceres-Protocol/commit/9bad1c7a3c9b5bc0ccd0846867c1174f99cbaff0))
* **test/ceres_pool_usdc.test.js:** [ADD][TEST SCRIPTS]: 'collateral_token.name() = sample' ([af480dd](https://github.com/Ceres-Coin/Ceres-Protocol/commit/af480dd5135641d33e58b5106f6c7cf5a0fe53b0))

### [1.10.3](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.10.2...v1.10.3) (2021-07-11)


### Tests

* **test/ceres_pool_usdc.test.js:** [ADD][SCRIPTS]: 'check instance_Pool_USDC.ceres_contract_address ([31d3fce](https://github.com/Ceres-Coin/Ceres-Protocol/commit/31d3fce0541d60a4c3744e868eecbea9fcf0281f))
* **test/ceres_pool_usdc.test.js:** [ADD][TEST SCRIPTS]: 'check pool_ceiling is FIVE_MILLION_DEC18' ([ba9fe5c](https://github.com/Ceres-Coin/Ceres-Protocol/commit/ba9fe5c18f7391edb9f5508860ad8e650d7d75c4))
* **test/ceres_pool_usdc.test.js:** [ADD][TEST SCRIPTS]: 'check USDC_address is sampleERC20 ([b2f7d5b](https://github.com/Ceres-Coin/Ceres-Protocol/commit/b2f7d5bc66cb8b34789281e9c0a38d77b769fcd6))
* **test/ceres_pool_usdc.test.js:** [ADD][TEST SCRIPTS]: check css_contract_address & collateral ([df758b9](https://github.com/Ceres-Coin/Ceres-Protocol/commit/df758b9f56b543a1ecd73ecdc9e05cf5e968153b))
* **test/ceres_pool_usdc.test.js:** [ADD][TEST SCRIPTS]: Pool_USDC.owner_address & timelock_address ([c6388ff](https://github.com/Ceres-Coin/Ceres-Protocol/commit/c6388ff026f0265ea514b11baf3a694e8dc1d2e1))
* **test/ceres_pool_usdc.test.js:** [ADD][TEST SCRITPS]: 'check missing_decimals is 0' ([e6cc626](https://github.com/Ceres-Coin/Ceres-Protocol/commit/e6cc6265a3bed5d6becfd54d10ebbbfa1d09fd84))


### Styling

* **contracts/ceres/pools/cerespool.sol:** [FORMATTING]: MOVE CODE IN constructor() ([f11922e](https://github.com/Ceres-Coin/Ceres-Protocol/commit/f11922ea0706811946379aad2fdfd7797c0482ea))

### [1.10.2](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.10.1...v1.10.2) (2021-07-11)


### Tests

* **test/ceres_pool_usdc.test.js;package.json:** [CREATED][TEST SCRIPTS]: new scripts for pool_usdc ([27746c0](https://github.com/Ceres-Coin/Ceres-Protocol/commit/27746c0117222179dc5934d4e84964f1f0c5268d))

### [1.10.1](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.10.0...v1.10.1) (2021-07-11)


### Bug Fixes

* **contracts/erc20/erc20.sol:** [MODIFY][CONTRACT]: ADD INITIAL AMOUNT FOR ERC20 = 100 MILLIONS ([799b3db](https://github.com/Ceres-Coin/Ceres-Protocol/commit/799b3dbd291cb91a12fb734a177741ec164578a6))
* **migrations/2_deploy_contracts.js:** [ADD][DEPLOYMENT SCRIPTS]: ADD NEW DEPLOYMENT OF Pool_USDC ([7312848](https://github.com/Ceres-Coin/Ceres-Protocol/commit/7312848fe18fee470713215a237381b6136c9a25))


### Styling

* **migrations/2_deploy_contracts.js:** [formatting] ([83c246c](https://github.com/Ceres-Coin/Ceres-Protocol/commit/83c246cb8268224620c6132d87b939cfd74875f8))

## [1.10.0](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.9.0...v1.10.0) (2021-07-11)


### Features

* **contracts/ceres/pools/pool_usdc.sol:** [CREATED][CONTRACT]: ADD NEW CONTRACT "Pool_USDC.sol" ([e8cf9d9](https://github.com/Ceres-Coin/Ceres-Protocol/commit/e8cf9d92a073c5df0e8fbe722a612ed48b40780c))

## [1.9.0](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.8.0...v1.9.0) (2021-07-11)


### Features

* **contracts/ceres/pools/cerespool.sol:** [CREATED][CONTRACT]: ADD NEW CONTRACT "CeresPool.sol" ([70eb73f](https://github.com/Ceres-Coin/Ceres-Protocol/commit/70eb73f00726819fa5fb541623a2f1b8ee9b3f53))
* **contracts/ceres/pools/cerespoollibrary.sol:** [CREATED][CONTRACTS]: CREATE "CeresPoolLibrary" ([9e56052](https://github.com/Ceres-Coin/Ceres-Protocol/commit/9e56052fb7ce70081b94d7e1e200182a1bb1f2a2))

## [1.8.0](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.7.0...v1.8.0) (2021-07-11)


### Features

* **contracts/ceres/ceres.sol:** [MODIFY][CONTRACT]: ceres.sol, add 3 new public restrict functions ([d2985a4](https://github.com/Ceres-Coin/Ceres-Protocol/commit/d2985a47cce01fc710dcedbd4703b46401f19be3))


### Tests

* **test/ceres.test.js:** [ADD][TEST SCRIPTS]: 'check ceres.controller_address, its default value' ([17f57f1](https://github.com/Ceres-Coin/Ceres-Protocol/commit/17f57f1095018d3dd23578fa530f4a2b0c42169b))
* **test/ceres.test.js:** [ADD][TEST SCRIPTS]: 'check ceres.setController()' ([28347ad](https://github.com/Ceres-Coin/Ceres-Protocol/commit/28347adfc629ce24c7c2e1de2d6d6a2c164ca187))
* **test/ceres.test.js:** [ADD][TEST SCRIPTS]: 'check ceres.setOwner()' ([fe00537](https://github.com/Ceres-Coin/Ceres-Protocol/commit/fe005375af8133aa03747d2321c8c234f54743a3))
* **test/ceres.test.js:** [ADD][TEST SCRIPTS]: 'check ceres.setTimelock()' ([1705edb](https://github.com/Ceres-Coin/Ceres-Protocol/commit/1705edbc3fc582e0e56d9f456bed0e5add45dbd9))


### Styling

* **contracts/ceres/ceres.sol:** [COMMENTS]: add "TEST CASE DONE" comments in Ceres/Ceres.sol ([7a7427e](https://github.com/Ceres-Coin/Ceres-Protocol/commit/7a7427ebc9e9827ed3ea4526f51fa799f402a672))

## [1.7.0](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.6.1...v1.7.0) (2021-07-11)


### Features

* **contracts/css/css.sol:** [MODIFY][CONTRACT]: css.sol, add 4 new public functions ([555274d](https://github.com/Ceres-Coin/Ceres-Protocol/commit/555274d618ec985d950f03e123232034381462b6))


### Tests

* **test/ceres.test.js:** [ADDED][TEST SCRIPTS]: 'check CERES decimals = 18 ' ([58da4e3](https://github.com/Ceres-Coin/Ceres-Protocol/commit/58da4e3cc879411a5f923057bf0bf2b9503e0825))
* **test/css.test.js:** [ADD][TEST SCRIPTS]: 'check CSS setOracle, its value will set as ADMIN' ([7f1da4f](https://github.com/Ceres-Coin/Ceres-Protocol/commit/7f1da4fd85ddf106813b418b62e324422503ec0e))
* **test/css.test.js:** [ADD][TEST SCRIPTS]: 'check CSS setOwner, its value will be set as ADMIN' ([cf6d2d1](https://github.com/Ceres-Coin/Ceres-Protocol/commit/cf6d2d18e6b58e5cd6f042f7ad1c79f6899d58e6))
* **test/css.test.js:** [ADD][TEST SCRIPTS]: 'check CSS setTimelock, its value will set as ADMIN' ([c843b1f](https://github.com/Ceres-Coin/Ceres-Protocol/commit/c843b1ff9e7f0360bbad683017d1eca9d2d0984f))
* **test/css.test.js:** [ADD][TEST SCRIPTS]: 'check CSS.CERES address, its default value' ([0b51b49](https://github.com/Ceres-Coin/Ceres-Protocol/commit/0b51b4926b5bbeca07c1dea3ba6df439385eaf55))
* **test/css.test.js:** [ADD][TEST SCRIPTS]: 'check CSS.setCERESAddress' ([e8efec3](https://github.com/Ceres-Coin/Ceres-Protocol/commit/e8efec30e3dc591e61f016a06d1ed22c50762bf9))
* **test/css.test.js:** [ADDED][TEST SCRIPTS]: 'check CSS.CeresInstance, its name,symbol&DECIMALS' ([628a9a0](https://github.com/Ceres-Coin/Ceres-Protocol/commit/628a9a0a21864900509120380bbb1f70f1fcc4e2))


### Styling

* **contracts/css/css.sol:** [COMMENTS]: add "TEST CASE DONE" comments in contracts/CSS/CSS.sol ([86f483c](https://github.com/Ceres-Coin/Ceres-Protocol/commit/86f483c7c8916b4afd4e69ecf62fd46164ac949d))

### [1.6.1](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.6.0...v1.6.1) (2021-07-10)


### Bug Fixes

* **contracts/css/css.sol:** [modify]: remove getChainId() from css.sol ([3db1850](https://github.com/Ceres-Coin/Ceres-Protocol/commit/3db18507a4e5016ff8742fa632a49cd64f03d7c2))
* **contracts/css/css.sol:** [modify][contract]: removed unused code from css.sol ([a6ead26](https://github.com/Ceres-Coin/Ceres-Protocol/commit/a6ead269c87122025abcdc6cdd45233d1e5cbd90))
* **contracts/css/css.sol:** [remove][code]: remove unused comments from css.sol ([d9aa9f5](https://github.com/Ceres-Coin/Ceres-Protocol/commit/d9aa9f50650c65e97184cd38b846b1f041e4c54e))


### Tests

* **test/css.test.js:** [MODIFY][TEST]: ADD NEW TEST SCRIPTS ([45492ff](https://github.com/Ceres-Coin/Ceres-Protocol/commit/45492ff8f8c4e312e55200459d6d81a3fa91bef6))
* **test/css.test.js:** [modify][test]: add new test scripts in css.test.js ([b7113ef](https://github.com/Ceres-Coin/Ceres-Protocol/commit/b7113ef2fe4cddce5e18aa45a26e37d765f52e3e))
* **test/css.test.js:** [modify][test]: add new test scripts, 'check CSS owner_address' ([13b8d47](https://github.com/Ceres-Coin/Ceres-Protocol/commit/13b8d471b490a3a4a6e7030bca71f265997852c6))
* **test/css.test.js:** [modify][test]: add test scripts in "test/css.test.js" ([a17c0eb](https://github.com/Ceres-Coin/Ceres-Protocol/commit/a17c0eb283ca44399708a66e1393a4a29dcdc15c))


### Others

* **contracts/css/css.sol:** [MODIFY][SOLIDITY]: add comments in css.sol ([b599781](https://github.com/Ceres-Coin/Ceres-Protocol/commit/b59978179c9aa866ec0d144984636e1053fd0ef6))

## [1.6.0](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.5.2...v1.6.0) (2021-07-10)


### Features

* **contracts/css/css.sol migrations/2_deploy_contracts.js test/css.test.js package.json:** css.sol ([13d3e86](https://github.com/Ceres-Coin/Ceres-Protocol/commit/13d3e864a7782fad7820cdfe272bacbf8af0da52))


### Others

* **contracts/ceres/ceres.sol:** aDD "TEST CASE DONE" COMMENTS FOR Ceres.sol ([5a4af83](https://github.com/Ceres-Coin/Ceres-Protocol/commit/5a4af83a45abfbdd688320453865f131da4a72b7))

### [1.5.2](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.5.1...v1.5.2) (2021-07-10)


### Tests

* **test/ceres.test.js:** [add][scripts]: 'check ceres.pool_mint(account3,100)' ([447feb6](https://github.com/Ceres-Coin/Ceres-Protocol/commit/447feb6b3f96ec8d35d38e4593c5eb2ede25db6d))
* **test/ceres.test.js:** [added][scripts]: 'check ceres.pool_mint(account3,100),without addPool()' ([2f98366](https://github.com/Ceres-Coin/Ceres-Protocol/commit/2f9836625e8f6eb03f14c7bba7ef7b5cd6ce70ae))
* **test/ceres.test.js:** [ADDED][SCRIPTS]: 'check ceres.pool_mint(account3,100),without addPool()' ([5c5c557](https://github.com/Ceres-Coin/Ceres-Protocol/commit/5c5c557b2c1a20c6f7bfcca795cb3a197bef17c6))


### Others

* **contracts/ceres/ceres.sol:** [ADDED]: Added comments for ceres.sol (TEST CASE DONE) ([45630c2](https://github.com/Ceres-Coin/Ceres-Protocol/commit/45630c21d99b874ba82a3b5b9aa427f5b96e661e))

### [1.5.1](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.5.0...v1.5.1) (2021-07-09)


### Tests

* **test/ceres.test.js:** [ADDED][TEST SCRIPTS]: ceres.addPool/removePool/ceres_pools,etc ([120e554](https://github.com/Ceres-Coin/Ceres-Protocol/commit/120e55433439a64c7db78a3a2c249e1c39ad8a0b))

## [1.5.0](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.4.0...v1.5.0) (2021-07-09)


### Features

* **contracts/ceres/ceres.sol:** [NEW FEATURE][CERES]: ADDED addPool() & removePool() & modifier ([75c7612](https://github.com/Ceres-Coin/Ceres-Protocol/commit/75c76125ba9fb007cb1218df445d0443453592b0))


### Bug Fixes

* **contracts/ceres/ceres.sol:** added modifier "onlyPools" & "onlyByOwnerOrGovernance" ([a99132d](https://github.com/Ceres-Coin/Ceres-Protocol/commit/a99132d3150164487a15ec53a95a8aaa33f2a42e))

## [1.4.0](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.3.0...v1.4.0) (2021-07-09)


### Features

* **contracts/ceres/ceres.sol:** [created][new file]: ceres.sol ([84af3be](https://github.com/Ceres-Coin/Ceres-Protocol/commit/84af3be55d16adc9fcfd2f2022d84a3515703eb2))


### Bug Fixes

* **contracts/ceres/ceres.sol:** add constructor & migration scripts for ceres.sol ([d7feadf](https://github.com/Ceres-Coin/Ceres-Protocol/commit/d7feadf549910f4084ba9646ff3c0e2d05c9ddd8))


### Tests

* **test/ceres.test.js:** [added][scripts]: 'check CERES genesis_supply = ONE_MILLION_DEC18 ' ([114593f](https://github.com/Ceres-Coin/Ceres-Protocol/commit/114593fc9153979e5351e7de59462fc31c823346))
* **test/ceres.test.js:** [ADDED][scripts]: ceres.balanceOf(creator_address) ([2f59eef](https://github.com/Ceres-Coin/Ceres-Protocol/commit/2f59eef06a62a8107cacf017a3280ae326118889))
* **test/ceres.test.js:** [ADDED][SCRIPTS]: creator_address/timelock_address/DEFAULT_ADMIN_ADDRESS/ ([36816d7](https://github.com/Ceres-Coin/Ceres-Protocol/commit/36816d7f9d6e04c2d03cf00c739fbcc491e240df))
* **test/ceres.test.js:** [ADDED][TEST SCRIPTS]: for the ceres.sol constructor func ([0a5b039](https://github.com/Ceres-Coin/Ceres-Protocol/commit/0a5b039290e2d0456811b24c9cfc9fae9284f6f9))

## [1.3.0](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.2.2...v1.3.0) (2021-07-09)


### Features

* **added erc20.sol:** aDDED ERC20.SOL ([4db0285](https://github.com/Ceres-Coin/Ceres-Protocol/commit/4db028525bcf3dd9c874f9bcacca765adb41ee45))
* **contracts/math/safemath.sol:** aDDED SafeMath.sol ([f05e8e3](https://github.com/Ceres-Coin/Ceres-Protocol/commit/f05e8e3dd29c211d338e73bf31cef3d5ca87cab9))
* **migrations/2_deploy_contracts.js:** added new deployment scripts for sampleERC20 ([dc2f56e](https://github.com/Ceres-Coin/Ceres-Protocol/commit/dc2f56ea9551999791a517d34ea2bd684789b474))


### Tests

* **test/erc20.js:** added test scripts for erc20.sol ([b2eadab](https://github.com/Ceres-Coin/Ceres-Protocol/commit/b2eadab973f53c0f026d208ff931d694ce7759be))

### [1.2.2](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.2.1...v1.2.2) (2021-07-09)


### Tests

* **test/metacoin.js:** [ADDED][SCRIPTS]: 'Test for MetaCoin.sol' ([424ac0a](https://github.com/Ceres-Coin/Ceres-Protocol/commit/424ac0a4766fe4959e8a5f596a3143565f65d93f))


### CI

* **.gitignore:** added build folder ([cd85363](https://github.com/Ceres-Coin/Ceres-Protocol/commit/cd853631c86373d82074bf6569e74aeb2b9f4269))

### [1.2.1](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.2.0...v1.2.1) (2021-07-09)


### Build System

* **added truffle example code:** aDDED TRUFFLE EXAMPLE CODE ([2c94478](https://github.com/Ceres-Coin/Ceres-Protocol/commit/2c944788197aeed85d434d027228ba8106be33a3))

## [1.2.0](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.1.0...v1.2.0) (2021-07-09)


### Features

* **contracts/migrations.sol:** iNSTALL TRUFFLE ([43c5765](https://github.com/Ceres-Coin/Ceres-Protocol/commit/43c5765700b18bba029efbcb8bce55fbfeb9ed09))

## [1.1.0](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.0.4...v1.1.0) (2021-07-09)


### Features

* **contracts/erc20.sol:** erc20.sol ([0e29646](https://github.com/Ceres-Coin/Ceres-Protocol/commit/0e29646bc6fadc47ffb3243690a8baa62099c664))


### Tests

* **test/test004.js:** [ADD][NEW FILE] ([d9a3222](https://github.com/Ceres-Coin/Ceres-Protocol/commit/d9a322299ecfd1f48a5937b10470e3cb87a49e87))

### [1.0.4](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.0.3...v1.0.4) (2021-07-09)


### Tests

* **test/test002.js:** add new test file test002.js ([267b23b](https://github.com/Ceres-Coin/Ceres-Protocol/commit/267b23bc082aa59f51356da584da475d3f381573))
* **test/test003.js:** add new test003.js ([c48d321](https://github.com/Ceres-Coin/Ceres-Protocol/commit/c48d3212f2c7e8ea89602e4c24b45e8b69387b64))

### [1.0.3](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.0.2...v1.0.3) (2021-07-09)


### Tests

* add new test file ([c6075e6](https://github.com/Ceres-Coin/Ceres-Protocol/commit/c6075e69db4903df6712091d6fa854f48b2304e8))

### [1.0.2](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.0.1...v1.0.2) (2021-07-09)

### 1.0.1 (2021-07-09)
