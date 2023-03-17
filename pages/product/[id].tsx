import DetailCard from '@/components/DetailCard';
import ImageWithFallback from '@/components/ImageWithFallback';
import { ParsedProduct, ParsedProducts } from '@/types/data';
import { Box, Button, Center, HStack } from '@chakra-ui/react';
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
  const { id } = context.params!;
  const nextReq = new NextRequest(new URL(`http://localhost:3000/api/product?id=${id}}`)); //TODO: fix this
  const res = productHandler(nextReq);
  const data: ParsedProduct = await res.json();

  return {
    props: { product: data },
  };
};

const imgHeight = '554px';
const imgWidth = '557px';

export default function ProductPage({ product }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { alt, body, id, price, src, title } = product;
  const titleContent = `${title} | Fastest Growing Trees `;
  return (
    <>
      <Head>
        <title>{titleContent}</title>
        <meta name="description" content={body} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Center>
          <HStack spacing={4} alignItems="initial">
            <Box position={'relative'} h={imgHeight} w={imgWidth} borderTopRadius="lg">
              <ImageWithFallback
                src={src}
                alt={alt || title}
                fill
                sizes="(max-width: 768px) 200px,
                (max-width: 1200px) 200px,
                200px"
                fallbackSrc="https://via.placeholder.com/280x252.png?text=?"
              />
            </Box>
            <DetailCard title={title} body={body}>
              <Button bgColor="#CD0100" color="white" size="lg">
                Add to Cart
              </Button>
            </DetailCard>
          </HStack>
        </Center>
      </main>
    </>
  );
}
