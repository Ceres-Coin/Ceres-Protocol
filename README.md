# Ceres-Protocol
Ceres-Protocol

# TO DO TASKS

TODO: [code][common]: 1. use "git add" & "changelog" scripts in "package.json"
TODO: [code][common]: 2. Use Pull Request to finish the first code changes
TODO: [code][common]: 3. Understand the current code

2. integrate with CeresPool.mint1t1CERES && CeresPool.mintFractionalCERES && CeresPool.mintAlgorithmicCERES WITH FRONT-END site
3. integrate with Staking/Variants/Stake_CERES_WETH.sol to stake WETH
4. integrate with Ceres/Pools/CeresWETHPool.sol to stake WETH
5. integrate with Treasury.allocateSeigniorage() to mint CERES using CERESPool.mint1t1CERES()
   
TODO: [code][Project]: REQUIREMENT for refactoring
1. Refactoring CERES = ASC
2. Refactoring CSS = CRS

TODO: [design][A Pool]: REQUIREMENT FOR STAKING FUNC
1. STAKING USDC & ASC & CRS [TBD]
   1. Staking USDC
   2. Staking ASC
   3. Staking CRS
2. STAKING & LOCKED 

TODO: [design][B Pool]: Design FOR STAKING
1. earned rewards From Staked USDC/ASC/CRS
   1. Get CRS from Staking USDC [tbd]
   2. Get ASC minted from Staking USDC [tbd]
   3. Get [CRS] from staking ASC

TODO: [DESIGN]: Design for allocate minted ASC to Benefits pool //done
TODO: [CODE]: Allocate minted ASC to Benefits pool //done


TODO: [CODE] allocate transaction fees to Benefits pool
TODO: [CODE]: GET Rewards from Benefits Pool
    1. transaction fees


TODO: PPT - working
TODO: Design-draft



TODO: SCOPE
staking
withdraw
locked
mint
mint-withdraw
redeem
tx-fees

TODO: Requirement:

STAKING REQUIREMENT
# STAKING POOL TO GET "CRS"
1. STAKING "USDC" -> GET "CRS"
2. STAKING "CRS" -> GET "CRS"
3. STAKING "ASC" -> GET "CRS"
4. CRS is allocated to staking Pool

# STAKING USDC && CRS to AUTOMATED MINTING "ASC"
1. Mint Mechanism is automated
2. MINT "ASC" USING
   1. USDC
   2. CRS
3. [OPTIONAL] SUPPORT ETH TO AUTOSWAP TO USDC AND Enter in automated minting
4. AUTOMATED MECHANISM IS defined in WHITEPAPER, INCLUDING BELOW FACTORS
   1. MINT YES/NO
   2. MINT PERIOD
   3. MINT ALOGRITHM
   4. MINTED ASC ALLOCATION MECHANISM

# STAKING & WITHDRAW FEATURES
1. ONLY one-time staking for USER. 
   1. ONLY STAKING ONE-TIME, staking = staking + automated minting
   2. STAKING USDC MEANS TO GET TWO REWARDS
      1. GET CRS FROM staking pool
      2. GET MINTED "ASC" FROM automated mechanism
   3. STAKING CRS -> GET TWO REWARDS
      1. GET "CRS" FROM staking pool
      2. GET MINTED "ASC" FROM automated minting mechanism
   4. STAKING "ASC" -> GET ONE REWARDS
      1. GET "CRS" FROM staking pool
2. CRS Amount in different STAKING POOL
   1. usdc-crs staking pool (e.g: 15%)
   2. crs-crs staking pool (e.g: 15%)
   3. asc-crs staking pool (e.g: 70%)

# LOCKED FEATURES
1. Staking USDC/CRS/ASC NEED A "LOCKED"
   1. minium participle STAKING period
   2. minium participle AUTOMATED MINTING period
2. Withdraw rewards need a "LOCKED"
   1. withdraw usdc/crs/asc need a "LOCKED"
   2. withdraw STAKING rewards need a "LOCKED" 
   3. withdraw MINTING rewards "ASC" NEED A MECHANISM


# MINT FEATURES
1. AUTOMATED MECHANISM IS defined in WHITEPAPER, INCLUDING BELOW FACTORS
   1. MINT YES/NO
   2. MINT PERIOD
   3. MINT ALGORITHM
2. MINT ALGORITHM Principle 
   1. USDC & CRS according to 
      1. CR ratio
      2. CRS x-day MA  PRICE
   2. EACH MINTING NEED re-caculate according to new "CR" & "CRS" price
3. Detailed minting algorithm is defined in whitepaper [tbd]
3. MINTEED "ASC" ALLOCATION MECHANISM Principle
   1. auto-mint "ASC" instantly
   2. according to USDC & "CRS" market value to get minted "ASC"

# TX Fees
1. "ASC" transaction will collec some tx fees
2. ITS tx fees will be collected to a special benefits pool
3. it will be shared by all staked USDC/CRS/ASC, according to below rules
   1. shared by the market value of USDC/CRS/ASC
   2. SHARED MECHANISM WILL BE A LONG PERIOD, NOT INSTANTLY, TO MAKE SURE EACH STAKED USERS TO GET BONUS IN A LONG TIME
4. AMO & OTHER BENEFITS will also be collected in this "BENEFITS POOL"

# REDEEM FEATURES







