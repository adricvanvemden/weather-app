import Head from "next/head";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Get the latest weather information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
