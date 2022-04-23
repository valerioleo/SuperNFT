import {getNetworkId} from './utils';
import {getWeb3, enableAccountAccess} from './web3';

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
const toLowerCase = string => String(string).toLowerCase();

export const getAccounts = providerOptions => getWeb3(providerOptions).eth.getAccounts();

export const isValidAddress = address => getWeb3().utils.isAddress(address);

export const getDefaultAccount = async (
  providerOptions = {
    chainId: getNetworkId(process.env.REACT_APP_NETWORK_NAME || 'kovan')
  }
) => {
  let accounts = await getAccounts(providerOptions);
  if(accounts.length === 0) {
    await enableAccountAccess();
    accounts = await getAccounts(providerOptions);
  }

  const defaultAccount = accounts[0]
    ? toLowerCase(accounts[0])
    : undefined;

  return {defaultAccount};
};

export const compareAddress = (addr1, addr2) => {
  if(!addr1 || !addr2) return false;

  return toLowerCase(addr1) === toLowerCase(addr2);
};

export const createAccount = entropy => getWeb3().eth.accounts.create(entropy);
