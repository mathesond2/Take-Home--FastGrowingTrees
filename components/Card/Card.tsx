import { Box, Card, CardBody, CardFooter, Text } from '@chakra-ui/react';
import ImageWithFallback from '../ImageWithFallback';
import styles from './Card.module.css';

const imgHeight = '15.75rem';
const imgWidth = '17.5rem';
const textMaxWidth = '8.625rem';

type ItemCardProps = {
  imgSrc: string;
  title: string;
};

export default function ItemCard({ imgSrc, title }: ItemCardProps): JSX.Element {
  return (
    <Card
      display="inline-flex"
      size="lg"
      borderRadius="md"
      borderColor="rgba(196, 196, 196, 0.75)"
      borderWidth={1}
      boxShadow="0 2px 4px 0 rgba(0, 0, 0, 0.1)"
    >
      <CardBody p="0" overflow="hidden">
        <Box position={'relative'} h={imgHeight} w={imgWidth} borderTopRadius="lg">
          {/* NOTE: tweak 'sizes' further as design develops, and consider generating solid color blurred images within getStaticProps */}
          <ImageWithFallback
            src={imgSrc}
            alt={title}
            className={styles.image}
            style={{ objectFit: 'cover' }}
            fill
            sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 100vw,
          100vw"
            fallbackSrc="https://via.placeholder.com/280x252.png?text=?"
            // placeholder='blur'
          />
        </Box>
      </CardBody>
      <CardFooter paddingX={4} py={4} justifyContent="center">
        <Text fontSize="md" maxW={textMaxWidth} overflowWrap="break-word" textAlign="center">
          {title}
        </Text>
      </CardFooter>
    </Card>
  );
}
