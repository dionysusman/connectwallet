import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './component/Header/Header';
import Footer from './component/Footer/Footer';
import Landing from './pages/Landing/Landing';
import MyCollections from './pages/MyCollections/MyCollections';
import MarketPlace from './pages/Marketplace/MarketPlace';
import TokenDetail from './pages/TokenDetail/TokenDetail';
import UserCollections from './pages/UserCollections/UserCollections'
import MintModal from './component/Modal/MintModal';
import WalletConnectModal from './component/Modal/walletConnectModal';
import Terms from './pages/Terms/Terms';
import MyAccount from './pages/MyAccount/MyAccount';

import {
  REMOVE_TOGGLE_STICKY,
  SET_TOGGLE_STICKY,
  SET_WALLET_ADDRESS,
  SET_CONNECTED,
  SET_ACCOUNT_BALANCE,
  SET_TOKEN_PRICE,
  SET_CHAIN_ID
} from "./redux/types";
import { connectUser } from './redux/actions'
import { getBalance, getContract } from './utils/contract';
import './App.css';
import { injected, walletconnect } from './utils/Connector';

function App() {

  const dispatch = useDispatch();
  const { activate, account, chainId, active, deactivate } = useWeb3React();

  const { toggle_sticky, pending } = useSelector(state => state.connect);
  const [openMint, setOpenMint] = useState(false)
  const [openConnect, setOpenConnect] = useState(false)

  // useEffect(() => {
  //   const getAccount = async () => {
  //     const chain = await window.ethereum.request({ method: 'eth_chainId' })
  //     const addressArray = await window.ethereum.request({
  //       method: "eth_accounts",
  //     })
  //     if (addressArray.length > 0 && String(chain) !== '') {
  //       connectWallet()
  //     }
  //   }
  //   getAccount()
  // }, [])

  useEffect(() => {
    if (account !== undefined && account !== null && account !== "") {
      if (chainId === 56 || chainId === 1) {
        connectWallet();
      } else {
        toast.warn("Please connect with Ethereum or Binance Smart Chain");
      }
    }
  }, [account])

  const handleToggleSticky = (e) => {
    if (e.target.checked) {
      dispatch({
        type: SET_TOGGLE_STICKY
      })
    } else {
      dispatch({
        type: REMOVE_TOGGLE_STICKY
      })
    }
  }

  const connectMetamask = async () => {
    try {
      await activate(injected);
    } catch (err) {
      console.log(err)
    }
  }

  const connectWalletConnector = async () => {
    try {
      await activate(walletconnect);
    } catch (err) {
      console.log(err)
    }
  }

  async function disconnect() {
    try {
      deactivate();
      dispatch({
        type: SET_WALLET_ADDRESS,
        payload: null
      });
      dispatch({
        type: SET_CONNECTED,
        payload: active
      })
    } catch (err) {
      console.log(err);
    }
  }

  const connectWallet = async () => {
    dispatch({
      type: SET_CHAIN_ID,
      payload: chainId
    })
    dispatch({
      type: SET_WALLET_ADDRESS,
      payload: account
    })

    let userBalance = getBalance(account);
    userBalance = `${String(userBalance)}${chainId === 56 ? " BNB" : " ETH"}`;
    dispatch({
      type: SET_ACCOUNT_BALANCE,
      payload: userBalance
    })

    // const data = {
    //   address: account
    // }
    // dispatch(connectUser(data))

    const nftContract = getContract(chainId);
    let nftPrice = await nftContract.methods.tokenPrice().call();
    nftPrice = parseFloat(nftPrice / Math.pow(10, 18)).toFixed(4).toString();
    dispatch({
      type: SET_TOKEN_PRICE,
      payload: nftPrice
    })
    dispatch({
      type: SET_CONNECTED,
      payload: active
    })
  }

  return (
    <Router>
      <div className="App position-relative">
        {
          pending && <div className="mask"></div>
        }
        {
          openConnect && (
            <WalletConnectModal
              open={openConnect}
              hideModal={() => setOpenConnect(false)}
              onConnectMetamask={connectMetamask}
              onConnectWalletConnector={connectWalletConnector}
            />
          )
        }
        <Header
          connectWallet={() => setOpenConnect(true)}
          onMintNFT={() => setOpenMint(true)}
          disconnectWallet={disconnect}
        />
        {
          pending && <div
            style={{
              position: 'absolute',
              width: "100%",
              height: "100%",
              minHeight: "600px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Loader type="ThreeDots" color="green" height="100" width="100" />
          </div>
        }
        <Switch>

          <Route exact path="/" component={() =>
            <Landing
              handleConnect={() => setOpenConnect(true)}
              handleDisconnect={disconnect}
              handleMint={() => setOpenMint(true)}
            />
          } />

          <Route exact path="/mygolfpunks" component={() =>
            <MyCollections />
          } />

          <Route exact path="/marketplace" component={() => <MarketPlace handleExit={disconnect} />} />

          <Route exact path="/assets/:net/:contractAddress/:tokenId" component={TokenDetail} />

          <Route exact path="/users/:address" component={UserCollections} />

          <Route exact path="/terms" component={Terms} />

          <Route exact path="/account" component={MyAccount} />

        </Switch>

        <Footer
          openConnectMetaMaskModal={() => setOpenConnect(true)}
          onMintNFT={() => setOpenMint(true)}
          disconnectWallet={disconnect}
        />

        <div className="switch">
          <label>
            <input type="checkbox" checked={toggle_sticky} onChange={handleToggleSticky} />  - Toggle Sticky
          </label>
        </div>

        <ToastContainer theme='dark' />
        {
          openMint && <MintModal openModal={openMint} hideModal={() => setOpenMint(false)} />
        }


      </div>
    </Router>
  );
}

export default App;
