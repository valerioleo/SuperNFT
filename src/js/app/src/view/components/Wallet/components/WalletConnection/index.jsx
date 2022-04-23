import {useState} from 'react';
import {injected} from '../../services/connectors';
import useWeb3React from '../../services/hooks/useWeb3React';
import WalletModal from './WalletModal';

const withWalletConnection = WrappedComponent => props => {
  const [open, setOpen] = useState(false);

  const {activate} = useWeb3React();

  const openPanel = () => setOpen(true);
  const closePanel = () => setOpen(false);

  const hasMetaMask = window.ethereum?.isMetaMask;

  const onConnectMetaMask = () => {
    activate(injected, undefined, true)
      .then(() => {
        closePanel();
        // setItem(KEEP_METAMASK_ALIVE, true);
      })
      .catch(err => {
        if(err.message.includes('Unsupported chain id')) {
          // eslint-disable-next-line no-alert
          alert('Wrong network');
        }
      });
  };

  const handleConnection = () => {
    switch(true) {
      case hasMetaMask:
        return onConnectMetaMask();
      default:
        return openPanel();
    }
  };

  return (
    <>
      <WrappedComponent
        {...props}
        openPanel={() => {
          handleConnection();
        }}
      />
      <WalletModal
        open={open}
        onConnectMetaMask={onConnectMetaMask}
        onClose={closePanel}
        hasMetaMask={hasMetaMask}
      />
    </>
  );
};

export default withWalletConnection;
