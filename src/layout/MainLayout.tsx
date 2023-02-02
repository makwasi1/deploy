import { Background, NavBar } from "@/components";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PropsWithChildren } from "react";

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Background>
      <NavBar />
      <Container sx={{ mt: 14, position: "relative", minHeight: "80vh" }}>{children}</Container>
      <Stack sx={{ width: 1, p: 2 }} justifyContent="center">
        <Divider sx={{ my: 1.4 }} />
        <Typography color="accent.main" textAlign="center" component="span">
          ©Adaexchangeapp {new Date().getFullYear()}. All rights reserved. Designed by{" "}
          <Link color="inherit" href="https://updev.africa" target="_blank">
            Uptodate Developers.
          </Link>
        </Typography>
      </Stack>
    </Background>
  );
};
