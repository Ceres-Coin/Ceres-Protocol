// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;


import "../../Math/SafeMath.sol";
import "../../CSS/CSS.sol";
import "../../Ceres/Ceres.sol";
import "../../ERC20/ERC20.sol";
import "../../Oracle/UniswapPairOracle.sol";
import "../../Governance/AccessControl.sol";
import "./CeresPoolLibrary.sol";

contract CeresPool is AccessControl {
    using SafeMath for uint256;

    /* ========== STATE VARIABLES ========== */
 
    ERC20 public collateral_token; //TEST CASE DONE
    address public collateral_address; //TEST CASE DONE
    address public owner_address; //TEST CASE DONE

    address public ceres_contract_address; //TEST CASE DONE
    address public css_contract_address; //TEST CASE DONE
    address public timelock_address; //TEST CASE DONE
    CEREShares public CSS; //TEST CASE DONE
    CEREStable public CERES; //TEST CASE DONE

    // Number of decimals needed to get to 18
    uint256 public immutable missing_decimals; //TEST CASE DONE
    // Pool_ceiling is the total units of collateral that a pool contract can hold
    uint256 public pool_ceiling = 0; //TEST CASE DONE

    // Constants for various precisions
    // TEST CASE DONE
    uint256 public constant PRICE_PRECISION = 1e6; //TEST CASE DONE
    uint256 public constant COLLATERAL_RATIO_PRECISION = 1e6; //TEST CASE DONE
    uint256 public constant COLLATERAL_RATIO_MAX = 1e6; //TEST CASE DONE

    // Stores price of the collateral, if price is paused
    uint256 public pausedPrice = 0; //TEST CASE DONE
    
    uint256 public unclaimedPoolCollateral; //TEST CASE DONE
    uint256 public unclaimedPoolCSS; //TEST CASE DONE
    
    mapping (address => uint256) public lastRedeemed; //TEST CASE DONE
    mapping (address => uint256) public redeemCollateralBalances; //TEST CASE DONE
    mapping (address => uint256) public redeemCSSBalances; //TEST CASE DONE
    uint256 public redemption_fee = 400; //TEST CASE DONE

    uint256 public redemption_delay = 0; //TEST CASE DONE
    
    // AccessControl state variables
    bool public collateralPricePaused = false; //TEST CASE DONE
    bool public mintPaused = false; //TEST CASE DONE
    bool public redeemPaused = false; //TEST CASE DONE
    
    // [PARAMETER][collat_eth_oracle_address]
    UniswapPairOracle public collatEthOracle; //TEST CASE DONE
    address public collat_eth_oracle_address; //TEST CASE DONE
    address public weth_address; //TEST CASE DONE

    uint256 public minting_fee = 300; //TEST CASE DONE
    



    /* ========== MODIFIERS ========== */

    modifier onlyByOwnerOrGovernance() {
        require(msg.sender == timelock_address || msg.sender == owner_address, "You are not the owner or the governance timelock");
        _;
    }

    modifier notMintPaused() {
        require(mintPaused == false, "Minting is paused");
        _;
    }

    modifier notRedeemPaused() {
        require(redeemPaused == false, "Redeeming is paused");
        _;
    }
 
    /* ========== CONSTRUCTOR ========== */
    //TEST CASE DONE
    constructor(
        address _ceres_contract_address,
        address _css_contract_address,
        address _collateral_address,
        address _owner_address,
        address _timelock_address,
        uint256 _pool_ceiling
    ) public {
        CERES = CEREStable(_ceres_contract_address);
        CSS = CEREShares(_css_contract_address);
        collateral_token = ERC20(_collateral_address);

        ceres_contract_address = _ceres_contract_address;
        css_contract_address = _css_contract_address;
        collateral_address = _collateral_address;
        owner_address = _owner_address;
        timelock_address = _timelock_address;
        pool_ceiling = _pool_ceiling;        
        missing_decimals = uint(18).sub(collateral_token.decimals());
    }

    // ADD RESTRICTED FUNC FIRST
    /* ========== RESTRICTED FUNCTIONS ========== */
    //TEST CASE DONE
    function setOwner(address _owner_address) external onlyByOwnerOrGovernance {
        owner_address = _owner_address;
    }
    //TEST CASE DONE
    function setTimelock(address new_timelock) external onlyByOwnerOrGovernance {
        timelock_address = new_timelock;
    }
    //TEST CASE DONE
    function setPoolParameters(uint256 new_ceiling) external onlyByOwnerOrGovernance {
        pool_ceiling = new_ceiling;
    }
    //TEST CASE DONE
    function setMinting_fee(uint256 _minting_fee) external onlyByOwnerOrGovernance {
        minting_fee = _minting_fee;
    }
    //TEST CASE DONE
    function toggleMinting() external onlyByOwnerOrGovernance {
        mintPaused = !mintPaused;
    }
    //TEST CASE DONE
    function toggleRedeeming() external onlyByOwnerOrGovernance {
        redeemPaused = !redeemPaused;
    }
    
    //TEST CASE DONE
    function toggleCollateralPricePaused() external onlyByOwnerOrGovernance {
        collateralPricePaused = !collateralPricePaused;
    }

    /* ========== PUBLIC FUNCTIONS ========== */
    //TEST CASE DONE
    function getCollateralPrice() public view returns (uint256) {
        if(collateralPricePaused == true){
            return pausedPrice;
        } else {
            uint256 eth_usd_price = CERES.eth_usd_price();
            return eth_usd_price.mul(PRICE_PRECISION).div(collatEthOracle.consult(weth_address, PRICE_PRECISION * (10 ** missing_decimals)));
        }
    }

    //TEST CASE DONE
    function setCollatETHOracle(address _collateral_weth_oracle_address, address _weth_address) external onlyByOwnerOrGovernance {
        collat_eth_oracle_address = _collateral_weth_oracle_address;
        collatEthOracle = UniswapPairOracle(_collateral_weth_oracle_address);
        weth_address = _weth_address;
    }

    // TEST CASE DONE
    function mint1t1CERES(uint256 collateral_amount, uint256 CERES_out_min) external notMintPaused {
        uint256 collateral_amount_d18 = collateral_amount * (10 ** missing_decimals);

        require(CERES.global_collateral_ratio() >= COLLATERAL_RATIO_MAX, "Collateral ratio must be >= 1");
        require((collateral_token.balanceOf(address(this))).sub(unclaimedPoolCollateral).add(collateral_amount) <= pool_ceiling, "[Pool's Closed]: Ceiling reached");
        
        (uint256 ceres_amount_d18) = CERESPoolLibrary.calcMint1t1CERES(
            getCollateralPrice(),
            collateral_amount_d18
        ); //1 CERES for each $1 worth of collateral

        ceres_amount_d18 = (ceres_amount_d18.mul(uint(1e6).sub(minting_fee))).div(1e6); //remove precision at the end
        require(CERES_out_min <= ceres_amount_d18, "Slippage limit reached");

        collateral_token.transferFrom(msg.sender, address(this), collateral_amount);
        CERES.pool_mint(msg.sender, ceres_amount_d18);
    }

    //TEST CASE DONE
    function mintFractionalCERES(uint256 collateral_amount, uint256 css_amount, uint256 CERES_out_min) external notMintPaused {
        uint256 css_price = CERES.css_price();
        uint256 global_collateral_ratio = CERES.global_collateral_ratio();

        require(global_collateral_ratio < COLLATERAL_RATIO_MAX && global_collateral_ratio > 0, "Collateral ratio needs to be between .000001 and .999999");
        require(collateral_token.balanceOf(address(this)).sub(unclaimedPoolCollateral).add(collateral_amount) <= pool_ceiling, "Pool ceiling reached, no more CERES can be minted with this collateral");

        uint256 collateral_amount_d18 = collateral_amount * (10 ** missing_decimals);
        CERESPoolLibrary.MintCSS_Params memory input_params = CERESPoolLibrary.MintCSS_Params(
            css_price,
            getCollateralPrice(),
            css_amount,
            collateral_amount_d18,
            global_collateral_ratio
        );

        (uint256 mint_amount, uint256 css_needed) = CERESPoolLibrary.calcMintFractionalCERES(input_params);

        mint_amount = (mint_amount.mul(uint(1e6).sub(minting_fee))).div(1e6);
        require(CERES_out_min <= mint_amount, "Slippage limit reached");
        require(css_needed <= css_amount, "Not enough CSS inputted");

        CSS.pool_burn_from(msg.sender, css_needed);
        collateral_token.transferFrom(msg.sender, address(this), collateral_amount);
        CERES.pool_mint(msg.sender, mint_amount);
    }
    //TEST CASE DONE
    function mintAlgorithmicCERES(uint256 css_amount_d18, uint256 CERES_out_min) external notMintPaused {
        uint256 css_price = CERES.css_price();
        require(CERES.global_collateral_ratio() == 0, "Collateral ratio must be 0");
        
        (uint256 ceres_amount_d18) = CERESPoolLibrary.calcMintAlgorithmicCERES(
            css_price, // X CSS / 1 USD
            css_amount_d18
        );

        ceres_amount_d18 = (ceres_amount_d18.mul(uint(1e6).sub(minting_fee))).div(1e6);
        require(CERES_out_min <= ceres_amount_d18, "Slippage limit reached");

        CSS.pool_burn_from(msg.sender, css_amount_d18);
        CERES.pool_mint(msg.sender, ceres_amount_d18);
    }

    // TEST CASE DONE
    function redeem1t1CERES(uint256 CERES_amount, uint256 COLLATERAL_out_min) external notRedeemPaused {
        require(CERES.global_collateral_ratio() == COLLATERAL_RATIO_MAX, "Collateral ratio must be == 1");

        // Need to adjust for decimals of collateral
        uint256 CERES_amount_precision = CERES_amount.div(10 ** missing_decimals);
        (uint256 collateral_needed) = CERESPoolLibrary.calcRedeem1t1CERES(
            getCollateralPrice(),
            CERES_amount_precision
        );

        collateral_needed = (collateral_needed.mul(uint(1e6).sub(redemption_fee))).div(1e6);
        require(collateral_needed <= collateral_token.balanceOf(address(this)).sub(unclaimedPoolCollateral), "Not enough collateral in pool");
        require(COLLATERAL_out_min <= collateral_needed, "Slippage limit reached");

        redeemCollateralBalances[msg.sender] = redeemCollateralBalances[msg.sender].add(collateral_needed);
        unclaimedPoolCollateral = unclaimedPoolCollateral.add(collateral_needed);
        lastRedeemed[msg.sender] = block.number;
        
        // Move all external functions to the end
        CERES.pool_burn_from(msg.sender, CERES_amount);
    }
    // TEST CASE DONE
    function redeemFractionalCERES(uint256 CERES_amount, uint256 CSS_out_min, uint256 COLLATERAL_out_min) external notRedeemPaused {
        uint256 css_price = CERES.css_price();
        uint256 global_collateral_ratio = CERES.global_collateral_ratio();

        require(global_collateral_ratio < COLLATERAL_RATIO_MAX && global_collateral_ratio > 0, "Collateral ratio needs to be between .000001 and .999999");
        uint256 col_price_usd = getCollateralPrice();

        uint256 CERES_amount_post_fee = (CERES_amount.mul(uint(1e6).sub(redemption_fee))).div(PRICE_PRECISION);

        uint256 css_dollar_value_d18 = CERES_amount_post_fee.sub(CERES_amount_post_fee.mul(global_collateral_ratio).div(PRICE_PRECISION));
        uint256 css_amount = css_dollar_value_d18.mul(PRICE_PRECISION).div(css_price);

        // Need to adjust for decimals of collateral
        uint256 CERES_amount_precision = CERES_amount_post_fee.div(10 ** missing_decimals);
        uint256 collateral_dollar_value = CERES_amount_precision.mul(global_collateral_ratio).div(PRICE_PRECISION);
        uint256 collateral_amount = collateral_dollar_value.mul(PRICE_PRECISION).div(col_price_usd);


        require(collateral_amount <= collateral_token.balanceOf(address(this)).sub(unclaimedPoolCollateral), "Not enough collateral in pool");
        require(COLLATERAL_out_min <= collateral_amount, "Slippage limit reached [collateral]");
        require(CSS_out_min <= css_amount, "Slippage limit reached [CSS]");

        redeemCollateralBalances[msg.sender] = redeemCollateralBalances[msg.sender].add(collateral_amount);
        unclaimedPoolCollateral = unclaimedPoolCollateral.add(collateral_amount);

        redeemCSSBalances[msg.sender] = redeemCSSBalances[msg.sender].add(css_amount);
        unclaimedPoolCSS = unclaimedPoolCSS.add(css_amount);

        lastRedeemed[msg.sender] = block.number;
        
        // Move all external functions to the end
        CERES.pool_burn_from(msg.sender, CERES_amount);
        
        // collateral_token.transferFrom(address(this), msg.sender, collateral_amount);
        collateral_token.transfer(msg.sender, collateral_amount);
        CSS.pool_mint(address(this), css_amount);
    }
    // TEST CASE DONE
    function redeemAlgorithmicCERES(uint256 CERES_amount, uint256 CSS_out_min) external notRedeemPaused {
        uint256 css_price = CERES.css_price();
        uint256 global_collateral_ratio = CERES.global_collateral_ratio();

        require(global_collateral_ratio == 0, "Collateral ratio must be 0"); 
        uint256 css_dollar_value_d18 = CERES_amount;

        css_dollar_value_d18 = (css_dollar_value_d18.mul(uint(1e6).sub(redemption_fee))).div(PRICE_PRECISION); //apply fees

        uint256 css_amount = css_dollar_value_d18.mul(PRICE_PRECISION).div(css_price);
        
        redeemCSSBalances[msg.sender] = redeemCSSBalances[msg.sender].add(css_amount);
        unclaimedPoolCSS = unclaimedPoolCSS.add(css_amount);
        
        lastRedeemed[msg.sender] = block.number;
        
        require(CSS_out_min <= css_amount, "Slippage limit reached");
        // Move all external functions to the end
        CERES.pool_burn_from(msg.sender, CERES_amount);
        CSS.pool_mint(address(this), css_amount);
    }
    //TEST CASE DONE
    function collectRedemption() external {
        require((lastRedeemed[msg.sender].add(redemption_delay)) <= block.number, "Must wait for redemption_delay blocks before collecting redemption");
        bool sendCSS = false;
        bool sendCollateral = false;
        uint CSSAmount;
        uint CollateralAmount;

        // Use Checks-Effects-Interactions pattern
        if(redeemCSSBalances[msg.sender] > 0){
            CSSAmount = redeemCSSBalances[msg.sender];
            redeemCSSBalances[msg.sender] = 0;
            unclaimedPoolCSS = unclaimedPoolCSS.sub(CSSAmount);

            sendCSS = true;
        }
        
        if(redeemCollateralBalances[msg.sender] > 0){
            CollateralAmount = redeemCollateralBalances[msg.sender];
            redeemCollateralBalances[msg.sender] = 0;
            unclaimedPoolCollateral = unclaimedPoolCollateral.sub(CollateralAmount);

            sendCollateral = true;
        }

        if(sendCSS == true){
            CSS.transfer(msg.sender, CSSAmount);
        }
        if(sendCollateral == true){
            collateral_token.transfer(msg.sender, CollateralAmount);
        }
    }
}