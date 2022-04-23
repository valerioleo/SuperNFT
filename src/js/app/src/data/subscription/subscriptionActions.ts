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

  try {
    const createFlowOperation = sf.cfaV1.createFlow({
      receiver: recipient,
      flowRate,
      superToken: DAI
      // userData?: string
    });

    console.log('Creating your stream...');

    const result = await createFlowOperation.exec(signer);
    console.log(result);

    console.log(
      `Congrats - you've just created a money stream!
    View Your Stream At: https://app.superfluid.finance/dashboard/${recipient}
    Network: Kovan
    Super Token: DAIx
    Sender: 0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721
    Receiver: ${recipient},
    FlowRate: ${flowRate}
    `
    );
  }
  catch(error) {
    console.log(
      'Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you\'ve entered a valid Ethereum address!'
    );
    console.error(error);
  }
};

// eslint-disable-next-line arrow-body-style
export const subscribe = ({recipient, flowRate}) => {
  return createAction(SUBSCRIBE)({
    async: subscribeService(recipient, flowRate)
  });
};
