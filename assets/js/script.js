// 1. WHEN I click the start button, THEN a timer starts and I am presented with a question//

// 2. WHEN I answer a question incorrectly, THEN time is subtracted from the clock//

// 3. WHEN all questions are answered or the timer reaches 0, THEN the game is over//

// 4. WHEN the game is over, THEN I can save my initials and score//


// Create your HTML Page via DOM Methods here!

// We access the <body> element by using `document.body`
var body = document.body;

// Add a centered h1
// We create HTML elements by passing the element by name to `createElement()`
// and storing the value in a variable
var h1El = document.createElement('h1');

// We add text by using the `textContent` property
h1El.textContent = 'Welcome to my page';

// We add style by using the `setAttribute()` method
h1El.setAttribute('style', 'margin:auto; width:50%; text-align:center;');

// We append the newly created element to the DOM using `appendChild()`
body.appendChild(h1El);


submitButton.addEventListener('click', showResults);

const myQuestions = [
  {
    question: "Commonly used data types DO Not include:",
    answers: {
      1: "strings",
      2: "booleans",
      3: "alerts"
    },
    correctAnswer: "2"
  },
  {
    question: "Which one of these is a JavaScript package manager?",
    answers: {
      a: "Node.js",
      b: "TypeScript",
      c: "npm"
    },
    correctAnswer: "c"
  },
  {
    question: "Which tool can you use to ensure code quality?",
    answers: {
      a: "Angular",
      b: "jQuery",
      c: "RequireJS",
      d: "ESLint"
    },
    correctAnswer: "d"
  }
];

  function buildQuiz(){
    // variable to store the HTML output
    const output = [];
  
    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
  
        // variable to store the list of possible answers
        const answers = [];
  
        // and for each available answer...
        for(letter in currentQuestion.answers){
  
          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }
  
        // add this question and its answers to the output
        output.push(
          `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join('')} </div>`
        );
      }
    );
  
    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  // we'll want to store the list of answer choices
const answers = [];

// and for each available answer...
for(letter in currentQuestion.answers){

  // ...add an html radio button
  answers.push(
    `<label>
      <input type="radio" name="question${questionNumber}" value="${letter}">
      ${letter} :
      ${currentQuestion.answers[letter]}
    </label>`
  );
}

// add this question and its answers to the output
output.push(
  `<div class="question"> ${currentQuestion.question} </div>
  <div class="answers"> ${answers.join('')} </div>`
);