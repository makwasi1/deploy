import { Exchange } from "@/components";
import Head from "next/head";

// const Exchange = dynamic(() => import("@/components").then((mod) => mod.Exchange), { ssr: false });

function Socket() {
  return (
    <>
      <Head>
        <title>Exchange</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Exchange />
    </>
  );
}

export default Socket;
