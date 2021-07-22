// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;
pragma experimental ABIEncoderV2;

import './ERC20/IERC20.sol';
import './ERC20/SafeERC20.sol';

import './Math/Safe112.sol';
// [IMPORTANT] ADD ADMIN & OPERATOR.SOL
import './owner/Operator.sol';
import './owner/Admin.sol';
import './Utils/ContractGuard.sol';
import './Interfaces/IBasisAsset.sol';
import './Interfaces/IReferral.sol';

contract ShareWrapper2 {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    IERC20 public share;

    uint256 private _totalSupply;
    mapping(address => uint256) private _balances;

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    function stake(uint256 amount) public virtual {
        _totalSupply = _totalSupply.add(amount);
        _balances[msg.sender] = _balances[msg.sender].add(amount);
        share.safeTransferFrom(msg.sender, address(this), amount);
    }

    // function stake(uint256 amount, address referral ) public virtual {
    //     _totalSupply = _totalSupply.add(amount);
    //     _balances[msg.sender] = _balances[msg.sender].add(amount);
    //     share.safeTransferFrom(msg.sender, address(this), amount);
    // }

    function withdraw(uint256 amount) public virtual {
        uint256 directorShare = _balances[msg.sender];
        require(
            directorShare >= amount,
            'Boardroom: withdraw request greater than staked amount'
        );
        _totalSupply = _totalSupply.sub(amount);
        _balances[msg.sender] = directorShare.sub(amount);
        share.safeTransfer(msg.sender, amount);
    }
}

contract Boardroom is ShareWrapper2, ContractGuard, IReferral {
    using SafeERC20 for IERC20;
    using Address for address;
    using SafeMath for uint256;
    using Safe112 for uint112;


    // timelock_Duration for DEPOSIT & WITHDRAW
    // TIMELOCK_DURATION FOR S = 12 HOURS & C = 4 HOURS
    /* ========== PARAMETERS =============== */
    uint256 public withdrawLockupEpochs = 2; //TEST CASES DONE
    uint256 public rewardLockupEpochs = 2; //TEST CASES DONE
    uint256 public epochAlignTimestamp = 1608883200; //TEST CASES DONE
    uint256 public epochPeriod = 300; //TEST CASES DONE

    /* ========== DATA STRUCTURES ========== */

    struct Boardseat {
        uint256 lastSnapshotIndex;
        uint256 rewardEarned;
        uint256 epochTimerStart;
    }

    struct BoardSnapshot {
        uint256 time;
        uint256 rewardReceived;
        uint256 rewardPerShare;
    }

    /* ========== STATE VARIABLES ========== */

    IERC20 public cash; //TEST CASES DONE

    mapping(address => Boardseat) private directors;
    BoardSnapshot[] private boardHistory;

    /* ========== whitelist for referral ======= */
    // TODO: [IMPORTANT]: REMOVE REFERRAL FUNC LATER & ADD THEM TO LIBRARY
    address[] public referralList; //TEST CASES DONE
    string[] public referralNameList; //TEST CASES DONE
    mapping(address => uint256) public referralAmount;
    uint256 public totalReferralAmount;

    /* ========== CONSTRUCTOR ========== */

    constructor(IERC20 _cash, IERC20 _share) public {
        cash = _cash;
        share = _share;

        BoardSnapshot memory genesisSnapshot = BoardSnapshot({
            time: block.number,
            rewardReceived: 0,
            rewardPerShare: 0
        });
        boardHistory.push(genesisSnapshot);
    }

    /* ========== Modifiers =============== */
    modifier directorExists {
        require(
            balanceOf(msg.sender) > 0,
            'Boardroom: The director does not exist'
        );
        _;
    }

    modifier updateReward(address director) {
        if (director != address(0)) {
            Boardseat memory seat = directors[director];
            seat.rewardEarned = earned(director);
            seat.lastSnapshotIndex = latestSnapshotIndex();
            directors[director] = seat;
        }
        _;
    }

    /* ========== VIEW FUNCTIONS ========== */

    // =========== Snapshot getters
    // TEST CASES DONE
    function latestSnapshotIndex() public view returns (uint256) {
        return boardHistory.length.sub(1);
    }
    // TEST CASES DONE
    function getLatestSnapshot() internal view returns (BoardSnapshot memory) {
        return boardHistory[latestSnapshotIndex()];
    }
    // TEST CASES DONE
    function getLastSnapshotIndexOf(address director)
        public
        view
        returns (uint256)
    {
        return directors[director].lastSnapshotIndex;
    }
    // TEST CASES DONE
    function getLastSnapshotOf(address director)
        internal
        view
        returns (BoardSnapshot memory)
    {
        return boardHistory[getLastSnapshotIndexOf(director)];
    }

    // TEST CASES DONE
    function getCurrentEpochTimestamp() public view returns(uint256) {
        // return epochAlignTimestamp.add(
        //         block.timestamp
        //         .sub(epochAlignTimestamp)
        //         .div(epochPeriod)
        //         .mul(epochPeriod)
        //     );
        return block.timestamp;
    }
    // TEST CASES DONE
    function getCanWithdrawTime(address director) public view returns(uint256) {
        return directors[director].epochTimerStart.add(
                    withdrawLockupEpochs.mul(epochPeriod)
                );
    }
    // TEST CASES DONE
    function getCanClaimTime(address director) public view returns(uint256) {
        return directors[director].epochTimerStart.add(
                    rewardLockupEpochs.mul(epochPeriod)
                );
    }
    // TEST CASES DONE
    function canWithdraw(address director) public view returns (bool) {
        return getCanWithdrawTime(director) <= getCurrentEpochTimestamp();
    }
    // TEST CASES DONE
    function canClaimReward(address director) public view returns (bool) {
        return getCanClaimTime(director) <= getCurrentEpochTimestamp();
    }

    // =========== Director getters
    // TEST CASES DONE
    function rewardPerShare() public view returns (uint256) {
        return getLatestSnapshot().rewardPerShare;
    }
    // TEST CASES DONE
    function earned(address director) public view returns (uint256) {
        uint256 latestRPS = getLatestSnapshot().rewardPerShare;
        uint256 storedRPS = getLastSnapshotOf(director).rewardPerShare;

        return
            balanceOf(director).mul(latestRPS.sub(storedRPS)).div(1e18).add(
                directors[director].rewardEarned
            );
    }

    /* ========== GOVERNANCE ================== */
    // TEST CASES DONE
    function setLockUp(
        uint256 _withdrawLockupEpochs,
        uint256 _rewardLockupEpochs,
        uint256 _epochAlignTimestamp,
        uint256 _epochPeriod
    )
        external
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
        withdrawLockupEpochs = _withdrawLockupEpochs;
        rewardLockupEpochs = _rewardLockupEpochs;
        epochAlignTimestamp = _epochAlignTimestamp;
        epochPeriod = _epochPeriod;
    }


    /* ========== MUTATIVE FUNCTIONS ========== */
    // TEST CASES DONE
    function stake(uint256 amount)
        public
        override
        updateReward(msg.sender)
    {
        require(amount > 0, 'Boardroom: Cannot stake 0');
        super.stake(amount);
        directors[msg.sender].epochTimerStart = getCurrentEpochTimestamp();
        emit Staked(msg.sender, amount);
    }

    // function stake(uint256 amount, address referral)
    //     public
    //     override
    //     onlyOneBlock
    //     updateReward(msg.sender)
    // {
    //     require(amount > 0, 'Boardroom: Cannot stake 0');
    //     super.stake(amount, referral);
    //     directors[msg.sender].epochTimerStart = getCurrentEpochTimestamp();
    //     _addAmountToReferral(amount, referral);
    //     emit Staked(msg.sender, amount);
    // }
    // TEST CASES DONE
    function withdraw(uint256 amount)
        public
        override
        directorExists
        updateReward(msg.sender)
    {
        require(amount > 0, 'Boardroom: Cannot withdraw 0');
        require(canWithdraw(msg.sender), "Boardroom: still in withdraw lockup");
        super.withdraw(amount);
        directors[msg.sender].epochTimerStart = getCurrentEpochTimestamp();
        emit Withdrawn(msg.sender, amount);
    }

    function exit() external {
        withdraw(balanceOf(msg.sender));
        claimReward();
    }
    // TEST CASES DONE
    function claimReward() public updateReward(msg.sender) {
        uint256 reward = directors[msg.sender].rewardEarned;
        if (reward > 0) {
            require(canClaimReward(msg.sender), "Boardroom: still in claimReward lockup");
            directors[msg.sender].rewardEarned = 0;
            cash.safeTransfer(msg.sender, reward);
            directors[msg.sender].epochTimerStart = getCurrentEpochTimestamp();
            emit RewardPaid(msg.sender, reward);
        }
    }
    // TEST CASES DONE
    function allocateSeigniorage(uint256 amount)
        external
    {
        require(amount > 0, 'Boardroom: Cannot allocate 0');
        require(
            totalSupply() > 0,
            'Boardroom: Cannot allocate when totalSupply is 0'
        );

        // Create & add new snapshot
        uint256 prevRPS = getLatestSnapshot().rewardPerShare;
        uint256 nextRPS = prevRPS.add(amount.mul(1e18).div(totalSupply()));

        BoardSnapshot memory newSnapshot = BoardSnapshot({
            time: block.number,
            rewardReceived: amount,
            rewardPerShare: nextRPS
        });
        boardHistory.push(newSnapshot);

        cash.safeTransferFrom(msg.sender, address(this), amount);
        emit RewardAdded(msg.sender, amount);
    }

    /* =============== REFERRAL ================= */
    // NO NEED TO ADD TEST SCRIPTS
    function addReferral(address _referral,string memory _name) external {
        referralList.push(_referral);
        referralNameList.push(_name);
        referralAmount[_referral] = 0;
    }
    // NO NEED TO ADD TEST SCRIPTS
    function _addAmountToReferral(uint256 _amount, address _referral) internal {
        if (_referral != address(0)) {
            uint isFound = 0;
            for (uint i = 0; i < referralList.length; i++) {
                if (referralList[i] == _referral) {
                    isFound = 1;
                    break;
                }
            }
            require(isFound > 0, "The referral address is not correct");
            referralAmount[_referral] = referralAmount[_referral].add(_amount);
            totalReferralAmount = totalReferralAmount.add(_amount);
        }
    }
    // NO NEED TO ADD TEST SCRIPTS
    function getReferralList() external view override returns (address[] memory) {
        return referralList;
    }
    // NO NEED TO ADD TEST SCRIPTS
    function getReferralNameList() external view override returns (string[] memory) {
        return referralNameList;
    }
    // NO NEED TO ADD TEST SCRIPTS
    function getReferralAmount(address _referral) external view override returns (uint256) {
        return referralAmount[_referral];
    }
    // NO NEED TO ADD TEST SCRIPTS
    function getTotalReferralAmount() external view override returns (uint256) {
        return totalReferralAmount;
    }

    /* ========== EVENTS ========== */

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);
    event RewardAdded(address indexed user, uint256 reward);
}
