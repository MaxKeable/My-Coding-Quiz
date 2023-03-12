var questionEl = document.getElementById('questions');
var questionTitle = document.getElementById('question-title');
var choises = document.getElementById('choices');
var startButton = document.getElementById('start');
var startScreen = document.getElementById('start-screen');
var questionHeading = document.getElementById('question-title');
var endScreen = document.getElementById('end-screen');
var score = document.getElementById('final-score');
var currentQuestion = '';
var option1 = document.getElementById('optoin-1');
var option2 = document.getElementById('optoin-2');
var option3 = document.getElementById('optoin-3');
var option4 = document.getElementById('optoin-4');
var highscoreBtn = document.getElementById('highscoreButton');
var highscoreScreen = document.getElementById('highscore-screen');
var initualsStore = document.getElementById('initials');
var submitButton = document.getElementById('submit');
var questionCounter = 0;
var audioCorrect = document.getElementById("myAudioCorrect");
var audioIncorrect = document.getElementById("myAudioIncorrect");
var timerEl = document.getElementById('time');
var timerDisplay = document.querySelector('.timer');
var timer;
var timeLeft = 60;


startButton.addEventListener('click', function (){
    startScreen.style.display = "none";
    questionEl.style.display = "block";
    timerFunction();
    currentQuestion = questions[questionCounter].title;
    questionHeading.textContent = currentQuestion;
    option1.textContent = questions[questionCounter].choices[0];
    option2.textContent = questions[questionCounter].choices[1];
    option3.textContent = questions[questionCounter].choices[2];
    option4.textContent = questions[questionCounter].choices[3];
});

function nextquestion(event){
    if (event.target.textContent === questions[questionCounter].answer){
        audioCorrect.play();
    } else if (event.target.textContent !== questions[questionCounter].answer){
        audioIncorrect.play();
        timeLeft -= 15;
    };
    questionCounter ++;
    if (questionCounter == questions.length){
        questionEl.style.display = "none";
        endScreen.style.display = "block";
        if (timeLeft >= 0){
        score.textContent = timeLeft;
    } else {
        score.textContent = "0";
    }
        clearInterval(timer);
        return;
    };
    currentQuestion = questions[questionCounter].title;
    questionHeading.textContent = currentQuestion;
    option1.textContent = questions[questionCounter].choices[0];
    option2.textContent = questions[questionCounter].choices[1];
    option3.textContent = questions[questionCounter].choices[2];
    option4.textContent = questions[questionCounter].choices[3];
};

option1.addEventListener('click', nextquestion);
option2.addEventListener('click', nextquestion);
option3.addEventListener('click', nextquestion);
option4.addEventListener('click', nextquestion);

function timerFunction (){
    timer = setInterval(function(){
        timeLeft --;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0){
            clearInterval();
        }
    }, 1000);
};

submitButton.addEventListener('click', function(value){
var highscoreDisplay;
if (timeLeft >= 0) {
    highscoreDisplay = timeLeft;
} else if (timeLeft < 0){
    highscoreDisplay = '0';
};
if (highscoreDisplay > localStorage.getItem('score')){
localStorage.setItem("inituals", initualsStore.value);
localStorage.setItem("score", highscoreDisplay);
}
questionEl.style.display = "none";
startScreen.style.display = "none";
endScreen.style.display = "none";
highscoreScreen.style.display = "block";
timerEl.style.display = "none";
timerDisplay.style.display = "none";
clearInterval();
document.getElementById("initial-display").innerHTML = localStorage.getItem("inituals");
document.getElementById("highscore-display").innerHTML = localStorage.getItem('score');
});


highscoreBtn.addEventListener('click', function(){
    questionEl.style.display = "none";
    startScreen.style.display = "none";
    endScreen.style.display = "none";
    highscoreScreen.style.display = "block";
    timerEl.style.display = "none";
    timerDisplay.style.display = "none";
    clearInterval();
document.getElementById("initial-display").innerHTML = localStorage.getItem("inituals");
document.getElementById("highscore-display").innerHTML = localStorage.getItem('score');
});

// prompt question
// Have multiple choise questoins
// Answer correct or incorrect 
// adjust time considering correct or incorrect 
// store results 
// write results to highscores
