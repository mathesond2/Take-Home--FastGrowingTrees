import { ParsedProduct } from '@/types/data';
import { primaryRed } from '@/util';
import { useCart } from '@/context/CartContext';
import { Button } from '@chakra-ui/react';

export default function AddToCartButton({ product }: { product: ParsedProduct }) {
  const { setCart } = useCart();
  return (
    <Button
      bgColor={primaryRed}
      _hover={{ bgColor: primaryRed }}
      color="white"
      size="lg"
      onClick={() => {
        setCart((prev) => [...(prev || []), product]);
      }}
    >
      Add to Cart
    </Button>
  );
}
