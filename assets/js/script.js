// 1. WHEN I click the start button, THEN a timer starts and I am presented with a question

// 2. WHEN I answer a question incorrectly, THEN time is subtracted from the clock

// 3. WHEN all questions are answered or the timer reaches 0, THEN the game is over

// 4. WHEN the game is over, THEN I can save my initials and score

const questions = [
  {
    question: "Commonly used data types DO NOT include ________.",
    answers: [
      { text: "strings", correct: false },
      { text: "booleans", correct: false },
      { text: "alerts", correct: true },
      { text: "numbers", correct: false }
    ]
  },
  {
    question: "The condition in an if / else statement is enclosed with ________.",
    answers: [
      { text: "quotes", correct: false },
      { text: "curly brackets", correct: false },
      { text: "parentheses", correct: true },
      { text: "square brackets", correct: false }
    ]
  },
  {
    question: "Arrays in JavaScript can be used to store ________.",
    answers: [
      { text: "numbers and strings", correct: false },
      { text: "other arrays", correct: false },
      { text: "booleans", correct: false },
      { text: "all of the above", correct: true }
    ]
  },
  {
    question: "String values must be enclosed within ________ when being assigned to variables.",
    answers: [
      { text: "commas", correct: false },
      { text: "curly brackets", correct: false },
      { text: "quotes", correct: true },
      { text: "parentheses", correct: false }
    ]
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: [
      { text: "Javascript", correct: false },
      { text: "terminal/bash", correct: false },
      { text: "for loops", correct: false },
      { text: "console.log", correct: true }
    ]
  }
]

// Used to reset `timeToAnswer` after we get final score.
const defaultTimeToAnswer = 90;
const timePenaltyForWrongAnswer = 10;
const defaultQuestionIndex = -1;

// Assigned to setInterval() return value.
var quizTimer;
// The unit here is seconds.
var timeToAnswer = defaultTimeToAnswer;
// The index of the current question from the `questions` array above.
var currentQuestionIndex = defaultQuestionIndex;
// Incremented each time a correct answer is chosen.
var currentScore = 0;

const timerLabel = $("#timer-label");
const intro = $("#intro");
const startBtn = $("#start-btn");
const answerButtonsContainer = $("#answer-buttons-container");
const prompt = $("#prompt");
const rightWrongContainer = $("#right-wrong");

// Start button starts the timer and begins showing questions.
startBtn.click(function () {
  updateTimerLabel();
  timerLabel.show();
  intro.hide();
  startBtn.hide();
  answerButtonsContainer.show();

  // Start the repeating timer.
  quizTimer = setInterval(function () {
    timeToAnswer--;
    updateTimerLabel();
  }, 1000);

  // Display the first question.
  displayNextQuestion();
});

function updateTimerLabel() {
  timerLabel.text("Time: " + timeToAnswer);
}

function displayNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex >= questions.length) {
    // No more questions to display.
    showFinalScore();
    return
  }

  const currentQuestion = questions[currentQuestionIndex];
  prompt.text(currentQuestion.question);

  answerButtonsContainer.empty();
  const currentAnswers = currentQuestion.answers;
  for (var i = 0; i < currentAnswers.length; i++) {
    let currentAnswer = currentAnswers[i];
    answerButtonsContainer.append(
      createAnswerButton(i, currentAnswer)
    )
  }
}

function createAnswerButton(index, answer) {
  let answerButton = document.createElement("button");
  answerButton.className = "btn btn-primary";
  answerButton.innerText = (index + 1) + ". " + answer.text;
  answerButton.dataset.correct = answer.correct;
  answerButton.addEventListener("click", selectedAnswer);
  return answerButton;
}

function selectedAnswer() {
  const isCorrect = $(this).data("correct");
  rightWrongContainer.show();

  if (isCorrect) {
    currentScore++;
    $("#right-wrong p").text("Correct!");
  } else {
    applyPenalty();
    $("#right-wrong p").text("Wrong!");
  }

  displayNextQuestion();
}

function applyPenalty() {
  timeToAnswer -= timePenaltyForWrongAnswer;
  updateTimerLabel();
}

function showFinalScore() {
  answerButtonsContainer.hide();
  rightWrongContainer.hide();
  timerLabel.hide();

  clearInterval(quizTimer);
  $("#final-score-container").show();
  $("#final-score").text("Your final score is: " + currentScore);
  $("#final-score-container button").click(saveFinalScore);
}

function saveFinalScore(event) {
  // https://api.jquery.com/event.preventdefault
  event.preventDefault();

  const inputInitials = $("#initials-input").val();
  if (inputInitials.trim() === "") {
    alert("Please enter your initials!")
    return
  } else {
    addHighscore(inputInitials, currentScore);
  }
  timeToAnswer = defaultTimeToAnswer;
  currentQuestionIndex = defaultQuestionIndex;
}

// Returns an object containing pairs of initials to high scores.
function getCurrentHighscores() {
  let currentHighscores = localStorage.getItem("highscores");
  if (currentHighscores == null) {
    return {};
  } else {
    return JSON.parse(currentHighscores);
  }
}

function addHighscore(initials, score) {
  const capitalInitials = initials.toUpperCase();
  let currentHighscores = getCurrentHighscores();

  if (score > currentHighscores[capitalInitials]) {
    currentHighscores[capitalInitials] = score
    localStorage.setItem("highscores", JSON.stringify(currentHighscores));
  }
}
