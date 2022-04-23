import {Link} from 'react-router-dom';
import {Box} from '@mui/material';

const SuperSubscriptionLink = props => {
  const {serviceName, amount} = props;

  return (
    <Link to={serviceName}>
      <Box>
        {serviceName} - {amount}$
      </Box>
    </Link>
  );
};

// eslint-disable-next-line arrow-body-style
const SuperSubscriptions = () => {
  // const {account} = useWeb3React();

  return (
    <Box>
      <SuperSubscriptionLink serviceName='Netflix' amount={9.99} />
      <SuperSubscriptionLink serviceName='Apple' amount={8.99} />
      <SuperSubscriptionLink serviceName='Hulu' amount={11.99} />
    </Box>
  );
};

export default SuperSubscriptions;
