import { Box } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import Navbar from './Navbar';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <Box paddingX={10}>{children}</Box>
    </>
  );
}
