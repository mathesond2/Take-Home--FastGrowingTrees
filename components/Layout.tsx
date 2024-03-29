import theme from '@/util/theme';
import { Box, Container } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import Navbar from './Navbar';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Container maxW="full" paddingX={14} paddingY={9}>
      <Navbar />
      <Container maxW={theme.sizes.container.xl} paddingX={0}>
        <Box>{children}</Box>
      </Container>
    </Container>
  );
}
