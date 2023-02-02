import Button from "@mui/material/Button";
import React, { PropsWithChildren } from "react";

export const PrimaryButton: React.FC<PropsWithChildren & { icon?: React.ReactNode; onClick?: () => void }> = ({
  children,
  icon,
  onClick,
}) => {
  const handleClick = () => {
    onClick && onClick();
  };
  return (
    <Button
      disableElevation
      variant="contained"
      sx={{ borderRadius: 2, px: 4, py: 1.2 }}
      startIcon={icon}
      color="primary"
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};
