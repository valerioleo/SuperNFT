/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
import {createAction} from 'redux-actions';
import {Framework} from '@superfluid-finance/sdk-core';
import {ethers} from 'ethers';
import SuperNft from './superNFT.json';
import CFAv1 from './cfav1.json';

export const SUBSCRIBE = 'SUPER_SUBSCRIPTION:SUBSCRIBE';
export const LIST_SUBSCRIPTIONS = 'SUPER_SUBSCRIPTION:LIST_SUBSCRIPTIONS';

const getSuperFluid = async () => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);

  const signer = provider.getSigner();

  const chainId = await (window as any).ethereum.request({method: 'eth_chainId'});
  const sf = await Framework.create({
    chainId: Number(chainId),
    provider
  });

  return {
    superfluid: sf,
    signer
  };
};

const unsubscribeService = async (
  sender,
  recipient = '0x9664832C660f43a2CE6731b6d0842bb70A496B37'
) => {
  const {superfluid} = await getSuperFluid();

  const DAIContract = await superfluid.loadSuperToken('fDAIx');
  const DAI = DAIContract.address;

  const res = await superfluid.cfaV1.deleteFlow({
    sender,
    receiver: recipient,
    superToken: DAI
    // userData?: string
  });

  return res;
};

const subscribeService = async (
  recipient,
  flowRate,
  description,
  image
) => {
  const {superfluid, signer} = await getSuperFluid();

  const {hostContract} = await superfluid.host;
  const DAIContract = await superfluid.loadSuperToken('fDAIx');
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
    description,
    image,
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
      target: '0x9271bbc0175b1c73c3fcae8ad2385844083910ed', // NFT address
      data: nftCallEncoded
    }
  ]);

  const result = hostContract.connect(signer).batchCall(args);

  return result;
};

const fetchSubscriptionsService = async sender => {
  const {superfluid} = await getSuperFluid();

  const pageResult = await superfluid.query.listStreams(
    {sender},
    {take: 10}
  );

  console.log(pageResult);
};

export const subscribe = ({
  recipient, flowRate, image, description
}) => {
  return createAction(SUBSCRIBE)({
    async: subscribeService(recipient, flowRate, description, image)
  });
};

export const unsubscribe = ({sender, recipient}) => {
  return createAction(SUBSCRIBE)({
    async: unsubscribeService(sender, recipient)
  });
};

export const listSubscriptions = ({sender}) => {
  return createAction(LIST_SUBSCRIPTIONS)({
    async: fetchSubscriptionsService(sender)
  });
};
