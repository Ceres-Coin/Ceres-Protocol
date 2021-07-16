// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import "../Common/Context.sol";
import "../ERC20/ERC20Custom.sol";
import "../ERC20/IERC20.sol";
import "../Ceres/Ceres.sol";
import "../Math/SafeMath.sol";
import "../Governance/AccessControl.sol";

contract CEREShares is ERC20Custom, AccessControl {
    using SafeMath for uint256;

    /* ========== STATE VARIABLES ========== */

    string public symbol; //TEST CASE DONE
    string public name; //TEST CASE DONE
    uint8 public constant decimals = 18;  //TEST CASE DONE 
    uint256 public constant genesis_supply = 100000000e18; //TEST CASE DONE
    
    address public owner_address; //TEST CASE DONE
    address public oracle_address; //TEST CASE DONE
    
    address public timelock_address; // Governance timelock address //TEST CASE DONE
    CEREStable public CERES; //PRIVATE, NOTHING TO DO


    /* ========== MODIFIERS ========== */

    modifier onlyPools() {
       require(CERES.ceres_pools(msg.sender) == true, "Only ceres pools can mint new ceres");
        _;
    } 
    
    modifier onlyByOwnerOrGovernance() {
        require(msg.sender == owner_address || msg.sender == timelock_address, "You are not an owner or the governance timelock");
        _;
    }

    /* ========== CONSTRUCTOR ========== */
    //TEST CASE DONE
    constructor(
        string memory _name,
        string memory _symbol, 
        address _oracle_address,
        address _owner_address,
        address _timelock_address
    ) public {
        name = _name;
        symbol = _symbol;
        oracle_address = _oracle_address;
        owner_address = _owner_address;
        timelock_address = _timelock_address;
        _mint(owner_address, genesis_supply);
    }

    /* ========== RESTRICTED FUNCTIONS ========== */
    //TEST CASE DONE
    function setOracle(address new_oracle) external onlyByOwnerOrGovernance {
        oracle_address = new_oracle;
    }
    //TEST CASE DONE
    function setOwner(address _owner_address) external onlyByOwnerOrGovernance {
        owner_address = _owner_address;
    }
    //TEST CASE DONE
    function setTimelock(address new_timelock) external onlyByOwnerOrGovernance {
        timelock_address = new_timelock;
    }
    //TEST CASE DONE
    function setCERESAddress(address ceres_contract_address) external onlyByOwnerOrGovernance {
        CERES = CEREStable(ceres_contract_address);
    }
    //TEST CASE DONE
    function pool_burn_from(address b_address, uint256 b_amount) external onlyPools {
        // if(trackingVotes){
        //     trackVotes(b_address, address(this), uint96(b_amount));
        //     uint32 srcRepNum = numCheckpoints[address(this)];
        //     uint96 srcRepOld = srcRepNum > 0 ? checkpoints[address(this)][srcRepNum - 1].votes : 0;
        //     uint96 srcRepNew = sub96(srcRepOld, uint96(b_amount), "pool_burn_from new votes underflows");
        //     _writeCheckpoint(address(this), srcRepNum, srcRepOld, srcRepNew); // burn votes
        // }

        super._burnFrom(b_address, b_amount);
        emit CSSBurned(b_address, address(this), b_amount);
    }

    // TODO: ADD TEST CASES;
    function pool_mint(address m_address, uint256 m_amount) external onlyPools {        
        // if(trackingVotes){
        //     uint32 srcRepNum = numCheckpoints[address(this)];
        //     uint96 srcRepOld = srcRepNum > 0 ? checkpoints[address(this)][srcRepNum - 1].votes : 0;
        //     uint96 srcRepNew = add96(srcRepOld, uint96(m_amount), "pool_mint new votes overflows");
        //     _writeCheckpoint(address(this), srcRepNum, srcRepOld, srcRepNew); // mint new votes
        //     trackVotes(address(this), m_address, uint96(m_amount));
        // }

        super._mint(m_address, m_amount);
        emit CSSMinted(address(this), m_address, m_amount);
    }
    
    /* ========== EVENTS ========== */

    // Track CSS burned
    event CSSBurned(address indexed from, address indexed to, uint256 amount);

    // Track CSS minted
    event CSSMinted(address indexed from, address indexed to, uint256 amount);

}
