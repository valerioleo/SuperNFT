// /* eslint-disable max-len */
import {useState, useEffect} from 'react';
// import {Helmet} from 'react-helmet-async';
import {soliditySha3} from 'web3-utils';
import {Box, Button} from '@mui/material';
import useMinepunks from '../../../services/hooks/connections/useMinepunks';
import {useWeb3React} from '../Wallet';
// import {constant} from '../../../common/fn';

// type FoundHash = {
//   difficulty: number;
//   nonce: number;
// };

const countInitialZeros = (str: string) => {
  let count = 0;

  for(let i = 2; i < str.length; i++) {
    if(str[i] === '0') {
      count++;
    }
    else {
      break;
    }
  }

  return count;
};

export const MyMinepunk = props => {
  const {
    tokenId,
    difficulty,
    raiseDifficulty,
    totalDifficulty
  } = props;

  const {getRaiseDifficultyResult, loadMyMinepunks, getMinepunkPendingReward} = useMinepunks(null);
  const [currentNonce, setCurrentNonce] = useState(0);
  const [currentDifficulty, setCurrentDifficulty] = useState(Number(difficulty));
  const [isMining, setIsMining] = useState(false);

  const {account} = useWeb3React();

  const raiseDifficultyResult = getRaiseDifficultyResult(tokenId, currentNonce);

  useEffect(() => {
    raiseDifficultyResult
      .mapPattern('Success', null, loadMyMinepunks);
  }, [raiseDifficultyResult]);

  useEffect(() => {
    if(account && isMining) {
      const newDifficulty = countInitialZeros(
        soliditySha3(account, Number(tokenId), Number(difficulty), currentNonce) || ''
      );

      if(newDifficulty > currentDifficulty) {
        setCurrentDifficulty(newDifficulty);
        setIsMining(false);
      }

      if(isMining && newDifficulty <= currentDifficulty) {
        setCurrentNonce(n => n + 1);
      }
    }
  }, [
    currentNonce,
    isMining,
    currentDifficulty,
    account
  ]);

  // eslint-disable-next-line no-mixed-operators
  const percentage = Math.floor(difficulty / totalDifficulty * 100);

  return (
    <Box key={tokenId} my={1} p={1} borderRadius={2} border='1px solid black'>
      TokenId: {tokenId} Difficulty: {difficulty} Share: {percentage}% Pending reward: {getMinepunkPendingReward(tokenId)} SPICE <Button variant='contained' size='small' color='primary' onClick={() => {
        setCurrentNonce(0);
        setIsMining(x => !x);
      }}>
          Raise Difficulty
      </Button>

      {currentNonce !== 0 && (
        <Button variant='contained' size='small' color='primary' onClick={() => {
          raiseDifficulty(tokenId, currentNonce);
        }}>
            Raise with nonce {currentNonce}
        </Button>
      )}
    </Box>
  );
};

export default MyMinepunk;
