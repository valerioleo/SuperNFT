import hre from 'hardhat';

export const batchTransactionsInBlock = async (ethersTransactions: any[]) => {
  await hre.network.provider.send('evm_setAutomine', [false]);
  const pendingTxs = await Promise
    .all(ethersTransactions.map(tx => tx()));

  await hre.network.provider.send('evm_mine');
  await hre.network.provider.send('evm_setAutomine', [true]);

  const receipts = Promise.all(pendingTxs.map(tx => tx.wait()));

  return receipts;
};
