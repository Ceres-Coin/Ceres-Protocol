// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import "./CeresPool.sol";

contract Pool_USDC is CeresPool {
    address public USDC_address;
    constructor(
        address _ceres_contract_address,
        address _css_contract_address,
        address _collateral_address,
        address _creator_address,
        address _timelock_address,
        uint256 _pool_ceiling
    ) 
    CeresPool(_ceres_contract_address, _css_contract_address, _collateral_address, _creator_address, _timelock_address, _pool_ceiling)
    public {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        USDC_address = _collateral_address;
    }
}
