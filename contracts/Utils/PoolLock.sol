pragma solidity ^0.6.0;

import '../Math/SafeMath.sol';
import '../owner/Operator.sol';

contract PoolLock is Operator {
    using SafeMath for uint256;

    // uint256 withdrawLockupEpochs;
    // uint256 rewardLockupEpochs;
    // uint256 epochAlignTimestamp;
    // uint256 epochPeriod;

    uint256 public withdrawLockupEpochs = 2;
    uint256 public rewardLockupEpochs = 2;
    uint256 public epochAlignTimestamp = 1608883200;
    uint256 public epochPeriod = 180;

    struct Lockup {
        uint256 epochTimerStart;
    }

    mapping(address => Lockup) private directors;

    event changeLockProperties(address indexed, string propertyName, uint256 propertyValue);

    /* ========== GOVERNANCE ================== */

    function updateWithdrawLockupEpochs(uint256 _withdrawLockupEpochs) public onlyOperator {
        emit changeLockProperties(msg.sender, "withdrawLockupEpochs", _withdrawLockupEpochs);
        withdrawLockupEpochs = _withdrawLockupEpochs;
    }

    function updateRewardLockupEpochs(uint256 _rewardLockupEpochs) public onlyOperator {
        emit changeLockProperties(msg.sender, "rewardLockupEpochs", _rewardLockupEpochs);
        rewardLockupEpochs = _rewardLockupEpochs;
    }

    function updateEpochAlignTimestamp(uint256 _epochAlignTimestamp) public onlyOperator {
        emit changeLockProperties(msg.sender, "epochAlignTimestamp", _epochAlignTimestamp);
        epochAlignTimestamp = _epochAlignTimestamp;
    }

    function updateEpochPeriod(uint256 _epochPeriod) public onlyOperator {
        emit changeLockProperties(msg.sender, "epochPeriod", _epochPeriod);
        epochPeriod = _epochPeriod;
    }

    function setLockUp(
        uint256 _withdrawLockupEpochs,
        uint256 _rewardLockupEpochs,
        uint256 _epochAlignTimestamp,
        uint256 _epochPeriod
    )
    external
    onlyOperator
    {
        require(
            _withdrawLockupEpochs >= _rewardLockupEpochs
            && _withdrawLockupEpochs <= 21,
            "LockupEpochs: out of range"
        );
        require(_epochPeriod <= 1 days, "EpochPeriod: out of range");
        require(
            _epochAlignTimestamp.add(_epochPeriod.mul(2)) < block.timestamp,
            "EpochAlignTimestamp: too late"
        );

        updateWithdrawLockupEpochs(_withdrawLockupEpochs);
        updateRewardLockupEpochs(_rewardLockupEpochs);
        updateEpochAlignTimestamp(_epochAlignTimestamp);
        updateEpochPeriod(_epochPeriod);
    }

    /* ========== Set Lock For Address ================== */
    function setLockTime() internal {
        directors[msg.sender].epochTimerStart = getCurrentEpochTimestamp();
    }

    /* ========== Check Lock ================== */
    function getCurrentEpochTimestamp() public view returns(uint256) {
        return block.timestamp;
    }

    function getCanWithdrawTime(address director) public view returns(uint256) {
        return directors[director].epochTimerStart.add(
            withdrawLockupEpochs.mul(epochPeriod)
        );
    }

    function getCanClaimTime(address director) public view returns(uint256) {
        return directors[director].epochTimerStart.add(
            rewardLockupEpochs.mul(epochPeriod)
        );
    }

    function canWithdraw(address director) public view returns (bool) {
        return getCanWithdrawTime(director) <= getCurrentEpochTimestamp();
    }

    function canClaimReward(address director) public view returns (bool) {
        return getCanClaimTime(director) <= getCurrentEpochTimestamp();
    }

} 