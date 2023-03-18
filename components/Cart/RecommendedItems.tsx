import { useRecommendations } from '@/hooks/useRecommendations';
import { Icon, IconButton, Text, Flex } from '@chakra-ui/react';
import { HiOutlinePlusSm } from 'react-icons/hi';
import CartItem from './CartItem';

type RecommendedItemsProps = {
  onClick: () => void;
};

export default function RecommendedItems({ onClick }: RecommendedItemsProps) {
  const { loading, error, data } = useRecommendations();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{JSON.stringify(error)}</Text>;

  return (
    <>
      <Text fontSize="xl" fontWeight={500} mb={3}>
        Recommended Items
      </Text>

      {data?.map(({ id, title, src }) => (
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
            onClick={onClick}
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
      ))}
    </>
  );
}
