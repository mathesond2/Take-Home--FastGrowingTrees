import { extendTheme } from '@chakra-ui/react';

const fontStack = `var(--font-inter), sans-serif`;
const theme = extendTheme({
  fonts: {
    heading: fontStack,
    body: fontStack,
    mono: fontStack,
  },
});

export default theme;
