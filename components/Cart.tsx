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
  Icon,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { IoCart, IoCartOutline } from 'react-icons/io5';

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

export default function Cart() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { item } = useCart();

  return (
    <>
      <Box onClick={onOpen}>
        <IconButton
          ref={btnRef}
          aria-label="cart"
          icon={<Icon as={IoCart} boxSize={6} />}
          bgColor="transparent"
          borderStyle="solid"
          borderColor="initial"
          borderWidth={2}
          _hover={{ bgColor: 'transparent' }}
          isRound
        />
        {/* <CartCounter /> */}
      </Box>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton size="lg" _hover={{ bgColor: 'transparent' }} style={inlineStyles.closeIcon} />
          <DrawerHeader>
            <Center>
              <Icon as={IoCartOutline} boxSize={10} color={primaryGreen} />
            </Center>
          </DrawerHeader>

          <DrawerBody>
            <p>{JSON.stringify(item)}</p>
          </DrawerBody>

          <DrawerFooter>
            <p>footer</p>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
