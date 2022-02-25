import { Button, Modal } from 'react-bootstrap';
import MetamaskImg from '../../assets/images/w1.svg'
import TrustWalletImg from '../../assets/images/w2.svg'

export default function WalletConnectModal({ open, hideModal, onConnectMetamask, onConnectWalletConnector }) {

  return (
    <Modal show={open} onHide={hideModal}>
      <Modal.Body className="pt-5 pb-5">
        <div className="text-center p-2">
          <Button
            variant="secondary"
            className="w-100 background-transparent color-black btn-wallet mb-2"
            onClick={onConnectMetamask}
            style={{ borderColor: '#ddd' }}
          >
            <div className="metamask text-center">
              <img className="metamask-img my-2" src={MetamaskImg} alt="img" width={'50px'} />
              <p className="metamask-title Tanker">MetaMask</p>
              <p className="metamask-txt Tanker">Connect to MetaMask Wallet</p>
            </div>
          </Button>
          <Button
            variant="secondary"
            className="w-100 background-transparent color-black btn-wallet"
            onClick={onConnectWalletConnector}
            style={{ borderColor: '#ddd' }}
          >
            <div className="walletconnect text-center">
              <img className="walletconnect-img my-2" src={TrustWalletImg} alt="img" width={'50px'} />
              <p className="walletconnect-title Tanker">WalletConnect</p>
              <p className="walletconnect-txt Tanker"> Scan and Connect to Trust Wallet</p>
            </div>
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}