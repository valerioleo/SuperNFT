import {getWeb3, enableAccountAccess} from '../core/v1/web3';

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const getAccounts = () => getWeb3().eth.getAccounts();

export const isValidAddress = address => getWeb3().utils.isAddress(address);

export const getDefaultAccount = async () => {
  const accounts = await enableAccountAccess();

  const defaultAccount = accounts[0]
    ? accounts[0].toLowerCase()
    : undefined;

  return {defaultAccount};
};

export const compareAddress = (addr1, addr2) => {
  if(!addr1 || !addr2) return false;

  return addr1.toLowerCase() === addr2.toLowerCase();
};

