import {noop} from '../common/fn';

// eslint-disable-next-line import/prefer-default-export
export const sendTxAndWait = (
  web3,
  contract,
  method,
  params,
  from,
  onTxHash = noop
) => new Promise((resolve, reject) => {
  const poll = txHash => async () => {
    try {
      const receipt = await web3.eth.getTransactionReceipt(txHash);

      if(!receipt) {
        setTimeout(poll(txHash), 1000);

        return;
      }

      resolve(receipt);
    }
    catch(error) {
      reject(error);
    }
  };

  contract.methods[method](...params).send({from}, (err, txHash) => {
    if(err) {
      reject(err);

      return;
    }

    onTxHash(txHash);
    setTimeout(poll(txHash), 1000);
  });
});
