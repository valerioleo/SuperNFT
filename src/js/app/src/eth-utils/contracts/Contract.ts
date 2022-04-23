/* eslint-disable no-underscore-dangle */
/* eslint-disable no-async-promise-executor */
import {Contract as Web3Contract} from 'web3-eth-contract';
import {getWeb3} from '../core/v1/web3';
import {getDefaultAccount} from '../core/v1/address';
import {estimateGas, getDeployData} from '../core/v1/tx';

const getContract = ContractDefinition => new Web3Contract(ContractDefinition.abi);

export const callContractMethod = async (contractInstance, method, ...args) => {
  const {defaultAccount: from} = await getDefaultAccount();
  const methodArgs = args.length
    ? [...args]
    : [];

  const methodResult = await contractInstance.methods[method](...methodArgs).call({from});

  return {methodResult};
};

export const batchWeb3Requests = (web3, reqs) => new Promise(async resolve => {
  let counter = 0;
  const results = {};
  const batch = new web3.BatchRequest();

  reqs.map(({
    request,
    key,
    extra,
    resultName
  }) => batch.add(request((err, res) => {
    if(extra) {
      if(resultName) {
        results[key] = {[resultName]: res, ...extra};
      }
      else {
        results[key] = {...res, ...extra};
      }
    }
    else {
      results[key] = res;
    }
    counter++;

    if(counter === reqs.length) {
      resolve(results);
    }
  })));

  batch.execute();
});

// eslint-disable-next-line max-len
export const sendTransaction = async (contractInstance, method, ...args) => {
  try {
    const {defaultAccount: from} = await getDefaultAccount();

    const gasArgs = args.length
      ? [contractInstance.methods[`${method}`], from, ...args]
      : [contractInstance.methods[`${method}`], from];

    const methodArgs = args.length
      ? [...args]
      : [];

    // eslint-disable-next-line prefer-spread
    const gasLimit = await estimateGas.apply(null, gasArgs);

    const methodResult = contractInstance
      .methods[method](...methodArgs).send({from, gas: gasLimit});

    return {methodResult};
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch(error: any) {
    if(error.message.includes('User denied transaction')) {
      throw new Error('User denied transaction signature.');
    }
    else {
      throw new Error('Transaction not transmitted due to an error');
    }
  }
};

export const encodeMethod = (contractInstance, method, ...args) => {
  try {
    const methodArgs = args.length
      ? [...args]
      : [];

    return contractInstance.methods[method](...methodArgs).encodeABI();
  }
  catch(error) {
    throw new Error('Could not get encode method');
  }
};

export const getContractDeployData = (contractDefinition, ...args) => getDeployData(
  getContract(contractDefinition),
  contractDefinition.bytecode,
  ...args
);

const getContractInstance = (providerOptions, {abi}, address) => {
  const {Contract} = getWeb3(providerOptions, undefined, undefined, false).eth;

  return new Contract(abi, address);
};

export const getEvents = async (providerOptions, {
  contractAddress,
  abi,
  eventName = 'allEvents',
  fromBlock = 0,
  toBlock = 'latest'
}) => {
  const Contract = getContractInstance(providerOptions, {abi}, contractAddress);
  return await Contract.getPastEvents(eventName, {fromBlock, toBlock});
};

