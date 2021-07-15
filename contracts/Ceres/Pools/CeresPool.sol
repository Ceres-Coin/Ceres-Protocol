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
    uint256 public constant PRICE_PRECISION = 1e6; //TODO: ADD TEST CASES
    uint256 public constant COLLATERAL_RATIO_PRECISION = 1e6; //TODO: ADD TEST CASES
    uint256 public constant COLLATERAL_RATIO_MAX = 1e6; //TODO: ADD TEST CASES

    // Stores price of the collateral, if price is paused
    uint256 public pausedPrice = 0; //TODO: ADD TEST CASES
    uint256 public unclaimedPoolCollateral; //TODO: ADD TEST CASES
    
    // AccessControl state variables
    bool public collateralPricePaused = false; //TODO: ADD TEST CASES
    bool public mintPaused = false; //TODO: ADD TEST CASES
    
    // [PARAMETER][collat_eth_oracle_address]
    UniswapPairOracle public collatEthOracle; //TODO: ADD TEST CASES
    address public collat_eth_oracle_address; //TODO: ADD TEST CASES
    address public weth_address; //TODO: ADD TEST CASES

    uint256 public minting_fee = 300; //TODO: ADD TEST CASES



    /* ========== MODIFIERS ========== */

    modifier onlyByOwnerOrGovernance() {
        require(msg.sender == timelock_address || msg.sender == owner_address, "You are not the owner or the governance timelock");
        _;
    }

    modifier notMintPaused() {
        require(mintPaused == false, "Minting is paused");
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
    
    function setOwner(address _owner_address) external onlyByOwnerOrGovernance {
        owner_address = _owner_address;
    }
    
    function setTimelock(address new_timelock) external onlyByOwnerOrGovernance {
        timelock_address = new_timelock;
    }

    function setPoolParameters(uint256 new_ceiling) external onlyByOwnerOrGovernance {
        pool_ceiling = new_ceiling;
    }

    /* ========== PUBLIC FUNCTIONS ========== */
    // TODO: ADD TEST CASES
    function getCollateralPrice() public view returns (uint256) {
        if(collateralPricePaused == true){
            return pausedPrice;
        } else {
            uint256 eth_usd_price = CERES.eth_usd_price();
            return eth_usd_price.mul(PRICE_PRECISION).div(collatEthOracle.consult(weth_address, PRICE_PRECISION * (10 ** missing_decimals)));
        }
    }

    // TODO: ADD TEST CASES
    function setCollatETHOracle(address _collateral_weth_oracle_address, address _weth_address) external onlyByOwnerOrGovernance {
        collat_eth_oracle_address = _collateral_weth_oracle_address;
        collatEthOracle = UniswapPairOracle(_collateral_weth_oracle_address);
        weth_address = _weth_address;
    }

    // TODO: ADD TEST CASES
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
}