// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const readlineSync = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};
//Iterates through word and checks indexes of the array for 
//The matching letters in the word.  Then uses the key as our scoring value.
function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
//Here we are taking user input and using it as our word parameter.
function initialPrompt() {
   console.log("Let's play some scrabble!");
   const word = readlineSync.question("Enter a word to score:");
   console.log(oldScrabbleScorer(word));
   return word;
   
   
};

//New point structure with individual keys and scoring for each key of the array.
let newPointStructure = {
   'a': 1, 'b': 3, 'c': 3, 'd': 2, 'e': 1, 'f': 4, 
  'g': 2, 'h': 4, 'i': 1, 'j': 8, 'k': 5, 'l': 1, 
  'm': 3, 'n': 1, 'o': 1, 'p': 3, 'q': 10, 'r': 1, 
  's': 1, 't': 1, 'u': 1, 'v': 4, 'w': 4, 'x': 8, 
  'y': 4, 'z': 10

};
//Testing values:
// console.log("Scrabble scoring values for");
// console.log("letter a: ", newPointStructure.a);
// console.log("letter j: ", newPointStructure.j);
// console.log("letter z: ", newPointStructure["z"]);

// let simpleScorer;

//This function simply adds 1 to each word adding
//up to the length of the word.
function simpleScorer(word){
   let numScore = 0;
   for (i = 0; i < word.length; i++){
      numScore += 1;
   }
   return numScore;

}



// let vowelBonusScorer;

//This checks and assigns a bonus score to vowels.
//It iterates through the word checking each to see if it is a vowel
//If it is it will get 3 points, if not it will get 1.
function vowelBonusScorer(word){
   let score = 0;
   for(i = 0; i < word.length; i++){
      if (['A','E','I','O','U'].includes(word[i].toUpperCase())){
         score += 3;
      } else {
         score += 1
      }
   
   }
   return score;
   }



// let scrabbleScorer;
function scrabbleScorer(word) {
   word = word.toLowerCase();
   let score = 0;
   for (let i = 0; i < word.length; i++) {
     score += newPointStructure[word[i]];
   }
   return score;
 }

//Here we create objects for each of the scoring algorithms
//Each object calls our algorithm function.
//First time through I used oldScrabbleSorer under scrabble point system.

const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer
   },
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, constants are 1 pt. ",
      scorerFunction: vowelBonusScorer
   },
   {
      name: "scrabble",
      description: "Uses scrabble point system.",
      scorerFunction: scrabbleScorer
   }
];

   
   
//Prompting the user to select which algorithm to use.
//Uses our objects above.
function scorerPrompt() {
   console.log("Which scoring algorithm would you like to use? ");
   console.log("0 - Simple: One point per character");
   console.log("1 - Vowel Bonus: Vowels are worth 3 points");
   console.log("2 - Scrabble: Uses scrabble point system");
   let algorithmIndex = readlineSync.question("Enter 0, 1, or 2: ");
   return scoringAlgorithms[algorithmIndex];
 }

//Here we take our index in oldPointStructure, and find the letter in new
//point structure to transform it to use the new poiint system.
function transform(oldPointStructure) {
   let newPointStructure = {};
   for (let pointValue in oldPointStructure){
      let letters = oldPointStructure[pointValue];
      for(let i = 0; i < letters.length; i++) {
         let letter = letters[i].toLowerCase();
         newPointStructure[letter] = parseInt(pointValue);
      }

   }
   return newPointStructure;

}

newPointStructure = transform(oldPointStructure);
//This is for running the program, I call functions and assign them to veriables to use for the final score of the word.
function runProgram() {
let word = initialPrompt();
let selectedAlgorithm = scorerPrompt();
let score = selectedAlgorithm.scorerFunction(word);
console.log(`Score for ${word}:\n${score}`);
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
