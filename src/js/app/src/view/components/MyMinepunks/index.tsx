// /* eslint-disable max-len */
// import {useState, useEffect} from 'react';
// import {Helmet} from 'react-helmet-async';
import {useEffect} from 'react';
import {Button, Typography} from '@mui/material';
import {useWeb3React} from '../Wallet';
import {constant} from '../../../common/fn';
import useMinepunks from '../../../services/hooks/connections/useMinepunks';
import Minepunk from './Minepunk';

// type FoundHash = {
//   difficulty: number;
//   nonce: number;
// };

export const MyMinepunks = () => {
  const {account} = useWeb3React();
  const {
    mintResult,
    mint,
    myMinepunksMetadata,
    raiseDifficulty,
    getTotalDifficulty,
    loadMyMinepunks
  } = useMinepunks(account);

  useEffect(() => {
    mintResult
      .mapPattern('Success', null, loadMyMinepunks);
  }, [mintResult]);

  useEffect(() => {
    loadMyMinepunks();
  }, []);

  const mintResultString = mintResult
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

  return (
    <>
      <div>
        <Typography>
          Total difficulty: {getTotalDifficulty()}
        </Typography>
        {myMinepunksMetadata
          .map(data => data && <Minepunk
            key={data.tokenId}
            totalDifficulty={getTotalDifficulty()}
            raiseDifficulty={raiseDifficulty}
            {...data}
          />)}
      </div>
      <Button variant='outlined' color='primary' onClick={mint}>
            Mint new Minepunk: {mintResultString}
      </Button>
    </>
  );
};

export default MyMinepunks;
