import styles from '@/styles/Home.module.css';
import Head from 'next/head';
import Card from '@/components/Card';

export default function Home() {
  return (
    <>
      <Head>
        <title>Fastest Growing Trees</title>
        <meta name="description" content="Trees. Delivered. Yesterday." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <p>content here</p>
        <Card />
      </main>
    </>
  );
}
