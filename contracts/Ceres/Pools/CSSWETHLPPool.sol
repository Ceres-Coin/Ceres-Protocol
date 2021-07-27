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
import '../../owner/Operator.sol';

contract CSSWETHLPPool is
    LPTokenWrapper,
    IRewardDistributionRecipient,
    PoolLock
{
    IERC20 public css;
    
    // add address FoundationA
    address public foundationA; // TEST CASES DONE
    // tax = cssAllocationPercentage = 10% in super cash
    uint256 public cssAllocationPercentage = 10; // TEST CASES DONE

    uint256 public constant DURATION = 30 days; // TEST CASES DONE

    uint256 public initreward = 100 * 10**18; // 100 CSS // TEST CASES DONE
    uint256 public startime; // TEST CASES DONE
    uint256 public periodFinish = 0; // TEST CASES DONE
    uint256 public rewardRate = 0; // TEST CASES DONE
    uint256 public lastUpdateTime; // TEST CASES DONE
    uint256 public rewardPerTokenStored; // TEST CASES DONE
    mapping(address => uint256) public userRewardPerTokenPaid; // TEST CASES DONE
    mapping(address => uint256) public rewards; // TEST CASES DONE

    event RewardAdded(uint256 reward);
    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);
    // TEST CASES DONE
    constructor(
        address _css,
        address lptoken_,
        address foundationA_,
        uint256 _startime
    ) public {
        css = IERC20(_css);
        lpt = IERC20(lptoken_);
        foundationA = foundationA_;
        startime = _startime;

        rewardRate = initreward.div(DURATION);
        if (block.timestamp > startime) {
            lastUpdateTime = block.timestamp;
            periodFinish = block.timestamp.add(DURATION);
        } else {
            lastUpdateTime = startime;
            periodFinish = startime.add(DURATION);
        }
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
    // TEST CASES DONE
    function getBlockTimestamp() public view returns (uint256) {
        return block.timestamp;
    }
    // TEST CASES DONE
    function getPeriodFinish() public view returns (uint256) {
        return periodFinish;
    }
    // TEST CASES DONE
    function lastTimeRewardApplicable() public view returns (uint256) {
        return Math.min(block.timestamp, periodFinish);
    }
    // TEST CASES DONE
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
    // TEST CASES DONE
    function earned(address account) public view returns (uint256) {
        return
            balanceOf(account)
                .mul(rewardPerToken().sub(userRewardPerTokenPaid[account]))
                .div(1e18)
                .add(rewards[account]);
    }

    // stake visibility is public as overriding LPTokenWrapper's stake() function
    // TEST CASES DONE
    function stake(uint256 amount)
        public
        override
        updateReward(msg.sender)
        checkhalve
        checkStart
    {
        require(amount > 0, 'Cannot stake 0');
        super.stake(amount);
        setLockTime();
        emit Staked(msg.sender, amount);
    }
    // TEST CASES DONE
    function withdraw(uint256 amount)
        public
        override
        updateReward(msg.sender)
        checkhalve
        checkStart
    {
        require(amount > 0, 'Cannot withdraw 0');
        require(canWithdraw(msg.sender), "BACWOKT: still in withdraw lockup");
        setLockTime();
        super.withdraw(amount);
        emit Withdrawn(msg.sender, amount);
    }
    // TODO: [LATER] ADD TEST CASES
    function exit() external {
        withdraw(balanceOf(msg.sender));
        getReward();
    }
    // TEST CASES DONE
    function getReward() public updateReward(msg.sender) checkhalve checkStart {
        uint256 reward = earned(msg.sender);
        if (reward > 0) {
            require(canWithdraw(msg.sender), "BACWOKT: still in reward lockup");
            setLockTime();
            rewards[msg.sender] = 0;
            css.safeTransfer(msg.sender, reward.mul(100-cssAllocationPercentage).div(100));
            uint256 totalFee = reward.mul(cssAllocationPercentage).div(100);
            css.safeTransfer(foundationA, totalFee);
            emit RewardPaid(msg.sender, reward);
        }
    }
    // TEST CASES DONE
    // function setRewardRate(uint256 _rewardRate) public onlyOperator {
    //     rewardRate = _rewardRate;
    //     if (block.timestamp > startime) {
    //         lastUpdateTime = block.timestamp;
    //         periodFinish = block.timestamp.add(DURATION);
    //     } else {
    //         lastUpdateTime = startime;
    //         periodFinish = startime.add(DURATION);
    //     }
    // }

    modifier checkhalve() {
        if (block.timestamp >= periodFinish) {
            initreward = initreward.mul(20).div(100);

            rewardRate = initreward.div(DURATION);
            periodFinish = block.timestamp.add(DURATION);
            emit RewardAdded(initreward);
        }
        _;
    }

    modifier checkStart() {
        require(block.timestamp >= startime, 'not start');
        _;
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
    //         rewardRate = initreward.div(DURATION);
    //         lastUpdateTime = startime;
    //         periodFinish = startime.add(DURATION);
    //         emit RewardAdded(reward);
    //     }
    // }
}