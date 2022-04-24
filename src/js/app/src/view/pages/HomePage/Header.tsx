/* eslint-disable max-len */
import {Grid, Typography} from '@mui/material';
import {ConnectButton} from '../../components/Wallet';
import Logo from '../../assets/logo.svg';

const Header = () => (
  <Grid
    container
    py={5}
    alignItems='center'
    justifyContent='space-between'
  >
    <Grid item container alignItems='center' xs={3}>
      <img src={Logo} style={{width: '30px', height: '30px', margin: '5px 10px'}}/>
      <Typography variant='h4' color='white' fontWeight='bold'>SuperNFT</Typography>
    </Grid>
    <Grid item container alignItems='center' justifyContent='flex-end' xs={6}>
      <ConnectButton />
    </Grid>

  </Grid>
);

export default Header;
