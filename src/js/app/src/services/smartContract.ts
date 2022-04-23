/* eslint-disable no-case-declarations */
import mem from 'mem';
import {getWeb3} from '../eth-utils/core/v1/web3';
import {getNetworkId} from '../eth-utils/core/v1/utils';
import {getDefaultAccount} from '../eth-utils/core/v1/address';

const memoisedFetch = mem(async (path: string, contractInterface, network) => {
  const response = await fetch(path);

  if(response.status === 404) {
    throw new Error(`Deployment not found for contract ${contractInterface} for network ${network}.`);
  }

  if(response.status >= 400) {
    const text = await response.text();
    throw new Error(text);
  }

  const deployment = await response.json();

  return deployment;
}, {maxAge: 60000000});

export const getContractDeployment = async (network, contractInterface, basePathContracts = '/') => {
  const path = `${basePathContracts}deployments/${network}/${contractInterface}.json`;

  return memoisedFetch(path, contractInterface, network);
};

export const getWeb3ContractInstance = async (contractInterface, contractAddress?) => {
  const {abi, address} = await getContractDeployment(
    process.env.REACT_APP_NETWORK_NAME,
    contractInterface,
    process.env.PUBLIC_PATH
  );
  const web3 = getWeb3({chainId: getNetworkId(process.env.REACT_APP_NETWORK_NAME)});

  return new web3.eth.Contract(abi, contractAddress || address);
};

export const replaceSpecialArgs = async args => {
  const filledArgs = await Promise.all(args.map(async arg => {
    if(typeof arg === 'string' && arg.startsWith('::')) {
      const [type] = arg.substring(2).split('.');

      // it can be expanded to more cases
      switch(type) {
        case 'Account':
          const {defaultAccount: from} = await getDefaultAccount();
          return from;
        case 'Contracts':
          const [, contractInterface, requiredProp] = arg.substring(2).split('.');

          const deployment = await getContractDeployment(
            process.env.REACT_APP_NETWORK_NAME,
            contractInterface,
            process.env.PUBLIC_PATH
          );

          return deployment[requiredProp];

        default:
          return arg;
      }
    }

    return arg;
  }));

  return filledArgs;
};
