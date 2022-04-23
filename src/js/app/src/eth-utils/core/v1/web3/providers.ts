/* eslint-disable @typescript-eslint/no-explicit-any */
import Web3 from 'web3';
import {NETWORK_NAMES, PROTOCOLS} from './types';

export const PROVIDERS = {
  INFURA: 'infura',
  ALCHEMY: 'alchemy',
  CUSTOM: 'custom'
};

export const getProviderUrl = (
  chainId: number,
  protocol: string = PROTOCOLS.HTTP,
  provider: string = PROVIDERS.INFURA
): string => {
  const networkName = NETWORK_NAMES[chainId] || 'mainnet';

  if(process.env.REACT_APP_WEB3_PROVIDER === PROVIDERS.CUSTOM || provider === PROVIDERS.CUSTOM) {
  // eslint-disable-next-line no-constant-condition
  // if(true) {
    switch(protocol) {
      case PROTOCOLS.HTTP:
        return process.env.REACT_APP_WEB3_HTTP_PROVIDER_URL as string;
      case PROTOCOLS.WS:
        return process.env.REACT_APP_WEB3_WS_PROVIDER_URL as string;
      default: throw new Error(`Protocol: ${protocol} for the provider: ${provider} not supported.`);
    }
  }

  switch(provider) {
    case PROVIDERS.INFURA:
      switch(protocol) {
        case PROTOCOLS.HTTP:
          return `https://${networkName}.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`;
        case PROTOCOLS.WS:
          return `wss://${networkName}.infura.io/ws/v3/${process.env.REACT_APP_INFURA_API_KEY}`;
        default: throw new Error(`Protocol: ${protocol} for the provider: ${provider} not supported.`);
      }
    case PROVIDERS.ALCHEMY:
      switch(protocol) {
        case PROTOCOLS.HTTP:
          return `https://eth-${networkName}.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`;
        case PROTOCOLS.WS:
          return `wss://eth-${networkName}.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`;
        default: throw new Error(`Protocol: ${protocol} for the provider: ${provider} not supported.`);
      }
    default:
      throw new Error(`Provider ${provider} not supported.`);
  }
};

export const getProvider = (
  providerOptions: {chainId: number} = {chainId: 0},
  protocol: string = PROTOCOLS.HTTP,
  provider: string = PROVIDERS.INFURA
) => {
  if(typeof provider === 'object' && provider !== null) return provider;

  const {ethereum: injectedProvider} = global as any;

  if(injectedProvider && Number(injectedProvider.chainId) === providerOptions.chainId) {
    return injectedProvider;
  }

  switch(protocol) {
    case PROTOCOLS.HTTP:
      return new Web3.providers.HttpProvider(
        getProviderUrl(providerOptions.chainId, protocol, provider)
      );
    case PROTOCOLS.WS:
      return getProviderUrl(providerOptions.chainId, protocol, provider);
    default:
      throw new Error('Protocol not supported');
  }
};
