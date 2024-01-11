import React, { useState, useEffect } from "react";
import {
  Button,
  VStack,
  Heading,
  Text,
  HStack,
  Select,
  Box,
} from "@chakra-ui/react";
import "./HangingMan.css";
import {
  generateAnimalHint,
  generateActorsHint,
  generateBirdHint,
  generateCountriesHint,
} from "../utils/hintGenerator";
import Topics from "../Components/Topics";

const HangmanGame = () => {
  const topics = ["Animal", "Actors", "Bird", "Countries"];
  const words = ["Java", "React", "Html"];
  const [word, setWord] = useState("");
  const [guessedWord, setGuessedWord] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [maxIncorrectGuesses] = useState(10);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem("apphomelang") || "en"
  );
  const [hint, setHint] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  
  // useEffect(() => {
  //   targetWords.map((word, index) => {
  //     words.push(word.contentSourceData[0].text);
  //   });
  // }, [words]);

  useEffect(() => {
    renderAlphabet();
  }, [currentLang]);

  useEffect(() => {
    resetGame();
  }, []);

  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
    resetGame(topic);
  };

  const generateHint = (topic, word) => {
    switch (topic) {
      case "Animal":
        return generateAnimalHint(word);
      case "Actors":
        return generateActorsHint(word);
      case "Bird":
        return generateBirdHint(word);
      case "Countries":
        return generateCountriesHint(word);
      default:
        return ``;
    }
  };

  const resetGame = (topic) => {
    let wordsForTopic = [];

    switch (topic) {
      case "Animal":
        wordsForTopic = [
          "lion",
          "elephant",
          "giraffe"
        ];
        break;
      case "Actors":
        wordsForTopic = [
          "dicaprio",
          "johansson",
          "hanks"
        ];
        break;
      case "Bird":
        wordsForTopic = [
          "sparrow",
          "eagle",
          "hummingbird"
        ];
        break;
      case "Countries":
        wordsForTopic = ["usa", "india", "france"];
        break;
      default:
        wordsForTopic = ["default", "words", "for", "unknown", "topic"];
        break;
    }

    const randomWord =
      wordsForTopic[Math.floor(Math.random() * wordsForTopic.length)];
    setWord(randomWord.toLowerCase());
    setGuessedWord(Array(randomWord.length).fill("_"));
    setIncorrectGuesses(0);
    setGameWon(false);
    setGameLost(false);
    setHint(generateHint(topic, randomWord));
  };

  const handleGuess = (letter) => {
    if (!gameWon && !gameLost) {
      if (word.includes(letter)) {
        setGuessedWord((prevGuessedWord) =>
          word
            .split("")
            .map((char, index) =>
              char === letter ? letter : prevGuessedWord[index]
            )
        );
      } else {
        setIncorrectGuesses((prevIncorrectGuesses) => prevIncorrectGuesses + 1);
      }
    }
  };

  useEffect(() => {
    if (guessedWord.join("") !== "" && guessedWord.join("") === word) {
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
          bg={gameWon && letter !== "_" ? "green.100" : "transparent"}
          className={gameWon && letter !== "_" ? "BounceAnimation" : ""}
        >
          {letter}
        </Text>
      ))}
    </HStack>
  );

  const renderAlphabet = () => {
    const alphabetRowsEnglish = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

    const alphabetRowsTamil = ["அஆஇஈஉஎஏஐ", "கஙசஞடணதநபம", "யரலவழளறன"];
    const alphabetRowsKannada = ["ಅಆಇಈಉಎಏಐ", "ಕಖಗಘಙಚಛಜಝಟಠಡಢಣ", "ತಥದಧನಪಫಬಭಮ"];
    const lang = currentLang;
    const alphabetRows =
      lang === "en"
        ? alphabetRowsEnglish
        : lang === "ta"
        ? alphabetRowsTamil
        : alphabetRowsKannada;

    return alphabetRows.map((row, rowIndex) => (
      <HStack key={rowIndex} spacing="1">
        {row.split("").map((letter, colIndex) => (
          <Button
            key={letter}
            w={"40px"}
            onClick={() => handleGuess(letter)}
            bg={colIndex % 2 === 0 ? "blue.100" : "blue.300"}
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
    <line x1="0" y1="3" x2="10000" y2="80" stroke="black" strokeWidth="3" />,
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

  return (
    <VStack spacing="4" align="center">
      <Box pos={"absolute"} top={20}>
       <Topics topics={topics} handleTopicChange={handleTopicChange}/>
      </Box>

      <Text>{hint}</Text>
      {/* 
      <Button onClick={()=> setCurrentLang('en')}>
        Switch to English
      </Button>
      <Button onClick={()=>  setCurrentLang('ta')}>
        Switch to Tamil
      </Button>
      <Button onClick={ ()=> setCurrentLang('kn')}>
        Switch to Kannad
      </Button> */}

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

      {(gameLost || gameWon) && (
        <Button
          bg={"purple"}
          colorScheme="purple"
          p={"10px"}
          color={"white"}
          borderRadius={"20px"}
          onClick={resetGame}
        >
          Next
        </Button>
      )}
    </VStack>
  );
};

export default HangmanGame;
