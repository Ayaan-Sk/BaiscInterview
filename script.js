// Question Dataset
const questions = {
    frontend: [
        {
            id: 1,
            text: "Explain the difference between '==' and '===' in JavaScript.",
            context: "Focus on type coercion and why strict equality is generally preferred in modern development."
        },
        {
            id: 2,
            text: "What is the Virtual DOM and how does React use it to optimize rendering?",
            context: "Describe the reconciliation process and the concept of 'diffing'."
        },
        {
            id: 3,
            text: "Explain CSS Specificity. How does the browser decide which styles to apply?",
            context: "Mention the hierarchy (ID, Class, Element) and !important."
        },
        {
            id: 4,
            text: "What are JavaScript Closures? Provide a practical use case.",
            context: "Discuss lexical scoping and data encapsulation."
        }
    ],
    backend: [
        {
            id: 1,
            text: "Explain the Node.js Event Loop.",
            context: "How does Node handle non-blocking I/O despite being single-threaded?"
        },
        {
            id: 2,
            text: "What is the difference between SQL and NoSQL databases?",
            context: "Compare scaling (vertical vs horizontal) and schema flexibility."
        },
        {
            id: 3,
            text: "Describe the principles of RESTful API design.",
            context: "Mention HTTP methods, statelessness, and resource-based URIs."
        }
    ],
    behavioral: [
        {
            id: 1,
            text: "Tell me about a time you faced a difficult challenge at work and how you overcame it.",
            context: "Use the STAR method: Situation, Task, Action, Result."
        },
        {
            id: 2,
            text: "Why do you want to work for this company?",
            context: "Research the company's values and mission beforehand."
        },
        {
            id: 3,
            text: "How do you handle conflict within a team?",
            context: "Focus on communication, empathy, and finding a professional resolution."
        }
    ]
};

// State Variables
let currentCategory = null;
let currentQuestionIndex = 0;
let timerInterval = null;
let secondsElapsed = 0;

// DOM Elements
const heroSection = document.getElementById('hero-section');
const dashboardSection = document.getElementById('dashboard-section');
const practiceSection = document.getElementById('practice-section');
const questionText = document.getElementById('question-text');
const questionContext = document.getElementById('question-context');
const answerInput = document.getElementById('answer-input');
const questionCounter = document.getElementById('question-counter');
const categoryLabel = document.getElementById('category-label');
const timerDisplay = document.getElementById('timer');
const header = document.getElementById('header');

// Navigation Logic
function showSection(sectionId) {
    [heroSection, dashboardSection, practiceSection].forEach(s => s.style.display = 'none');
    if (sectionId === 'hero') {
        heroSection.style.display = 'block';
    } else if (sectionId === 'dashboard') {
        dashboardSection.style.display = 'grid';
    } else if (sectionId === 'practice') {
        practiceSection.style.display = 'block';
    }
    window.scrollTo(0, 0);
}

// Timer Logic
function startTimer() {
    clearInterval(timerInterval);
    secondsElapsed = 0;
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        secondsElapsed++;
        updateTimerDisplay();
    }, 1000);
}

function updateTimerDisplay() {
    const mins = Math.floor(secondsElapsed / 60).toString().padStart(2, '0');
    const secs = (secondsElapsed % 60).toString().padStart(2, '0');
    timerDisplay.textContent = `${mins}:${secs}`;
}

// Question Loading
function loadQuestion() {
    const categoryQuestions = questions[currentCategory];
    const question = categoryQuestions[currentQuestionIndex];
    
    questionText.style.opacity = 0;
    setTimeout(() => {
        questionText.textContent = question.text;
        questionContext.textContent = question.context;
        questionCounter.textContent = `${currentQuestionIndex + 1} / ${categoryQuestions.length}`;
        categoryLabel.textContent = currentCategory.toUpperCase();
        answerInput.value = '';
        questionText.style.opacity = 1;
    }, 200);
}

// Event Listeners
document.getElementById('hero-cta').addEventListener('click', () => showSection('dashboard'));
document.getElementById('start-btn-nav').addEventListener('click', () => showSection('dashboard'));

document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        currentCategory = card.getAttribute('data-category');
        currentQuestionIndex = 0;
        showSection('practice');
        loadQuestion();
        startTimer();
    });
});

document.getElementById('next-btn').addEventListener('click', () => {
    if (currentQuestionIndex < questions[currentCategory].length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
});

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
});

document.getElementById('submit-btn').addEventListener('click', () => {
    if (confirm("Are you sure you want to finish this practice session?")) {
        clearInterval(timerInterval);
        alert(`Good job! You practiced for ${Math.floor(secondsElapsed / 60)} minutes and ${secondsElapsed % 60} seconds.`);
        showSection('dashboard');
    }
});

document.getElementById('nav-home').addEventListener('click', (e) => {
    e.preventDefault();
    showSection('hero');
});

document.getElementById('nav-dashboard').addEventListener('click', (e) => {
    e.preventDefault();
    showSection('dashboard');
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Initial Setup
showSection('hero');
