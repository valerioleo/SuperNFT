import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Link,
  Typography,
  Button,
  Icon
} from '@mui/material';

const ConnectWallet = props => {
  const {
    isMetaMask,
    icon,
    classes,
    walletName,
    description,
    buttonText,
    onConnect,
    bottomText,
    linkText,
    linkHref,
    hasMetaMask
  } = props;

  const onDownloadMetaMask = () => {
    window.open('https://metamask.io/download.html', '_blank');
  };

  return (
    <Box
      p={3}
      pb={4.5}
      flexGrow='1'
      display='flex'
      flexDirection='column'
      alignItems='center'
    >
      <Box mb={3}>
        <img src={icon} alt='icon' />
      </Box>
      <Box mb={2}>
        <Typography variant='h5'>{walletName}</Typography>
      </Box>
      <Box mb={4}>
        <Typography variant='body1' className={classes.description}>
          {description}
        </Typography>
      </Box>
      <Box mb={2}>
        {isMetaMask && !hasMetaMask && (
          <Button
            type='black'
            classes={{root: classes.button}}
            onClick={onDownloadMetaMask}
          >
            Download metamsk
          </Button>
        )}
        {!(isMetaMask && !hasMetaMask) && (
          <Button
            data-test-id={`wallet-ui::connect-button-${
              isMetaMask ? 'metamask' : 'walletconnect'
            }`}
            type='black'
            classes={{root: classes.button}}
            onClick={onConnect}
          >
            {buttonText}
          </Button>
        )}
      </Box>
      <Box>
        {linkText && (
          <Typography className={classes.linkText}>
            {bottomText}
            <Link href={linkHref} target='_blank'>
              {linkText}
            </Link>
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const WalletModal = props => {
  const {
    open, onConnectMetaMask, onClose, hasMetaMask
  } = props;

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>
        <Box display='flex' justifyContent='flex-end'>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            onClick={onClose}
          >
            <Icon>
              <img alt='closeIcon' />
            </Icon>
          </Box>
        </Box>
        <Box display='flex' alignItems='center' justifyContent='center'>
          <Typography variant='h3'>Modal title</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box display='flex' mb={4.5}>
          <Box width={1 / 2} mt={2}>
            <ConnectWallet
              isMetaMask={true}
              walletName={'Metamask'}
              description={'Metamask'}
              buttonText={'Connect'}
              onConnect={onConnectMetaMask}
              hasMetaMask={hasMetaMask}
            />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default WalletModal;
