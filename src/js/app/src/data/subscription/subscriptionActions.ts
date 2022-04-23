import {createAction} from 'redux-actions';
import {Framework} from '@superfluid-finance/sdk-core';
import {ethers} from 'ethers';

export const SUBSCRIBE = 'SUPER_SUBSCRIPTION:SUBSCRIBE';

const subscribeService = async (
  recipient = '0xf945789d494fbb3c859478dcb7c86493f31a5dd4',
  flowRate = '100'
) => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);

  const signer = provider.getSigner();

  const chainId = await (window as any).ethereum.request({method: 'eth_chainId'});
  const sf = await Framework.create({
    chainId: Number(chainId),
    provider
  });

  const DAIContract = await sf.loadSuperToken('fDAIx');
  const DAI = DAIContract.address;

  const createFlowOperation = sf.cfaV1.createFlow({
    receiver: recipient,
    flowRate,
    superToken: DAI
    // userData?: string
  });

  const result = await createFlowOperation.exec(signer);

  return result;
};

// eslint-disable-next-line arrow-body-style
export const subscribe = ({recipient, flowRate}) => {
  return createAction(SUBSCRIBE)({
    async: subscribeService(recipient, flowRate)
  });
};
