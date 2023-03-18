import { Flex } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import iconSVG from '../public/icon.svg';
import Cart from './Cart/Cart';

export default function Navbar() {
  return (
    <Flex justifyContent="space-between" alignItems="center" mb={10}>
      <Link href="/">
        <Image src={iconSVG} alt="cluster of trees" />
      </Link>
      <Cart />
    </Flex>
  );
}
