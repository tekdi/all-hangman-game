import React, { useState, useEffect } from 'react';
import { Button, VStack, Heading, Text, HStack, Box, Flex } from '@chakra-ui/react';
import './HangingMan.css';
import LanguageSwitch from '../Components/LanguageSwitch';

const HangmanGame = ({ sourceChars=[], targetWords=[], handleSuccess=[] }) => {
  const words = ["Ajinkya","Sanjay", "Pande"];
  const [word, setWord] = useState('');
  const [guessedWord, setGuessedWord] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [maxIncorrectGuesses] = useState(10);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);


  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem('apphomelang') || 'en');

  const handleLanguageSwitch = () => {
    const newLanguage = currentLanguage === 'en' ? 'ta' : currentLanguage === 'ta' ? 'kn' : 'en';
    setCurrentLanguage(newLanguage);
    localStorage.setItem('apphomelang', newLanguage);
  };

  // useEffect(() => {
  //   targetWords.map((word, index) => {
  //     words.push(word.contentSourceData[0].text);
  //   });
  // }, [words]);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord.toLowerCase());
    setGuessedWord(Array(randomWord.length).fill('_'));
    setIncorrectGuesses(0);
    setGameWon(false);
    setGameLost(false);
  };

  const handleGuess = letter => {
    if (!gameWon && !gameLost) {
      if (word.includes(letter)) {
        setGuessedWord(prevGuessedWord =>
          word
            .split('')
            .map((char, index) =>
              char === letter ? letter : prevGuessedWord[index]
            )
        );
      } else {
        setIncorrectGuesses(prevIncorrectGuesses => prevIncorrectGuesses + 1);
      }
    }
  };

  useEffect(() => {
    // console.log(guessedWord.join('') , word);

    if (guessedWord.join('') !== '' && guessedWord.join('') === word) {
      setGameWon(true);
    } else if (incorrectGuesses + 1 >= maxIncorrectGuesses) {
      setGameLost(true);
    }
  }, [guessedWord, word, incorrectGuesses, maxIncorrectGuesses]);

  const renderWord = () => (
    <HStack spacing="5">
      {guessedWord.map((letter, index) => (
        <Text
          key={index}
          bg={gameWon && letter !== '_' ? 'green.100' : 'transparent'}
        >
          {letter}
        </Text>
      ))}
    </HStack>
  );

  const renderAlphabet = () => {
    const alphabetRowsEnglish = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

    const alphabetRowsTamil = ['அஆஇஈஉஎஏஐ', 'கஙசஞடணதநபம', 'யரலவழளறன'];

    //   const alphabetRowsTamil = [
    //     'அஆஇஈஉ',
    //     'எஏஐஒஓஔ',
    //     'கஙசஞட',
    //     'ணதநபம',
    //     'யரலவழ',
    //     'ளறனஹ',
    //   ];

    const alphabetRowsKannada = ['ಅಆಇಈಉಎಏಐ', 'ಕಖಗಘಙಚಛಜಝಟಠಡಢಣ', 'ತಥದಧನಪಫಬಭಮ'];
    const lang = localStorage.getItem('apphomelang');
    const alphabetRows =
      lang === 'en'
        ? alphabetRowsEnglish
        : lang === 'ta'
        ? alphabetRowsTamil
        : alphabetRowsKannada;


    return alphabetRows.map((row, rowIndex) => (
      <HStack key={rowIndex} spacing="1">
        {row.split('').map((letter, colIndex) => (
          <Button
            key={letter}
            w={'40px'}
            onClick={() => handleGuess(letter)}
            bg={colIndex % 2 === 0 ? 'blue.100' : 'blue.300'}
            isDisabled={guessedWord.includes(letter) || gameWon || gameLost}
          >
            {letter}
          </Button>
        ))}
      </HStack>
    ));
  };

  const hangmanGraphics = [
    <line x1="2" y1="3" x2="0" y2="1000" stroke="black" strokeWidth="5" />, // Pole
    <line x1="0" y1="3" x2="10000" y2="80" stroke="black" stroke-width="3" />,
    <line x1="40" y1="10" x2="40" y2="30" stroke="black" strokeWidth="3" />, // Pole
    <circle
      cx="40"
      cy="50"
      r="20"
      stroke="black"
      strokeWidth="3"
      fill="white"
    />, // Head
    <line x1="40" y1="70" x2="40" y2="110" stroke="black" strokeWidth="3" />, // Body
    <line x1="40" y1="80" x2="10" y2="60" stroke="black" strokeWidth="3" />, // Left Arm
    <line x1="40" y1="80" x2="70" y2="60" stroke="black" strokeWidth="3" />, // Right Arm
    <line x1="40" y1="110" x2="10" y2="140" stroke="black" strokeWidth="3" />, // Left Leg
    <line x1="40" y1="110" x2="70" y2="140" stroke="black" strokeWidth="3" />, // Right Leg
  ];

  const hangmanDisplay = hangmanGraphics.slice(0, incorrectGuesses);

//   const hangmanDisplay = incorrectGuesses > 0 ? (
//     <svg width="90" height="145">
//       {hangmanGraphics.slice(0, incorrectGuesses + 4)}
//     </svg>
//   ) : null;

  //   const renderHangman = () => <Text fontSize="xl">Incorrect Guesses: {incorrectGuesses}</Text>;

  return (
    <VStack mt={'10%'} spacing="4" align="center">
      <HStack>
        <Flex position={'absolute'} left={10}>
        {/* <LanguageSwitch currentLanguage={currentLanguage} onSelectLanguage={handleLanguageSwitch} /> */}
        </Flex>

      <Heading as="h1" fontSize={'30px'}>Hangman Game</Heading>
      </HStack>
      {gameLost ? (
        <Text color="red.500">
          You lost! The word was: {word} <br />
        </Text>
      ) : null}
      {gameWon ? (
        <Text color="green.500">
          You won! The word is: {word} <br />
        </Text>
      ) : null}
      {/* {renderHangman()} */}

      <svg width="90" height="145">
        {hangmanDisplay}
      </svg>
      <VStack spacing="2">{renderWord()}</VStack>
      <VStack spacing="2">{renderAlphabet()}</VStack>

      {(gameLost || gameWon) && <Button bg={'purple'} colorScheme='purple' p={'10px'} color={'white'} borderRadius={'20px'} onClick={resetGame}>Next</Button>}
    </VStack>
  );
};

export default HangmanGame;
