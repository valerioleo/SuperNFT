/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import Web3 from 'web3';
import Maybe from 'folktale/maybe';
import {createAlchemyWeb3} from '@alch/alchemy-web3';
import {PROTOCOLS} from './types';
import {PROVIDERS, getProvider, getProviderUrl} from './providers';

export {PROTOCOLS};

let _web3Http = { // eslint-disable-line
  0: Maybe.Nothing(),
  1: Maybe.Nothing(),
  4: Maybe.Nothing(),
  42: Maybe.Nothing(),
  1730: Maybe.Nothing(),
  1337: Maybe.Nothing() // see here why 1337: https://hardhat.org/metamask-issue.html#metamask-chainid-issue
};

let _web3Ws = { // eslint-disable-line
  0: Maybe.Nothing(),
  1: Maybe.Nothing(),
  4: Maybe.Nothing(),
  42: Maybe.Nothing(),
  1730: Maybe.Nothing(),
  1337: Maybe.Nothing()
};

let _web3HttpCustom = {// eslint-disable-line
  0: Maybe.Nothing(),
  1: Maybe.Nothing(),
  4: Maybe.Nothing(),
  42: Maybe.Nothing(),
  1730: Maybe.Nothing(),
  1337: Maybe.Nothing()
};

let _web3WsCustom = { // eslint-disable-line
  0: Maybe.Nothing(),
  1: Maybe.Nothing(),
  4: Maybe.Nothing(),
  42: Maybe.Nothing(),
  1730: Maybe.Nothing(),
  1337: Maybe.Nothing()
};

const cacheConnection = (cache, _web3Inst, chainId) => {
  // eslint-disable-next-line no-param-reassign
  cache[chainId] = Maybe.fromNullable(_web3Inst);
  return _web3Inst;
};

const createHttpInstance = (
  chainId,
  provider
) => {
  if(chainId === 0) {
    return new Web3();
  }
  const web3Provider = getProvider({chainId}, PROTOCOLS.HTTP, provider);

  return new Web3(web3Provider);
};

const createWsInstance = (
  chainId,
  provider
) => {
  const providerUrl = getProviderUrl(chainId, PROTOCOLS.WS, provider);
  return createAlchemyWeb3(providerUrl);
};

export const getWeb3 = (
  providerOptions?,
  protocol?,
  provider?,
  forceNew?
) => {
  providerOptions = providerOptions || {chainId: 0};
  protocol = protocol || providerOptions.protocol || PROTOCOLS.HTTP;
  provider = provider || providerOptions.provider || PROVIDERS.INFURA;

  const cache = protocol === PROTOCOLS.HTTP ? _web3Http : _web3Ws;
  const instanceCreator = protocol === PROTOCOLS.HTTP
    ? createHttpInstance
    : createWsInstance;
  const {chainId} = providerOptions;

  if(forceNew) {
    cache[chainId] = Maybe.Nothing();
  }

  return cache[chainId].matchWith({
    Just: ({value}) => value,
    Nothing: () => {
      const web3Inst = instanceCreator(chainId, provider);
      return cacheConnection(cache, web3Inst, chainId);
    }
  });
};

export const getCustomWeb3 = (
  providerOptions = {chainId: 0},
  protocol = (providerOptions as any).protocol || PROTOCOLS.HTTP,
  provider = (providerOptions as any).provider || PROVIDERS.INFURA,
  forceNew = false
) => {
  const cache = protocol === PROTOCOLS.HTTP ? _web3HttpCustom : _web3WsCustom;
  const instanceCreator = protocol === PROTOCOLS.HTTP
    ? createHttpInstance
    : createWsInstance;
  const {chainId} = providerOptions;

  if(forceNew) {
    cache[chainId] = Maybe.Nothing();
  }

  return cache[chainId].matchWith({
    Just: ({value}) => value,
    Nothing: () => {
      const web3Inst = instanceCreator(chainId, provider);
      return cacheConnection(cache, web3Inst, chainId);
    }
  });
};

const cleanWeb3Http = () => {
  _web3Http = {
    0: Maybe.Nothing(),
    1: Maybe.Nothing(),
    4: Maybe.Nothing(),
    42: Maybe.Nothing(),
    1730: Maybe.Nothing(),
    1337: Maybe.Nothing()
  };
};

const cleanWeb3Ws = () => {
  _web3Ws = {
    0: Maybe.Nothing(),
    1: Maybe.Nothing(),
    4: Maybe.Nothing(),
    42: Maybe.Nothing(),
    1730: Maybe.Nothing(),
    1337: Maybe.Nothing()
  };
};

export const cleanWeb3 = (provider = PROTOCOLS.HTTP) => provider === PROTOCOLS.HTTP
  ? cleanWeb3Http()
  : cleanWeb3Ws();

export const enableAccountAccess = async () => {
  const web3 = getWeb3(undefined, undefined, undefined, false);
  try {
    const account = await web3.currentProvider.enable();
    return account;
  }
  catch(error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return [];
  }
};

export const getProviderHttpUrl = (
  chainId,
  provider = PROVIDERS.INFURA
) => getProviderUrl(chainId, PROTOCOLS.HTTP, provider);
