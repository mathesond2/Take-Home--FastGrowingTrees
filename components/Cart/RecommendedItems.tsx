import { useCart } from '@/util/CartContext';
import { Flex, Icon, IconButton, Text } from '@chakra-ui/react';
import { HiOutlinePlusSm } from 'react-icons/hi';
import CartItem from './CartItem';

export default function RecommendedItems() {
  const { recommendationData, setCart } = useCart();
  const { loading, error, data } = recommendationData;

  if (loading) return <Text>Loading...</Text>;
  if (error) return null;

  return (
    <>
      <Text fontSize="xl" fontWeight={500} mb={3}>
        Recommended Items
      </Text>
      {data?.map((product) => {
        const { id, title, src } = product;
        return (
          <CartItem
            key={id}
            src={src}
            alt={title}
            midSection={
              <Flex alignItems="center" h="100%">
                <Text fontSize="lg" fontWeight={500} ml={5}>
                  {title}
                </Text>
              </Flex>
            }
          >
            <IconButton
              onClick={() => {
                setCart((prev) => {
                  const newCart = prev?.length ? [...prev] : [];
                  newCart.push(product);
                  return newCart;
                });
              }}
              aria-label={`add recommended item (${title})`}
              icon={<Icon as={HiOutlinePlusSm} boxSize={7} color="black" />}
              bgColor="transparent"
              borderStyle="solid"
              borderWidth={3}
              _hover={{
                bgColor: 'transparent',
              }}
              isRound
              borderColor="black"
              size="md"
            />
          </CartItem>
        );
      })}
    </>
  );
}
