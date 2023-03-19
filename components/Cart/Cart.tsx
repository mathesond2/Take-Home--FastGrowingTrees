import { formatUSD, primaryRed } from '@/util';
import { useCart } from '@/util/CartContext';
import {
  Box,
  Center,
  Circle,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { IoCart, IoCartOutline, IoTrash } from 'react-icons/io5';
import CartItem from './CartItem';
import CartItemIncrementor from './CartItemIncrementor';
import CartProgressBar from './CartProgressBar';
import RecommendedItems from './RecommendedItems';

const dividerGray = '#D7DAD2';
const primaryGreen = '#155343';

const inlineStyles = {
  closeIcon: {
    position: 'absolute',
    left: '1.5rem',
    top: '1rem',
    fontSize: '1.5rem',
    color: primaryGreen,
  },
};

const iconButtonProps = {
  bgColor: 'transparent',
  borderStyle: 'solid',
  borderWidth: 3,
  _hover: {
    bgColor: 'transparent',
  },
  isRound: true,
};

export const cartCounterId = 'cart-counter';

function filterUniqueItems(arr: unknown[] | undefined) {
  if (!arr) return [];

  const seenItems = new Set();
  return arr.filter((item) => {
    const itemString = JSON.stringify(item);
    if (!seenItems.has(itemString)) {
      seenItems.add(itemString);
      return true;
    }
    return false;
  });
}

export default function Cart() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const { cart, setCart } = useCart();
  const uniqueCart = filterUniqueItems(cart);
  const cartSubtotal = cart?.reduce((acc, { price }) => acc + price, 0) || 0;

  const CartCounter = () => (
    <Box position="absolute" right={-2} top={-1.5}>
      <Circle size={5} bg={primaryRed} fontSize="xs">
        <Text color="white" data-testid={cartCounterId}>
          {cart?.length}
        </Text>
      </Circle>
    </Box>
  );

  return (
    <>
      <Box onClick={onOpen} position="relative">
        <IconButton
          ref={btnRef}
          aria-label="cart"
          icon={<Icon as={IoCart} boxSize={6} />}
          borderColor="initial"
          {...iconButtonProps}
        />
        {cart && cart.length > 0 && <CartCounter />}
      </Box>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton size="lg" _hover={{ bgColor: 'transparent' }} sx={inlineStyles.closeIcon} />
          <DrawerHeader>
            <Center>
              <Icon as={IoCartOutline} boxSize={10} color={primaryGreen} />
            </Center>
          </DrawerHeader>

          <DrawerBody>
            <CartProgressBar cartSubtotal={cartSubtotal} />
            {uniqueCart.map(({ id, title, price, src, alt }) => {
              const itemQuantity = cart?.filter((item) => item.id === id).length || 0;
              return (
                <CartItem
                  key={id}
                  src={src}
                  alt={alt || title}
                  midSection={
                    <CartItemIncrementor
                      title={title}
                      price={price}
                      quantity={itemQuantity}
                      onClickLeft={() => {
                        if (itemQuantity > 1) {
                          const itemIndex = cart!.findIndex((item) => item.id === id);
                          if (itemIndex > -1) {
                            setCart((prev) => {
                              const newCart = prev?.length ? [...prev] : [];
                              newCart.splice(itemIndex, 1);
                              return newCart;
                            });
                          }
                        }
                      }}
                      onClickRight={() => {
                        const foundItem = cart!.find((item) => item.id === id);
                        if (foundItem) {
                          setCart((prev) => prev && [...prev, foundItem]);
                        }
                      }}
                    />
                  }
                >
                  <IconButton
                    onClick={() => {
                      setCart((prev) => prev?.filter((item) => item.id !== id));
                    }}
                    aria-label="remove from cart"
                    icon={<Icon as={IoTrash} boxSize={6} color={primaryRed} />}
                    borderColor={primaryRed}
                    {...iconButtonProps}
                  />
                </CartItem>
              );
            })}
            {cartSubtotal > 0 && (
              <Flex mt={4} justifyContent="space-between">
                <Text fontSize="lg" fontWeight={500}>
                  Subtotal
                </Text>
                <Text fontSize="lg" data-testid="subtotal">
                  {formatUSD(cartSubtotal)}
                </Text>
              </Flex>
            )}
            <Divider marginY={3} borderColor={dividerGray} borderWidth={4} />
            <RecommendedItems />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
