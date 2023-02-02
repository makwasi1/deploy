import { BrowserWallet, Wallet } from "@meshsdk/core";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import { TransitionProps } from "@mui/material/transitions";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { useEffect, useState } from "react";
import useWallet from "../context/wallet";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ConnectWallet: React.FC<{ onClose: () => void; open: boolean }> = ({ onClose, open }) => {
  const { push } = useRouter();
  const [availableWallets, setAvailableWallets] = useState<Wallet[]>([]);
  const { connectWallet } = useWallet();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    async function init() {
      setAvailableWallets(BrowserWallet.getInstalledWallets());
    }
    init();
  }, []);

  return (
    <Dialog
      onClose={handleClose}
      fullWidth={isMobile ? false : true}
      open={open}
      TransitionComponent={Transition}
      keepMounted
    >
      <Paper variant="outlined" component={Stack} spacing={2} sx={{ borderRadius: 2, p: 4 }}>
        <Typography textAlign="center">Connect Wallet</Typography>
        <Box>
          {availableWallets
            ? availableWallets.length == 0
              ? "No wallets found"
              : availableWallets.map((el, i) => (
                  <Paper
                    variant="outlined"
                    key={i}
                    component={Stack}
                    spacing={0}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    onClick={() => connectWallet(el.name)}
                    sx={{ px: 4, py: 1, minWidth: { xs: 1, md: 400 }, cursor: "pointer" }}
                  >
                    <Image src={el.icon} width={40} height={40} alt="wallet" />
                    <Typography color="accent.main">{el.name}</Typography>
                    <ArrowForwardIosIcon fontSize="small" />
                  </Paper>
                ))
            : ""}
        </Box>
      </Paper>
    </Dialog>
  );
};
