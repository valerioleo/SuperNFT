import {ContractResult} from '../../common/data/ContractResult';
import {propIn} from '../../common/fn';
import {getDefaultAccount} from '../core/v1/address';
import {getWeb3} from '../core/v1/web3';
import {sendTransaction} from './Contract';

const createContractResult = (stateMutability, result, outputs, args) => {
  if(stateMutability === 'view') {
    const data = {
      result,
      args
    };

    return ContractResult.Call(data);
  }

  return ContractResult.Tx(result);
};

export const getContractInstance = (abi, contractAddress, providerOptions) => {
  const web3 = getWeb3(providerOptions);
  return new web3.eth.Contract(abi, contractAddress);
};

export const getPastEvents = async (contractInstance, eventName, eventOpts) => {
  const events = await contractInstance.getPastEvents(eventName, eventOpts);

  return events;
};

const callContractMethod = async (contractInstance, method, ...args) => {
  const {defaultAccount: from} = await getDefaultAccount();

  const methodArgs = args.length
    ? [...args]
    : [];

  const methodResult = await contractInstance
    .methods[method](...methodArgs).call({from});
  return {methodResult};
};

const getSmartContractMethodFactory = stateMutability => stateMutability === 'view'
  ? callContractMethod
  : sendTransaction;

const getAbiFromContractInstance = propIn(['options', 'jsonInterface'], undefined);

export const executeSmartContractMethod = async (
  contractInstance,
  method,
  ...args
) => {
  const {
    outputs,
    stateMutability
  } = getAbiFromContractInstance(contractInstance).find(({name}) => name === method);
  const executeMethod = getSmartContractMethodFactory(stateMutability);
  try {
    const {methodResult: result} = await executeMethod(contractInstance, method, ...args);
    return createContractResult(stateMutability, result, outputs, args);
  }
  catch(e) {
    // eslint-disable-next-line no-console
    console.log(e);
    throw e;
  }
};

