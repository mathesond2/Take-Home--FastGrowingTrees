import {
  Box,
  Icon,
  IconButton,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { BsCart4 } from 'react-icons/bs';
import { useRef } from 'react';

export default function Cart() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Open
      </Button>

      <Box onClick={onOpen}>
        <IconButton
          ref={btnRef}
          aria-label="cart"
          icon={<Icon as={BsCart4} />}
          bgColor="transparent"
          _hover={{ bgColor: 'transparent' }}
        />
        {/* <CartCounter /> */}
      </Box>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Create your account</DrawerHeader>
          <DrawerCloseButton />

          <DrawerBody></DrawerBody>

          <DrawerFooter>
            <p>footer</p>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
