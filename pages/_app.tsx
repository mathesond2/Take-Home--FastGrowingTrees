import '@/styles/globals.css';
import { BlahProvider } from '@/util/BlahContext';
import { inter } from '@/util/fonts';
import theme from '@/util/theme';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-inter: ${inter.style.fontFamily};
          }
        `}
      </style>
      <ChakraProvider theme={theme}>
        <BlahProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </BlahProvider>
      </ChakraProvider>
    </>
  );
}
