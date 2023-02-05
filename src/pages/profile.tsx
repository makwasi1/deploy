import { Wallet } from "@/components";
import { TransactionWallet } from "@/utils/types";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import dynamic from "next/dynamic";
import Head from "next/head";

interface IndexProps {
  transactions: Array<TransactionWallet>;
}

const History = dynamic(
  () => import("@/components").then((mod) => mod.History),
  { ssr: false }
);

export default function Home(props: IndexProps) {
  const { transactions } = props;
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Grid container spacing={6}>
          <Grid item xs sm={3.5}>
            <Wallet />
          </Grid>
          <Grid item xs={12} sm={8} md={8.5}>
            <History transactions={transactions} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export async function getServerSideProps() {
  // get todo data from API
  const res = await fetch(`${process.env.API_URL}transactions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const transactions = await res.json();
  // return props
  return {
    props: { transactions },
  };
}
