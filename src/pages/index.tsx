import Head from "next/head";
import { Main } from "./styled";

export default function Home() {
  return (
    <>
      <Head>
        <title>Main Page</title>
        <meta name="description" content="Main Page of shop" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>Hello World</Main>
    </>
  );
}
