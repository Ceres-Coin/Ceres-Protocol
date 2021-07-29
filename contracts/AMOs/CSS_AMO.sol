// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.6.12;

import "../Math/SafeMath.sol";
import "../CSS/CSS.sol";
import "../Ceres/Ceres.sol";
import "../ERC20/ERC20.sol";
import "../Ceres/Pools/CeresPool.sol";
import "../Oracle/UniswapPairOracle.sol";
import "../Governance/AccessControl.sol";
import './CERESPoolInvestorForV2.sol';
import '../Uniswap/UniswapV2Router02_Modified.sol';

contract CSS_AMO is AccessControl {
    using SafeMath for uint256;

    /* ========== STATE VARIABLES ========== */

    ERC20 private collateral_token;
    CEREStable private CERES;
    CEREShares private CSS;
    CeresPoolInvestorForV2 private InvestorAMO;
    CeresPool private pool;
    IUniswapV2Router02 private UniRouterV2 = IUniswapV2Router02(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D);
    
    address public collateral_address; //TEST CASES DONE
    address public pool_address; //TEST CASES DONE
    address public owner_address; //TEST CASES DONE
    address public timelock_address; //TEST CASES DONE
    address public custodian_address; //TEST CASES DONE
    address public ceres_address; //TEST CASES DONE
    address public css_address; //TEST CASES DONE
    address payable public UNISWAP_ROUTER_ADDRESS = payable(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D);
    // address public investor_amo_address = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address public investor_amo_address;

    uint256 public immutable missing_decimals; //TEST CASES DONE
    uint256 private constant PRICE_PRECISION = 1e6; //NO NEED FOR PRIVATE
    uint256 private constant COLLATERAL_RATIO_PRECISION = 1e6; //NO NEED FOR PRIVATE

    // Minimum collateral ratio needed for new CERES minting
    uint256 public min_cr = 850000; //TEST CASES DONE

    // Amount the contract borrowed
    uint256 public minted_sum_historical = 0; //TEST CASES DONE
    uint256 public burned_sum_historical = 0; //TEST CASES DONE

    // CERES -> CSS max slippage
    uint256 public max_slippage = 200000; // 20% //TEST CASES DONE

    // AMO profits 
    bool public is_override_amo_profits = false; //TEST CASES DONE
    uint256 public overridden_amo_profit = 0; //TEST CASES DONE

    /* ========== CONSTRUCTOR ========== */
    //TEST CASES DONE
    constructor(
        address _ceres_contract_address,
        address _css_contract_address,
        address _pool_address,
        address _collateral_address,
        address _owner_address,
        address _custodian_address,
        address _timelock_address,
        address _investor_amo_address
    ) public {
        ceres_address = _ceres_contract_address;
        CERES = CEREStable(_ceres_contract_address);
        css_address = _css_contract_address;
        CSS = CEREShares(_css_contract_address);
        pool_address = _pool_address;
        pool = CeresPool(_pool_address);
        collateral_address = _collateral_address;
        collateral_token = ERC20(_collateral_address);
        investor_amo_address = _investor_amo_address;
        InvestorAMO = CeresPoolInvestorForV2(_investor_amo_address);
        timelock_address = _timelock_address;
        owner_address = _owner_address;
        custodian_address = _custodian_address;
        missing_decimals = uint(18).sub(collateral_token.decimals());
        
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    /* ========== MODIFIERS ========== */

    modifier onlyByOwnerOrGovernance() {
        require(msg.sender == timelock_address || msg.sender == owner_address, "Not owner or timelock");
        _;
    }

    modifier onlyCustodian() {
        require(msg.sender == custodian_address, "You are not the rewards custodian");
        _;
    }

    /* ========== VIEWS ========== */
    // TODO: [LATER] ADD TESET CASES
    function unspentInvestorAMOProfit_E18() public view returns (uint256 unspent_profit_e18) {
        if (is_override_amo_profits){
            unspent_profit_e18 = overridden_amo_profit;
        }
        else {
            uint256[5] memory allocations = InvestorAMO.showAllocations();
            uint256 borrowed_USDC = InvestorAMO.borrowed_balance();
            unspent_profit_e18 = (allocations[4]).sub(borrowed_USDC);
            unspent_profit_e18 = unspent_profit_e18.mul(10 ** missing_decimals);
        }
    }

    function getTmpValue() public view returns (uint256 , uint256 ,uint256) 
    {
        uint256 global_collateral_ratio = CERES.global_collateral_ratio();
        uint256 _ceres_total_supply = CERES.totalSupply();
        // TODO: TUNING THE FAILED CODE
        // uint256 _global_collat_value = (CERES.globalCollateralValue()).add(unspentInvestorAMOProfit_E18());
        uint256 _global_collat_value = (CERES.globalCollateralValue());
        uint256 effective_collateral_ratio = _global_collat_value.mul(1e6).div(_ceres_total_supply); //returns it in 1e6
        return (global_collateral_ratio,effective_collateral_ratio,effective_collateral_ratio);
    }

    function cr_info() public view returns (
            uint256 effective_collateral_ratio, 
            uint256 global_collateral_ratio, 
            uint256 excess_collateral_e18,
            uint256 frax_mintable
    ) {
        global_collateral_ratio = CERES.global_collateral_ratio();

        uint256 frax_total_supply = CERES.totalSupply();
        uint256 global_collat_value = (CERES.globalCollateralValue()).add(unspentInvestorAMOProfit_E18());
        effective_collateral_ratio = global_collat_value.mul(1e6).div(frax_total_supply); //returns it in 1e6

        // Same as availableExcessCollatDV() in FraxPool
        if (global_collateral_ratio > COLLATERAL_RATIO_PRECISION) global_collateral_ratio = COLLATERAL_RATIO_PRECISION; // Handles an overcollateralized contract with CR > 1
        uint256 required_collat_dollar_value_d18 = (frax_total_supply.mul(global_collateral_ratio)).div(COLLATERAL_RATIO_PRECISION); // Calculates collateral needed to back each 1 CERES with $1 of collateral at current collat ratio
        if (global_collat_value > required_collat_dollar_value_d18) {
            excess_collateral_e18 = global_collat_value.sub(required_collat_dollar_value_d18);
            frax_mintable = excess_collateral_e18.mul(COLLATERAL_RATIO_PRECISION).div(global_collateral_ratio);
        }
        else {
            excess_collateral_e18 = 0;
            frax_mintable = 0;
        }
        return (
            effective_collateral_ratio,
            global_collateral_ratio,
            excess_collateral_e18,
            frax_mintable
        );
    }

    /* ========== PUBLIC FUNCTIONS ========== */

    // Needed for the CERES contract to not brick when this contract is added as a pool
    function collatDollarBalance() public pure returns (uint256) {
        return 1e18; // Anti-brick
    }

    /* ========== RESTRICTED FUNCTIONS ========== */

    // This contract is essentially marked as a 'pool' so it can call OnlyPools functions like pool_mint and pool_burn_from
    // on the main CERES contract
    function _mintFRAXForSwap(uint256 frax_amount) internal {
        // Make sure the current CR isn't already too low
        require (CERES.global_collateral_ratio() > min_cr, "Collateral ratio is already too low");

        // Make sure the CERES minting wouldn't push the CR down too much
        uint256 current_collateral_E18 = (CERES.globalCollateralValue()).add(unspentInvestorAMOProfit_E18());
        uint256 cur_frax_supply = CERES.totalSupply();
        uint256 new_frax_supply = cur_frax_supply.add(frax_amount);
        uint256 new_cr = (current_collateral_E18.mul(PRICE_PRECISION)).div(new_frax_supply);
        require (new_cr > min_cr, "Minting would cause collateral ratio to be too low");

        // Mint the CERES 
        minted_sum_historical = minted_sum_historical.add(frax_amount);
        CERES.pool_mint(address(this), frax_amount);
    }


    function _swapFRAXforFXS(uint256 frax_amount) internal returns (uint256 frax_spent, uint256 fxs_received) {
        // Get the CSS price
        uint256 fxs_price = CERES.css_price();

        // Approve the CERES for the router
        CERES.approve(UNISWAP_ROUTER_ADDRESS, frax_amount);

        address[] memory FRAX_FXS_PATH = new address[](2);
        FRAX_FXS_PATH[0] = ceres_address;
        FRAX_FXS_PATH[1] = css_address;

        uint256 min_fxs_out = frax_amount.mul(PRICE_PRECISION).div(fxs_price);
        min_fxs_out = min_fxs_out.sub(min_fxs_out.mul(max_slippage).div(PRICE_PRECISION));

        // Buy some CSS with CERES
        (uint[] memory amounts) = UniRouterV2.swapExactTokensForTokens(
            frax_amount,
            min_fxs_out,
            FRAX_FXS_PATH,
            address(this),
            2105300114 // Expiration: a long time from now
        );
        return (amounts[0], amounts[1]);
    }


    // Burn unneeded or excess CERES
    function mintSwapBurn(uint256 override_USDC_amount, bool use_override) public onlyByOwnerOrGovernance {
        uint256 mintable_frax;
        if (use_override){
            mintable_frax = override_USDC_amount.mul(10 ** missing_decimals).mul(COLLATERAL_RATIO_PRECISION).div(CERES.global_collateral_ratio());
        }
        else {
            (, , , mintable_frax) = cr_info();
        }
        _mintFRAXForSwap(mintable_frax);
        (, uint256 fxs_received_ ) = _swapFRAXforFXS(mintable_frax);
        burnFXS(fxs_received_);
    }

    // Burn unneeded or excess CERES
    function burnFRAX(uint256 frax_amount) public onlyByOwnerOrGovernance {
        CERES.burn(frax_amount);
        burned_sum_historical = burned_sum_historical.add(frax_amount);
    }

    // Burn unneeded CSS
    function burnFXS(uint256 amount) public onlyByOwnerOrGovernance {
        CSS.approve(address(this), amount);
        CSS.pool_burn_from(address(this), amount);
    }

    /* ========== RESTRICTED GOVERNANCE FUNCTIONS ========== */

    function setTimelock(address new_timelock) external onlyByOwnerOrGovernance {
        require(new_timelock != address(0), "Timelock address cannot be 0");
        timelock_address = new_timelock;
    }

    function setOwner(address _owner_address) external onlyByOwnerOrGovernance {
        owner_address = _owner_address;
    }

    function setPool(address _pool_address) external onlyByOwnerOrGovernance {
        pool_address = _pool_address;
        pool = CeresPool(_pool_address);
    }

    function setMinimumCollateralRatio(uint256 _min_cr) external onlyByOwnerOrGovernance {
        min_cr = _min_cr;
    }

    function setMaxSlippage(uint256 _max_slippage) external onlyByOwnerOrGovernance {
        max_slippage = _max_slippage;
    }

    function setAMOProfits(uint256 _overridden_amo_profit_e18, bool _is_override_amo_profits) external onlyByOwnerOrGovernance {
        overridden_amo_profit = _overridden_amo_profit_e18; // E18
        is_override_amo_profits = _is_override_amo_profits;
    }

    function setRouter(address payable _router_address) external onlyByOwnerOrGovernance {
        UNISWAP_ROUTER_ADDRESS = _router_address;
        UniRouterV2 = IUniswapV2Router02(_router_address);
    }

    function setInvestorAMO(address _investor_amo_address) external onlyByOwnerOrGovernance {
        investor_amo_address = _investor_amo_address;
        InvestorAMO = CeresPoolInvestorForV2(_investor_amo_address);
    }

    function recoverERC20(address tokenAddress, uint256 tokenAmount) external onlyByOwnerOrGovernance {
        // Can only be triggered by owner or governance, not custodian
        // Tokens are sent to the custodian, as a sort of safeguard

        ERC20(tokenAddress).transfer(custodian_address, tokenAmount);
        emit Recovered(tokenAddress, tokenAmount);
    }


    /* ========== EVENTS ========== */

    event Recovered(address token, uint256 amount);
}