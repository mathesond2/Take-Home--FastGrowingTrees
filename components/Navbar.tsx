import { Container, Flex, Link } from '@chakra-ui/react';

export default function Navbar() {
  return (
    <Container maxW="full" as="header" borderBottomWidth="1px" paddingX={10} paddingY={6}>
      <Flex justifyContent="space-between" alignItems="center">
        <Link href="/" _hover={{ textDecoration: 'none' }} fontWeight="extrabold">
          Fastest Growing Trees SVG
        </Link>
        <p>cart here</p>
      </Flex>
    </Container>
  );
}
