import '@/styles/globals.css';
import { BlahProvider } from '@/util/BlahContext';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <BlahProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </BlahProvider>
    </ChakraProvider>
  );
}
