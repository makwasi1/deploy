import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";

interface Props {
  placeholder: string;
  label?: string;
  name: string;
  type?: "text" | "number";
  value?: string | number;
  icon?: any;
  handleChange?(event: { target: { value: string; name: string } } | string | null): void;
}

export const Input: React.FC<Props> = ({ icon, placeholder, label, name, type = "number", handleChange, value }) => {
  return (
    <Stack sx={{ width: 1, position: "relative" }} spacing={1}>
      <Typography color="accent.main">{label}</Typography>
      <Paper
        variant="outlined"
        sx={{
          px: 2,
          py: 0.5,
          borderRadius: 2,
          width: 1,
          textAlign: "center",
          '& input[type="number"]::-webkit-inner-spin-button, & input[type="number"]::-webkit-outer-spin-button': {
            "-webkit-appearance": "none",
          },
          "& input": {
            color: "accent.main",
          },
          '& input[type="number"]': {
            textAlign: "end",
          },
          transition: (theme) => theme.transitions.create(["border-color", "box-shadow"]),
          borderColor: (theme) => theme.palette.accent.main,
          "&:hover": {
            bgcolor: "action.hover",
          },
        }}
      >
        <InputBase
          placeholder={placeholder}
          sx={{ width: 1 }}
          name={name}
          type={type}
          inputProps={{
            min: 0,
          }}
          value={value}
          onChange={handleChange}
          {...(icon && { startAdornment: icon })}
        />
      </Paper>
    </Stack>
  );
};
