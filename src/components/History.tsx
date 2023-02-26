import { TransactionWallet } from "@/utils/types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import * as React from "react";
import { Input, SelectInput } from "./common";


function Row(props: { row:  TransactionWallet }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const onOpen = (hash: string) => {
    window.open(`https://preprod.cardanoscan.io/transaction/${hash}`, '_blank');
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
        <Button variant="contained" disableElevation sx={{ borderRadius: 2 }} onClick={() => onOpen(row.transaction_hash)} >
          Verify
        </Button>
        </TableCell>
        {Object.entries(row).map(([key, value]) => {
          if (key !== "date" && key !== "history") {
            return <TableCell key={key}>{value.toString()}</TableCell>;
          }
        })}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {row.txn_status.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell>{historyRow.amount}</TableCell>
                    </TableRow>
                  ))} */}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// const rows = [...Array(5)].map((_) => {
//   return createData(
//     new Date().toLocaleDateString(),
//     "ADA - USD",
//     "Finish",
//     "Frozen yoghurt",
//     "+243998838278",
//     "100.0000ADA",
//     "7.0000ADA",
//     "37.5 USD"
//   );
// });

const columns: readonly { id: string; label: string; minWidth: number }[] = [
  {
    id: "id",
    label: "Verify",
    minWidth: 120,
  },
  {
    id: "name",
    label: "Reciever Name",
    minWidth: 170,
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 120,
  },
  {
    id: "type",
    label: "Transaction Type",
    minWidth: 170,
  },
  {
    id: "transactionId",
    label: "Transaction Id",
    minWidth: 120,
  },
  {
    id: "phone",
    label: "Phone Number",
    minWidth: 170,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
  },
  // {
  //   id: "wallet",
  //   label: "Wallet Address",
  //   minWidth: 170,
  // },
];

interface IndexProps {
  transactions: Array<TransactionWallet>;
}

export function History(props: IndexProps) {
  const { transactions }   = props;
  return (
    <Paper variant="outlined" component={Stack} spacing={1} sx={{ borderRadius: 2, px: 4, py: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }} spacing={2}>
        <Input name="search" type="text" placeholder="Search" icon={<SearchIcon />} />
        <SelectInput
          data={[
            { id: "ky", label: "Kenya", value: "Kenya" },
            { id: "cd", label: "RD Congo", value: "RD Congo" },
            { id: "all", label: "Pays", value: "all" },
          ]}
          placeholder="Select country"
          name="usd"
          value="all"
        />

        <SelectInput
          data={[
            { id: "99", label: "Airtel", value: "Airtel" },
            { id: "82", label: "Orange", value: "Orange" },
            { id: "81", label: "Vodacom", value: "Vodacom" },
            { id: "reseaux", label: "Reseaux", value: "reseaux" },
          ]}
          placeholder="Select a network"
          name="usd"
          value="reseaux"
        />
      </Stack>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              {columns.map((column) => (
                <TableCell key={column.id} sx={{ fontSize: 12, color: "accent.main", minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
