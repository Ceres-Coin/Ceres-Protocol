// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;


import "../../Math/SafeMath.sol";
import "../../CSS/CSS.sol";
import "../../Ceres/Ceres.sol";
import "../../ERC20/ERC20.sol";
import "../../Governance/AccessControl.sol";
import "./CeresPoolLibrary.sol";

contract CeresPool is AccessControl {
    using SafeMath for uint256;

    /* ========== STATE VARIABLES ========== */
 
    ERC20 public collateral_token; //TEST CASE DONE
    CEREShares public CSS; //TEST CASE DONE
    CEREStable public CERES; //TEST CASE DONE
    address public collateral_address; //TEST CASE DONE
    address public owner_address; //TEST CASE DONE

    address public ceres_contract_address; //TEST CASE DONE
    address public css_contract_address; //TEST CASE DONE
    address public timelock_address; //TEST CASE DONE


    // Number of decimals needed to get to 18
    uint256 public immutable missing_decimals; //TEST CASE DONE
    // Pool_ceiling is the total units of collateral that a pool contract can hold
    uint256 public pool_ceiling = 0; //TEST CASE DONE



    /* ========== MODIFIERS ========== */

    modifier onlyByOwnerOrGovernance() {
        require(msg.sender == timelock_address || msg.sender == owner_address, "You are not the owner or the governance timelock");
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
    
    function setTimelock(address new_timelock) external onlyByOwnerOrGovernance {
        timelock_address = new_timelock;
    }

    function setOwner(address _owner_address) external onlyByOwnerOrGovernance {
        owner_address = _owner_address;
    }

    function setPoolParameters(uint256 new_ceiling) external onlyByOwnerOrGovernance {
        pool_ceiling = new_ceiling;
    }
}