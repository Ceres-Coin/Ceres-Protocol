# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
