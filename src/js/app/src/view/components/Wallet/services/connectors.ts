import {InjectedConnector} from '@web3-react/injected-connector';

const SUPPORTED_CHAIN_IDS = [
  0,
  1,
  4,
  42,
  1337
];

// eslint-disable-next-line no-console
console.log('SUPPORTED_CHAIN_IDS', SUPPORTED_CHAIN_IDS);

// eslint-disable-next-line import/prefer-default-export
export const injected = new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAIN_IDS
});
