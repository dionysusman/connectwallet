import Web3 from "web3";
import { EthereumContractAddress, BinanceContractAddress } from "../contracts/address";
import etherContractAbi from '../abi/etherContract.json';
import binanceContractAbi from '../abi/binanceContract.json';
import { toast } from "react-toastify";

export const getContract = (chain_id) => {
    const contractAddress = chain_id === 1 ? EthereumContractAddress : BinanceContractAddress
    const contractABI = chain_id === 1 ? etherContractAbi : binanceContractAbi
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    return contract;
}

export const getNetworkId = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const currentChainId = await web3.eth.net.getId()
    return currentChainId
}

export const swichNetwork = async (chainId) => {

    const currentChainId = await getNetworkId()

    if (currentChainId !== chainId) {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: Web3.utils.toHex(chainId) }],
            });
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                toast.error('add this chain id')
            }
        }
    }
}

export const getBalance = (address) => {
    const web3 = new Web3(web3.givenProvider || "http://localhost:8545");
    var balance = web3.eth.getBalance(address); //Will give value in.
    balance = web3.toDecimal(balance);
    return balance;
}

