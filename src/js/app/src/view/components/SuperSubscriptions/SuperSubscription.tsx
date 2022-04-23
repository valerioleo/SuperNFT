import {Link, useParams} from 'react-router-dom';
import {useWeb3React} from '@web3-react/core';
import {Box, Button} from '@mui/material';
import useSuperSubscription from '../../../services/hooks/connections/useSuperSubscription';
import {constant} from '../../../common/fn';

const SuperSubscription = () => {
  const {subscribe, subscription} = useSuperSubscription();
  const {subscriptionName} = useParams<{subscriptionName: string}>();
  const {account} = useWeb3React();

  const subscribeResult = subscription
    .get('subscribeResult')
    .matchWith({
      Success: constant('Success'),
      Failure: constant('Failure'),
      Empty: constant('Empty'),
      Loading: constant('Loading')
    });

  return (
    <>
      <Link to='/'>Go back</Link>
      <Box my={1} p={1} borderRadius={2} border='1px solid black'>
        {subscriptionName}
        <Button onClick={() => subscribe({})} disabled={!account}>
          {account ? 'Subscribe' : 'Connect to wallet'}
        </Button>
        {subscribeResult}
      </Box>
    </>
  );
};

export default SuperSubscription;
