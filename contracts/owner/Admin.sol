// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import '../Common/Context.sol';
import '../Access/Ownable.sol';

contract Admin is Context {
    address private _admin;

    event AdminTransferred(
        address indexed previousAdmin,
        address indexed newAdmin
    );

    constructor() internal {
        _admin = _msgSender();
        emit AdminTransferred(address(0), _admin);
    }

    function admin() public view returns (address) {
        return _admin;
    }

    modifier onlyAdmin() {
        require(
            _admin == msg.sender,
            'admin: caller is not the admin'
        );
        _;
    }

    function isAdmin() public view returns (bool) {
        return _msgSender() == _admin;
    }

    function transferAdmin(address newAdmin_) public onlyAdmin {
        _transferAdmin(newAdmin_);
    }

    function _transferAdmin(address newAdmin_) internal {
        require(
            newAdmin_ != address(0),
            'admin: zero address given for new admin'
        );
        emit AdminTransferred(address(0), newAdmin_);
        _admin = newAdmin_;
    }
}
