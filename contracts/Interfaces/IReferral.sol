pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

interface IReferral {
    function getReferralList() external view returns (address[] memory);
    function getReferralNameList() external view returns (string[] memory);
    function getReferralAmount(address referral) external view returns (uint256);
    function getTotalReferralAmount() external view returns (uint256);
} 