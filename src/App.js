import './App.css';
import HangmanGame from './Hanging-Man/HangingMan';
import { Box, Text } from '@chakra-ui/react';

function App() {
  return (
    <div className="">
      <Text textAlign={'center'} fontSize={'30px'} fontWeight={'600'}>Hangman Game</Text>
      <Box mt={'10%'}>
      <HangmanGame/>
      </Box>
    </div>
  );
}

export default App;
