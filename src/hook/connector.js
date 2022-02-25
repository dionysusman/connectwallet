import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

const RPC_URLS = {
    1: process.env.RPC_URL_1,
    56: process.env.RPC_URL_56
}

export const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 56, 97]
});

export const walletconnect = new WalletConnectConnector({
    rpc: {
        1: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        56: 'https://bsc-dataseed1.binance.org/'
    },
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
    pollingInterval: 8000
})