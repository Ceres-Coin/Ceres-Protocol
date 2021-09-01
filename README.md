# Ceres-Protocol
Ceres-Protocol

# TO DO TASKS

TODO: SCOPE
staking
withdraw
locked
mint
mint-withdraw
redeem
tx-fees

TODO: Requirement:

# STAKING REQUIREMENT
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
4. [optional]: STAKING USDC & CRS, minted "ASC" will participate "ASC STAKING"
5. [optional]: automated MINTING need DAO VESTING
6. AUTOMATED MECHANISM IS defined in WHITEPAPER, INCLUDING BELOW FACTORS
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
   2. according to staking "USDC" && "CRS" market value to get minted "ASC"

# TX Fees
1. "ASC" transaction will collec some tx fees
2. ITS tx fees will be collected to a special benefits pool
3. it will be shared by all staked USDC/CRS/ASC, according to below rules
   1. shared by the market value of USDC/CRS/ASC
   2. SHARED MECHANISM WILL BE A LONG PERIOD, NOT INSTANTLY, TO MAKE SURE EACH STAKED USERS TO GET BONUS IN A LONG TIME
4. AMO & OTHER BENEFITS will also be collected in this "BENEFITS POOL"

# REDEEM FEATURES
1. AUTOMATED "REDEEM" mechanism
   1. staking "ASC" to participate automated "redeem"
   2. redeem is automated
2. redeem factors
   1. REDEEM "ASC" amounts based on alorithm which is defined in whitepaper
   2. redeem period
   3. redeem "asc" = usdc + crs
      1. usdc amounts
      2. crs amounts
      3. based on CR ration && crs price && asc price






