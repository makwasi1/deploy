import EWallet from "@/assets/icons/ewallet.png";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import type { NextPage } from "next";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useEffect, useState } from "react";
import useWallet  from '../context/WalletContext';
import { ConnectWallet } from "./ConnectWallet";
import Link from "next/link";
import { useRouter } from "next/router";


export const Wallet = () => {
  const { connecting, walletNameConnected, connectWallet, walletConnected, connectedAddress, currentNetwork,balance } = useWallet();
  const [open, setOpen] = useState(false);
  const { pathname } = useRouter();

  const active = '/profile' === pathname;


  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
    <ConnectWallet open={open} onClose={onClose} />
    <Paper
      component={Stack}
      variant="outlined"
      justifyContent="center"
      sx={{ p: 2, borderRadius: 2, width: 1 }}
      alignItems="center"
    >
      <Image alt="Logo" src={EWallet} width={70} height={70} className="image" />
      <Typography color="text.primary">{walletNameConnected}</Typography>
      <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
        <FiberManualRecordIcon color="success" fontSize="small" />
        <Typography color="accent.main">{currentNetwork}</Typography>
      </Stack>
      <Typography
        color="accent.main"
        sx={{ lineBreak: "anywhere", cursor: "pointer" }}
        textAlign="center"
        variant="caption"
      >
       {connectedAddress}
        <ContentCopyIcon sx={{ fontSize: 12 }} />
      </Typography>
      <Stack alignItems="center" sx={{ my: 1 }}>
        <Typography color="text.primary">ADA Balance</Typography>
        <Typography color="accent.main">{balance}</Typography>
      </Stack>
      <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
        <Link href={{ pathname: "/profile" }}>
        <Button variant="contained" disableElevation sx={{ borderRadius: 2 }}>
          Go to profile
        </Button>
       </Link> 
        <Button variant="contained" disableElevation sx={{ borderRadius: 2 }} onClick={onOpen}>
          Change wallet
        </Button>
      </Stack>
    </Paper>
    </>
  );
};
