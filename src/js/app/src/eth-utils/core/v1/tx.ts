/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-promise-executor-return */
/* eslint-disable no-underscore-dangle */
import ethUtil from 'ethereumjs-util';
import {Transaction} from 'ethereumjs-tx';
import Common from 'ethereumjs-common';
import {getWeb3} from './web3';
import {toHex} from './utils';

export const sendAsync = web3 => tx => new Promise((resolve, reject) => {
  web3.currentProvider.sendAsync(tx, (error, result) => {
    if(error) reject(error);

    resolve(result);
  });
});

export const once = (event, tx) => new Promise((resolve, reject) => tx
  .once(event, resolve)
  .on('error', reject));

export const on = (event, tx) => new Promise((resolve, reject) => tx
  .on(event, resolve)
  .on('error', reject));

export const privateToAddress = privKey => {
  const addressBuffer = ethUtil.privateToAddress(ethUtil.toBuffer(privKey));
  return `0x${addressBuffer.toString('hex')}`;
};

export const providerSendTransaction = async (providerOptions, from, tx) => {
  const web3 = getWeb3(providerOptions);

  return sendAsync(web3)({
    method: 'eth_sendTransaction',
    from,
    params: [tx]
  });
};

export const signTransaction = async (
  providerOptions,
  privKey,
  nonce,
  to,
  value,
  data,
  gasLimit,
  gasPrice
) => {
  // tx.js is used by the front as well and this line causes it to fails; so we add it here
  const privateKey = Buffer.from(privKey, 'hex');
  const txParams = {
    nonce: toHex(nonce),
    gasPrice: toHex(gasPrice),
    gasLimit: toHex(gasLimit),
    to,
    value: toHex(value),
    data
  };

  const {
    networkId = Number(process.env.REACT_APP_NETWORK_ID),
    chainId = Number(process.env.REACT_APP_CHAIN_ID)
  } = providerOptions;

  const customCommon = Common.forCustomChain(
    'mainnet',
    {
      name: 'my-network',
      networkId,
      chainId
    },
    'petersburg'
  );

  const tx = new Transaction(txParams, {common: customCommon});
  tx.sign(privateKey);

  return tx.serialize();
};

export const getAccountNonce = async (
  providerOptions,
  address
) => await getWeb3(providerOptions).eth.getTransactionCount(address);

export const estimateGas = async (method?, from?, ...params) => await method(...params)
  .estimateGas({from});

export const getCurrentGasPrice = async providerOptions => {
  try {
    return await getWeb3(providerOptions).eth.getGasPrice();
  }
  catch(error: any) {
    throw Error(`Error running getCurrentGasPrice due to ${error.message}`);
  }
};

export const getData = (method, ...params) => method(...params).encodeABI();

export const sendRawTransaction = async (
  providerOptions,
  serializedTx,
  // eslint-disable-next-line default-param-last
  waitForReceipt = false,
  promiseEventHandler?
) => {
  if(waitForReceipt) {
    return await getWeb3(providerOptions)
      .eth
      .sendSignedTransaction(
        ethUtil.addHexPrefix(serializedTx.toString('hex'))
      );
  }

  if(!promiseEventHandler) {
    return await once(
      'transactionHash',
      getWeb3(providerOptions)
        .eth
        .sendSignedTransaction(
          ethUtil.addHexPrefix(serializedTx.toString('hex'))
        )
    );
  }

  return getWeb3(providerOptions)
    .eth
    .sendSignedTransaction(
      ethUtil.addHexPrefix(serializedTx.toString('hex'))
    )
    .once('transactionHash', promiseEventHandler.onTxHash)
    .once('receipt', promiseEventHandler.onReceipt);
};

export const getBlock = async (
  providerOptions,
  blockNumber
) => await getWeb3(providerOptions).eth.getBlock(blockNumber);

export const getDeployData = (Contract, bytecode, ...args) => Contract
  .deploy({
    data: bytecode,
    arguments: args
  })
  .encodeABI();

export const estimateDeployGas = async (contract, data, from, args) => await contract
  .deploy({data, arguments: args}).estimateGas({from});

export const sendTransaction = (providerOptions, params) => {
  const send = getWeb3(providerOptions).eth.sendTransaction;
  return send(params);
};

export const waitForTxConfirmations = (providerOptions, txHash, confirmations = 12) => {
  const web3 = getWeb3(providerOptions);
  const filter = web3.eth.filter('latest');
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line consistent-return
    const subscription = filter.watch(error => {
      if(!error) {
        const confirmedBlock = web3.eth.getBlock(web3.eth.blockNumber - confirmations);
        // eslint-disable-next-line no-undef
        const found = confirmedBlock.transactions.find(txId => txId === txHash);
        if(found) {
          subscription.stopWatching();
          return resolve(found);
        }
        reject();
      }
    });
  });
};

export const getTransaction = (
  providerOptions,
  txHash
) => getWeb3(providerOptions).eth.getTransaction(txHash);
export const getTransactionReceipt = (
  providerOptions,
  txHash
) => getWeb3(providerOptions).eth.getTransactionReceipt(txHash);

export const getTransactionReceiptMined = (
  providerOptions,
  txHash
) => new Promise((resolve, reject) => {
  const transactionReceiptAsync = async (res, rej) => {
    const receipt = await getTransactionReceipt(providerOptions, txHash);
    if(receipt === null) {
      setTimeout(() => transactionReceiptAsync(res, rej), 500);
    }
    else {
      resolve(receipt);
    }
  };
  transactionReceiptAsync(resolve, reject);
});

export const signAndSendTxRoot = waitForReceipt => async (
  providerOptions,
  contractAddress,
  method,
  privKey,
  value,
  ...args
) => {
  try {
    const from = privateToAddress(`0x${privKey}`);
    const gasPrice = await getCurrentGasPrice(providerOptions);
    const gasLimit = await estimateGas(method, from, ...args);
    const inputData = getData(method, ...args);
    const nonce = await getAccountNonce(providerOptions, from);
    const methodRawTransaction = await signTransaction(
      providerOptions,
      privKey,
      nonce,
      contractAddress,
      value,
      inputData,
      gasLimit,
      gasPrice
    );

    return await sendRawTransaction(providerOptions, methodRawTransaction, waitForReceipt);
  }
  catch(error: any) {
    throw Error(`signAndSendAndTx failed: ${error.message}`);
  }
};

export const getTransactionData = async (providerOptions, {
  from,
  method = 'constructor',
  contractInstance,
  args,
  inputData = getData(contractInstance.methods[method], ...args),
  value = 0
}) => {
  try {
    const gasPrice = await getCurrentGasPrice(providerOptions);
    const gasLimit = method === 'constructor'
      ? await estimateDeployGas(contractInstance, inputData, from, args)
      : await estimateGas(contractInstance.methods[method], from, ...args);

    const nonce = await getAccountNonce(providerOptions, from);

    return {
      from,
      gasPrice: Number(gasPrice),
      gasLimit,
      inputData,
      nonce,
      to: contractInstance._address || undefined,
      value
    };
  }
  catch(error: any) {
    throw Error(`Error getting transaction data: ${error.message}`);
  }
};

