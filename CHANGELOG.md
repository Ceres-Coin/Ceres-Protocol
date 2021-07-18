# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.17.0](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.16.0...v1.17.0) (2021-07-18)


### Features

* **contracts/staking/stakingrewards.sol:** [ADDED][CONTRACTS][FUNC]: ADDED 'setPeriodFinish(uint256 _periodFinish)' ([13b39a6](https://github.com/Ceres-Coin/Ceres-Protocol/commit/13b39a65fe6e06092e86c88011ce0955a2dd043b))
* **contracts/staking/stakingrewards.sol:** [CREATED][NEW][CONTRACT]: contracts/Staking/StakingRewards.sol; contracts/Staking/RewardsDistributionRecipient.sol; contracts/Staking/Pausable.sol; contracts/Staking/Owned.sol; contracts/Staking/IStakingRewards.sol; contracts/ERC20/SafeERC20.sol ([bffe09d](https://github.com/Ceres-Coin/Ceres-Protocol/commit/bffe09deefadf56c07c47ec91bd73d56dedb42fb))
* **contracts/staking/stakingrewards.sol:** [MODIFIED][CONTRACTS]: [REMOVED][TEST CASES DONE] ([5128c2c](https://github.com/Ceres-Coin/Ceres-Protocol/commit/5128c2c5c5264920938690813c1827ee86646eeb))
* **contracts/staking/stakingrewards.sol:** [MODIFIED][CONTRACTS]: Using 'SafeERC20' as 'ERC20' ([25830eb](https://github.com/Ceres-Coin/Ceres-Protocol/commit/25830ebac3d1ef3488da1dbfa974464551b8f349))
* **contracts/staking/variants/stake_ceres_weth.sol:** [ADDED][NEW][CONTRACTS][FILE]: 'contracts/Staking/Variants/Stake_CERES_WETH.sol' ([342a993](https://github.com/Ceres-Coin/Ceres-Protocol/commit/342a993227bd8c3b0ec961243f479b8689f013e2))
* **migrations/3_deploy_uniswap_oracle_weth.js:** [ADDED][DEPLOYMENT SCRIPTS]: ADDED PRINT 'instanceStakingRewards_CERES_WETH.address' ([96d1efa](https://github.com/Ceres-Coin/Ceres-Protocol/commit/96d1efa60e170cf077fb9c74fa408778c5d38a2c))
* **migrations/3_deploy_uniswap_oracle_weth.js:** [MODIFIED][DEPLOYMENT SCRIPTS]: ADDED DEPLOYMENT SCRIPTS OF 'StakingRewards_CERES_WETH' ([ba2d60a](https://github.com/Ceres-Coin/Ceres-Protocol/commit/ba2d60ab6207ed40410fdd01fd922252f66723b1))


### Docs

* **contracts/staking/stakingrewards.sol:** [ADDED][TODO TASKS] IN contracts/Staking/StakingRewards.sol ([ca9ffdd](https://github.com/Ceres-Coin/Ceres-Protocol/commit/ca9ffdd7d013e9929609e16cb9fc3ad2aa83b381))
* **contracts/staking/stakingrewards.sol:** [ADDED][TODO TASKS]: '// TODO: [P2][CORE]: ADD TEST CASES IN [Stake_CERES_WETH_P2.test.js]' ([8a60945](https://github.com/Ceres-Coin/Ceres-Protocol/commit/8a60945fc02d68cfea97a0017049de754d89546b))
* **contracts/staking/stakingrewards.sol:** [ADDED][TODO TASKS]: // TODO: [P2][CORE]: ADD TEST CASES IN [Stake_CERES_WETH_P2.test.js] ([2bffde0](https://github.com/Ceres-Coin/Ceres-Protocol/commit/2bffde0718b092eac0d8b0fca13e369a91d73f64))


### Tests

* **contracts/staking/stakingrewards.sol:** [ADDED][COMMENTS][TEST CASES DONE] ([2a37f30](https://github.com/Ceres-Coin/Ceres-Protocol/commit/2a37f307225966eb41b53bf4549b87529b025e47))
* **contracts/staking/stakingrewards.sol:** [ADDED][COMMENTS][TEST CASES DONE] ([58f111f](https://github.com/Ceres-Coin/Ceres-Protocol/commit/58f111fdf944ae69c2599800dcd6d791b2fb2ab6))
* **test/stake_ceres_weth.test.js:** 'check instanceStakingRewards_CERES_WETH.CERES, its value is ceresInstance.address' ([bee4a84](https://github.com/Ceres-Coin/Ceres-Protocol/commit/bee4a842dd768642f754879de392464dd2e26211))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST CASES DONE]: 'check instanceStakingRewards_CERES_WETH.cr_boost_max_multiplier.call(), its default value is equal 3000000' ([7b87e3c](https://github.com/Ceres-Coin/Ceres-Protocol/commit/7b87e3c2c782661b2d3a301957bdcc6de4f6f62b))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST CASES DONE]: 'check instanceStakingRewards_CERES_WETH.locked_stake_min_time_str.call(), its default value is equal "604800"' ([e758399](https://github.com/Ceres-Coin/Ceres-Protocol/commit/e7583997443d1ae15445ece862d04f0f2260949c))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST CASES DONE]: 'check instanceStakingRewards_CERES_WETH.unlockedStakes.call(), its default value is equal false' ([1a2e98c](https://github.com/Ceres-Coin/Ceres-Protocol/commit/1a2e98cb09bffb2bc87a4f463ff9e2aafb8e071b))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST CASES DONE]: "check instanceStakingRewards_CERES_WETH.userRewardPerTokenPaid(account0 - account7), check its default value for account0 - account7 should ALL be 0 " ([623c689](https://github.com/Ceres-Coin/Ceres-Protocol/commit/623c689f26885e231fd912ae8a67b6e283483b0c))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST CASES DONE]: "check Stake_CERES_WETH.greylist(account0 - account7), check its value for account0 - 7 should ALL be FALSE " ([b29e514](https://github.com/Ceres-Coin/Ceres-Protocol/commit/b29e5141ad8cf6d280828a73728dbd42b5a2c565))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST CASES DONE]: "check Stake_CERES_WETH.rewards(account0 - account7), check its value for account0 - 7 should ALL be 0 " ([3b30693](https://github.com/Ceres-Coin/Ceres-Protocol/commit/3b30693c7e38dc6602fb4420a09f68bec868fe5c))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST CASES]: 'check instanceStakingRewards_CERES_WETH.locked_stake_max_multiplier.call(), its default value is equal 3000000' ([067254f](https://github.com/Ceres-Coin/Ceres-Protocol/commit/067254f21fbea22e5780a8eb19b44b473670b726))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST CASES]: 'check instanceStakingRewards_CERES_WETH.locked_stake_min_time.call(), its default value is equal 604800' ([f45f268](https://github.com/Ceres-Coin/Ceres-Protocol/commit/f45f268a734d23d11af87b893a6196430abdd2c9))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST SCRIPTS]: 'check instanceStakingRewards_CERES_WETH.address, its value is not be empty' ([4ec1ed0](https://github.com/Ceres-Coin/Ceres-Protocol/commit/4ec1ed0ca85f633fc487de46b2050d1b441f87f5))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST SCRIPTS]: 'check instanceStakingRewards_CERES_WETH.lastUpdateTime.call(), its default value is gt(0)' ([84f76e9](https://github.com/Ceres-Coin/Ceres-Protocol/commit/84f76e9c047ccc462699c3b290a03d09c9de1fab))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST SCRIPTS]: 'check instanceStakingRewards_CERES_WETH.locked_stake_time_for_max_multiplier.call(), its default value is equal 3 * 365 * 86400' ([359ab09](https://github.com/Ceres-Coin/Ceres-Protocol/commit/359ab09f1cf9a94121e2c75e965bb8bca2e11e60))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST SCRIPTS]: 'check instanceStakingRewards_CERES_WETH.MULTIPLIER_BASE.call(), its default value is 1e6' ([48dcce4](https://github.com/Ceres-Coin/Ceres-Protocol/commit/48dcce428d402ec85abe208cb6b5c572b55cce9a))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST SCRIPTS]: 'check instanceStakingRewards_CERES_WETH.owner_address, its value is OWNER' ([8d1fe2d](https://github.com/Ceres-Coin/Ceres-Protocol/commit/8d1fe2d7fa90467326d7db20285aa98db71d1393))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST SCRIPTS]: 'check instanceStakingRewards_CERES_WETH.periodFinish.call(), its default value is 0' ([973b541](https://github.com/Ceres-Coin/Ceres-Protocol/commit/973b5417fd116c825a6be2ae97cda05d4032b95d))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST SCRIPTS]: 'check instanceStakingRewards_CERES_WETH.pool_weight.call(), its default value is gt(0)' ([62b5d4c](https://github.com/Ceres-Coin/Ceres-Protocol/commit/62b5d4cc17db2350178343721ab5aade5dd0a17e))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST SCRIPTS]: 'check instanceStakingRewards_CERES_WETH.PRICE_PRECISION.call(), its default value is 1e6' ([f81e7f4](https://github.com/Ceres-Coin/Ceres-Protocol/commit/f81e7f4a8635f532b13b8d201d12f6b65b1dcf65))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST SCRIPTS]: 'check instanceStakingRewards_CERES_WETH.rewardPerTokenStored.call(), its default value is equal (0)' ([0e6d1a1](https://github.com/Ceres-Coin/Ceres-Protocol/commit/0e6d1a10ab5fafbbbaa7b4e76bf716855b4d8e37))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST SCRIPTS]: 'check instanceStakingRewards_CERES_WETH.rewardRate.call(), its default value is gt(0)' ([7610ce5](https://github.com/Ceres-Coin/Ceres-Protocol/commit/7610ce5d98ff43ae7c59619ea785d08dcb8c3057))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST SCRIPTS]: 'check instanceStakingRewards_CERES_WETH.rewardsDistribution, its value is TEST_ACCOUNT' ([bd37a78](https://github.com/Ceres-Coin/Ceres-Protocol/commit/bd37a78112c0dab83584926d461a772defbad87f))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST SCRIPTS]: 'check instanceStakingRewards_CERES_WETH.rewardsDuration.call(), its default value is 604800' ([ae19989](https://github.com/Ceres-Coin/Ceres-Protocol/commit/ae199894df2f8f01a22e81c3a0ecedd5302ca63e))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST SCRIPTS]: 'check instanceStakingRewards_CERES_WETH.rewardsToken, its value is cssInstance.address' ([8d1cd52](https://github.com/Ceres-Coin/Ceres-Protocol/commit/8d1cd5234fe1b9e57118eee27329032e31fe071f))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST SCRIPTS]: 'check instanceStakingRewards_CERES_WETH.stakingToken, its value is pair_addr_CERES_WETH' ([23ea9fd](https://github.com/Ceres-Coin/Ceres-Protocol/commit/23ea9fdc78ff5e9bc262c6daedcd816cc07a2b3b))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST SCRIPTS]: 'check instanceStakingRewards_CERES_WETH.timelock_address, its value is OWNER' ([950d3d7](https://github.com/Ceres-Coin/Ceres-Protocol/commit/950d3d7205bfcc526609ee420936e42bd1f37215))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST SCRIPTS]: 'check Stake_CERES_WETH.boostedBalanceOf(account0 - account7), check its value for account0 - 7 should ALL be 0 ' ([a2aa57f](https://github.com/Ceres-Coin/Ceres-Protocol/commit/a2aa57fdad67a92ff5fb858cc6f829014eb8e516))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST SCRIPTS]: 'check STAKE_CERES_WETH.crBoostMultiplier.call(), its default value is gt 0' ([068320f](https://github.com/Ceres-Coin/Ceres-Protocol/commit/068320f09d5694c0596fdf745ce172c897220a36))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST SCRIPTS]: 'check Stake_CERES_WETH.earned(account0 - account7), check its value for account0 - 7 should ALL be 0' ([c1c0f1d](https://github.com/Ceres-Coin/Ceres-Protocol/commit/c1c0f1d78b00770ea984d5b7446a535ecde9a4b5))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST SCRIPTS]: 'check STAKE_CERES_WETH.getRewardForDuration.call(), its default value is gt 0' ([7a9cc88](https://github.com/Ceres-Coin/Ceres-Protocol/commit/7a9cc88e6b32ef54d522d562b7044f5b466938b2))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST SCRIPTS]: 'check STAKE_CERES_WETH.lastTimeRewardApplicable.call(), after initializeDefault() its default value is gt 0' ([f3ebe2a](https://github.com/Ceres-Coin/Ceres-Protocol/commit/f3ebe2a0a8df50b75f5ca4b50196ebd2fb7d0e92))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST SCRIPTS]: 'check STAKE_CERES_WETH.lastTimeRewardApplicable.call(), its default value is equal 0' ([3f6a9cb](https://github.com/Ceres-Coin/Ceres-Protocol/commit/3f6a9cbb9cd485c84c9d394e8ff884e25077e3d6))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST SCRIPTS]: 'check Stake_CERES_WETH.lockedBalanceOf(account0 - account7), check its value for account0 - 7 should ALL be 0 ' ([a24477e](https://github.com/Ceres-Coin/Ceres-Protocol/commit/a24477ea064df4141fa70cf2776d9ed5b63c945a))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST SCRIPTS]: 'check STAKE_CERES_WETH.rewardPerToken.call(), its default value is equal 0' ([10e59db](https://github.com/Ceres-Coin/Ceres-Protocol/commit/10e59db8474f77883db87da5adfc30ab2a176620))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST SCRIPTS]: 'check STAKE_CERES_WETH.rewardsToken_balance.call(), its default value is equal 0' ([ca5fa31](https://github.com/Ceres-Coin/Ceres-Protocol/commit/ca5fa3194282b70e2e121cc0ad201d76efa02e45))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST SCRIPTS]: 'check STAKE_CERES_WETH.setRewardsDuration() FUNC' ([d3a2e37](https://github.com/Ceres-Coin/Ceres-Protocol/commit/d3a2e37fa0580f2eb4ffc4c080c9f1bfb8da4332))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST SCRIPTS]: 'check STAKE_CERES_WETH.stakingDecimals.call(), its default value is equal 18' && 'check Stake_CERES_WETH.rewardsFor(account0 - account7), check its value for account0 - 7 should ALL be 0' ([d459cdf](https://github.com/Ceres-Coin/Ceres-Protocol/commit/d459cdf31e0b0e384d81e9427f019ac98bedc582))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST SCRIPTS]: 'check STAKE_CERES_WETH.stakingMultiplier.call(1), its default value is gt 0' ([3f67ebe](https://github.com/Ceres-Coin/Ceres-Protocol/commit/3f67ebeab09e66f25ece49dbfa91c415b0176693))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST SCRIPTS]: 'check STAKE_CERES_WETH.totalBoostedSupply.call(), its default value is equal 0' ([0f76bd1](https://github.com/Ceres-Coin/Ceres-Protocol/commit/0f76bd187d3314e393678c235ed4cf23ae604e0b))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST SCRIPTS]: 'check STAKE_CERES_WETH.totalSupply.call(), its default value is equal 0' ([10ca6cd](https://github.com/Ceres-Coin/Ceres-Protocol/commit/10ca6cd1a8248896cf5f06fb1848ba00ed6b66c6))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST SCRIPTS]: "check Stake_CERES_WETH.balanceOf(account0 - account7), check its value for account0 - 7 should ALL be 0 " ([02f4144](https://github.com/Ceres-Coin/Ceres-Protocol/commit/02f414424945095cb2eb3b7ba95623832e8986d8))
* **test/stake_ceres_weth.test.js:** [ADDED][TEST SCRIPTS]: ('check Stake_CERES_WETH.unlockedBalanceOf(account0 - account7), check its value for account0 - 7 should ALL be 0 ' ([54212d8](https://github.com/Ceres-Coin/Ceres-Protocol/commit/54212d8f6fa20a30429c8edb9badf3206334654b))
* **test/stake_ceres_weth.test.js:** [CREATED][NEW][FILE]: 'test/Stake_CERES_WETH.test.js' ([d06a913](https://github.com/Ceres-Coin/Ceres-Protocol/commit/d06a913f1693d81ace813366485bded99cbc0a3d))


### Styling

* **contracts/staking/stakingrewards.sol:** [ADDED][COMMENTS]: 'TEST CASES DONE' ([cdf799f](https://github.com/Ceres-Coin/Ceres-Protocol/commit/cdf799f27569800eb384b9c869ada9713907f106))
* **contracts/staking/stakingrewards.sol:** [ADDED][COMMENTS]: TEST CASES DONE ([e52a450](https://github.com/Ceres-Coin/Ceres-Protocol/commit/e52a450bc57f1e41047a6d005e441a43819f5099))
* **contracts/staking/stakingrewards.sol:** [ADDED][COMMENTS][TEST CASES DONE] ([4e6e8c9](https://github.com/Ceres-Coin/Ceres-Protocol/commit/4e6e8c92ca6fff06b34dae0c7c59fd9d9008aae2))
* **contracts/staking/stakingrewards.sol:** [ADDED][COMMENTS][TEST CASES DONE] ([881d829](https://github.com/Ceres-Coin/Ceres-Protocol/commit/881d829b47b06af5a36994be25511f540ac1da7c))
* **contracts/staking/stakingrewards.sol:** [ADDED][COMMENTS][TEST CASES DONE] ([0df2d77](https://github.com/Ceres-Coin/Ceres-Protocol/commit/0df2d77905ae7c55ff2a173fda8122652d633939))
* **contracts/staking/stakingrewards.sol:** [ADDED][COMMENTS][TEST CASES DONE] ([092f8d2](https://github.com/Ceres-Coin/Ceres-Protocol/commit/092f8d23b30224183c0ea2e9679b5362aeb04e5e))
* **contracts/staking/stakingrewards.sol:** [ADDED][COMMENTS][TEST CASES DONE] ([937ce52](https://github.com/Ceres-Coin/Ceres-Protocol/commit/937ce52f0cc976a07cfce74338cc15034a1fb339))
* **contracts/staking/stakingrewards.sol:** [ADDED][TEST CASES DONE] ([510f513](https://github.com/Ceres-Coin/Ceres-Protocol/commit/510f513030d5203ecad16a08635be6c74a877f69))
* **contracts/staking/stakingrewards.sol:** [ADDED][TEST CASES DONE] ([2d95466](https://github.com/Ceres-Coin/Ceres-Protocol/commit/2d95466424b4545c5d998cff4d9cff1e4d6f91b2))
* **contracts/staking/stakingrewards.sol:** [ADDED][TEST CASES DONE] ([cb39cc8](https://github.com/Ceres-Coin/Ceres-Protocol/commit/cb39cc853ed5199d91049d88c4941727dec9bb3a))
* **contracts/staking/stakingrewards.sol:** [ADDED][TEST CASES DONE] ([df69045](https://github.com/Ceres-Coin/Ceres-Protocol/commit/df69045ac598af1a01de29b7ab2f434024a95b7b))
* **contracts/staking/stakingrewards.sol:** [ADDED][TEST CASES DONE] ([0b8b01c](https://github.com/Ceres-Coin/Ceres-Protocol/commit/0b8b01cca6e146c9a99e1a43b08d1e6332e82747))
* **contracts/staking/stakingrewards.sol:** [ADDED][TODO TASKS] && [ADDED][COMMENTS][TEST CASES DONE] ([41fc775](https://github.com/Ceres-Coin/Ceres-Protocol/commit/41fc775e56d2bc878aa335be37c145ec140a1897))
* **contracts/staking/stakingrewards.sol:** [ADDED][TODO TASKS]: 'ADD TEST CASES (NOT TOTALLY UNDERSTAND, DO INVESTIGATE LATER)' ([dbcefdd](https://github.com/Ceres-Coin/Ceres-Protocol/commit/dbcefdd5b846aa55647a7cb868645be0106ef21a))
* **contracts/staking/stakingrewards.sol:** [MODIFIED][CONTRACTS]: UPDATE PUBLIC TO PRIVATE ([b3b9955](https://github.com/Ceres-Coin/Ceres-Protocol/commit/b3b9955a5c39f2bd4f24ced7acd6f70fa4e1511f))
* **migrations/3_deploy_uniswap_oracle_weth.js:** [REFORMATTING] ([12d259e](https://github.com/Ceres-Coin/Ceres-Protocol/commit/12d259ece48b2f87e621cdd0b579f13568ecba12))
* **test/stake_ceres_weth.test.js:** [REFORMATTING][CODE] ([ef4672f](https://github.com/Ceres-Coin/Ceres-Protocol/commit/ef4672fadedf201dbdb601effb6ba78e83062ace))
* **test/stake_ceres_weth.test.js:** [REFORMATTING][CODE] ([b383577](https://github.com/Ceres-Coin/Ceres-Protocol/commit/b383577e8e9fad1d951133fcdbe382770dec62b1))
* **test/stake_ceres_weth.test.js:** [REFORMATTING][CODE] ([46afb12](https://github.com/Ceres-Coin/Ceres-Protocol/commit/46afb124bd92f01e227ef61ae18efed9c44ee628))
* **test/stake_ceres_weth.test.js:** [REFORMATTING][CODE] ([a6848d8](https://github.com/Ceres-Coin/Ceres-Protocol/commit/a6848d82b9ca87191a546b43dadcf0a37cc70697))

## [1.16.0](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.15.0...v1.16.0) (2021-07-17)


### Features

* **contracts/ceres/pools/cerespool.sol:** [ADDED][CORE][FUNC]: 'buyBackCSS' && 'availableExcessCollatDV()' ([501f10e](https://github.com/Ceres-Coin/Ceres-Protocol/commit/501f10e36972aa10efcda9dfd9ea77217d9b6622))


### Tests

* **'check instance_pool_usdc.togglerecollateralize() func':** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC.toggleRecollateralize() FUNC' ([667e32a](https://github.com/Ceres-Coin/Ceres-Protocol/commit/667e32a4b3e2a21f071d50292df8c57a22d66c5f))
* **test/ceres_pool_usdc_p2.test.js:** [ADDED][CORE][TEST SCRIPTS]: 'check instance_Pool_USDC.recollateralizeCSS()' ([427d351](https://github.com/Ceres-Coin/Ceres-Protocol/commit/427d351eb18f65e4950598835b92743e6b145669))
* **test/ceres_pool_usdc_p2.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC.buyBackCSS()' ([63cbd1a](https://github.com/Ceres-Coin/Ceres-Protocol/commit/63cbd1a6cfba370500bda7c6ce80c8305bda3f9a))
* **test/ceres_pool_usdc_p2.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC.recollateralizeCSS()' ([f8bdcfe](https://github.com/Ceres-Coin/Ceres-Protocol/commit/f8bdcfecb20a7ef82b93d594c108c83cdd77a4f9))
* **test/ceres_pool_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC.availableExcessCollatDV.call(), its default is 0' ([7aee033](https://github.com/Ceres-Coin/Ceres-Protocol/commit/7aee0335326966d0b60e1f6cf85cb654d2387f7a))
* **test/ceres_pool_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC.buyBackPaused.call() = FALSE' ([8af214f](https://github.com/Ceres-Coin/Ceres-Protocol/commit/8af214f6aba1ae0d5d9a1304935378951634e301))
* **test/ceres_pool_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC.collatDollarBalance()' ([80fb901](https://github.com/Ceres-Coin/Ceres-Protocol/commit/80fb90160bdcb5d7a644225908d2d720acaff8be))
* **test/ceres_pool_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC.setBonus_rate() FUNC' ([a2615ca](https://github.com/Ceres-Coin/Ceres-Protocol/commit/a2615ca2dc98cad896271748c8f7945e85c0eebb))
* **test/ceres_pool_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC.setBuyback_fee() FUNC' ([d2abf41](https://github.com/Ceres-Coin/Ceres-Protocol/commit/d2abf415e0e8d16f5e74f38fb1882775ed0b8ee8))
* **test/ceres_pool_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC.setRecollat_fee() FUNC' ([5019f9c](https://github.com/Ceres-Coin/Ceres-Protocol/commit/5019f9c5adbe61258bda342e9479cd7c626c27d4))
* **test/ceres_pool_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC.setRedemption_fee() FUNC' ([0d8941d](https://github.com/Ceres-Coin/Ceres-Protocol/commit/0d8941d04289fb34861e12c8ff419f82fd65df0d))
* **test/ceres_pool_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check instanceCERES.globalCollateralValue()' ([6d11651](https://github.com/Ceres-Coin/Ceres-Protocol/commit/6d11651771be5eb76ce67f0afc6784094aa41d56))


### Styling

* **contracts/ceres/pools/cerespool.sol && contracts/ceres/ceres.sol:** [ADDED][TEST CASE DONE] && [REMOVED][TODO TASKS] ([fb537fb](https://github.com/Ceres-Coin/Ceres-Protocol/commit/fb537fba26a26447782144d037afe64bdd03c742))
* **contracts/ceres/pools/cerespool.sol:** [ADDED][TEST CASE DONE] && [REMOVED][TODO TASKS] ([2ea5420](https://github.com/Ceres-Coin/Ceres-Protocol/commit/2ea54206fe1931ac9dda16efe6825ca78f411948))
* **contracts/ceres/pools/cerespool.sol:** [ADDED][TEST CASES DONE] & [REMOVED][TODO TASKS] ([f86c705](https://github.com/Ceres-Coin/Ceres-Protocol/commit/f86c70501cc2d64c1cf331f763f053c53589c2dc))
* **contracts/ceres/pools/cerespool.sol:** [ADDED][TEST CASES DONE] && [REMOVED][TODO TASKS] ([f7bd8f7](https://github.com/Ceres-Coin/Ceres-Protocol/commit/f7bd8f76d74dfdce7855362672aab72f905e47ad))
* **contracts/ceres/pools/cerespool.sol:** [ADDED][TEST CASES DONE] && [REMOVED][TODO TASKS] ([5ecd84b](https://github.com/Ceres-Coin/Ceres-Protocol/commit/5ecd84bc6b57778e6a40b009c574e31428c4539c))
* **contracts/ceres/pools/cerespool.sol:** [ADDED][TEST CASES DONE] && [REMOVED][TODO TASKS] ([5a75898](https://github.com/Ceres-Coin/Ceres-Protocol/commit/5a7589849b43c27611f7e917c48f2a3c77a5365a))
* **contracts/ceres/pools/cerespool.sol:** [ADDED][TEST CASES DONE] && [REMOVED][TODO TASKS] ([0666fa1](https://github.com/Ceres-Coin/Ceres-Protocol/commit/0666fa1b51715a649bc486bbb7031ec57d2f7fc9))

## [1.15.0](https://github.com/Ceres-Coin/Ceres-Protocol/compare/v1.14.0...v1.15.0) (2021-07-16)


### Features

* **contracts/ceres/pools/cerespool.sol && contracts/ceres/ceres.sol:** [ADDED][FUNC]: 'collatDollarBalance()' IN 'CeresPool.sol' && 'globalCollateralValue()' in 'Ceres.sol' ([7138401](https://github.com/Ceres-Coin/Ceres-Protocol/commit/71384018f094d487e7282b7dca1b0c4df89b9446))
* **contracts/ceres/pools/cerespool.sol && contracts/ceres/ceres.sol:** [ADDED][FUNC]: 'pool_burn_from' IN 'ceres.sol' && [ADDED][PARAMETERS]: 'lastRedeemed" & 'redeemCollateralBalances' & 'redemption_fee' IN 'CeresPool.sol' && [ADDED][CORE][FUNC]: 'redeem1t1CERES' IN 'CeresPool.sol' ([d990de9](https://github.com/Ceres-Coin/Ceres-Protocol/commit/d990de913dc91859809351ccb11ddf9177760352))
* **contracts/ceres/pools/cerespool.sol && contracts/css/css.sol:** [ADDED][CORE][FUNC]: 'redeemFractionalCERES' IN 'CeresPool.sol' && [ADDED][CORE][FUNC]: 'pool_mint()' IN 'CSS.sol' ([8067b8b](https://github.com/Ceres-Coin/Ceres-Protocol/commit/8067b8beb8d3400e8c661324e293e94894a56499))
* **contracts/ceres/pools/cerespool.sol:** [ADDED][CONTRACTS][FUNC]: 'mintAlgorithmicCERES' ([b9edd2e](https://github.com/Ceres-Coin/Ceres-Protocol/commit/b9edd2eb3bc28a3a3b44ce359a1ff66909b303cf))
* **contracts/ceres/pools/cerespool.sol:** [ADDED][CONTRACTS][FUNC]: ADDED PARAMETER 'redeemPaused'; ADDED MODIFIERS 'notRedeemPaused'; ADDED FUNC 'toggleRedeeming()' ([6c0ea7a](https://github.com/Ceres-Coin/Ceres-Protocol/commit/6c0ea7a548b315db630eceab1bd4fcf7c140a859))
* **contracts/ceres/pools/cerespool.sol:** [ADDED][CORE][FUNC]: 'collectRedemption()' & PARAMETERS 'redemption_delay ([200565a](https://github.com/Ceres-Coin/Ceres-Protocol/commit/200565aed7a01ff9b5da244e92034d36afc10903))
* **contracts/ceres/pools/cerespool.sol:** [ADDED][CORE][FUNC]: 'recollateralizeCERES()' ([ce80c96](https://github.com/Ceres-Coin/Ceres-Protocol/commit/ce80c9601bdaf63675e737fe040315edbd4b123d))
* **contracts/ceres/pools/cerespool.sol:** [ADDED][CORE][FUNC]: 'redeemAlgorithmicCERES' ([a6d1455](https://github.com/Ceres-Coin/Ceres-Protocol/commit/a6d14555a865d09c9a724e1b60ccc2bf9486a890))
* **contracts/ceres/pools/cerespool.sol:** [ADDED][FUNC]: setRedemption_fee/setBuyback_fee/setRecollat_fee/setBonus_rate ([1dbbc23](https://github.com/Ceres-Coin/Ceres-Protocol/commit/1dbbc23fc7617f217060665408f1411507275701))
* **contracts/ceres/pools/cerespool.sol:** [ADDED][PARAMETERS]: 'recollateralizePaused' & 'buyback_fee' & 'recollat_fee' & 'bonus_rate' & FUNC 'toggleRecollateralize()' ([adee51a](https://github.com/Ceres-Coin/Ceres-Protocol/commit/adee51ac7603bd01f453ed7109c5ba7f390db138))
* **contracts/ceres/pools/cerespool.sol:** [IMPORTANT][ADDED][CORE][FUNC]: 'mintFractionalCERES()' ([a6f5f83](https://github.com/Ceres-Coin/Ceres-Protocol/commit/a6f5f83cde7592466017ab8c9d943e0a32f4b7ef))
* **contracts/ceres/pools/cerespool.sol:** [MODIFIED][CONTRACTS][FUNC]: 'redeemFractionalCERES()' TO PASS TEST CASES && [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC.redeemFractionalCERES()' ([3f00358](https://github.com/Ceres-Coin/Ceres-Protocol/commit/3f003581351cb18b152cfdaa425e13b8cb743329))
* **contracts/css/css.sol:** [ADDED][CONTRACTS][FUNC]: 'pool_burn_from()' ([833eef2](https://github.com/Ceres-Coin/Ceres-Protocol/commit/833eef292588ad8ed308103264db20b90d8b6b36))
* **contracts/css/css.sol:** [ADDED][MODIFIERS]: 'pool_burn_from()' FUNC, ADDED 'onlyPools' ([4fae107](https://github.com/Ceres-Coin/Ceres-Protocol/commit/4fae10770235b3281916d5c293aec7d71a32f4de))
* **migrations/3_deploy_uniswap_oracle_weth.js:** [ADDED][DEPLOYMENTS SCRIPTS]: 'await cssInstance.setCERESAddress(ceresInstance.address, { from: OWNER });' ([4738adf](https://github.com/Ceres-Coin/Ceres-Protocol/commit/4738adf0e54b265b38ba820dcae50d4fb49616a5))
* **migrations/3_deploy_uniswap_oracle_weth.js:** [MODIFIED][DEPLOYMENT SCRIPTS]: ADDED usdc/css/ceres.approve() func ([413914d](https://github.com/Ceres-Coin/Ceres-Protocol/commit/413914d30335a99a095e32b2a1dd0e8661f4a480))
* **test/ceres_pool_usdc_p2.test.js:** [IMPORTANT]: FINISH THE mint1t1ceres() func test scripts, its the CORE FUNC() ([a559d9b](https://github.com/Ceres-Coin/Ceres-Protocol/commit/a559d9b694581113b53292a216923bf7110d0f9c))


### Styling

* **contracts/ceres/pools/cerespool.sol & contracts/css/css.sol:** [ADDED][COMMENTS][TEST CASE DONE] & [REMOVED][TODO TASKS] ([3b493c2](https://github.com/Ceres-Coin/Ceres-Protocol/commit/3b493c2925895bd2e4910f9f7a44156243b6eef2))
* **contracts/ceres/pools/cerespool.sol && contracts/css/css.sol:** [ADDED][TEST CASES DONE] & [REMOVED][TODO TASKS] ([608432f](https://github.com/Ceres-Coin/Ceres-Protocol/commit/608432ff7e2ea0a3bef5eb93fbd45bbb1cc41738))
* **contracts/ceres/pools/cerespool.sol:** [ADDED][COMMENTS][TEST CASE DONE] & [REMOVED][TODO TASKS] ([0995426](https://github.com/Ceres-Coin/Ceres-Protocol/commit/099542685074f6dec598f4cefa8cc261b5f9db5a))
* **contracts/ceres/pools/cerespool.sol:** [ADDED][TEST CASE DONE] & [REMOVED][TODO TASKS] ([fa65bdd](https://github.com/Ceres-Coin/Ceres-Protocol/commit/fa65bdd4848126c601e2f7add25aee21d69cd477))
* **contracts/ceres/pools/cerespool.sol:** [ADDED][TEST CASE DONE] && [REMOVED][TODO TASKS] ([12f3921](https://github.com/Ceres-Coin/Ceres-Protocol/commit/12f3921a7f58c5f9dbe25957e483a6d8b91f5f38))
* **contracts/ceres/pools/cerespool.sol:** [ADDED][TEST CASE DONE] && [REMOVED][TODO TASKS] ([d39ddfe](https://github.com/Ceres-Coin/Ceres-Protocol/commit/d39ddfecf86ced724f1476d1483e41fa885b6319))
* **contracts/ceres/pools/cerespool.sol:** [ADDED][TEST CASES DONE] && [REMOVED][TODO TASKS] ([3123a01](https://github.com/Ceres-Coin/Ceres-Protocol/commit/3123a01b191c9b06e224267981f4892663ce9bf4))
* **contracts/ceres/pools/cerespool.sol:** [ADDED][TEST CASES DONE] && [REMOVED][TODO TASKS] ([40c331b](https://github.com/Ceres-Coin/Ceres-Protocol/commit/40c331b0091fbb89eca41fbdcf3ea0e82f7e412d))
* **contracts/ceres/pools/cerespool.sol:** [ADDED][TEST CASES DONE] && [REMOVED][TODO TASKS] ([3e2f7c7](https://github.com/Ceres-Coin/Ceres-Protocol/commit/3e2f7c7c1ccbd945c9831d19d342b39e9ebfd6a6))
* **contracts/ceres/pools/cerespool.sol:** [REMOVED][TODO TASKS] && [ADDED][TEST CASE DONE] ([2bbf751](https://github.com/Ceres-Coin/Ceres-Protocol/commit/2bbf7515cb43f24382bf3699c88f1e4c185d5cb5))


### Tests

* **test/ceres_pool_usdc_p2.test.js:** [ADDED][CORE][TEST SCRIPTS]: 'check instance_Pool_USDC.redeem1t1CERES()' ([85e2c97](https://github.com/Ceres-Coin/Ceres-Protocol/commit/85e2c9708df28a2181f29ab244f2827a2cd3f0c5))
* **test/ceres_pool_usdc_p2.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC.collectRedemption()' ([897ad00](https://github.com/Ceres-Coin/Ceres-Protocol/commit/897ad000e677d01ed5214c0937414aa475498056))
* **test/ceres_pool_usdc_p2.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC.mint1t1CERES() PART 2' ([63ba676](https://github.com/Ceres-Coin/Ceres-Protocol/commit/63ba6762ba46da7b0b5cf63c7cd785ed9b8532a0))
* **test/ceres_pool_usdc_p2.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC.mintAlgorithmicCERES()' ([35af421](https://github.com/Ceres-Coin/Ceres-Protocol/commit/35af42199eb42def698eed80057479c12d45215b))
* **test/ceres_pool_usdc_p2.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC.mintFractionalCERES()' ([dfdc748](https://github.com/Ceres-Coin/Ceres-Protocol/commit/dfdc748369326b385c8e24092fbc83d0148a14a7))
* **test/ceres_pool_usdc_p2.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC.redeemAlgorithmicCERES()' ([f9d7755](https://github.com/Ceres-Coin/Ceres-Protocol/commit/f9d77550de91cf1c90deda5618a3da6575eabc37))
* **test/ceres_pool_usdc_p2.test.js:** [MODIFIED][TEST SCRIPTS]: 'check instance_Pool_USDC.mint1t1CERES() PART 2', (ADDED BEFORE_ACTION CODE) ([6128eba](https://github.com/Ceres-Coin/Ceres-Protocol/commit/6128ebaba8f979903aa7531baeec1e5396ba7879))
* **test/ceres_pool_usdc_p2.test.js:** [MODIFIED][TEST SCRIPTS]: 'check instance_Pool_USDC.mint1t1CERES() PART 2', ADDED ASSERTION CODE & AFTER_ACTION CODE ([d3ecdcd](https://github.com/Ceres-Coin/Ceres-Protocol/commit/d3ecdcd7b8c51a88a727139ade770c870b8b8151))
* **test/ceres_pool_usdc_p2.test.js:** [MODIFIED][TEST SCRIPTS]: 'check instance_Pool_USDC.mintAlgorithmicCERES()', ADDED "BEFORE_ACTION" & "AFTER_ACTION" CODE ([852f4cc](https://github.com/Ceres-Coin/Ceres-Protocol/commit/852f4cc4d9cddbb0c51717e52e181084c7d2e3f9))
* **test/ceres_pool_usdc_p2.test.js:** [MODIFIED][TEST SCRIPTS]: 'check instance_Pool_USDC.mintFractionalCERES()' ADDED PRINT AFTER_ACTION CODE ([d3a2425](https://github.com/Ceres-Coin/Ceres-Protocol/commit/d3a24255ed8064d3c98015cd5c7e3001b594b420))
* **test/ceres_pool_usdc_p2.test.js:** [MODIFIED][TEST SCRIPTS]: 'check instance_Pool_USDC.redeem1t1CERES()', [ADDED]: 'BEFORE_ACTION' & 'AFTER_ACTION' ([f320e8c](https://github.com/Ceres-Coin/Ceres-Protocol/commit/f320e8c91f02b9886bf99a6e0518cf9ca55b8794))
* **test/ceres_pool_usdc_p2.test.js:** [MODIFIED][TEST SCRIPTS]: ADDED BEFORE_ACTION CODE IN 'check instance_Pool_USDC.mintFractionalCERES()' ([675e5ea](https://github.com/Ceres-Coin/Ceres-Protocol/commit/675e5ead24b82bd569f88271118a1d51c3deb678))
* **test/ceres_pool_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC.lastRedeemed.call(account0/1/2/3/4/5/6/7),its default value should be ALL ZERO' ([5161e6f](https://github.com/Ceres-Coin/Ceres-Protocol/commit/5161e6f13f29c1d2e250706c94c6b81e0734bf4e))
* **test/ceres_pool_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC.redeemCollateralBalances.call(account0/1/2/3/4/5/6/7),its default value should be ALL ZERO' ([670ea79](https://github.com/Ceres-Coin/Ceres-Protocol/commit/670ea7959a93b14b1bbc355534ac5fe0132b6ad2))
* **test/ceres_pool_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC.redeemCSSBalances.call(account0/1/2/3/4/5/6/7),its default value should be ALL ZERO' ([57cfed9](https://github.com/Ceres-Coin/Ceres-Protocol/commit/57cfed9f81933f8d4b4d20467e9ec3bbfbdd6643))
* **test/ceres_pool_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC.redeemPaused.call() = FALSE' ([5790f4f](https://github.com/Ceres-Coin/Ceres-Protocol/commit/5790f4f2ef61bc708c1d723faee90e0b64ed3182))
* **test/ceres_pool_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC.redemption_delay.call() = 0' ([b2eef53](https://github.com/Ceres-Coin/Ceres-Protocol/commit/b2eef5396c36e45bda970d6ea3be85cb25e72d22))
* **test/ceres_pool_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC.redemption_fee.call() = 400' ([279ebb0](https://github.com/Ceres-Coin/Ceres-Protocol/commit/279ebb001fa988f9a63c564f9d9567f98b1a1147))
* **test/ceres_pool_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC.toggleRedeeming() FUNC' ([d9b6e58](https://github.com/Ceres-Coin/Ceres-Protocol/commit/d9b6e58b85f6f94f288d86c43f025b9cbc489f60))
* **test/ceres_pool_usdc.test.js:** [ADDED][TEST SCRIPTS]: 'check instance_Pool_USDC.unclaimedPoolCSS.call() = 0' ([44bc5e5](https://github.com/Ceres-Coin/Ceres-Protocol/commit/44bc5e526825a138757fb023e1666fbcb7f3b065))
* **test/ceres_pool_usdc.test.js:** [ADDED][TEST SCRIPTS]: buyback_fee/recollat_fee/bonus_rate/recollateralizePaused ([b80875b](https://github.com/Ceres-Coin/Ceres-Protocol/commit/b80875b6f80fc245d0c79dee59e0bfb55276f60a))
* **test/ceres_pool_usdc.test.js:** [MODIFIED][TEST SCRIPTS]: TUNING FAILED TEST CASES ([879e884](https://github.com/Ceres-Coin/Ceres-Protocol/commit/879e8846538f7ca64694903406ab380de45485c8))
* **test/css.test.js:** [MODIFIED][TEST SCRIPTS]: TUNING FAILED TEST CASES ([5821d7a](https://github.com/Ceres-Coin/Ceres-Protocol/commit/5821d7a80a9af9cdfd3f18dd7dcbc1319333338d))

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
