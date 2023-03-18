import { formatUSD } from '@/util';
import { Progress, Text, VStack } from '@chakra-ui/react';

export default function CartProgressBar({ cartSubtotal }: { cartSubtotal: number }) {
  const FREE_SHIPPING_THRESHOLD = 150;
  const percentageToFreeShipping = Math.min(cartSubtotal / FREE_SHIPPING_THRESHOLD, 1) * 100;

  const getText = () => {
    if (!cartSubtotal) {
      return `Free shipping on orders over ${formatUSD(FREE_SHIPPING_THRESHOLD)}`;
    }
    if (cartSubtotal >= FREE_SHIPPING_THRESHOLD) {
      return 'You qualify for free shipping!';
    }
    return `You're ${formatUSD(FREE_SHIPPING_THRESHOLD - cartSubtotal)} away from free shipping`;
  };

  return (
    <VStack spacing={3} alignItems="normal" mb={8}>
      <Text fontSize="sm" textAlign="center">
        {getText()}
      </Text>
      {cartSubtotal && <Progress colorScheme="green" height={2.5} value={percentageToFreeShipping} />}
    </VStack>
  );
}
