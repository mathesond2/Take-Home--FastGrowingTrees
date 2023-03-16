import { Card, CardBody, CardFooter, Image, Text } from '@chakra-ui/react';

const cardImgMaxHeight = '252px';
const textMaxWidth = '138px';

export default function ItemCard() {
  return (
    <Card
      maxW="sm"
      borderRadius="md"
      borderColor="rgba(196, 196, 196, 0.75)"
      borderWidth={1}
      boxShadow="0 2px 4px 0 rgba(0, 0, 0, 0.1)"
    >
      <CardBody p="0">
        <Image
          src="https://cdn.shopify.com/s/files/1/0059/8835/2052/products/Cold_Hardy_Avocado_FGT_600x600_94a0fedf-56ac-4470-aed8-b24bc2a20132.jpg?v=1612444134"
          alt="Cold Hardy Avocado Tree"
          borderTopRadius="md"
          maxH={cardImgMaxHeight}
          objectFit="cover"
          w="100%"
          fallbackSrc="https://via.placeholder.com/280x280.png?text=?"
        />
      </CardBody>
      <CardFooter paddingX={4} py={4} justifyContent="center">
        <Text fontSize="md" maxW={textMaxWidth} overflowWrap="break-word" textAlign="center">
          Cold Hardy Avocado Tree
        </Text>
      </CardFooter>
    </Card>
  );
}
