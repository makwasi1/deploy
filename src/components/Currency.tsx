import Button from "@mui/material/Button";
import React, { PropsWithChildren } from "react";

export const Currency: React.FC<PropsWithChildren & { icon?: React.ReactNode }> = ({ children, icon }) => {
  return (
    <Button
      variant="outlined"
      sx={{ borderRadius: 2, px: 2, py: 1, width: 1 }}
      startIcon={icon}
      disableElevation
      color="accent"
    >
      {children}
    </Button>
  );
};
