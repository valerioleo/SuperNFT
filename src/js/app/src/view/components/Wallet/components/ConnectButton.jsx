import {useState, useEffect} from 'react';
import jazzicon from '@metamask/jazzicon';
import {
  Box,
  Button,
  Typography,
  Menu,
  MenuItem
} from '@mui/material';
import {styled} from '@mui/material/styles';
import {makeStyles} from '@mui/styles';
import {ExpandMore} from '@mui/icons-material';
import {getBalance} from '../../../../eth-utils/core/v1/utils';
import {fromWei} from '../../../../eth-utils/core/v1';
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
    fontWeight: 700,
    color: '#ffffff',
    marginLeft: '15px'
  },
  accountBox: {
    backgroundColor: '#E202CF',
    padding: '0px 0px',
    borderRadius: '30px',
    display: 'flex',
    alignItems: 'center'
  },
  balanceBox: {
    backgroundColor: '#2400FF',
    padding: '0px 0px',
    borderRadius: '30px',
    display: 'flex',
    alignItems: 'center',
    marginRight: '-27px'
  },
  balance: {
    fontWeight: 700,
    color: '#ffffff',
    marginLeft: '15px',
    marginRight: '40px',
    padding: '6px'
  },
  jazziconContainer: {
    marginTop: '6px',
    marginRight: '6px',
    marginLeft: '5px'
  }
}));

const ConnectButton = styled(Button)(() => ({
  color: '#ffffff',
  backgroundColor: '#2400FF',
  '&:hover': {
    backgroundColor: '#2400FF'
  },
  borderRadius: '30px'
}));

const numberForAddress = address => {
  const addr = address.slice(2, 10);
  const seed = parseInt(addr, 16);
  return seed;
};

const CBConnectButton = props => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [balance, setBalance] = useState(0);

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

  const loadBalance = async () => {
    try {
      setBalance(await getBalance(undefined, account));
    }
    catch(e) {
      // Do nothing
    }
  };

  useEffect(() => {
    if(account) {
      loadBalance();
    }
  }, [account]);

  useEffect(() => {
    const containerElement = document.getElementById('jazzicon-container');
    if(containerElement) {
      const jazziconElement = jazzicon(25, numberForAddress(account));

      containerElement.innerHTML = '';
      jazziconElement.id = 'jazzicon-element';
      containerElement.appendChild(jazziconElement);
    }
  }, [account]);

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
            <Box className={classes.balanceBox}>
              <Typography
                variant='body1'
                color='textSecondary'
                className={classes.balance}
                data-test-id='wallet-ui::connected-wallet-address'
              >
                {Number(fromWei('ether', balance).toString()).toLocaleString()} ETH
              </Typography>
            </Box>
            <Box className={classes.accountBox}>
              <Typography
                variant='body1'
                color='textSecondary'
                className={classes.address}
                data-test-id='wallet-ui::connected-wallet-address'
              >
                {`${account.substring(0, 6)}...${account.substring(account.length - 4, account.length)}`}
              </Typography>
              <div id='jazzicon-container' className={classes.jazziconContainer}/>
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
        <ConnectButton
          type='green'
          variant='contained'
          onClick={openPanel}
          style={{height: 38, fontWeight: 'bold'}}
          data-test-id='wallet-ui::connect-button'
        >
          Connect Wallet
        </ConnectButton>
      )}
    </>
  );
};

export default withWalletConnection(CBConnectButton);
