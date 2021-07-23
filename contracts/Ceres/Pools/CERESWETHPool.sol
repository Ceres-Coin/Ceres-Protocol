// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

// File: @openzeppelin/contracts/math/Math.sol

import '../../Math/Math.sol';
import '../../Math/SafeMath.sol';
import '../../ERC20/IERC20.sol';
import '../../Utils/Address.sol';
import '../../ERC20/SafeERC20.sol';
import '../../Interfaces/IRewardDistributionRecipient.sol';
import '../../owner/Operator.sol';

contract WETHWrapper {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    IERC20 public weth; //TEST CASES DONE

    uint256 private _totalSupply;
    mapping(address => uint256) private _balances;

    //TEST CASES DONE
    function totalSupply() public virtual view returns (uint256) {
        return _totalSupply;
    }
    //TEST CASES DONE
    function balanceOf(address account) public virtual view returns (uint256) {
        return _balances[account];
    }
    //TEST CASES DONE
    function stake(uint256 amount) public virtual {
        _totalSupply = _totalSupply.add(amount);
        _balances[msg.sender] = _balances[msg.sender].add(amount);
        weth.safeTransferFrom(msg.sender, address(this), amount);
    }
    //TEST CASES DONE
    function withdraw(uint256 amount) public virtual {
        _totalSupply = _totalSupply.sub(amount);
        _balances[msg.sender] = _balances[msg.sender].sub(amount);
        weth.safeTransfer(msg.sender, amount);
    }
}

contract CERESWETHPool is WETHWrapper, IRewardDistributionRecipient, Operator {
    IERC20 public ceres; //TEST CASES DONE
    uint256 public DURATION = 5 days; //TEST CASES DONE

    uint256 public startime; //TEST CASES DONE
    uint256 public periodFinish = 0; //TEST CASES DONE
    uint256 public rewardRate = 0; //TEST CASES DONE
    uint256 public lastUpdateTime; //TEST CASES DONE
    uint256 public rewardPerTokenStored; //TEST CASES DONE
    mapping(address => uint256) public userRewardPerTokenPaid;
    mapping(address => uint256) public rewards;
    mapping(address => uint256) public deposits;

    event RewardAdded(uint256 reward);
    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);
    // TEST CASES DONE
    constructor(
        address _ceres,
        address _weth,
        uint256 _startime
    ) public {
        ceres = IERC20(_ceres);
        weth = IERC20(_weth);
        startime = _startime;
    }

    modifier checkStart() {
        require(block.timestamp >= startime, 'BACyCRVPool: not start');
        _;
    }

    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = lastTimeRewardApplicable();
        if (account != address(0)) {
            rewards[account] = earned(account);
            userRewardPerTokenPaid[account] = rewardPerTokenStored;
        }
        _;
    }

    function lastTimeRewardApplicable() public view returns (uint256) {
        return Math.min(block.timestamp, periodFinish);
    }

    function rewardPerToken() public view returns (uint256) {
        if (totalSupply() == 0) {
            return rewardPerTokenStored;
        }
        return
            rewardPerTokenStored.add(
                lastTimeRewardApplicable()
                    .sub(lastUpdateTime)
                    .mul(rewardRate)
                    .mul(1e18)
                    .div(totalSupply())
            );
    }

    function earned(address account) public view returns (uint256) {
        return
            balanceOf(account)
                .mul(rewardPerToken().sub(userRewardPerTokenPaid[account]))
                .div(1e18)
                .add(rewards[account]);
    }

    // stake visibility is public as overriding LPTokenWrapper's stake() function
    function stake(uint256 amount)
        public
        override
        updateReward(msg.sender)
        checkStart
    {
        require(amount > 0, 'Cannot stake 0');
        uint256 newDeposit = deposits[msg.sender].add(amount);
        require(
            newDeposit <= 20000e18,
            'deposit amount exceeds maximum 20000'
        );
        deposits[msg.sender] = newDeposit;
        super.stake(amount);
        emit Staked(msg.sender, amount);
    }

    function withdraw(uint256 amount)
        public
        override
        updateReward(msg.sender)
        checkStart
    {
        require(amount > 0, 'Cannot withdraw 0');
        deposits[msg.sender] = deposits[msg.sender].sub(amount);
        super.withdraw(amount);
        emit Withdrawn(msg.sender, amount);
    }

    function exit() external {
        withdraw(balanceOf(msg.sender));
        getReward();
    }

    function getReward() public updateReward(msg.sender) checkStart {
        uint256 reward = earned(msg.sender);
        if (reward > 0) {
            rewards[msg.sender] = 0;
            ceres.safeTransfer(msg.sender, reward);
            emit RewardPaid(msg.sender, reward);
        }
    }

    function notifyRewardAmount(uint256 reward)
        external
        override
        onlyRewardDistribution
        updateReward(address(0))
    {
        if (block.timestamp > startime) {
            if (block.timestamp >= periodFinish) {
                rewardRate = reward.div(DURATION);
            } else {
                uint256 remaining = periodFinish.sub(block.timestamp);
                uint256 leftover = remaining.mul(rewardRate);
                rewardRate = reward.add(leftover).div(DURATION);
            }
            lastUpdateTime = block.timestamp;
            periodFinish = block.timestamp.add(DURATION);
            emit RewardAdded(reward);
        } else {
            rewardRate = reward.div(DURATION);
            lastUpdateTime = startime;
            periodFinish = startime.add(DURATION);
            emit RewardAdded(reward);
        }
    }
}
