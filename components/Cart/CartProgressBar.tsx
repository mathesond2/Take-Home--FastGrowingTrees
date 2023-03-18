import { formatUSD } from '@/util';
import { Progress, Text, VStack } from '@chakra-ui/react';

export default function CartProgressBar({ cartSubtotal }: { cartSubtotal: number }) {
  const FREE_SHIPPING_THRESHOLD = 150;
  const percentageToFreeShipping = Math.min(cartSubtotal / FREE_SHIPPING_THRESHOLD, 1) * 100;

  if (!cartSubtotal)
    return (
      <VStack spacing={3} alignItems="normal" mb={8}>
        <Text fontSize="sm" textAlign="center">
          Free shipping on orders over ${FREE_SHIPPING_THRESHOLD}
        </Text>
      </VStack>
    );

  if (cartSubtotal >= FREE_SHIPPING_THRESHOLD)
    return (
      <VStack spacing={3} alignItems="normal" mb={8}>
        <Text fontSize="sm" textAlign="center">
          You qualify for free shipping!
        </Text>
        <Progress colorScheme="green" height={2.5} value={percentageToFreeShipping} />
      </VStack>
    );

  return (
    <VStack spacing={3} alignItems="normal" mb={8}>
      <Text fontSize="sm" textAlign="center">
        Youre <b>{formatUSD(FREE_SHIPPING_THRESHOLD - cartSubtotal)}</b> away from free shipping!
      </Text>
      <Progress colorScheme="green" height={2.5} value={percentageToFreeShipping} />
    </VStack>
  );
}
