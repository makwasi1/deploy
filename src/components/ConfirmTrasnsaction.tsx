import { Box, Button,  Grid,  useMediaQuery, useTheme } from "@mui/material";
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
  dollar: number;
  onConfirm: () => void;

}> = ({ onClose, open, amount, phone, receiver,dollar, onConfirm }) => {
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
        component={Grid}
        spacing={2}
        sx={{ borderRadius: 2, p: 4 }}
      >
 <Typography textAlign="center">Confirm Transaction</Typography>
<Grid container spacing={2}>
        
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
              ADA Amount
              </Typography>
            
            </Grid>
            
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
            {amount}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
              USD Amount
              </Typography>
            
            </Grid>
            
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
            {dollar}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
              Phone Number
              </Typography>
            
            </Grid>
            
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
            {phone}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
              Receiver Name
              </Typography>
            
            </Grid>
            
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
            {receiver}
            </Typography>
          </Grid>
        </Grid>
        
        

        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
        
        <Button variant="contained"  style={{
          background: 'red',
        }} disableElevation sx={{ borderRadius: 2 }}>
          Cancel
        </Button>
   
        <Button variant="contained" disableElevation sx={{ borderRadius: 2 }} onClick={onConfirm}>
          Confirm
        </Button>
      </Stack>
        
        <Box>
        </Box>
      </Paper>
    </Dialog>
  );
};
