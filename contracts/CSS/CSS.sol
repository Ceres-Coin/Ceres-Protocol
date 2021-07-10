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
    uint8 public constant decimals = 18; //TEST CASE DONE
    address public CEREStablecoinAdd; //TEST CASE DONE
    
    uint256 public constant genesis_supply = 100000000e18; //TEST CASE DONE
    uint256 public CSS_DAO_min; //TEST CASE DONE

    address public owner_address; //TEST CASE DONE
    address public oracle_address; //TEST CASE DONE
    //TEST CASE DONE
    address public timelock_address; // Governance timelock address
    CEREStable private CERES; //PRIVATE, NOTHING TO DO

    // TEST CASE DONE
    bool public trackingVotes = true; // Tracking votes (only change if need to disable votes)

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

    function getChainId() internal pure returns (uint) {
        uint256 chainId;
        assembly { chainId := chainid() }
        return chainId;
    }

    /* ========== EVENTS ========== */
    
    /// @notice An event thats emitted when a voters account's vote balance changes
    event VoterVotesChanged(address indexed voter, uint previousBalance, uint newBalance);

    // Track CSS burned
    event CSSBurned(address indexed from, address indexed to, uint256 amount);

    // Track CSS minted
    event CSSMinted(address indexed from, address indexed to, uint256 amount);

}
