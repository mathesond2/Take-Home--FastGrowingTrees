import { Center, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import { PropsWithChildren } from 'react';

const thumbnailSize = '110';

type CartItemProps = {
  src: string;
  alt: string;
  midSection?: JSX.Element;
};

export default function CartItem({ src, alt, midSection, children }: PropsWithChildren<CartItemProps>) {
  return (
    <Flex mb={4}>
      <Image src={src} alt={alt} width={thumbnailSize} height={thumbnailSize} />
      {midSection}
      <Center ml="auto">{children}</Center>
    </Flex>
  );
}
