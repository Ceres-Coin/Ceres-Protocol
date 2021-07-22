// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import './Math/Math.sol';
import './ERC20/IERC20.sol';
import './ERC20/SafeERC20.sol';
import './Utils/ReentrancyGuard.sol';

import './interfaces/IOracle.sol';
import './interfaces/IBoardroom.sol';
import './interfaces/IBasisAsset.sol';
import './interfaces/ISimpleERCFund.sol';
import './Math/Babylonian.sol';
import './Math/FixedPoint.sol';
import './Math/Safe112.sol';
import './owner/Operator.sol';
import './Utils/Epoch.sol';
import './Utils/ContractGuard.sol';
import './interfaces/IReferral.sol';

/**
 * @title Basis Cash Treasury contract
 * @notice Monetary policy logic to adjust supplies of basis cash assets
 * @author Summer Smith & Rick Sanchez
 */
contract Treasury is ContractGuard, Epoch {
    using FixedPoint for *;
    using SafeERC20 for IERC20;
    using Address for address;
    using SafeMath for uint256;
    using Safe112 for uint112;

    /* ========== STATE VARIABLES ========== */

    // ========== FLAGS
    bool public migrated = false; //TEST CASES DONE
    bool public initialized = false; //TEST CASES DONE

    // ========== CORE
    address public fund; //TEST CASES DONE
    address public cash; //TEST CASES DONE
    address public bond; //TEST CASES DONE
    address public share; //TEST CASES DONE
    // address public boardroom;
    address public c_lpBoardroom; //TEST CASES DONE
    address public s_lpBoardroom; //TEST CASES DONE
    // c_s_percentage means 40% belongs to c_lp and rest belongs to s_lp.
    uint256 public c_s_percentage = 4; //TEST CASES DONE

    address public bondOracle; //TEST CASES DONE
    address public seigniorageOracle; //TEST CASES DONE

    // ========== PARAMS
    uint256 public cashPriceOne; //TEST CASES DONE
    uint256 public cashPriceCeiling; //TEST CASES DONE
    uint256 public bondDepletionFloor; //TEST CASES DONE
    uint256 public accumulatedSeigniorage = 0; //TEST CASES DONE
    // fundAllocationRate c tax in supercash = 10%
    uint256 public fundAllocationRate = 10; // 10% //TEST CASES DONE
    uint256 public referralRate = 5; //referral percentage is 5% //TEST CASES DONE
    // add inflationPercentCeil
    uint256 public inflationPercentCeil; //DEFAULT VALUE IS 0.1E18 //TEST CASES DONE
    uint256 public seigniorageCeil; //TEST CASES DONE

    /* ========== CONSTRUCTOR ========== */
    //TEST CASES DONE
    constructor(
        address _cash,
        address _bond,
        address _share,
        address _bondOracle,
        address _seigniorageOracle,
    // address _boardroom,
    // address _boardroom2,
        address _c_lpBoardroom,
        address _s_lpBoardroom,
        address _fund,
        uint256 _startTime
    ) public Epoch(12 hours, _startTime, 0) {
        cash = _cash;
        bond = _bond;
        share = _share;
        bondOracle = _bondOracle;
        seigniorageOracle = _seigniorageOracle;

        // boardroom = _boardroom;
        c_lpBoardroom = _c_lpBoardroom;
        s_lpBoardroom = _s_lpBoardroom;
        fund = _fund;

        cashPriceOne = 10**18;
        cashPriceCeiling = uint256(105).mul(cashPriceOne).div(10**2);

        // inflation at most 10% xmancash
        inflationPercentCeil = uint256(10).mul(cashPriceOne).div(10**2);
        seigniorageCeil = uint256(100000).mul(cashPriceOne);
        bondDepletionFloor = uint256(1000).mul(cashPriceOne);
    }

    /* =================== Modifier =================== */

    modifier checkMigration {
        require(!migrated, 'Treasury: migrated');

        _;
    }

    modifier checkOperator {
        require(
            IBasisAsset(cash).operator() == address(this) &&
            IBasisAsset(bond).operator() == address(this) &&
            IBasisAsset(share).operator() == address(this),
        // Operator(c_lpBoardroom).operator() == address(this) &&
        // Operator(s_lpBoardroom).operator() == address(this),
        // Operator(boardroom).operator() == address(this),
            'Treasury: need more permission'
        );

        _;
    }

    /* ========== VIEW FUNCTIONS ========== */

    //TEST CASES DONE
    function getReserve() public view returns (uint256) {
        return accumulatedSeigniorage;
    }

    //TEST CASES DONE
    function getBondOraclePrice() public view returns (uint256) {
        return _getCashPrice(bondOracle);
    }
    //TEST CASES DONE
    function getSeigniorageOraclePrice() public view returns (uint256) {
        return _getCashPrice(seigniorageOracle);
    }

    // NO NEED TO TEST PRIVATE
    function _getCashPrice(address oracle) internal view returns (uint256) {
        try IOracle(oracle).consult(cash, 1e18) returns (uint256 price) {
            return price;
        } catch {
            revert('Treasury: failed to consult cash price from the oracle');
        }
    }

    /* ========== GOVERNANCE ========== */

    function initialize() public checkOperator {
        require(!initialized, 'Treasury: initialized');

        // burn all of it's balance
        IBasisAsset(cash).burn(IERC20(cash).balanceOf(address(this)));

        // set accumulatedSeigniorage to it's balance
        accumulatedSeigniorage = IERC20(cash).balanceOf(address(this));

        initialized = true;
        emit Initialized(msg.sender, block.number);
    }

    function migrate(address target) public onlyOperator checkOperator {
        require(!migrated, 'Treasury: migrated');

        // cash
        Operator(cash).transferOperator(target);
        Operator(cash).transferOwnership(target);
        IERC20(cash).transfer(target, IERC20(cash).balanceOf(address(this)));

        // bond
        Operator(bond).transferOperator(target);
        Operator(bond).transferOwnership(target);
        IERC20(bond).transfer(target, IERC20(bond).balanceOf(address(this)));

        // share
        Operator(share).transferOperator(target);
        Operator(share).transferOwnership(target);
        IERC20(share).transfer(target, IERC20(share).balanceOf(address(this)));

        migrated = true;
        emit Migration(target);
    }
    // TEST CASES DONE
    function setFund(address newFund) public onlyOperator {
        fund = newFund;
        emit ContributionPoolChanged(msg.sender, newFund);
    }
    // TEST CASES DONE
    function setFundAllocationRate(uint256 rate) public onlyOperator {
        fundAllocationRate = rate;
        emit ContributionPoolRateChanged(msg.sender, rate);
    }
    // TEST CASES DONE
    function setInflationPercentCeil(uint256 inflationPercentCeil_)
    public
    onlyOperator
    {
        inflationPercentCeil = inflationPercentCeil_;
    }

    function setSeigniorageCeil(uint256 _seigniorageCeil)
    public
    onlyOperator
    {
        seigniorageCeil = _seigniorageCeil;
    }

    function setC_S_percentage(uint256 _c_s_percentage)
    public
    onlyOperator
    {
        c_s_percentage = _c_s_percentage;
    }



    /* ========== MUTABLE FUNCTIONS ========== */

    function _updateCashPrice() internal {
        try IOracle(bondOracle).update()  {} catch {}
        try IOracle(seigniorageOracle).update()  {} catch {}
    }

    function buyBonds(uint256 amount, uint256 targetPrice)
    external
    onlyOneBlock
    checkMigration
    checkStartTime
    checkOperator
    {
        require(amount > 0, 'Treasury: cannot purchase bonds with zero amount');

        uint256 cashPrice = _getCashPrice(bondOracle);
        require(cashPrice == targetPrice, 'Treasury: cash price moved');
        uint256 cashPrice_e18 = cashPrice.mul(1e8); // convert cashPrice to decimals 18
        require(
            cashPrice_e18 < cashPriceOne, // price < $1
            'Treasury: cashPrice not eligible for bond purchase'
        );

        uint256 bondPrice = cashPrice;
        uint256 bondPrice_e18 = bondPrice.mul(1e8); //convert bondPrice to decimals 18;

        IBasisAsset(cash).burnFrom(msg.sender, amount);
        IBasisAsset(bond).mint(msg.sender, amount.mul(1e18).div(bondPrice_e18));
        _updateCashPrice();

        emit BoughtBonds(msg.sender, amount);
    }

    function redeemBonds(uint256 amount, uint256 targetPrice)
    external
    onlyOneBlock
    checkMigration
    checkStartTime
    checkOperator
    {
        require(amount > 0, 'Treasury: cannot redeem bonds with zero amount');

        uint256 cashPrice = _getCashPrice(bondOracle);
        require(cashPrice == targetPrice, 'Treasury: cash price moved');
        uint256 cashPrice_e18 = cashPrice.mul(1e8); // convert cashPrice to decimals 18
        require(
            cashPrice_e18 > cashPriceCeiling, // price > $1.05
            'Treasury: cashPrice not eligible for bond purchase'
        );
        require(
            IERC20(cash).balanceOf(address(this)) >= amount,
            'Treasury: treasury has no more budget'
        );

        accumulatedSeigniorage = accumulatedSeigniorage.sub(
            Math.min(accumulatedSeigniorage, amount)
        );

        IBasisAsset(bond).burnFrom(msg.sender, amount);
        IERC20(cash).safeTransfer(msg.sender, amount);
        _updateCashPrice();

        emit RedeemedBonds(msg.sender, amount);
    }

    function allocateSeigniorage()
    external
    onlyOneBlock
    checkMigration
    checkStartTime
    checkEpoch
    checkOperator
    {

        _updateCashPrice();
        uint256 cashPrice = _getCashPrice(seigniorageOracle);
        uint256 cashPrice_e18 = cashPrice.mul(1e8); // convert cashPrice to decimals 18

        if (cashPrice_e18 <= cashPriceCeiling) {
            return; // just advance epoch instead revert
        }

        // circulating supply
        uint256 cashSupply = IERC20(cash).totalSupply().sub(
            accumulatedSeigniorage
        );
        // Note: we change cashPriceOne to cashPriceCeiling
        uint256 percentage = cashPrice_e18.sub(cashPriceCeiling);

        // add inflation
        percentage = Math.min(percentage, inflationPercentCeil);
        uint256 seigniorage = cashSupply.mul(percentage).div(1e18);
        seigniorage = Math.min(seigniorage,seigniorageCeil);

        IBasisAsset(cash).mint(address(this), seigniorage);


        // ======================== BIP-3
        uint256 fundReserve = seigniorage.mul(fundAllocationRate).div(100);
        if (fundReserve > 0) {
            IERC20(cash).safeApprove(fund, fundReserve);
            ISimpleERCFund(fund).deposit(
                cash,
                fundReserve,
                'Treasury: Seigniorage Allocation'
            );
            emit ContributionPoolFunded(now, fundReserve);
        }

        seigniorage = seigniorage.sub(fundReserve);

        // ======================= REFERRAL
        uint256 referralReward = seigniorage.mul(referralRate).div(100);
        if (referralReward > 0) {
            //get all referral address
            address[] memory referralList = IReferral(c_lpBoardroom).getReferralList();
            //get total referral referralAmount
            uint256 totalReferralAmount = IReferral(c_lpBoardroom).getTotalReferralAmount();
            //loop referralList to get the amount;
            for (uint i = 0; i < referralList.length; i++) {
                uint256 referralAmount = IReferral(c_lpBoardroom).getReferralAmount(referralList[i]);
                uint256 referralRewardPerAddr = referralReward.mul(referralAmount).div(totalReferralAmount);
                IERC20(cash).safeApprove(referralList[i], referralRewardPerAddr);
                ISimpleERCFund(referralList[i]).deposit(cash, referralRewardPerAddr, 'Treasury: Seigniorage Allocation');
                //                emit ContributionPoolFunded(now, referralRewardPerAddr);
            }
        }

        seigniorage = seigniorage.sub(referralReward);

        // ======================== BIP-4
        uint256 treasuryReserve = Math.min(
            seigniorage,
            IERC20(bond).totalSupply().sub(accumulatedSeigniorage)
        );
        if (treasuryReserve > 0) {
            accumulatedSeigniorage = accumulatedSeigniorage.add(
                treasuryReserve
            );
            emit TreasuryFunded(now, treasuryReserve);
        }

        // boardroom
        uint256 boardroomReserve = seigniorage.sub(treasuryReserve);
        if (boardroomReserve > 0) {

            uint256 c_lpBoardroomReserve_Number = boardroomReserve.mul(c_s_percentage).div(10);
            uint256 s_lpBoardroomReserve_Number = boardroomReserve.sub(c_lpBoardroomReserve_Number);


            IERC20(cash).safeApprove(c_lpBoardroom, c_lpBoardroomReserve_Number);
            IBoardroom(c_lpBoardroom).allocateSeigniorage(c_lpBoardroomReserve_Number);

            IERC20(cash).safeApprove(s_lpBoardroom, s_lpBoardroomReserve_Number);
            IBoardroom(s_lpBoardroom).allocateSeigniorage(s_lpBoardroomReserve_Number);


            // IERC20(cash).safeApprove(boardroom, boardroomReserve);
            // IBoardroom(boardroom).allocateSeigniorage(boardroomReserve);
            emit BoardroomFunded(now, boardroomReserve);
        }
    }

    function setLockUp(
        uint256 _withdrawLockupEpochs,
        uint256 _rewardLockupEpochs,
        uint256 _epochAlignTimestamp,
        uint256 _epochPeriod
    // address boardroom_address
    ) external onlyOperator {
        // IBoardroom(boardroom_address).setLockUp(_withdrawLockupEpochs, _rewardLockupEpochs, _epochAlignTimestamp, _epochPeriod);
        // IBoardroom(boardroom).setLockUp(_withdrawLockupEpochs, _rewardLockupEpochs, _epochAlignTimestamp, _epochPeriod);
        IBoardroom(c_lpBoardroom).setLockUp(_withdrawLockupEpochs, _rewardLockupEpochs, _epochAlignTimestamp, _epochPeriod);
        IBoardroom(s_lpBoardroom).setLockUp(_withdrawLockupEpochs, _rewardLockupEpochs, _epochAlignTimestamp, _epochPeriod);
    }

    // GOV
    event Initialized(address indexed executor, uint256 at);
    event Migration(address indexed target);
    event ContributionPoolChanged(address indexed operator, address newFund);
    event ContributionPoolRateChanged(
        address indexed operator,
        uint256 newRate
    );

    // CORE
    event RedeemedBonds(address indexed from, uint256 amount);
    event BoughtBonds(address indexed from, uint256 amount);
    event TreasuryFunded(uint256 timestamp, uint256 seigniorage);
    event BoardroomFunded(uint256 timestamp, uint256 seigniorage);
    event ContributionPoolFunded(uint256 timestamp, uint256 seigniorage);
}
