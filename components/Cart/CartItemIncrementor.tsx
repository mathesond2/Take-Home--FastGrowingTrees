import { formatUSD } from '@/util';
import { HStack, Icon, IconButton, Text, VStack } from '@chakra-ui/react';
import { HiOutlineMinusSm, HiOutlinePlusSm } from 'react-icons/hi';

const iconButtonProps = {
  bgColor: 'transparent',
  borderStyle: 'solid',
  borderWidth: 2,
  _hover: {
    bgColor: 'transparent',
  },
  isRound: true,
  borderColor: 'black',
  size: 'xs',
};

const iconProps = {
  boxSize: 5,
  color: 'black',
};

type CartItemIncrementorProps = {
  title: string;
  price: number;
  quantity: number;
  onClickLeft: () => void;
  onClickRight: () => void;
};

export default function CartItemIncrementor({
  title,
  price,
  quantity,
  onClickLeft,
  onClickRight,
}: CartItemIncrementorProps) {
  return (
    <VStack spacing={4} alignItems="normal" ml={5}>
      <Text fontWeight={500}>{title}</Text>
      <Text>{formatUSD(price)}</Text>
      <HStack>
        <IconButton
          onClick={onClickLeft}
          aria-label={`decrease quantity by one (${title})`}
          icon={<Icon as={HiOutlineMinusSm} {...iconProps} />}
          {...iconButtonProps}
        />
        <Text fontSize="lg" fontWeight={500} paddingX={3} data-testid={`quantity of ${title.toLowerCase()}`}>
          {quantity}
        </Text>
        <IconButton
          onClick={onClickRight}
          aria-label={`increase quantity by one (${title})`}
          icon={<Icon as={HiOutlinePlusSm} {...iconProps} />}
          {...iconButtonProps}
        />
      </HStack>
    </VStack>
  );
}
