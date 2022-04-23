import {Web3ReactProvider} from '@web3-react/core';
import {getLibrary} from '../services/provider';

const Web3Provider = ({children}) => (
  <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>
);

export default Web3Provider;
