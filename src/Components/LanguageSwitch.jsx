// LanguageSwitch.js

import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';

const LanguageSwitch = ({ currentLanguage, onSelectLanguage }) => {
  return (
    <Box mt={'50px'}>
      <Text mb={2}>Current Language: {currentLanguage}</Text>
      <Button bg={'green'} color={'white'} p={'2'} borderRadius={'20'} onClick={onSelectLanguage}>
        Switch Language
      </Button>
    </Box>
  );
};

export default LanguageSwitch;
