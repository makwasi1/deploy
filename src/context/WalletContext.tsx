import { BrowserWallet, Transaction} from "@meshsdk/core";
import { useRouter } from "next/router";
import React, { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";
import nookies from 'nookies'
import { TransactionWallet as Trans  }  from "@/utils/types";

// Define pro

const WalletContext = createContext({
  wallet: {} as BrowserWallet,
  connecting: false,
  walletNameConnected: "",
  walletConnected: false,
  connectWallet: async (walletName: string) => {},
  connectedAddress: "",
  currentNetwork: "",
  balance: "",
  disconnectWallet: async () => {},
  sendAda: async (amount: string) => {},
});

export const WalletProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [wallet, setWallet] = useState<BrowserWallet>({} as BrowserWallet);
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const [connecting, setConnecting] = useState<boolean>(false);
  const [walletNameConnected, setWalletNameConnected] = useState<string>("");
  const [connectedAddress, setConnectedAddress] = useState<string>("");
  const [currentNetwork, setCurrentNetwork] = useState<string | undefined>(undefined);
  const [balance, setBalance] = useState<string>("");
  const { push } = useRouter();

  const connectWallet = async (walletName: string) => {
    setConnecting(true);
    const _wallet = await BrowserWallet.enable(walletName);
    const _address = await _wallet.getUsedAddresses();
    const _network = await _wallet.getNetworkId();
    const _balance = await _wallet.getBalance();
    if (_wallet) {
      setWallet(_wallet);
      setWalletNameConnected(walletName);
      setWalletConnected(true);
      setConnectedAddress(_address[0]);
      setBalance(_balance[0].quantity);

      //store wallet in local storage in order to use it later
      localStorage.setItem("wallet", _address[0]);
      localStorage.setItem("walletName", walletName);
      if (_network == 0) setCurrentNetwork("Testnet");
      if (_network == 1) setCurrentNetwork("Mainnet");
      push("/connected");
    }
    setConnecting(false);
  };

  const disconnectWallet = async () => {};

  const sendAda = async (amount: string) => {
    console.log(amount);

    const tx = new Transaction({ initiator: wallet }).sendLovelace(
      process.env.NEXT_PUBLIC_RECEIVER_ADDRESS,
      amount
    );
    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
  };
  


  const memoedValue = useMemo(
    () => ({
      wallet,
      connecting,
      walletNameConnected,
      walletConnected,
      connectWallet,
      connectedAddress,
      currentNetwork,
      balance,
      disconnectWallet,
      sendAda,
    }),
    [wallet, walletConnected, connecting, walletNameConnected, connectedAddress, currentNetwork, balance]
  );

  return <WalletContext.Provider value={memoedValue as any}>{children}</WalletContext.Provider>;
};

export default function useWallet() {
  return useContext(WalletContext);
}
