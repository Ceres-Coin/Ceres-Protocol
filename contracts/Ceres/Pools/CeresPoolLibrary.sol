// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "../../Math/SafeMath.sol";



library CERESPoolLibrary {
    using SafeMath for uint256;

    // Constants for various precisions
    uint256 private constant PRICE_PRECISION = 1e6;

    // ================ Structs ================
    // Needed to lower stack size
    struct MintCSS_Params {
        uint256 css_price_usd; 
        uint256 col_price_usd;
        uint256 css_amount;
        uint256 collateral_amount;
        uint256 col_ratio;
    }

    struct BuybackCSS_Params {
        uint256 excess_collateral_dollar_value_d18;
        uint256 css_price_usd;
        uint256 col_price_usd;
        uint256 CSS_amount;
    }

    // ================ Functions ================

    function calcMint1t1CERES(uint256 col_price, uint256 collateral_amount_d18) public pure returns (uint256) {
        return (collateral_amount_d18.mul(col_price)).div(1e6);
    }

    function calcMintAlgorithmicCERES(uint256 css_price_usd, uint256 css_amount_d18) public pure returns (uint256) {
        return css_amount_d18.mul(css_price_usd).div(1e6);
    }

    
    function calcMintFractionalCERES(MintCSS_Params memory params) internal pure returns (uint256, uint256) {    
        uint256 css_dollar_value_d18;
        uint256 c_dollar_value_d18;
        
        // Scoping for stack concerns
        {    
            css_dollar_value_d18 = params.css_amount.mul(params.css_price_usd).div(1e6);
            c_dollar_value_d18 = params.collateral_amount.mul(params.col_price_usd).div(1e6);

        }
        uint calculated_css_dollar_value_d18 = 
                    (c_dollar_value_d18.mul(1e6).div(params.col_ratio))
                    .sub(c_dollar_value_d18);

        uint calculated_css_needed = calculated_css_dollar_value_d18.mul(1e6).div(params.css_price_usd);

        return (
            c_dollar_value_d18.add(calculated_css_dollar_value_d18),
            calculated_css_needed
        );
    }

    function calcRedeem1t1CERES(uint256 col_price_usd, uint256 CERES_amount) public pure returns (uint256) {
        return CERES_amount.mul(1e6).div(col_price_usd);
    }

    // Must be internal because of the struct
    function calcBuyBackCSS(BuybackCSS_Params memory params) internal pure returns (uint256) {
        require(params.excess_collateral_dollar_value_d18 > 0, "No excess collateral to buy back!");

        // Make sure not to take more than is available
        uint256 css_dollar_value_d18 = params.CSS_amount.mul(params.css_price_usd).div(1e6);
        require(css_dollar_value_d18 <= params.excess_collateral_dollar_value_d18, "You are trying to buy back more than the excess!");

        uint256 collateral_equivalent_d18 = css_dollar_value_d18.mul(1e6).div(params.col_price_usd);
        return (
            collateral_equivalent_d18
        );

    }


    
    function recollateralizeAmount(uint256 total_supply, uint256 global_collateral_ratio, uint256 global_collat_value) public pure returns (uint256) {
        uint256 target_collat_value = total_supply.mul(global_collateral_ratio).div(1e6); 
        return target_collat_value.sub(global_collat_value); 
    }

    function calcRecollateralizeCERESInner(
        uint256 collateral_amount, 
        uint256 col_price,
        uint256 global_collat_value,
        uint256 ceres_total_supply,
        uint256 global_collateral_ratio
    ) public pure returns (uint256, uint256) {
        uint256 collat_value_attempted = collateral_amount.mul(col_price).div(1e6);
        uint256 effective_collateral_ratio = global_collat_value.mul(1e6).div(ceres_total_supply); 
        uint256 recollat_possible = (global_collateral_ratio.mul(ceres_total_supply).sub(ceres_total_supply.mul(effective_collateral_ratio))).div(1e6);

        uint256 amount_to_recollat;
        if(collat_value_attempted <= recollat_possible){
            amount_to_recollat = collat_value_attempted;
        } else {
            amount_to_recollat = recollat_possible;
        }

        return (amount_to_recollat.mul(1e6).div(col_price), amount_to_recollat);

    }

}