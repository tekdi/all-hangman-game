// utils.js

export const getRandomWord = words => {
    return words[Math.floor(Math.random() * words.length)];
  };
  

 export const handleLanguageSwitch=(lang)=>{
    console.log(lang);
    localStorage.setItem('apphomelang',lang);
  }