import { Flex, Link } from '@chakra-ui/react';
import Image from 'next/image';
import iconSVG from '../public/icon.svg';
import Cart from './Cart';

export default function Navbar() {
  return (
    <Flex justifyContent="space-between" alignItems="center" mb={10}>
      <Link href="/" _hover={{ textDecoration: 'none' }}>
        <Image src={iconSVG} alt="cluster of trees" />
      </Link>
      <Cart />
    </Flex>
  );
}
