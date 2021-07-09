// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;


import "../Common/Context.sol";
import "../ERC20/IERC20.sol";
import "../ERC20/ERC20Custom.sol";
import "../ERC20/ERC20.sol";
import "../Math/SafeMath.sol";
import "../Governance/AccessControl.sol";


contract CEREStable is ERC20Custom, AccessControl {
    using SafeMath for uint256;
    string public symbol; 
    string public name; 
    uint8 public constant decimals = 18; 

    address public owner_address; 
    address public creator_address; 
    address public timelock_address; 
    address public DEFAULT_ADMIN_ADDRESS; 
    uint256 public constant genesis_supply = 1000000e18; 

    constructor(
        string memory _name,
        string memory _symbol,
        address _creator_address,
        address _timelock_address
    ) public {
        name = _name;
        symbol = _symbol;
        creator_address = _creator_address;
        timelock_address = _timelock_address;
        DEFAULT_ADMIN_ADDRESS = _msgSender();
        owner_address = _creator_address;
        _mint(creator_address, genesis_supply);
    }

}
