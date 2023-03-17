import { formatUSD, primaryRed } from '@/util';
import { useCart } from '@/util/CartContext';
import {
  Box,
  Center,
  Circle,
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
  VStack,
  HStack,
  Divider,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { IoCart, IoCartOutline, IoTrash } from 'react-icons/io5';
import { HiOutlineMinusSm, HiOutlinePlusSm } from 'react-icons/hi';
import CartItem from './CartItem';
import CartProgressBar from './CartProgressBar';

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

  const CartCounter = () => (
    <Box position="absolute" right={-2} top={-1.5}>
      <Circle size={5} bg={primaryRed} fontSize="xs">
        <Text color="white">{cart?.length}</Text>
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
          {...sharedIconButtonProps}
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
            {cart?.map(({ id, title, price, src, alt }) => (
              <CartItem
                key={id}
                src={src}
                alt={alt || title}
                midSection={
                  <VStack spacing={4} alignItems="normal" ml={5}>
                    <Text fontWeight={500}>{title}</Text>
                    <Text>{formatUSD(price)}</Text>
                    <HStack>
                      <IconButton
                        onClick={() => {
                          const numItems = cart?.filter((item) => item.id === id).length || 0;
                          if (numItems > 1) {
                            const itemIndex = cart.findIndex((item) => item.id === id);
                            if (itemIndex > -1) {
                              setCart((prev) => {
                                const newCart = [...prev];
                                newCart.splice(itemIndex, 1);
                                return newCart;
                              });
                            }
                          }
                        }}
                        aria-label={`decrease item quantity by one (${title})`}
                        icon={<Icon as={HiOutlineMinusSm} boxSize={5} color="black" />}
                        borderColor="black"
                        size="xs"
                        {...sharedIconButtonProps}
                        borderWidth={2}
                      />
                      <Text fontSize="lg" fontWeight={500} paddingX={3}>
                        1
                      </Text>
                      <IconButton
                        onClick={() => {
                          const foundItem = cart?.find((item) => item.id === id);
                          if (foundItem) {
                            setCart((prev) => [...prev, foundItem]);
                          }
                        }}
                        aria-label={`increase item quantity by one (${title})`}
                        icon={<Icon as={HiOutlinePlusSm} boxSize={5} color="black" />}
                        borderColor="black"
                        size="xs"
                        {...sharedIconButtonProps}
                        borderWidth={2}
                      />
                    </HStack>
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
            <Divider marginY={3} borderColor="#D7DAD2" borderWidth="3px" />
            <Text fontSize="xl" fontWeight={500}>
              Recommended Items
            </Text>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
