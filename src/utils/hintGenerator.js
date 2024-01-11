
export const generateAnimalHint = (word) => {
  switch (word) {
    case "lion":
      return "Hint: A wild cat known for its majestic mane.";
    case "elephant":
      return "Hint: The world's largest land animal with a trunk.";
    case "giraffe":
      return "Hint: A tall, long-necked African mammal.";
    // Add more hints for other animal words
    default:
      return "Hint: Discover interesting facts about this animal!";
  }
};


export const generateActorsHint = (word) => {
  switch (word) {
    case "dicaprio":
      return "Hint: An Oscar-winning actor known for his environmental activism.";
    case "johansson":
      return "Hint: A versatile actress with roles in The Avengers and Lost in Translation.";
    case "hanks":
      return "Hint: An iconic actor known for his roles in Forrest Gump and Cast Away.";
    // Add more hints for other actor names
    default:
      return "Hint: Explore the filmography of this actor!";
  }
};

export const generateBirdHint = (word) => {
  switch (word) {
    case "sparrow":
      return "Hint: A small bird with brown and gray plumage.";
    case "eagle":
      return "Hint: A powerful bird of prey with a hooked beak.";
    case "hummingbird":
      return "Hint: The smallest bird, known for its rapid wing movements.";
    // Add more hints for other bird names
    default:
      return "Hint: Learn interesting facts about this bird!";
  }
};

export const generateCountriesHint = (word) => {
  switch (word) {
    case "usa":
      return "Hint: The country with the Statue of Liberty and Hollywood.";
    case "india":
      return "Hint: Known for the Taj Mahal and diverse cultural heritage.";
    case "france":
      return "Hint: Famous for the Eiffel Tower and delicious cuisine.";
    // Add more hints for other country names
    default:
      return "Hint: Explore the landmarks and culture of this country!";
  }
};
