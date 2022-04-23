/* eslint-disable no-mixed-operators */
import {useEffect} from 'react';
import {fromWei} from 'web3-utils';
import {constant} from '../../../common/fn';
import useSmartContract from './useSmartContract';

export default account => {
  const {smartContract, callContractMethod, getContractEvents} = useSmartContract();

  const loadMyMinepunks = () => {
    getContractEvents({
      contractInterface: 'Minepunks',
      eventName: 'Transfer'
    });
  };

  const getMintFromNonceResult = nonce => smartContract
    .get('callContractMethodResult')
    .safeGetIn(['Minepunks', `mintWithNonce${nonce}`])
    .matchWith({
      Success: ({data: contractResult}) => contractResult.matchWith({
        Tx: ({txResult}) => txResult.matchWith({
          Unsigned: constant('Unsigned'),
          Signed: constant('Signed'),
          Mined: constant('Mined'),
          Confirmed: constant('Confirmed'),
          Failure: constant('Failure')
        })
      }),
      Failure: err => JSON.stringify(err),
      Loading: constant('Loading'),
      Empty: constant('Empty')
    });

  const mintResult = smartContract
    .get('callContractMethodResult')
    .safeGetIn(['Minepunks', 'mint']);

  const mintFromNonce = nonce => {
    callContractMethod({
      contractInterface: 'Minepunks',
      method: 'mintWithNonce',
      args: [nonce],
      key: `mintWithNonce${nonce}`
    });
  };

  const mint = () => {
    callContractMethod({
      contractInterface: 'Minepunks',
      method: 'mint',
      args: [],
      key: 'mint'
    });
  };

  const raiseDifficulty = (tokenId, nonce) => {
    callContractMethod({
      contractInterface: 'Minepunks',
      method: 'raiseLevelWithNonce',
      args: [tokenId, nonce],
      key: `raiseDifficulty${tokenId}${nonce}`
    });
  };

  const getRaiseDifficultyResult = (tokenId, nonce) => smartContract
    .get('callContractMethodResult')
    .safeGetIn(['Minepunks', `raiseDifficulty${tokenId}${nonce}`]);

  const getTotalDifficulty = () => {
    const callMethod = () => callContractMethod({
      contractInterface: 'Minepunks',
      method: 'totalDifficulty',
      args: []
    });

    const totalDifficultyResult = smartContract
      .get('callContractMethodResult')
      .safeGetIn(['Minepunks', 'totalDifficulty']);

    return totalDifficultyResult
      .matchWith({
        Success: ({data: contractResult}) => contractResult.matchWith({
          Call: ({data}) => {
            const {result} = data;

            return result;
          }
        }),
        Failure: err => JSON.stringify(err),
        Loading: constant(0),
        Empty: () => {
          callMethod();
          return 0;
        }
      });
  };

  const loadMyMinepunksReult = smartContract
    .get('loadContractEventsResult')
    .safeGetIn(['Minepunks', 'Transfer']);

  const myMinepunksIds = loadMyMinepunksReult
    .mapPattern(
      'Success',
      [],
      ({data: contractEvents}) => {
        const mintTokens = contractEvents
          .toJS()
          .filter(
            ({returnValues}) => returnValues
              .from === '0x0000000000000000000000000000000000000000'
              && returnValues.to === account
          );

        return mintTokens.map(({returnValues}) => returnValues.tokenId);
      }
    );

  const myMinepunksMetadata = myMinepunksIds.map(tokenId => smartContract
    .get('callContractMethodResult')
    .safeGetIn(['Minepunks', `tokenMetadata${tokenId}`])
    .matchWith({
      Success: ({data: contractResult}) => contractResult.matchWith({
        Call: ({data}) => {
          const {result} = data;

          return {
            tokenId,
            difficulty: result.difficulty,
            firstOwner: result.firstOwner
          };
        }
      }),
      Failure: err => JSON.stringify(err),
      Loading: constant('Loading'),
      Empty: constant('Empty')
    }));

  useEffect(() => {
    myMinepunksIds.forEach(tokenId => {
      callContractMethod({
        contractInterface: 'Minepunks',
        method: 'tokenMetadata',
        args: [tokenId],
        key: `tokenMetadata${tokenId}`
      });

      callContractMethod({
        contractInterface: 'StakingV2',
        method: 'pendingReward',
        args: [tokenId],
        key: `pendingReward${tokenId}`
      });
    });
  }, [myMinepunksIds.join(',')]);

  useEffect(() => {
    callContractMethod({
      contractInterface: 'StakingV2',
      method: 'poolInfo'
    });

    callContractMethod({
      contractInterface: 'StakingV2',
      method: 'rewardPeriods',
      args: [0]
    });
  }, []);

  const getMinepunkPendingReward = tokenId => smartContract
    .get('callContractMethodResult')
    .safeGetIn(['StakingV2', `pendingReward${tokenId}`])
    .matchWith({
      Success: ({data: contractResult}) => contractResult.matchWith({
        Call: ({data}) => {
          const {result} = data;

          const decimal = fromWei(result);

          return decimal;
        }
      }),
      Failure: err => JSON.stringify(err),
      Loading: constant('Loading'),
      Empty: constant('Empty')
    });

  return {
    mintResult,
    getRaiseDifficultyResult,
    getMintFromNonceResult,
    getMinepunkPendingReward,
    mintFromNonce,
    mint,
    raiseDifficulty,
    myMinepunksMetadata,
    getTotalDifficulty,
    loadMyMinepunks
  };
};
