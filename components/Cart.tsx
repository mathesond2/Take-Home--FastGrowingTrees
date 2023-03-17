import { primaryRed } from '@/util';
import { useCart } from '@/util/CartContext';
import {
  Box,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useRef } from 'react';
import { IoCart, IoCartOutline, IoTrash } from 'react-icons/io5';

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

const thumbnailSize = '110';

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
              <Flex key={id} mb={4}>
                <Image src={src} alt={alt || title} width={thumbnailSize} height={thumbnailSize} />
                <VStack spacing={4} alignItems="normal" ml={5}>
                  <Text fontWeight={500}>{title}</Text>
                  <Text>${price}</Text>
                </VStack>
                <Center ml="auto">
                  <IconButton
                    onClick={() => {
                      setCart((prev) => prev?.filter((item) => item.id !== id));
                    }}
                    aria-label="remove from cart"
                    icon={<Icon as={IoTrash} boxSize={6} color={primaryRed} />}
                    borderColor={primaryRed}
                    {...sharedIconButtonProps}
                  />
                </Center>
              </Flex>
            ))}
          </DrawerBody>

          <DrawerFooter>
            <Text>footer</Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
