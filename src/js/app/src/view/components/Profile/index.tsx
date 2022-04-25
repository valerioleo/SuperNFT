// import {Link} from 'react-router-dom';
import {useWeb3React} from '@web3-react/core';
import {Box, Grid, Typography} from '@mui/material';
import useSuperSubscription from '../../../services/hooks/connections/useSuperSubscription';
import spotify from './assets/spotify.svg';
import apple from './assets/apple.svg';
import hulu from './assets/amazon.svg';
import netflix from './assets/netflix.svg';
import poweredBy from './assets/powered_by.png';
import Switch from './switch';
import { useEffect } from 'react';

const NFTCard = () => (
  <Box display='inline-block' m={1} mt={1}>
    <Box
      position='relative'
      width='360px'
      height='380px'
      borderRadius='48px'
      style={{
        // background: `url(${background})`,
        // backgroundSize: 'cover'
        backgroundColor: 'gray'
      }}
    >
    </Box>
  </Box>
);

const renderToggleRow = (name, img) => (
  <Grid container xs={12} style={{height: '50px'}} alignContent='center'>
    <Grid container item xs={1}>
      <img src={img} style={{width: '30px', height: '30px', borderRadius: '50%'}}/>
    </Grid>
    <Grid container item xs={4}>
      <Typography variant='h5' style={{color: '#ffffff', textAlign: 'center'}}>{name}</Typography>
    </Grid>
    <Grid container item xs={4} alignContent='center' style={{marginTop: '-8px'}}>
      <Switch/>
    </Grid>
  </Grid>
);

// eslint-disable-next-line arrow-body-style
const SuperSubscriptions = () => {
  const {account} = useWeb3React();

  const {listSubscriptions, subscription} = useSuperSubscription();

  const listSubscriptionsResult = subscription
    .get('listSubscriptionsResult');

  useEffect(() => {
    if(account) {
      listSubscriptions(account);
    }
  }, [account]);

  return (
    <Grid container xs={12} style={{marginTop: '130px'}}>
      <Grid container xs={5} direction='column' justifyContent='flex-start'>
        <Grid item style={{height: '100px'}}>
          <Typography variant='h4' style={{color: '#ffffff', fontWeight: 'bold'}}>
            Bradley Cooper
          </Typography>
          <Typography style={{color: 'gray'}}>
            Subscription
          </Typography>
        </Grid>
        <Grid container item>
          {renderToggleRow('Netflix', netflix)}
          {renderToggleRow('Spotify', spotify)}
          {renderToggleRow('Apple Plus', apple)}
          {renderToggleRow('Hulu Plus', hulu)}
        </Grid>
        <Grid item style={{height: '100px', marginTop: '50px'}}>
          <Typography style={{color: 'gray'}}>
            Powered by
          </Typography>
          <img src={poweredBy} style={{height: '30px'}}/>
        </Grid>

      </Grid>
      <Grid container item xs={7} justifyContent='flex-end'>
        <NFTCard />
        <NFTCard />
        <NFTCard />
        <NFTCard />
      </Grid>
    </Grid>
  );
};

export default SuperSubscriptions;
