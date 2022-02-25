import * as WalletService from 'Service/WalletService';

export const connect = async (val, onInstallMetaModalShow, activate, setActivatingConnector, setConnectionStatus) => {
    try {
        await activate(val, null, true);
        setConnectionStatus(2);
    } catch (e) {
        if (window.ethereum === undefined) {
            onInstallMetaModalShow && onInstallMetaModalShow();
        } else {
            setActivatingConnector(undefined);
            setConnectionStatus(1);
            console.error("error:", e);
        }
    }
};

export const requestChangeNetwork = async (chainId) => {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chainId }],
        });
    } catch (error) {
        if (error.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: chainId,
                            rpcUrl: WalletService.getrpcURLWithChainId(chainId),
                        },
                    ],
                });
            } catch (addError) {
                console.error(addError);
            }
        }
        console.error(error);
    }
}
