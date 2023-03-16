import { ParsedProduct, ParsedProducts } from '@/types/data';
import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { NextRequest } from 'next/server';
import { ParsedUrlQuery } from 'querystring';
import productHandler from '../api/product/[id]';
import productsHandler from '../api/products';

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const res = productsHandler();
  const data: ParsedProducts = await res.json();

  const paths = data.products.map(({ id }) => ({
    params: { id: id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  console.log('context', context);
  const { id } = context.params!;
  const nextReq = new NextRequest(new URL(`http://localhost:3000/api/product?id=${id}}`));
  const res = productHandler(nextReq);
  const data: ParsedProduct = await res.json();

  return {
    props: { product: data },
  };
};

export default function ProductPage({ product }: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log('product', product);
  return (
    <>
      <Head>
        <title>Fastest Growing Trees</title>
        <meta name="description" content="Trees. Delivered. Yesterday." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>Product Page</p>
      </main>
    </>
  );
}
