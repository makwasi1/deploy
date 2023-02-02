import Box from "@mui/material/Box";
import { useDarkMode } from "next-dark-mode";
import { PropsWithChildren } from "react";

export const Background: React.FC<PropsWithChildren> = ({ children }) => {
  const { darkModeActive } = useDarkMode();

  return (
    <>
      {children}
      <Box
        sx={{
          width: 1,
          height: "100vh",
          position: "fixed",
          overflow: "hidden",
          display: darkModeActive ? "block" : "none",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: -1,
          "&:before": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 700,
            height: 700,
            borderRadius: "50%",
            backgroundColor: (theme) => theme.palette.primary.main,
            transform: "translate(-30%, 10%)",
            zIndex: -1,
            boxShadow: (theme) => `0 0 0 200px ${theme.palette.secondary.main}`,
            filter: "blur(258px)",
            WebkitFilter: "blur(258px)",
          },
          "&:after": {
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            width: 700,
            height: 700,
            borderRadius: "50%",
            backgroundColor: (theme) => theme.palette.primary.main,
            boxShadow: (theme) => `0 0 0 200px ${theme.palette.secondary.main}`,
            transform: "translate(10%, -20%)",
            filter: "blur(258px)",
            WebkitFilter: "blur(258px)",
            zIndex: -1,
          },
        }}
      ></Box>
    </>
  );
};
