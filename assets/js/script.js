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

// Assigned to setInterval() return value.
var quizTimer;
// The unit here is seconds.
var timeToAnswer = 90;
// The index of the current question from the `questions` array above.
var currentQuestionIndex = -1;
// Incremented each time a correct answer is chosen.
var currentScore = 0;

const timerLabel = $("#timer-label");
const intro = $("#intro");
const startBtn = $("#start-btn");
const answerButtonsContainer = $("#answer-buttons-container");
const prompt = $("#prompt");
const answerButtons = [
  $("#answer1"),
  $("#answer2"),
  $("#answer3"),
  $("#answer4")
]
const rightWrongContainer = $("#right-wrong");

function startQuiz() {
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
}

startBtn.click(startQuiz);

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

  const currentAnswers = currentQuestion.answers;
  for (var i = 0; i < currentAnswers.length; i++) {
    let currentAnswer = currentAnswers[i];
    answerButtons[i].text((i + 1) + ". " + currentAnswer.text);
    answerButtons[i].data("correct", currentAnswer.correct);
    answerButtons[i].click(selectAnswer);
  }
}

function selectAnswer() {
  const isCorrect = $(this).data("correct");
  rightWrongContainer.show();

  if (isCorrect) {
    currentScore++;
    $("#right-wrong p").text("Correct!");
  } else {
    $("#right-wrong p").text("Wrong!");
  }

  displayNextQuestion();
}

function showFinalScore() {
  $("#final-score").show();
  answerButtonsContainer.hide();
  rightWrongContainer.hide();
  timerLabel.hide();
  clearInterval(quizTimer);
}
