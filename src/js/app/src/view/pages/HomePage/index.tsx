/* eslint-disable max-len */
// import {useState, useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
// import {soliditySha3} from 'web3-utils';
import {
  // Button,
  Container,
  Grid
  // Stack
} from '@mui/material';
import {ConnectButton} from '../../components/Wallet';
// eslint-disable-next-line import/no-named-as-default
import MyMinepunks from '../../components/MyMinepunks';
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
  // const {account} = useWeb3React();

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
    <Container maxWidth='lg'>
      <Helmet>
        <title>Home Page</title>
        <meta name='description' content='A Boilerplate application homepage' />
      </Helmet>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <span>Minepunks</span>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ConnectButton />
        </Grid>
      </Grid>

      <br />
      <MyMinepunks />
    </Container>
  );
};
