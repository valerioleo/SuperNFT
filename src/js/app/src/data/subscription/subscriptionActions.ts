import {createAction} from 'redux-actions';
import {Framework} from '@superfluid-finance/sdk-core';
import {ethers} from 'ethers';
import SuperNft from './superNFT.json';
import CFAv1 from './cfav1.json';

export const SUBSCRIBE = 'SUPER_SUBSCRIPTION:SUBSCRIBE';

const subscribeService = async (
  recipient = '0x9664832C660f43a2CE6731b6d0842bb70A496B37',
  flowRate = '100'
) => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);

  const signer = provider.getSigner();

  const chainId = await (window as any).ethereum.request({method: 'eth_chainId'});
  const sf = await Framework.create({
    chainId: Number(chainId),
    provider
  });

  const {hostContract} = await sf.host;
  const DAIContract = await sf.loadSuperToken('fDAIx');
  const DAI = DAIContract.address;

  const cfav1Iface = new ethers.utils.Interface(CFAv1);
  const cfaCallEncoded = cfav1Iface.encodeFunctionData('createFlow', [
    DAI,
    recipient,
    flowRate,
    '0x'
  ]);
  const encodedCall = new ethers.utils.AbiCoder().encode(
    ['bytes', 'bytes'],
    [cfaCallEncoded, '0x']
  );

  const nftIface = new ethers.utils.Interface(SuperNft);
  const nftCallEncoded = nftIface.encodeFunctionData('mint', [
    '0xDA172dff49316843ef6FCd848F1fEDcDCa8A3E8c', // sender
    recipient, // recipient
    'Test 1',
    'https://gateway.pinata.cloud/ipfs/QmSFVita3DMzatzt6kJWxjAR5EytWjCCDJtAG3CSqK5ws4/netflix.svg',
    0,
    '0x745861AeD1EEe363b4AaA5F1994Be40b1e05Ff90', // fDAI
    '0x'
  ]);

  const args = ([
    {
      operationType: 201, // cfa call
      target: '0xF4C5310E51F6079F601a5fb7120bC72a70b96e2A', // cfa address
      data: encodedCall
    },
    {
      operationType: 202, // call app
      target: '0x76E19f21c23587C58CbAbB4052F3dC9265f52c60', // NFT address
      data: nftCallEncoded
    }
  ]);

  const result = hostContract.connect(signer).batchCall(args);

  return result;
};

// eslint-disable-next-line arrow-body-style
export const subscribe = ({recipient, flowRate}) => {
  return createAction(SUBSCRIBE)({
    async: subscribeService(recipient, flowRate)
  });
};
