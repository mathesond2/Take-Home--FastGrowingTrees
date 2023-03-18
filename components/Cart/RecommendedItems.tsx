import { Text } from '@chakra-ui/react';
import { useRecommendations } from '@/hooks/useRecommendations';
import CartItem from './CartItem';
export default function RecommendedItems() {
  const { loading, error, data } = useRecommendations();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{JSON.stringify(error)}</Text>;

  return (
    <>
      <Text fontSize="xl" fontWeight={500} mb={3}>
        Recommended Items
      </Text>
      {/* {JSON.stringify(data)} */}

      {data?.map(({ id, title, src }) => (
        <CartItem
          key={id}
          src={src}
          alt={title}
          midSection={
            <Text fontSize="lg" fontWeight={500}>
              {title}
            </Text>
          }
        />
      ))}
    </>
  );
}
