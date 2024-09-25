let currentQuestionIndex = 0;
let score = 0;
let selectedAnswers = [];
let questions = [];

const username = localStorage.getItem("username") || "User";
document.getElementById("username").textContent = username;

fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    
    questions = getRandomQuestions(data.questions, 10);
    loadQuestion(currentQuestionIndex);
    startTimer();
  })
  .catch(error => console.error('Error loading questions:', error));

let timeLeft = 240;
const timerElement = document.getElementById("timer");

function startTimer() {
  const timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      submitExam();
    } else {
      timeLeft--;
      let minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60;
      timerElement.textContent = `Time Left: ${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    }
  }, 1000);
}

const questionText = document.getElementById("question");
const optionButtons = document.querySelectorAll(".option-btn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");

function loadQuestion(index) {
  let q = questions[index];
  questionText.textContent = q.question;
  optionButtons.forEach((btn, idx) => {
    btn.textContent = q.options[idx];
    btn.classList.remove("selected");
    if (selectedAnswers[index] === idx) {
      btn.classList.add("selected");
    }
  });
}

optionButtons.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    selectedAnswers[currentQuestionIndex] = idx;
    optionButtons.forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
  });
});

prevBtn.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion(currentQuestionIndex);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);
  }
});

submitBtn.addEventListener("click", () => {
  if (checkIfAllQuestionsAnswered()) {
    submitExam();
  } else {
    alert("Please answer all questions before submitting.");
  }
});

function checkIfAllQuestionsAnswered() {
  return selectedAnswers.length === questions.length && selectedAnswers.every(answer => answer !== undefined);
}

function submitExam() {
  calculateScore();
  showResultsPage();
}

function calculateScore() {
  score = 0;
  questions.forEach((q, index) => {
    if (selectedAnswers[index] === q.answer) {
      score++;
    }
  });
}

function showResultsPage() {
  const resultMessage = score === 10 
    ? `Congratulations, you got ${score}/10!`
    : score < 5 
    ? `Your mark is low, you scored ${score}/10.`
    : `You scored ${score}/10.`;

  localStorage.setItem('examResult', resultMessage);
  window.location.href = 'results.html';
}

function getRandomQuestions(questions, numQuestions) {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  
  return questions.slice(0, numQuestions);
}
