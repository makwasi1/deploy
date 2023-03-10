import Icon from "@/assets/icons/ada.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "../components";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        {/* Header */}
        <Stack spacing={2} justifyContent="center" sx={{ width: { xs: 1, md: 0.4 }, mx: "auto", my: 12, py: 6 }}>
          <Typography
            textAlign="center"
            color="accent.main"
            sx={{
              background: "linear-gradient(90deg, #59cad1, #6267f0 51%, #d462f0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            About
          </Typography>
          <Typography textAlign="center" variant="h3" component="span" fontWeight={700}>
            Zenden is here to help you{" "}
            <Typography
              variant="h3"
              color="accent.main"
              component="span"
              fontWeight={700}
              sx={{
                background: "linear-gradient(90deg, #59cad1, #6267f0 51%, #d462f0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              launch your startup
            </Typography>
          </Typography>
          <Typography color="accent.main" textAlign="center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus.
          </Typography>
        </Stack>

        {/* Our story */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Stack>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Our story
              </Typography>
              <Typography color="accent.main">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis,
                lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo,
                vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque
                fermentum dui faucibus in ornare.
              </Typography>
              <Typography color="accent.main">
                Consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna,
                porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper
                eget nulla facilisi etiam.
              </Typography>
            </Stack>
          </Grid>
          <Grid container item xs={12} md={6} spacing={2}>
            {[...Array(4)].map((_, i) => (
              <Grid item xs={6} key={i}>
                <Paper variant="outlined" component={Stack} sx={{ p: 4 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      background: "linear-gradient(90deg, #59cad1, #6267f0 51%, #d462f0)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    10,000+
                  </Typography>
                  <Typography color="accent.main">Happy customers</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Our value */}
        <Box sx={{ my: 12 }}>
          <Stack sx={{ my: 2 }}>
            <Typography
              color="accent.main"
              textAlign="center"
              sx={{
                background: "linear-gradient(90deg, #59cad1, #6267f0 51%, #d462f0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Our value
            </Typography>
            <Typography variant="h4" fontWeight={700} textAlign="center">
              A few things that we believe in
            </Typography>
          </Stack>

          <Grid container spacing={4} sx={{ my: 4 }}>
            {[...Array(6)].map((_, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Paper variant="outlined" component={Stack} sx={{ p: 4 }} spacing={1}>
                  <Image src={Icon} width={40} height={40} alt="Icon" />
                  <Typography variant="h6">{`Value ${i + 1}`}</Typography>
                  <Typography color="accent.main">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis,
                    lectus.
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to action */}
        <Stack alignItems="center" spacing={2} sx={{ width: { xs: 1, md: 0.6 }, mx: "auto" }}>
          <Logo />
          <Typography variant="h4" fontWeight={700} textAlign="center">
            Get started with Zenden today.
          </Typography>
          <Typography color="accent.main" textAlign="center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus
            magna fringilla urna, porttitor rhoncus dolor purus non.
          </Typography>
        </Stack>

        {/* Footer */}
        <Grid container sx={{ mt: 6, py: 2 }} spacing={4}>
          <Grid item xs={12} md={8}>
            <Stack>
              
              <Typography color="accent.main" sx={{ width: { xs: 1, md: 300 } }}>
                Lorem ipsum dolor sit amet, consec adipiscing elit ut ali, purus sit ame elit ut aliqu ipsum dolor sit.
              </Typography>
              <Stack direction="row" sx={{ ml: -1 }}>
                <IconButton>
                  <LinkedInIcon />
                </IconButton>
                <IconButton>
                  <TwitterIcon />
                </IconButton>
                <IconButton>
                  <FacebookIcon />
                </IconButton>
              </Stack>
            </Stack>
          </Grid>
          <Grid container item xs={12} md={4} spacing={4}>
            <Grid item xs={12} md={6}>
              <Stack>
                <Typography>Pages</Typography>
                <Typography color="accent.main" component={Link} href="/">
                  Exchange
                </Typography>
                <Typography color="accent.main" component={Link} href="/profile">
                  Profile
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack>
                <Typography>Pages</Typography>
                <Typography color="accent.main" component={Link} href="/">
                  Exchange
                </Typography>
                <Typography color="accent.main" component={Link} href="/profile">
                  Profile
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
