// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;


import "../Common/Context.sol";
import "../ERC20/IERC20.sol";
import "../ERC20/ERC20Custom.sol";
import "../ERC20/ERC20.sol";
import "../Math/SafeMath.sol";
import "../Governance/AccessControl.sol";
import "../Oracle/ChainlinkETHUSDPriceConsumer.sol";
import "../Oracle/UniswapPairOracle.sol";



contract CEREStable is ERC20Custom, AccessControl {
    using SafeMath for uint256;
    enum PriceChoice { CERES, CSS }

    //TEST CASE DONE
    string public name; 
    //TEST CASE DONE
    string public symbol; 
    //TEST CASE DONE
    uint8 public constant decimals = 18; 
    
    //TEST CASE DONE
    address public creator_address; 
    //TEST CASE DONE
    address public timelock_address; 
    //TEST CASE DONE
    address public DEFAULT_ADMIN_ADDRESS; 
    //TEST CASE DONE
    address public owner_address; 
    //TEST CASE DONE
    address public controller_address;
    //TEST CASE DONE
    uint256 public constant genesis_supply = 1000000e18; 

    mapping(address => bool) public ceres_pools; //test case done
    address[] public ceres_pools_array; //test case done

    // TEST CASE DONE
    address public eth_usd_consumer_address; //test case done
    uint8 public eth_usd_pricer_decimals;  //test case done
    ChainlinkETHUSDPriceConsumer public eth_usd_pricer; //test case done

    
    address public css_eth_oracle_address; //TEST CASE DONE
    UniswapPairOracle public CSSEthOracle;  //TEST CASE DONE

    // CONSTANTS
    uint256 public constant PRICE_PRECISION = 1e6; //TEST CASE DONE

    address public ceres_eth_oracle_address; //TEST CASE DONE
    UniswapPairOracle public CeresEthOracle; //TEST CASE DONE
    address public weth_address; //TEST CASE DONE

    // CERES PARAMETERS
    uint256 public ceres_step;  //TEST CASE DONE
    uint256 public refresh_cooldown;  //TEST CASE DONE
    uint256 public price_target;  //TEST CASE DONE
    uint256 public price_band;  //TEST CASE DONE
    uint256 public global_collateral_ratio; //TEST CASE DONE

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

        ceres_step = 2500; 
        refresh_cooldown = 60; 
        price_target = 1000000; 
        price_band = 5000; 
        global_collateral_ratio = 1000000; 
    }

    /* ========== MODIFIERS ========== */
    // TEST CASE DONE
    modifier onlyPools() {
       require(ceres_pools[msg.sender] == true, "Only ceres pools can call this function");
        _;
    }
    // TEST CASE DONE
    modifier onlyByOwnerOrGovernance() {
        require(msg.sender == owner_address || msg.sender == timelock_address || msg.sender == controller_address, "You are not the owner, controller, or the governance timelock");
        _;
    }
    /* ========== PUBLIC FUNCTIONS PART I (FUNC)========== */
    // TEST CASE DONE
    function getCeresEthOracle_consult() public view returns (uint256) {
        uint256 consult = CeresEthOracle.consult(weth_address, PRICE_PRECISION);
        return consult;
    }
    // TEST CASE DONE
    function getCSSEthOracle_consult() public view returns (uint256) {
        uint256 consult = CSSEthOracle.consult(weth_address, PRICE_PRECISION);
        return consult;
    }

    /* ========== RESTRICTED FUNCTIONS PART I (FUNC)========== */
    // TEST CASE DONE
    function pool_mint(address m_address, uint256 m_amount) public onlyPools {
        super._mint(m_address, m_amount);
        emit CERESMinted(msg.sender, m_address, m_amount);
    }

    // [FUNC][addPool]
    // TEST CASE DONE
    function addPool(address pool_address) public onlyByOwnerOrGovernance {
        require(ceres_pools[pool_address] == false, "address already exists");
        ceres_pools[pool_address] = true; 
        ceres_pools_array.push(pool_address);
    }

    // Remove a pool 
    // TEST CASE DONE
    function removePool(address pool_address) public onlyByOwnerOrGovernance {
        require(ceres_pools[pool_address] == true, "address doesn't exist already");
        
        // Delete from the mapping
        delete ceres_pools[pool_address];

        // 'Delete' from the array by setting the address to 0x0
        for (uint i = 0; i < ceres_pools_array.length; i++){ 
            if (ceres_pools_array[i] == pool_address) {
                ceres_pools_array[i] = address(0); // This will leave a null in the array and keep the indices the same
                break;
            }
        }
    }

    /* ========== RESTRICTED FUNCTIONS PART II (ROLE)========== */
    // TEST CASE DONE
    function setOwner(address _owner_address) external onlyByOwnerOrGovernance {
        owner_address = _owner_address;
    }
    // TEST CASE DONE
    function setTimelock(address new_timelock) external onlyByOwnerOrGovernance {
        timelock_address = new_timelock;
    }
    // TEST CASE DONE
    function setController(address _controller_address) external onlyByOwnerOrGovernance {
        controller_address = _controller_address;
    }
    // TEST CASE DONE
    function setETHUSDOracle(address _eth_usd_consumer_address) public onlyByOwnerOrGovernance {
        eth_usd_consumer_address = _eth_usd_consumer_address;
        eth_usd_pricer = ChainlinkETHUSDPriceConsumer(eth_usd_consumer_address);
        eth_usd_pricer_decimals = eth_usd_pricer.getDecimals();
    }
    // TEST CASE DONE
    function setCeresEthOracle(address _ceres_oracle_addr, address _weth_address) public onlyByOwnerOrGovernance {
        ceres_eth_oracle_address = _ceres_oracle_addr;
        CeresEthOracle = UniswapPairOracle(_ceres_oracle_addr); 
        weth_address = _weth_address;
    }

    // TEST CASE DONE
    function setCSSEthOracle(address _css_oracle_addr, address _weth_address) public onlyByOwnerOrGovernance {
        css_eth_oracle_address = _css_oracle_addr;
        CSSEthOracle = UniswapPairOracle(_css_oracle_addr);
        weth_address = _weth_address;
    }

    function oracle_price(PriceChoice choice) internal view returns (uint256) {
        // Get the ETH / USD price first, and cut it down to 1e6 precision
        uint256 eth_usd_price = uint256(eth_usd_pricer.getLatestPrice()).mul(PRICE_PRECISION).div(uint256(10) ** eth_usd_pricer_decimals);
        uint256 price_vs_eth;

        if (choice == PriceChoice.CERES) {
            price_vs_eth = uint256(CeresEthOracle.consult(weth_address, PRICE_PRECISION)); 
        }
        else if (choice == PriceChoice.CSS) {
            price_vs_eth = uint256(CSSEthOracle.consult(weth_address, PRICE_PRECISION)); 
        }
        else revert("INVALID PRICE CHOICE. ");

        // Will be in 1e6 format
        return eth_usd_price.mul(PRICE_PRECISION).div(price_vs_eth);
    }

    /* ========== PUBLIC FUNCTIONS PART 2 (FUNC)========== */
    // TEST CASE DONE
    function ceres_price() public view returns (uint256) {
        return oracle_price(PriceChoice.CERES);
    }

    // TEST CASE DONE
    function css_price()  public view returns (uint256) {
        return oracle_price(PriceChoice.CSS);
    }

    // TEST CASE DONE
    function eth_usd_price() public view returns (uint256) {
        return uint256(eth_usd_pricer.getLatestPrice()).mul(PRICE_PRECISION).div(uint256(10) ** eth_usd_pricer_decimals);
    }

    /* ========== EVENTS ========== */

    // Track Ceres burned
    event CERESBurned(address indexed from, address indexed to, uint256 amount);

    // Track Ceres minted
    event CERESMinted(address indexed from, address indexed to, uint256 amount);

}
