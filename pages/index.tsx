import Card from '@/components/Card/Card';
import styles from '@/styles/Home.module.css';
import { ParsedProducts } from '@/types/data';
import { SimpleGrid } from '@chakra-ui/react';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import handler from './api/products';

export default function Home({ products }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Fastest Growing Trees</title>
        <meta name="description" content="Trees. Delivered. Yesterday." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <p>{JSON.stringify(products)}</p>
        <SimpleGrid columns={[1, null, 2, 3, 4]} spacing={8}>
          {products.map(({ src, title, id }) => (
            <Card imgSrc={src} title={title} key={id} />
          ))}
        </SimpleGrid>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const res = handler();
  const data: ParsedProducts = await res.json();
  return {
    props: {
      products: data.products, //NOTE: consider 'recomendations'
    },
    revalidate: 86400,
  };
}
