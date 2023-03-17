import { ParsedProduct } from '@/types/data';
import { useCart } from '@/util/CartContext';
import { Button } from '@chakra-ui/react';

export default function AddToCartButton({ product }: { product: ParsedProduct }) {
  const { setItem } = useCart();
  return (
    <Button
      bgColor="#CD0100"
      color="white"
      size="lg"
      onClick={() => {
        setItem(product);
      }}
    >
      Add to Cart
    </Button>
  );
}
