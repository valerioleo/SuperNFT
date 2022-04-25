// import {Link} from 'react-router-dom';
import {useEffect} from 'react';
import {useWeb3React} from '@web3-react/core';
import {Box, Typography} from '@mui/material';
import useSuperSubscription from '../../../services/hooks/connections/useSuperSubscription';
import {subscriptions} from '../../../constants/subscriptions';
import spotify from './assets/spotify.svg';
import apple from './assets/apple.svg';
import hulu from './assets/amazon.svg';
import netflix from './assets/netflix.svg';
import AppleBackground from './assets/apple-tv.png';
import SpotifyBackground from './assets/spotify.png';
import HuluBackground from './assets/amazon.jpg';
import NetflixBackground from './assets/netflix.png';

const subscriptionReceivers = {
  amazon: '0xf9BeB989B62EaE2b763d6E59E142D73b4460e457',
  apple: '0x9664832C660f43a2CE6731b6d0842bb70A496B37',
  spotify: '0x9BD808647091B734F2e969Db41a752b6dc008B8d',
  netflix: '0x21dF4B9B4483ae97eBD857D7424358c2a4B4c717'
};

const SuperSubscriptionLink = props => {
  const {
    logo,
    background,
    price,
    image,
    description,
    recipient
  } = props;

  const {subscribe} = useSuperSubscription();

  return (
    <Box display='inline-block' m={4} mt={10}>
      <Box
        position='relative'
        width='360px'
        height='380px'
        borderRadius='48px'
        style={{
          background: `url(${background})`,
          backgroundSize: 'cover'
        }}
      >
        <Box
          position='absolute'
          borderRadius={50}
          height={100}
          width={100}
          top={-50}
          left={130}
          border='4px solid white'
          style={{
            backgroundImage: `url(${logo})`
          }}
        >
        </Box>

      </Box>
      <Box
        bgcolor='#0038FF'
        height='64px'
        borderRadius='165px'
        mt={4}
        color='white'
        fontWeight={600}
        textAlign='center'
        lineHeight='64px'
        fontSize='24px'
        position='relative'
        style={{
          cursor: 'pointer'
        }}
        onClick={() => subscribe({
          flowRate: price,
          image,
          description,
          recipient
        })}
      >
        <Box
          position='absolute'
          bgcolor='#FFF'
          borderRadius='50%'
          height={50}
          width={50}
          color='#0038FF'
          right='8px'
          top='8px'
          lineHeight='46px'
          fontSize='35px'
        >
          +
        </Box>
        Activate
      </Box>
    </Box>
  );
};

// eslint-disable-next-line arrow-body-style
const SuperSubscriptions = () => {
  // const {account} = useWeb3React();

  const {unsubscribe} = useSuperSubscription();
  const {account} = useWeb3React();

  useEffect(() => {
    if(account) {
      // listSubscriptions({sender: account});
      unsubscribe({recipient: '0x9664832C660f43a2CE6731b6d0842bb70A496B37', sender: account});
    }
  }, [account]);

  return (
    <>
      <Box py={15}>
        <Typography fontWeight='bold' color='white' align='center' variant='h1'>Stream your subscription <br/> in real time</Typography>
        <Typography color='white' align='center' variant='h3'>Collect dynamic NFT positions</Typography>
      </Box>
      <Box overflow='scroll' whiteSpace='nowrap'>
        <SuperSubscriptionLink
          serviceName='Netflix'
          logo={netflix}
          background={NetflixBackground}
          amount={8.99}
          price={subscriptions.netflix.price}
          description={subscriptions.netflix.description}
          image={subscriptions.netflix.image}
          recipient={subscriptions.netflix.recipient}
        />
        <SuperSubscriptionLink
          serviceName='Spotify'
          amount={8.99}
          logo={spotify}
          background={SpotifyBackground}
          recipient={subscriptionReceivers.spotify}
        />
        <SuperSubscriptionLink
          serviceName='Apple'
          logo={apple}
          background={AppleBackground}
          amount={8.99}
          price={subscriptions.apple.price}
          description={subscriptions.apple.description}
          image={subscriptions.apple.image}
          recipient={subscriptions.apple.recipient}
        />
        <SuperSubscriptionLink
          serviceName='Hulu'
          amount={11.99}
          logo={hulu}
          background={HuluBackground}
          recipient={subscriptionReceivers.amazon}
        />
      </Box>
    </>
  );
};

export default SuperSubscriptions;
