import {Link} from 'react-router-dom';
import {Box, Typography} from '@mui/material';

const SuperSubscriptionLink = props => {
  const {serviceName, amount} = props;

  return (
    <Box
      display='inline-block'
      position='relative'
      bgcolor='yellow'
      width='360px'
      height='380px'
      m={4}
      mt={10}
    >
      <Box
        position='absolute'
        borderRadius={50}
        height={100}
        width={100}
        bgcolor='green'
        top={-50}
        left={130}
      >
        {serviceName} - {amount}$
      </Box>
      <Link to={serviceName}>
      </Link>
    </Box>
  );
};

// eslint-disable-next-line arrow-body-style
const SuperSubscriptions = () => {
  // const {account} = useWeb3React();

  return (
    <>
      <Box>
        <Typography fontWeight='bold' color='white' align='center' variant='h1'>Stream your subscription <br/> in real time</Typography>
        <Typography color='white' align='center' variant='h3'>Stream your subscription in real time</Typography>
      </Box>
      <Box overflow='scroll' whiteSpace='nowrap'>
        <SuperSubscriptionLink serviceName='Netflix' amount={9.99} />
        <SuperSubscriptionLink serviceName='Apple' amount={8.99} />
        <SuperSubscriptionLink serviceName='Spotify' amount={8.99} />
        <SuperSubscriptionLink serviceName='Hulu' amount={11.99} />
      </Box>
    </>
  );
};

export default SuperSubscriptions;
