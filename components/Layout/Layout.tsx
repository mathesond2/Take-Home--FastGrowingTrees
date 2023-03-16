import { Box, Container } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import Navbar from '../Navbar';
import styles from './Layout.module.css';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Container maxW="full" paddingX={14} paddingY={9} className={styles.background}>
      <Navbar />
      <Box>{children}</Box>
    </Container>
  );
}
