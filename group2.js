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
        question: "1.What is the paging in the operating system?",
        options: ["Memory management scheme", "Network management scheme", "Internet management scheme", "None"],
        answer: 0
    },
    {
        question: "2.Which of the following binary formats support the Linux operating system?",
        options: ["0 and 1", "Binary Number Format", "ELF Binary Format", "None"],
        answer: 2
    },
    {
        question: "3.To access the services of operating system, the interface is provided by the..",
        options: ["System calls ", "API", "library", "assembly instructions"],
        answer: 3
    },
    {
        question: "4.The systems which allows only one process execution at a time, are called",
        options: ["uniprogramming systems", "unitasking systems", "uniprocessing systems", "none"],
        answer: 0
    },
    {
        question: "5. In operating system, each process has its own..",
        options: ["address space and global variables", "pending alarms, signals and signal handlers", "open files", "all"],
        answer: 3
    },
    {
        question: "6. What is a semaphore?",
        options: ["Signaling variable", " Scheduling algorithm", " Memory manager", "Hardware Interrupt"],
        answer:  0
    },
    {
        question: "7. Which file system uses journaling?",
        options: ["FAT32", "NTFS", "exFAT", "Both B and C"],
        answer: 3
    },
    {
        question: "8. The ready queue is generally stored as..",
        options: ["Array", "Stack", "Linked List", "None"],
        answer: 1
    },
    {
        question: "9. Which of the following isn’t directly related to the operating system?",
        options: ["BIOS", "Software Programs", "Hardware devices", "All"],
        answer: 2
    },
    {
        question: "10. IF the displayed time and date is wrong,you can reset it using..",
        options: ["write", "calendar", "write file", "control panel"],
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
