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
        question: "1. What is a process?",
        options: ["A program in execution", "An instance of a program", "A program counter", "All of the above"],
        answer: 0
    },
    {
        question: "2. What is virtual memory?",
        options: ["A technique to extend RAM", "A file system", "A process", "None of the above"],
        answer: 0
    },
    {
        question: "3. In operating systems, what is the function of the kernel?",
        options: ["To load drivers", "To handle memory management", "To manage input/output operations", "Both b and c"],
        answer: 3
    },
    {
        question: "4. UNIX is written in which language?",
        options: ["C#", "C++", "C", ".Net"],
        answer: 2
    },
    {
        question: "5. What else is a command interpreter called?",
        options: ["Prompt", "kernel", "command", "shell"],
        answer: 3
    },
    {
        question: "6. What is the main function of the command interpreter?",
        options: ["to provide the interface between the API and application program", "to handle the files in the operating system", "to get and execute the next user-specified command", "none"],
        answer: 2
    },
    {
        question: "7. Which one of the following is not a real time operating system?",
        options: ["RTlinxu", "Palm OS", "QNX", "VxWorks"],
        answer: 1
    },
    {
        question: "8.  In a timeshare operating system, when the time slot assigned to a process is completed, the process switches from the current state to?",
        options: ["Suspended state", "Terminated state", "Ready state", "Blocked state"],
        answer: 2
    },
    {
        question: "9.The operating system keeps a small table containing information about all open files called ____________",
        options: ["file table", " directory table", "open-file table", "system table"],
        answer: 2
    },
    {
        question: "10. On systems where there are multiple operating system, the decision to load a particular one is done by _____________",
        options: ["PCB", "file control block", "bootstrap", "boot loader"],
        answer: 3
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
