import { Text, VStack } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

type DetailCardProps = {
  title: string;
  body: string;
};

export default function DetailCard({ title, body, children }: PropsWithChildren<DetailCardProps>): JSX.Element {
  return (
    <VStack spsacing={4} alignItems="normal" bgColor="white" p={4} w={'330px'} h="fit-content">
      <Text fontSize="4xl" fontWeight={500} lineHeight={10}>
        {title}
      </Text>
      <Text fontWeight={500}>About</Text>
      <Text lineHeight={6}>{body}</Text>
      {children}
    </VStack>
  );
}
