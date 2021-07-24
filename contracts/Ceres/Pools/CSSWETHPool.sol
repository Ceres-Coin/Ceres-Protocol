// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import '../../Math/Math.sol';
import '../../Math/SafeMath.sol';
import '../../ERC20/IERC20.sol';
import '../../Utils/Address.sol';
import '../../ERC20/SafeERC20.sol';
import '../../Interfaces/IRewardDistributionRecipient.sol';
import '../../ERC20/LPTokenWrapper.sol';
import '../../Utils/PoolLock.sol';

contract CSSWETHPool is
    LPTokenWrapper,
    IRewardDistributionRecipient,
    PoolLock
{
    IERC20 public CSS;
    address public foundationA; //TEST CASES DONE
    uint256 public basAllocationPercentage = 1; // TEST CASES DONE
    uint256 public DURATION = 5 days; // TEST CASES DONE

    uint256 public startime; //TEST CASES DONE 
    uint256 public periodFinish = 0; //TEST CASES DONE
    uint256 public rewardRate = 0; //TEST CASES DONE
    uint256 public lastUpdateTime;
    uint256 public rewardPerTokenStored;
    mapping(address => uint256) public userRewardPerTokenPaid;
    mapping(address => uint256) public rewards;

    event RewardAdded(uint256 reward);
    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);

    constructor(
        address _css,
        address lptoken_,
        address foundationA_,
        uint256 _startime
    ) public {
        CSS = IERC20(_css);
        lpt = IERC20(lptoken_);
        foundationA = foundationA_;
        startime = _startime;
    }

    modifier checkStart() {
        require(
            block.timestamp >= startime,
            'DAIBACLPTokenCashPool: not start'
        );
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
        require(amount > 0, 'DAIBACLPTokenCashPool: Cannot stake 0');
        super.stake(amount);
        setLockTime();
        emit Staked(msg.sender, amount);
    }

    function withdraw(uint256 amount)
        public
        override
        updateReward(msg.sender)
        checkStart
    {
        require(amount > 0, 'DAIBACLPTokenCashPool: Cannot withdraw 0');
        require(canWithdraw(msg.sender), "BACWOKT: still in withdraw lockup");
        setLockTime();
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
            require(canWithdraw(msg.sender), "BACWOKT: still in reward lockup");
            setLockTime();
            rewards[msg.sender] = 0;
            CSS.safeTransfer(msg.sender, reward.mul(100-basAllocationPercentage).div(100));
            uint256 totalFee = reward.mul(basAllocationPercentage).div(100);
            CSS.safeTransfer(foundationA, totalFee);
            
            emit RewardPaid(msg.sender, reward);
        }
    }

    // function notifyRewardAmount(uint256 reward)
    //     external
    //     override
    //     onlyRewardDistribution
    //     updateReward(address(0))
    // {
    //     if (block.timestamp > startime) {
    //         if (block.timestamp >= periodFinish) {
    //             rewardRate = reward.div(DURATION);
    //         } else {
    //             uint256 remaining = periodFinish.sub(block.timestamp);
    //             uint256 leftover = remaining.mul(rewardRate);
    //             rewardRate = reward.add(leftover).div(DURATION);
    //         }
    //         lastUpdateTime = block.timestamp;
    //         periodFinish = block.timestamp.add(DURATION);
    //         emit RewardAdded(reward);
    //     } else {
    //         rewardRate = reward.div(DURATION);
    //         lastUpdateTime = startime;
    //         periodFinish = startime.add(DURATION);
    //         emit RewardAdded(reward);
    //     }
    // }
}
