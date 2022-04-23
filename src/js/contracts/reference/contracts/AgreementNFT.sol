pragma solidity ^0.8.0;

import "erc721a/contracts/ERC721A.sol";
import "base64-sol/base64.sol";
import "./superfluid/interfaces/superfluid/ISuperfluidToken.sol";
import "./superfluid/interfaces/agreements/IConstantFlowAgreementV1.sol";
import "./SVG.sol";
import {
    ISuperfluid,
    SuperAppBase,
    SuperAppDefinitions
} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";

contract AgreementNFT is ERC721A, SuperAppBase {
  constructor(ISuperfluid host) ERC721A("AgreementPosition", "AGP") {

    uint256 configWord =
      SuperAppDefinitions.APP_LEVEL_FINAL |
      SuperAppDefinitions.BEFORE_AGREEMENT_CREATED_NOOP |
      SuperAppDefinitions.AFTER_AGREEMENT_CREATED_NOOP |
      SuperAppDefinitions.BEFORE_AGREEMENT_UPDATED_NOOP |
      SuperAppDefinitions.AFTER_AGREEMENT_UPDATED_NOOP |
      SuperAppDefinitions.BEFORE_AGREEMENT_TERMINATED_NOOP |
      SuperAppDefinitions.AFTER_AGREEMENT_TERMINATED_NOOP;

    host.registerApp(configWord);
  }

  uint private constant SECONDS_IN_MONTH = 2592000;
  uint private constant SECONDS_IN_YEAR = 31536000;
  uint private constant SECONDS_IN_DAY = 86400;

  enum SUBSCRIPTION_TYPE {
    MONTHLY,
    YEARLY
  }

  IConstantFlowAgreementV1 public agreement = IConstantFlowAgreementV1(0xF4C5310E51F6079F601a5fb7120bC72a70b96e2A);

  struct PositionData {
    ISuperfluidToken token;
    address recipient;
    address sender;
    string description;
    SUBSCRIPTION_TYPE subscriptionType;
    uint256 createdAt;
    bool isActive;
  }

  mapping (uint256 => PositionData) private _positionsById;

  function mint(
    address sender,
    address recipient,
    string memory description,
    SUBSCRIPTION_TYPE subscriptionType,
    ISuperfluidToken token,
    bytes memory ctx
  ) public returns (bytes memory){
    // _safeMint's second argument now takes in a quantity, not a tokenId.
    uint256 currentId = totalSupply();
    _safeMint(sender, 1);

    _positionsById[currentId] = PositionData({
      sender: sender,
      recipient: recipient,
      description: description,
      subscriptionType: subscriptionType,
      token: token,
      isActive: true,
      createdAt: block.timestamp
    });

    return ctx;
  }

  function tokenURI(uint256 tokenId) public view override returns (string memory) {
    require(_exists(tokenId), "AgreementPosition: Possition does not exist");

    PositionData memory currentPosition = _positionsById[tokenId];

    (int256 senderBalance, , ,) = currentPosition.token.realtimeBalanceOfNow(currentPosition.sender);
    (,int96 flowRate, uint256 deposit, uint256 owedDeposit) = agreement.getFlow(
      currentPosition.token,
      currentPosition.sender,
      currentPosition.recipient
    );

    
    string memory daysleft;
    int96 netFlowRate = agreement.getNetFlow(currentPosition.token, currentPosition.sender);

    if(netFlowRate >= 0) {
      daysleft = 'Infinite';
    }
    else {
      int96 possitiveRate = netFlowRate * -1;
      uint256 secondsLeft = uint256(senderBalance) / uint96(possitiveRate);
      daysleft = uint2str(secondsLeft / SECONDS_IN_DAY);
    }
    

    string memory svg = Base64.encode(
      bytes(
        generateSvg(
          flowRate,
          currentPosition,
          senderBalance,
          daysleft
        )
      )
    );
    string memory atributes = generateAtributes(
      flowRate,
      currentPosition,
      senderBalance,
      daysleft
    );

    return string(abi.encodePacked(
      'data:application/json;base64,',
      Base64.encode(
        bytes(abi.encodePacked(
          '{',
            '"name":"AgreementPosition #', uint2str(tokenId),'",',
            '"description":"', currentPosition.description, '",',
            '"image_data": "data:image/svg+xml;base64,',svg,'",',
            '"attributes": ', atributes,
          '}'
        ))
      )
    ));
  }

  function generateAtributes(
    int96 flowRate,
    PositionData memory position,
    int256 senderBalance,
    string memory daysleft
  ) private pure returns (string memory){
    bytes memory attributes = abi.encodePacked(
      '[',
        '{"trait_type":"interval","value":"', getSubscriptionReadableInterval(position.subscriptionType),'"},',
        '{"trait_type":"rate","value":"', getSubscriptionReadableRate(position.subscriptionType, flowRate),'"},',
        '{"trait_type":"credit","value":"', uint2str(uint256(uint256(senderBalance)) / 1e18),'"},',
        '{"trait_type":"days left","value":"', daysleft,'"}',
      ']'
    );

    return string(attributes);
  }

  function generateSvg(
    int96 flowRate,
    PositionData memory position,
    int256 senderBalance,
    string memory daysLeft
  ) public pure returns (string memory) {
    return SVG.generateSvg(
      position.description,
      getSubscriptionReadableRate(position.subscriptionType, flowRate),
      getSubscriptionReadableInterval(position.subscriptionType),
      uint2str(uint256(senderBalance) / 1e18),
      daysLeft
    );
  }

  function getSubscriptionReadableInterval(SUBSCRIPTION_TYPE subType) private pure returns (string memory) {
    if(subType == SUBSCRIPTION_TYPE.MONTHLY) {
      return 'month';
    }
    else {
      return 'year';
    }
  }

  function getSubscriptionReadableRate(SUBSCRIPTION_TYPE subType, int96 flowRate) private pure returns (string memory) {
    if(subType == SUBSCRIPTION_TYPE.MONTHLY) {
      uint256 adjustedRate = uint96(flowRate) * SECONDS_IN_MONTH;

      return uint2str(adjustedRate / 1e18);
    } else {
      uint256 adjustedRate = uint96(flowRate) * SECONDS_IN_YEAR;

      return uint2str(adjustedRate / 1e18);
    }
  }

  function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
		if (_i == 0) {
			return "0";
		}
		uint j = _i;
		uint len;
	
		while (j != 0) {
			len++;
			j /= 10;
		}
	
		bytes memory bstr = new bytes(len);
		uint k = len;
	
		while (_i != 0) {
			k = k-1;
			uint8 temp = (48 + uint8(_i - _i / 10 * 10));
			bytes1 b1 = bytes1(temp);
			bstr[k] = b1;
			_i /= 10;
		}
		
		return string(bstr);
	}
}