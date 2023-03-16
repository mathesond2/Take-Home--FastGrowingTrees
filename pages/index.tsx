import styles from '@/styles/Home.module.css';
import Head from 'next/head';
import Card from '@/components/Card/Card';

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
        <Card
          imgSrc="https://cdn.shopify.com/s/files/1/0059/8835/2052/products/Cold_Hardy_Avocado_FGT_600x600_94a0fedf-56ac-4470-aed8-b24bc2a20132.jpg?v=1612444134"
          title="Cold Hardy Avocado Tree"
        />
      </main>
    </>
  );
}
