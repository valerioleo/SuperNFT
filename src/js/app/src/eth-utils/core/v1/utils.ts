import linker from 'solc/linker';
import RLP from 'rlp';
import {promisify} from 'es6-promisify';
import {getWeb3} from './web3';
import {NETWORK_NAMES} from './web3/types';
import {fromWei, BigNumber} from '.';

export const linkLibraries = (bytecode, libs) => libs
  .reduce((libBytecode, lib) => linker.linkBytecode(libBytecode, lib), bytecode);

export const getBytecode = (bytecode, libs) => linkLibraries(bytecode, libs);

export const networkNamesInverse = {
  '': 0,
  mainnet: 1,
  morden: 2,
  ropsten: 3,
  rinkeby: 4,
  kovan: 42,
  localhost: 1337
};

export const getNetworkName = networkId => NETWORK_NAMES[networkId];

export const getNetworkId = network => networkNamesInverse[network];

export const getTransactionUrl = (network, txHash) => `https://${getNetworkName(network) === 'mainnet' ? 'www' : getNetworkName(network)}.etherscan.io/tx/${txHash}`;

// helpful for when we fetch a token balance.
export const fromTokenDecimals = num => fromWei('ether', num);
export const fromTokenDecimalsFormat = (num, digits = 2) => (
  parseFloat(fromTokenDecimals(num)).toFixed(digits)
);

export const toSolDate = ts => Math.floor(ts / 1000);
export const fromSolDate = ts => Math.floor(ts * 1000);
export const getSolNow = () => toSolDate(Date.now());

// prefer the bignumber.js, which is used in web3@0.X as it supports decimals
export const toHex = value => getWeb3().utils.toHex(value);
export const toTokenHex = tokens => toHex(new BigNumber(1e+18).times(tokens));
export const isAddressValid = address => getWeb3().utils.isAddress(address);
export const sha3 = str => getWeb3().utils.sha3(str);
export const isSmartContract = async (providerOptions, address) => {
  const bytecode = await getWeb3(providerOptions).eth.getCode(address);
  return bytecode !== '0x';
};
export const {soliditySha3} = getWeb3().utils;
export const createAccountId = (...values) => soliditySha3(...values);
export const hexToBytes = value => getWeb3().utils.hexToBytes(value);
export const asciiToHex = str => getWeb3().utils.asciiToHex(str);
export const hexToAscii = hex => getWeb3().utils.hexToAscii(hex);
export const hexToUtf8 = hex => getWeb3().utils.hexToUtf8(hex);
export const encodeBytes32Param = str => asciiToHex(str);

export const signDataWithPrivateKey = (
  providerOptions,
  data,
  privKey
) => getWeb3(providerOptions).eth.accounts.sign(data, privKey);

export const getBlockTimestamp = async (providerOptions, blockHash) => {
  const getBlock = promisify(
    getWeb3(providerOptions).eth.getBlock.bind(getWeb3(providerOptions).eth)
  );
  const block = await getBlock(blockHash);

  return block.timestamp;
};

export const createClaim = (value, issuer, validTo, provider = '', providerProof = '') => ({
  value: encodeBytes32Param(value),
  issuer,
  validTo,
  provider: encodeBytes32Param(provider),
  providerProof: encodeBytes32Param(providerProof)
});

export const EMPTY_SOLIDITY_DATA = hexToBytes(toHex('empty_bytes_data'));

export const createRandomUniqueString = () => `${Date.now()}-${Math.random()}`;

export const getSaltHex = (salt = createRandomUniqueString()) => soliditySha3(salt);

export const computeContractAddressFromNonce = (
  from,
  nonce
) => `0x${getWeb3().utils.sha3(RLP.encode([from, nonce])).slice(12).substring(14)}`;

export const computeContractAddress = (saltHex, byteCode, deployerAddress) => getWeb3().utils
  .toChecksumAddress(`0x${getWeb3().utils.sha3(`0x${[
    'ff',
    deployerAddress,
    saltHex,
    getWeb3().utils.soliditySha3(byteCode)
  ].map(x => x.replace(/0x/, '')).join('')}`).slice(-40)}`);

export const getValueByType = (output, result) => {
  switch(output.type) {
    case 'byte32':
    case 'byte':
      return hexToUtf8(result);
    case 'address':
      return result.toLowerCase();
    case 'tuple':
      return output.components.reduce((tuple, component, i) => {
        const {name, type} = component;
        const componentValue = getValueByType({type}, result[i]);

        return {...tuple, [name]: componentValue};
      }, {});
    default:
      return result;
  }
};

export const methodReturnsStruct = methodAbiOutputs => methodAbiOutputs.length > 1;

export const decodeLog = (inputs, hexString, topics) => getWeb3()
  .eth
  .abi
  .decodeLog(inputs, hexString, topics);

export const encodeEvent = event => getWeb3()
  .eth
  .abi
  .encodeEventSignature(event);

export const decodeEvent = async (abi, eventName, logs) => {
  const event = abi.find(item => item.type === 'event' && item.name === eventName);
  const topic = logs.find(log => {
    const encoded = encodeEvent(event);
    return log.topics[0] === encoded;
  });

  if(topic) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {data, topics: [_, ...decodeTopics]} = topic;
    return await decodeLog(event.inputs, data, decodeTopics);
  }

  return {};
};

export const getEventName = (abi, signature) => abi.find(item => {
  if(item.type === 'event') {
    const calculatedSignature = encodeEvent(item);
    return calculatedSignature === signature;
  }

  return false;
});

export const numberToBytes32 = num => {
  const hex = getWeb3().utils.numberToHex(num);
  const bytes = getWeb3().utils.hexToBytes(hex);

  return [...new Array(32 - bytes.length).fill(0), ...bytes];
};

export const addressToBytes = address => getWeb3().utils.hexToBytes(address);

export const MAINNET_AVERAGE_BLOCK_TIME = 13270; // 13.27 is the averabe block time in seconds

export const predictBlockDate = (
  currentBlock = 0,
  targetBlock = 0,
  averageBlockTime = MAINNET_AVERAGE_BLOCK_TIME
) => {
  const delta = targetBlock - currentBlock;
  const millisecondsDelta = delta * averageBlockTime;

  return new Date(Date.now() + millisecondsDelta);
};

export const getBalance = (providerOptions, address) => {
  const web3 = getWeb3({chainId: getNetworkId(process.env.REACT_APP_NETWORK_NAME)});

  return web3.eth.getBalance(address);
};
