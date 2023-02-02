import { createTheme } from "@mui/material/styles";

export const theme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      background: {
        paper: mode === "light" ? "#ffffff" : "#0f1c38",
        default: mode === "light" ? "#f1f1f1" : "#080b15",
      },
      primary: {
        main: "#0c0759",
      },
      secondary: {
        main: "#020a15",
      },
      accent: {
        main: mode === "light" ? "#4d4b62" : "#c1bbf4",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1280,
        xl: 1536,
      },
    },
    typography: {
      fontFamily: ["Lato", "sans-serif"].join(","),
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
    },
  });

declare module "@mui/material/styles" {
  interface Palette {
    accent: Palette["primary"];
  }
  interface PaletteOptions {
    accent?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    accent: true;
  }
}
