import { MainWrapper } from "@/components/MainWrapper/MainWrapper";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Main Page</title>
        <meta name="description" content="Main Page of shop" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainWrapper>Hello World</MainWrapper>
    </>
  );
}
