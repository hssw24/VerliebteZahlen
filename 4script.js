let pairs = [
    [1, 9], [2, 8], [3, 7], [4, 6], [5, 5]
];

let currentMode = 0;
let currentQuestion = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let startTime;
let timerInterval;

function startExercise(mode) {
    currentMode = mode;
    currentQuestion = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    document.getElementById('menu').style.display = 'none';
    document.getElementById('exercise').style.display = 'block';
    
    if (mode === 1) {
        startTime = new Date();
        nextQuestion(true);
    } else if (mode === 2) {
        startTime = new Date();
        timerInterval = setInterval(updateTimer, 100);
        nextQuestion(true);
    }
}

function updateTimer() {
    let elapsedTime = new Date() - startTime;
    let remainingTime = 90000 - elapsedTime;
    document.getElementById('timer').innerText = `Verbleibende Zeit: ${(remainingTime / 1000).toFixed(1)}s`;

    if (remainingTime <= 0) {
        clearInterval(timerInterval);
        showResult();
    }
}

function nextQuestion(isInitial) {
    if (currentMode === 1 && currentQuestion >= 20) {
        showResult();
        return;
    }
    if (!isInitial) {
        wrongAnswers++;
    }
    
    let pair = pairs[Math.floor(Math.random() * pairs.length)];
    let correctAnswer = pair[1];
    document.getElementById('question').innerText = `Welches ist das verliebte Zahl-Paar von ${pair[0]}?`;
    
    let answersHtml = '';
    pairs.forEach(p => {
        answersHtml += `<button onclick="checkAnswer(this, ${p[1]}, ${correctAnswer})">${p[1]}</button>`;
    });
    document.getElementById('answers').innerHTML = answersHtml;

    currentQuestion++;
}

function checkAnswer(button, selected, correct) {
    if (selected === correct) {
        correctAnswers++;
        button.classList.add('correct');
    } else {
        wrongAnswers++;
        button.classList.add('wrong');
    }
    setTimeout(() => {
        nextQuestion(true);
    }, 1000);
}

function showResult() {
    document.getElementById('exercise').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    let resultMessage = '';
    if (currentMode === 1) {
        let totalTime = (new Date() - startTime) / 1000;
        resultMessage = `Du hast 20 Aufgaben in ${totalTime.toFixed(1)} Sekunden geschafft.`;
    } else if (currentMode === 2) {
        resultMessage = `In 90 Sekunden hast du ${correctAnswers} richtige und ${wrongAnswers} falsche Aufgaben geschafft.`;
    }
    resultMessage += `\nRichtige Antworten: ${correctAnswers}\nFalsche Antworten: ${wrongAnswers}`;
    document.getElementById('resultMessage').innerText = resultMessage;
}

function reset() {
    document.getElementById('menu').style.display = 'block';
    document.getElementById('exercise').style.display = 'none';
    document.getElementById('result').style.display = 'none';
    if (timerInterval) {
        clearInterval(timerInterval);
    }
}
