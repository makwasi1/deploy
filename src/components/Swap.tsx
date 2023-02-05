import Ada from "@/assets/icons/ada.png";
import Dollar from "@/assets/icons/dollar.png";
import EWallet from "@/assets/icons/ewallet.png";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { Input, PrimaryButton, SelectInput } from "./common";
import CustomCheckbox from "./common/CustomCheckbox";
import { ConnectWallet } from "./ConnectWallet";
import { Currency } from "./Currency";
import { BrowserWallet, Transaction, Wallet } from '@meshsdk/core';
import { useEffect } from 'react';
import useWallet from '../context/wallet';
import { TransactionWallet as Trans  }  from "@/utils/types";
import { AlertDialog } from "./common/Alert";



const EWalletIcon = () => <Image src={EWallet} alt="EWallet" width={20} height={20} />;

const AdaIcon = () => <Image src={Ada} alt="Ada Icon" width={20} height={20} />;
const DollarIcon = () => <Image src={Dollar} alt="Dollar Icon" width={20} height={20} />;

// Define props

export const Swap = () => {
  const [swap, setSwap] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const { pathname, push } = useRouter();
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<BrowserWallet>();
  const { walletConnected, connectWallet, connectedAddress, currentNetwork, balance, sendAda, wallet } = useWallet();
  const [amount, setAmount] = useState(0);
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [terms, setTerms] = useState(false);
  const [name, setName] = useState("");
  const [dollar, setDollar] = useState(0);
  const [adarate, setAdarate] = useState(0);
  const [txHash, setTxHash] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  const { API_URL, TOKEN, ADA_WALLET } = process.env
  

  //  walletConnected = pathname !== "/";


  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  const onOpenAlert = () => setOpenAlert(true);
  const onCloseAlert = () => setOpenAlert(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(event.target.value));
    //convert ada to dollar
    //1 ada = $0.39 USD
    //convert from lovelances to ada
    //1 lovelance = 0.000001 ada
    //1 ada = 1,000,000 lovelances
    let ada = parseInt(event.target.value) / 1000000;
    let dollar = ada * adarate;
    setDollar(parseFloat(dollar.toFixed(2)));//convert this with the exchange rate of congolese franc to dollar
  };
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(parseInt(event.target.value));
  };
  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };


  const sendAdaFunction = async () => {
    const tx = new Transaction({ initiator: wallet }).sendLovelace(
      process.env.NEXT_PUBLIC_ADA_WALLET,
      amount.toString()
    );
    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
    try {
      if(null !== txHash && txHash !== undefined) {
        setTxHash(txHash);
        await handleMobileMoney(amount.toString(), txHash);
      }
    } catch (error) {
      throw new Error("Order Hash is null");
    } 
  };


  const handleMobileMoney = async (amount: string, txHash: string) => {
    let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJcL2xvZ2luIiwicm9sZXMiOlsiTUVSQ0hBTlQiXSwiZXhwIjoxNzMwMDE2NzgzLCJzdWIiOiI0NTA5Y2Q3ZWVlZDU3YjkzNjlmZTZlMmMwN2NmMDEwZiJ9.o_J3EfDubqHM4h9ZNAxSpkenMoIWIBcq79cqzzqOdq8';
    let usdToCdf = 2043;
    // Make the API request body for momo api 
    const body = {
        merchant: "UPTODATE",
        type: "1",
        phone: phoneNumber,
        reference: "MLOPN5472458",
        amount: dollar * usdToCdf,
        currency: "CDF",
        callbackUrl: "http://localhost:3000/en/"
    }

    // Make the API request
   var response =  await fetch('http://41.243.7.46:3006/flexpay/api/rest/v1/paymentService', {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+token,
      },
      body: JSON.stringify(body),
    })
    if(response.status == 200){
      const data = await response.json();
      let orderNumber = data['orderNumber'];
      if(orderNumber !== null && orderNumber !== undefined){
        setOrderNumber(orderNumber);
        console.log("Order Number: "+orderNumber);
        
        await handleMobileMoneyTransaction(txHash,orderNumber);
      } else {
        throw new Error("Order number is null");
      }
    }
    
  }

  useEffect(() => {
    //fetch data from coinbase api
    getAdaExchangeInUsd();
  },[adarate]);

  const getAdaExchangeInUsd = async () => {
    var res =  await fetch('https://api.coincap.io/v2/assets/cardano', {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (res.status == 200) {
      const data = await res.json();
      var rate = (data['data']['priceUsd']);
      let newRate = parseFloat(rate);
      let roundedRate = Number(newRate.toFixed(4));
      
      setAdarate(roundedRate);
     }
    };

  //function to make save mobile money transaction
  const handleMobileMoneyTransaction = async (txHash: string, orderId: string) => {
    console.log("Order Number: "+orderId);
    
    let trans: Trans = {
      name: "",
      amount: 0,
      type: "",
      transaction_hash: "",
      phone_number: 0,
      txn_status: "",
      wallet_id: "",
      order_number: ""
    };

    if(null !== txHash) {
      trans = {
      name: name,
      amount: dollar * 2043,
      type: "ADA-USD",
      transaction_hash: txHash,
      phone_number: phoneNumber,
      txn_status: "pending",
      wallet_id: connectedAddress,
      order_number: orderId
      }
    }
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}transactions`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trans),
    })
    .then((res) => {
      if(res.status == 200){
        setOpenAlert(true);
      }
    })
  }

  
  useEffect(() => {
    if (!walletConnected) {
      push("/");
   }
  }, [walletConnected])

  return (
    <>
      <AlertDialog open={openAlert} onClose={onCloseAlert} />
      <ConnectWallet open={open} onClose={onClose} />
      <Paper variant="outlined" component={Stack} spacing={1} sx={{ borderRadius: 2, px: 4, py: 2 }}>
        <Typography variant="h6" textAlign="center" component="h1" gutterBottom>
          Swap
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Stack
            sx={{
              width: 1,
              transition: "all 500ms ease-in-out",
              transform: swap
                ? { xs: "translateX(46vw)", sm: "translateX(135%)", md: "translateX(140%)" }
                : "translateX(0%)",
            }}
          >
            <Currency icon={<AdaIcon />}>ADA</Currency>
          </Stack>
          <IconButton onClick={() => setSwap((state) => !state)}>
            <SwapHorizontalCircleIcon sx={{ color: "accent.main" }} />
          </IconButton>
          <Stack
            sx={{
              width: 1,
              transition: "all 500ms ease-in-out",
              transform: swap
                ? { xs: "translateX(-46vw)", sm: "translateX(-135%)", md: "translateX(-140%)" }
                : "translateX(0%)",
            }}
          >
            <Currency icon={<DollarIcon />}>USD</Currency>
          </Stack>
        </Stack>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} justifyContent="space-between">
          <Stack spacing={1} sx={{ width: 1 }}>
            <Input placeholder="0.000" label="Enter the amount in ADA" name="ada"  handleChange={handleChange} />
            <Stack direction="row" justifyContent="space-between">
              <Typography color="accent.main" variant="caption">
                Fee
              </Typography>
              <Typography color="accent.main" variant="caption">
                0.0001 ADA
              </Typography>
            </Stack>
          </Stack>
          <Stack spacing={1} sx={{ width: 1 }}>
            <Input placeholder="0.000" label="Equivalent in USD" value={dollar} name="usd" />
            <Stack direction="row" justifyContent="space-between">
              <Typography color="accent.main" variant="caption">
                Received
              </Typography>
              <Typography color="accent.main" variant="caption">
                {adarate}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} justifyContent="space-between">
          <Input placeholder="Receiver Full Name" type="text" label="Receiver Full Name" name="ada" handleChange={handleNameChange} />
          <SelectInput
            data={[
              // { id: "ky", label: "Kenya", value: "Kenya" },
              { id: "cd", label: "RD Congo", value: "RD Congo" },
            ]}
            placeholder="Select country"
            label="Select country"
            name="congo" 
            value="RD Congo"
          />
        </Stack>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} justifyContent="space-between">
          <SelectInput
            data={[
              { id: "99", label: "Airtel", value: "Airtel" },
              // { id: "82", label: "Orange", value: "Orange" },
              // { id: "81", label: "Vodacom", value: "Vodacom" },
            ]}
            placeholder="Select a network"
            label="Select a network"
            name="usd"
            value="Airtel"
          />
          <Input placeholder="246...." type="text" label="Receiver Phone Number" name="phone" handleChange={handlePhoneChange} />
        </Stack>
        <Stack direction="row">
          <CustomCheckbox />
          <Typography variant="caption" color="accent.main">
            I confirm I have read and accepted the{" "}
            <Link color="inherit" href="https://updev.africa" target="_blank">
              terms{" "}
            </Link>
            and{" "}
            <Link color="inherit" href="https://updev.africa" target="_blank">
              conditions
            </Link>{" "}
            of this site and for this application
          </Typography>
        </Stack>
        <PrimaryButton icon={walletConnected ? null : <EWalletIcon />} onClick={walletConnected ? () => sendAdaFunction(): onOpen}>
          {walletConnected ? "Submit" : "Connect Wallet"}
        </PrimaryButton>
      </Paper>
    </>
  );
};

