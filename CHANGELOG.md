# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
