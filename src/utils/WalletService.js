export const getCurrentProvider = (library) => {
    if (!library.currentProvider) return 'unknown';

    if (library.currentProvider.isMetaMask)
        return 'MetaMask';

    if (library.currentProvider.isTrust)
        return 'trust';

    if (library.currentProvider.isGoWallet)
        return 'goWallet';

    if (library.currentProvider.isAlphaWallet)
        return 'alphaWallet';

    if (library.currentProvider.isStatus)
        return 'status';

    if (library.currentProvider.isToshi)
        return 'Coinbase Wallet';

    if (typeof window.__CIPHER__ !== 'undefined')
        return 'cipher';

    if (library.currentProvider.constructor.name === 'EthereumProvider')
        return 'mist';

    if (library.currentProvider.constructor.name === 'Web3FrameProvider')
        return 'parity';

    if (library.currentProvider.host && library.currentProvider.host.indexOf('infura') !== -1)
        return 'infura';

    if (library.currentProvider.host && library.currentProvider.host.indexOf('localhost') !== -1)
        return 'localhost';
    return 'unknown';
}

export const getNetworkNameAndURL = (library) => {
    if (parseInt(library.currentProvider.chainId) === 1)
        return {
            networkName: 'Ethereum',
            networkURL: 'https://etherscan.io/address/'
        }
    if (parseInt(library.currentProvider.chainId) === 3)
        return {
            networkName: 'Ropsten',
            networkURL: 'https://ropsten.etherscan.io/address/'
        }
    if (parseInt(library.currentProvider.chainId) === 4)
        return {
            networkName: 'Rinkeby',
            networkURL: 'https://rinkeby.etherscan.io/address/'
        }
    if (parseInt(library.currentProvider.chainId) === 5)
        return {
            networkName: 'Goerli',
            networkURL: 'https://goerli.etherscan.io/address/'
        }
    if (parseInt(library.currentProvider.chainId) === 42)
        return {
            networkName: 'Kovan',
            networkURL: 'https://kovan.etherscan.io/address/'
        }
    if (parseInt(library.currentProvider.chainId) === 56)
        return {
            networkName: 'Binance Smart Chain',
            networkURL: 'https://bscscan.com/address/'
        }
    if (parseInt(library.currentProvider.chainId) === 137)
        return {
            networkName: 'Polygon',
            networkURL: 'https://polygonscan.com/address/'
        }
    if (parseInt(library.currentProvider.chainId) === 43114)
        return {
            networkName: 'Avalanche',
            networkURL: 'https://snowtrace.io/address/'
        }
}
export const getrpcURLWithChainId = (id) => {
    if (parseInt(id) === 1) return "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
    if (parseInt(id) === 137) return "https://polygon-rpc.com/"
    if (parseInt(id) === 43114) return "https://api.avax.network/ext/bc/C/rpc"
}