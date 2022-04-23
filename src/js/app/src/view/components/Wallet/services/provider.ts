import {Web3Provider} from '@ethersproject/providers';

// Initialize languages
export const getLibrary = provider => new Web3Provider(provider);

