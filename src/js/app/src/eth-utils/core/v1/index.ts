import {getWeb3} from './web3';

export const BigNumber = getWeb3().utils.toBN;
export const fromWei = (unit, num) => getWeb3().utils.fromWei(`${num}`, unit);
export const toWei = (unit, num) => getWeb3().utils.toWei(`${num}`, unit);
export const getTokens = tokens => getWeb3().utils.toBN(toWei('ether', tokens));
export const toFinney = (unit, num) => getWeb3().utils.fromWei(getWeb3().utils.toWei(`${num}`, unit), 'finney');
export const toFinneyNumber = (unit, num) => Number(toFinney('wei', BigNumber(toWei(unit, num)).toString()));
export const fromFinney = (unit, finney) => {
  const wei = getWeb3().utils.toWei(`${finney}`, 'finney');
  return getWeb3().utils.fromWei(`${wei}`, unit);
};

export const getBlockNumber = async providerOptions => await getWeb3(providerOptions)
  .eth
  .getBlockNumber();
export const getBlock = async (providerOptions, blockNumber) => await getWeb3(providerOptions)
  .eth
  .getBlock(blockNumber);

export const getBalance = (providerOptions, address) => getWeb3(providerOptions)
  .eth
  .getBalance(address);
