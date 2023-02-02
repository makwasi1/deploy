import EWallet from "@/assets/icons/ewallet.png";
import { truncateAddress } from "@/lib";
import CloseIcon from "@mui/icons-material/Close";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDarkMode } from "next-dark-mode";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DarkModeIcon, LightModeIcon, Logo, NavItem, PrimaryButton } from "./common";
import useWallet from '../context/wallet'
import { ConnectWallet } from "./ConnectWallet";

const EWalletIcon = () => <Image src={EWallet} alt="EWallet" width={20} height={20} />;

export const NavBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { pathname } = useRouter();
  const [open, setOpen] = useState(false);
  const { darkModeActive, switchToDarkMode, switchToLightMode } = useDarkMode();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { connecting, walletNameConnected, connectWallet, walletConnected, connectedAddress, currentNetwork,balance } = useWallet();

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  useEffect(() => {
    setShowMobileMenu(false);
  }, [pathname]);

  const renderMobileMenu = () => (
    <>
      <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ width: 1, py: 2 }}>
        <Stack direction="row" spacing={2}>
          <IconButton onClick={() => setShowMobileMenu((state) => !state)}>
            {showMobileMenu ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Logo />
        </Stack>
        <IconButton onClick={() => (darkModeActive ? switchToLightMode() : switchToDarkMode())}>
          {darkModeActive ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Stack>
      <Stack
        sx={{
          width: 1,
          height: showMobileMenu ? "100vh" : 0,
          zIndex: 0,
          position: "fixed",
          top: 70,
          left: 0,
          bgcolor: "background.paper",
          p: 4,
          transform: showMobileMenu ? 0 : "translateX(-100%)",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Stack spacing={2} justifyContent="flex-start">
          <NavItem href="/">Exchange</NavItem>
          <NavItem href="/profile">Profile</NavItem>
          <NavItem href="/about">About</NavItem>
          {pathname === "/" ? (
            <PrimaryButton icon={<EWalletIcon />}>Connect Wallet</PrimaryButton>
          ) : (
            <>
              <PrimaryButton icon={<FiberManualRecordIcon color="success" />}>{currentNetwork}</PrimaryButton>
              <PrimaryButton>
                {truncateAddress(
                  connectedAddress
                )}
              </PrimaryButton>
            </>
          )}
        </Stack>
      </Stack>
    </>
  );

  const renderDesktopMenu = () => (
    <>
    <ConnectWallet open={open} onClose={onClose} />
    <Grid container alignItems="center" spacing={4}>
      <Grid item xs={12} sm={6} md={2}>
        <Logo />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={5}>
        <Stack direction="row" spacing={4} justifyContent="flex-end">
          <NavItem href="/">Exchange</NavItem>
          <NavItem href="/profile">Profile</NavItem>
          <NavItem href="/about">About</NavItem>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={5} justifyContent="flex-end">
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {pathname === "/" ? (
            <PrimaryButton icon={<EWalletIcon />} onClick={walletConnected ? () =>{} : onOpen}>Connect Wallet</PrimaryButton>
          ) : (
            <>
              <PrimaryButton icon={<FiberManualRecordIcon color="success" />}>{currentNetwork}</PrimaryButton>
              <PrimaryButton>
                {truncateAddress(
                  connectedAddress
                )}
              </PrimaryButton>
            </>
          )}
          <IconButton onClick={() => (darkModeActive ? switchToLightMode() : switchToDarkMode())}>
            {darkModeActive ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Stack>
      </Grid>
    </Grid>
    </>
  );

  const renderMenu = () => (isMobile ? renderMobileMenu() : renderDesktopMenu());
  return (
    <AppBar
      position="fixed"
      variant="outlined"
      color={darkModeActive ? "transparent" : "default"}
      elevation={0}
      sx={{ backdropFilter: "blur(20px)", borderTop: "none", borderLeft: "none", borderRight: "none" }}
    >
      <Container>
        <Toolbar sx={{ px: "0!important" }}>{renderMenu()}</Toolbar>
      </Container>
    </AppBar>
  );
};
