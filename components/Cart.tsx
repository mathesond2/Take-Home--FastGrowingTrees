import { primaryRed, formatUSD } from '@/util';
import { useCart } from '@/util/CartContext';
import {
  Flex,
  Box,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  IconButton,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { IoCart, IoCartOutline, IoTrash } from 'react-icons/io5';
import CartItem from './CartItem';

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

const sharedIconButtonProps = {
  bgColor: 'transparent',
  borderStyle: 'solid',
  borderWidth: 3,
  _hover: {
    bgColor: 'transparent',
  },
  isRound: true,
};

export default function Cart() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const { cart, setCart } = useCart();
  const cartSubtotal = cart?.reduce((acc, { price }) => acc + price, 0) || 0;

  return (
    <>
      <Box onClick={onOpen}>
        <IconButton
          ref={btnRef}
          aria-label="cart"
          icon={<Icon as={IoCart} boxSize={6} />}
          borderColor="initial"
          {...sharedIconButtonProps}
        />
        {/* <CartCounter /> */}
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
            {cart?.map(({ id, title, price, src, alt }) => (
              <CartItem
                key={id}
                src={src}
                alt={alt || title}
                midSection={
                  <VStack spacing={4} alignItems="normal" ml={5}>
                    <Text fontWeight={500}>{title}</Text>
                    <Text>{formatUSD(price)}</Text>
                  </VStack>
                }
              >
                <IconButton
                  onClick={() => {
                    setCart((prev) => prev?.filter((item) => item.id !== id));
                  }}
                  aria-label="remove from cart"
                  icon={<Icon as={IoTrash} boxSize={6} color={primaryRed} />}
                  borderColor={primaryRed}
                  {...sharedIconButtonProps}
                />
              </CartItem>
            ))}
            {cartSubtotal > 0 && (
              <Flex mt={4} justifyContent="space-between">
                <Text fontSize="lg" fontWeight={500}>
                  Subtotal
                </Text>
                <Text fontSize="lg">{formatUSD(cartSubtotal)}</Text>
              </Flex>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Text>footer</Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
