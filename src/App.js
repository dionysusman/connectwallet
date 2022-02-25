import { useWeb3React } from '@web3-react/core';
import { injected, walletconnect } from './hook/connector';
import './App.css';

function App() {

  const { activate, account, chainId, library, connector, active, deactivate } = useWeb3React();


  async function connect() {
    try {
      await activate(injected);
    } catch (err) {
      console.log(err)
    }
  }

  async function disconnect() {
    try {
      deactivate();
    } catch (err) {
      console.log(err);
    }
  }

  async function connectWallet() {
    try {
      setTimeout(async () => {
        activate(walletconnect)
      }, 500)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="App ">
      <div>
        <button onClick={connect} className='btn btn-primary'>Connect Metamask</button>
        <button onClick={disconnect} className='btn btn-primary'>Disconnect</button>
      </div>
      <div>
        <button onClick={connectWallet} className='btn btn-primary'>Connect Wallet Connector</button>
        <button onClick={disconnect} className='btn btn-primary'>Disconnect</button>
      </div>
      {active ? <span>Connected with <b>{account}</b></span> : <span>Not Connected</span>}
    </div>
  );
}

export default App;
