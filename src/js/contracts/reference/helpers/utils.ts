import {ethers, deployments} from "hardhat";
import {Transaction} from 'ethers';
import web3Utils, {Unit, Mixed, toBN} from 'web3-utils';
export * from 'web3-utils';

type BlockTag = Parameters<typeof ethers.provider.getBlock>[0];
export const timePastBetweenBlocks = async (blockATag: BlockTag, blockBTag: BlockTag): Promise<number> => {
  const blockA = await ethers.provider.getBlock(blockATag);
  const blockB = await ethers.provider.getBlock(blockBTag);

  return blockB.timestamp - blockA.timestamp;
}

// const {upgradeProxy, deployProxy} = require('@openzeppelin/truffle-upgrades');

// const expectVMException = expectRevert.unspecified;
// const expectInvalidOpCode = expectRevert.invalidOpcode;
// const shouldFailWithMessage = expectRevert;

// // if(typeof web3 === 'undefined') {
// //   // eslint-disable-next-line no-global-assign
// //   web3 = new Web3();
// // }

// const {getBlockNumber} = web3.eth;


// const {parseEther, formatEther} = ethers.utils;
// const toHex = value => web3.utils.toHex(value);
// const hexToBytes = hex => web3.utils.hexToBytes(hex);
// const hexToUtf8 = hex => web3.utils.hexToUtf8(hex);
// const bytesToHex = bytes => web3.utils.bytesToHex(bytes);
// const padLeft = (str, charAmount) => web3.utils.padLeft(str, charAmount);
// const padRight = (str, charAmount) => web3.utils.padRight(str, charAmount);
// const {soliditySha3} = web3.utils;
// const {encodeFunctionSignature} = web3.eth.abi;
// const asciiToHex = str => web3.utils.asciiToHex(str);
// const encodeBytes32Param = str => asciiToHex(str);
// const stringToBytes32 = str => web3.utils.fromAscii(str);
// const bytes32ToString = bytes => web3.utils.toAscii(bytes);
// const {toBN} = web3.utils;
// const toSolDate = ts => Math.floor(ts / 1000);
// const fromSolDate = ts => Math.floor(ts * 1000);
// const getSolNow = () => toSolDate(Date.now());

export const toWei = (
  amount: Mixed,
  denomination: Unit = 'ether'
) => web3Utils.toWei(`${amount}`, denomination);

// const fromWei = (amount, denomination = 'ether') => web3.utils.fromWei(`${amount}`, denomination);

// module.exports = {
//   expectVMException,
//   expectInvalidOpCode,
//   shouldFailWithMessage,
//   toHex,
//   hexToBytes,
//   hexToUtf8,
//   bytesToHex,
//   padLeft,
//   padRight,
//   soliditySha3,
//   encodeFunctionSignature,
//   encodeBytes32Param,
//   stringToBytes32,
//   bytes32ToString,
//   parseEther,
//   formatEther,
//   upgradeProxy,
//   deployProxy,
//   advanceBlockTo,
//   advanceBlock,
//   advanceBlocks,
//   toBN,
//   increase,
//   increaseTo,
//   latest,
//   duration,
//   toWei,
//   fromWei,
//   toSolDate,
//   fromSolDate,
//   getSolNow,
//   getBlockNumber,
//   increaseNextBlockTs
// };
