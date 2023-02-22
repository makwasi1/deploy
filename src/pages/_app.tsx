import en from "@/lang/en.json";
import fr from "@/lang/fr.json";
import { MainLayout } from "@/layout";
import SEO from "@/utils/next-seo.config";
import { theme } from "@/utils/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import withDarkMode, { useDarkMode } from "next-dark-mode";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import NextNprogress from "nextjs-progressbar";
import { IntlProvider } from "react-intl";
import { MeshProvider } from "@meshsdk/react";
import "../styles/globals.css";
import { WalletProvider } from "@/context/WalletContext";

export const languages = {
  en,
  fr,
};

export type Language = keyof typeof languages;

function App({ Component, pageProps }: AppProps) {
  const { darkModeActive } = useDarkMode();
  const mode = darkModeActive ? "dark" : "light";

  const { locale, defaultLocale } = useRouter();

  const messages = languages[locale as Language] as any;

  return (
    <MeshProvider>
    <ThemeProvider theme={theme(mode)}>
      <CssBaseline />
      <NextNprogress
        color={theme(mode).palette.primary.main}
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={false}
        options={{ easing: "ease", speed: 500 }}
      />

      <IntlProvider locale={locale as Language} defaultLocale={defaultLocale} messages={messages}>
        <DefaultSeo {...SEO} />
        <WalletProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
        </WalletProvider>
      </IntlProvider>
    </ThemeProvider>
    </MeshProvider>
  );
}

export default withDarkMode(App);
