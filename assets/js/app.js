var timeEl = document.querySelector('#time');
var mainEl = document.querySelector('#main');
var startQuizEl = document.querySelector('#start');
var highScoreEl = document.querySelector('#highscores');
var score = 0;
var questions = getQuestions();
function getQuestions() {
    var request = new XMLHttpRequest();
    request.open("GET", "./assets/js/questions.json", false);
    request.send(null)
    var my_JSON_object = JSON.parse(request.responseText);
    return my_JSON_object;
}
function countdown(timeLeft) {
    var timeInterval = setInterval(function () {
        var text = "";
        if (timeLeft > 1) {
            text = 'Time: ' + timeLeft + ' seconds remaining';
            timeLeft--;
        } else if (timeLeft === 1) {
            text = 'Time: ' + timeLeft + ' second remaining';
            timeLeft--;
        } else {
            clearInterval(timeInterval);
            timerEndedDoSomething();
        }
        timeEl.textContent = text;
    }, 1000);
}
function timerEndedDoSomething() {

}

function toggleHighScores() {
    // Toggled high scores, stop timer, stop IP quiz and display high scores
}
function oneWrong() {

}
function startQuiz() {

}
function loadHighscores() {

}
highScoreEl.addEventListener('click', function () {
    toggleHighScores();
})
startQuizEl.addEventListener('click', function () {
    startQuiz();
})