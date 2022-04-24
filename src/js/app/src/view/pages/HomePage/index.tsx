/* eslint-disable max-len */
// import {useState, useEffect} from 'react';
// import {soliditySha3} from 'web3-utils';
import {
  // Button,
  Container
} from '@mui/material';
// eslint-disable-next-line import/no-named-as-default
import Router from '../../components/core/Router';
import Header from './Header';
// import useMinepunks from '../../../services/hooks/connections/useMinepunks';

// type FoundHash = {
//   difficulty: number;
//   nonce: number;
// };

// const countInitialZeros = (str: string) => {
//   let count = 0;

//   for(let i = 2; i < str.length; i++) {
//     if(str[i] === '0') {
//       count++;
//     }
//     else {
//       break;
//     }
//   }

//   return count;
// };

export const HomePage = () => {
  // const [currentNonce, setCurrentNonce] = useState(0);
  // const [currentDifficulty, setCurrentDifficulty] = useState(0);
  // const [foundHashes, setFoundHashes] = useState([] as Array<FoundHash>);
  // const [isMining, setIsMining] = useState(false);

  // const {mintFromNonce, myMinepunksMetadata} = useMinepunks(account);

  // const toggleMining = () => setIsMining(!isMining);

  // useEffect(() => {
  //   if(account) {
  //     const difficulty = countInitialZeros(
  //       soliditySha3(account, currentNonce) || ''
  //     );

  //     if(difficulty > currentDifficulty) {
  //       setCurrentDifficulty(difficulty);
  //       setFoundHashes(h => [{difficulty: currentDifficulty, nonce: currentNonce} as FoundHash, ...h]);
  //     }

  //     if(isMining && difficulty <= currentDifficulty) {
  //       setCurrentNonce(n => n + 1);
  //     }
  //   }
  // }, [
  //   currentNonce,
  //   isMining,
  //   currentDifficulty,
  //   account
  // ]);

  // eslint-disable-next-line no-console
  console.log();

  return (
    <Container maxWidth='xl'>
      <Header/>
      <Router />
    </Container>
  );
};
