import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import { TransitionProps } from "@mui/material/transitions";
import Typography from "@mui/material/Typography";
import * as React from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ConfirmTransaction: React.FC<{
  onClose: () => void;
  open: boolean;
  amount: number;
  phone: number;
  receiver: string;
  onConfirm: () => void;

}> = ({ onClose, open, amount, phone, receiver, onConfirm }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      fullWidth={isMobile ? false : true}
      open={open}
      TransitionComponent={Transition}
      keepMounted
    >
      <Paper
        variant="outlined"
        component={Stack}
        spacing={2}
        sx={{ borderRadius: 2, p: 4 }}
      >
        <Typography textAlign="center">Confirm Transaction</Typography>
        <Typography textAlign="center">ADA Amount {amount}</Typography>
        <Typography textAlign="center">USD Amount</Typography>
        <Typography textAlign="center">Phone Number {phone}</Typography>
        <Typography textAlign="center">Receiver Name {receiver}</Typography>
        <Button variant="contained" disableElevation sx={{ borderRadius: 2 }} onClick={onConfirm}>
          Confirm 
        </Button>
        <Box>
        </Box>
      </Paper>
    </Dialog>
  );
};
