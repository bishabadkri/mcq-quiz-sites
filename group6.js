let currentQuestionIndex = 0;
let score = 0;
let timeRemaining = 30;
let timer;

const startQuizBtn = document.getElementById('startQuizBtn');
const rulesSection = document.getElementById('rulesSection');
const quizSection = document.getElementById('quizSection');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextQuestionBtn = document.getElementById('nextQuestionBtn');
const restartBtn = document.getElementById('restartBtn');
const animationElement = document.getElementById('animationContainer');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const correctAnswerElement = document.getElementById('correctAnswer');

const popupElement = document.createElement('div'); // For end-of-quiz popup
popupElement.id = "popupMessage";
document.body.appendChild(popupElement);

const questions = [
    {
        question: "1.In which part of the operating system is the kernel located?",
        options: ["application space", "User space", "system space", "hardware layer"],
        answer: 2
    },
    {
        question: "2. Which of the following is an example of a hybrid operating system?",
        options: ["Windows XP", "Linux", "Windows NT", "macOS"],
        answer: 3
    },
    {
        question: "3.In an operating system, which of the following resources is managed by the file system?",
        options: [" CPU Cycles", "Memory Pages", "Disk storage", "Network Bandwidth"],
        answer: 2
    },
    {
        question: "4.Which Android version introduced Material Design?",
        options: ["Kitkat", "Lollipop", "Marshmallow", "Jelly Bean"],
        answer: 1
    },
    {
        question: "5. Which type of operating system would most likely be used for embedded systems like smart devices and appliances?",
        options: ["Batch OS", "RTOS", "Time sharing OS", "Distributed OS"],
        answer: 1
    },
    {
        question: "6. What type of operating system is iOS?",
        options: ["Closed-source", "Open-source", "Hybrid", "Linux-based"],
        answer: 0
    },
    {
        question: "7.Which of the following is an example of a distributed operating system?",
        options: ["MS Windows", "Linux", "Google chrome OS", "Google's Android"],
        answer: 2
    },
    {
        question: "8.Which type of operating system is specifically designed to guarantee the timely execution of critical tasks?",
        options: ["Batch OS", " Real Time  OS", " Time Sharing OS", "Network OS"],
        answer: 1
    },
    {
        question: "9.Which iOS version introduced Face ID?",
        options: ["iOS 13", " iOS 12", "iOS 11", "iOS 10"],
        answer: 2
    },
    {
        question: "10.Which of the following is a feature unique to iOS devices for app management?",
        options: ["Widgets", "App Clips", " App Drawer", "App Locks"],
        answer: 1
    },
    

];

startQuizBtn.addEventListener('click', showRules);
document.getElementById('understandBtn').addEventListener('click', showQuiz);
nextQuestionBtn.addEventListener('click', showNextQuestion);
restartBtn.addEventListener('click', restartQuiz);

function showRules() {
    document.getElementById('welcomeSection').style.display = 'none';
    rulesSection.style.display = 'block';
}

function showQuiz() {
    rulesSection.style.display = 'none';
    quizSection.style.display = 'block';
    displayQuestion();
    startTimer();
}

function displayQuestion() {
    correctAnswerElement.style.display = 'none';
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    optionsElement.innerHTML = ''; // Clear previous options

    currentQuestion.options.forEach((option, index) => {
        const optionBtn = document.createElement('div');
        optionBtn.classList.add('option');
        optionBtn.innerText = option;
        optionBtn.addEventListener('click', () => checkAnswer(index));
        optionsElement.appendChild(optionBtn);
    });
}

function checkAnswer(selectedIndex) {
    clearInterval(timer); // Stop the timer when an answer is selected
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedIndex === currentQuestion.answer) {
        score += 10;
        showAnimation("🎉 Correct Answer! 🎉", "celebrate");
    } else {
        score -= 10;
        correctAnswerElement.innerText = `Correct Answer: ${currentQuestion.options[currentQuestion.answer]}`;
        correctAnswerElement.style.display = 'block';
        showAnimation("😢 Incorrect Answer! 😢", "sad");
    }
    scoreElement.innerText = `Score: ${score}`;
    nextQuestionBtn.style.display = 'block'; // Show the next question button after answering
}

function showNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        nextQuestionBtn.style.display = 'none'; // Hide the button again
        displayQuestion();
        startTimer();
    } else {
        endQuiz();
    }
}

function startTimer() {
    timeRemaining = 30;
    timerElement.innerText = `Time: ${timeRemaining}s`;

    timer = setInterval(() => {
        timeRemaining--;
        timerElement.innerText = `Time: ${timeRemaining}s`;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            showBigMessage("Time's Up, moving to next question");
            score -= 10; // Deduct score for timeout
            scoreElement.innerText = `Score: ${score}`;
            nextQuestionBtn.style.display = 'block'; // Show next button after timeout
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                setTimeout(() => {
                    displayQuestion();
                    startTimer(); // Restart timer for the next question
                }, 2000); // Small delay for "Time's Up" message
            } else {
                endQuiz();
            }
        }
    }, 1000);
}

function showBigMessage(message) {
    animationElement.style.display = 'block';
    animationElement.style.fontFamily = "'Archivo Black', sans-serif";
    animationElement.style.fontSize = "36px";
    animationElement.style.color = "orange";
    animationElement.innerText = message;

    setTimeout(() => {
        animationElement.style.display = 'none';
    }, 2000);
}

function endQuiz() {
    clearInterval(timer); // Stop the timer completely at the end
    quizSection.style.display = 'none';
    showPopup("Thank You!!! See you again <3");
}

function showAnimation(message, type) {
    animationElement.style.display = 'block';
    animationElement.innerText = message;

    if (type === "celebrate") {
        animationElement.style.backgroundColor = 'green';
    } else if (type === "sad") {
        animationElement.style.backgroundColor = 'red';
    }

    setTimeout(() => {
        animationElement.style.display = 'none';
    }, 1500);
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    displayQuestion();
    startTimer();
    restartBtn.style.display = 'none';
    scoreElement.innerText = `Score: ${score}`;
}

function showPopup(message) {
    popupElement.innerHTML = message;
    popupElement.style.position = "fixed";
    popupElement.style.top = "50%";
    popupElement.style.left = "50%";
    popupElement.style.transform = "translate(-50%, -50%)";
    popupElement.style.padding = "20px";
    popupElement.style.backgroundColor = "#4caf50";
    popupElement.style.color = "white";
    popupElement.style.fontSize = "24px";
    popupElement.style.fontFamily = "'Archivo Black', sans-serif";
    popupElement.style.borderRadius = "10px";
    popupElement.style.textAlign = "center";
    popupElement.style.zIndex = "1000";
    popupElement.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.3)";
    popupElement.style.animation = "popupAnimation 1.5s ease-in-out";

    setTimeout(() => {
        popupElement.style.display = "none";
    }, 3000);
}
