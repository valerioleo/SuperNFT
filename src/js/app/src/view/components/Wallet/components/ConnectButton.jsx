import {useState} from 'react';
import {
  Box,
  Button,
  Typography,
  Menu,
  MenuItem
} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {ExpandMore} from '@mui/icons-material';
import useWeb3React from '../services/hooks/useWeb3React';
import {useEagerConnect} from '../services/hooks';
import withWalletConnection from './WalletConnection';

const useStyles = makeStyles(() => ({
  walletButton: {
    cursor: 'pointer'
  },
  dropdown: {
    marginTop: 8
  },
  address: {
    fontWeight: 700
  }
}));

const CBConnectButton = props => {
  const [anchorEl, setAnchorEl] = useState(null);

  const {openPanel} = props;

  useEagerConnect();

  const {active, account, deactivate} = useWeb3React();

  const classes = useStyles();

  const handleClose = () => setAnchorEl(null);

  const handleClick = event => setAnchorEl(event.currentTarget);

  const handleDisconnect = () => {
    deactivate();
    // removeItem('walletconnect');
    // removeItem(KEEP_METAMASK_ALIVE);
    handleClose();
  };

  const usesWallet = true;

  return (
    <>
      {active && usesWallet && (
        <>
          <Box
            display='flex'
            alignItems='center'
            onClick={handleClick}
            className={classes.walletButton}
          >
            <Box>
              <Typography
                variant='body1'
                color='textSecondary'
                className={classes.address}
                data-test-id='wallet-ui::connected-wallet-address'
              >
                {account}
              </Typography>
            </Box>
            <Box>
              <ExpandMore />
            </Box>
          </Box>
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            className={classes.dropdown}
          >
            <MenuItem
              data-test-id='wallet-ui::disconnect-button'
              onClick={handleDisconnect}
            >
              Disconnect
            </MenuItem>
          </Menu>
        </>
      )}
      {(!active || !usesWallet) && (
        <Button
          type='green'
          onClick={openPanel}
          style={{height: 38}}
          data-test-id='wallet-ui::connect-button'
        >
          Connect
        </Button>
      )}
    </>
  );
};

export default withWalletConnection(CBConnectButton);
