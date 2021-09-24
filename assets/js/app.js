var timeEl = document.querySelector('#time');
var mainEl = document.querySelector('#main');
var startQuizEl = document.querySelector('#start');
var highScoreEl = document.querySelector('#highscores');
var correctEl = document.querySelector('#correct');
var score = 0;
var index = 0;
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
    endQuiz();
}
function timerEndedDoSomething() {
    while (mainEl.firstChild) {
        mainEl.removeChild(mainEl.firstChild);
    }

}

function toggleHighScores() {
    // Toggled high scores, stop timer, stop IP quiz and display high scores
    clearMain();
    
    if (localStorage.length === 0) {
        h1El = document.createElement("h1");
        h1El.textContent = "There are no highscores.";
        mainEl.appendChild(h1El);
        highScoreEl.textContent = "Back to Quiz";
    } else {
        
    }
    
}
function endQuiz() {
    
}
function saveHighscore(name) {
    localStorage.setItem(name,score);
    score = 0;
    toggleHighScores();
}
function inputNameForHighscore (){
    h1El = document.createElement("h1");
    p1El = document.createElement("p");
    p2El = document.createElement("p");
    inputEl = document.createElement("input");
    submitEl = document.createElement("button");
    h1El.textContent = "Congratulations!";
    p1El.textContent = "Your scored " + score + " out of 10!";
    p2El.textContent = "Enter a name for highscores";
    submitEl.textContent = "submit";
    inputEl.setAttribute("type","text");
    inputEl.setAttribute("id","submit-text");
    inputEl.setAttribute("name", "text-submit");
    submitEl.setAttribute("id","submit");
    mainEl.appendChild(h1El);
    mainEl.appendChild(p1El);
    mainEl.appendChild(p2El);
    mainEl.appendChild(inputEl);
    mainEl.appendChild(submitEl);
    submitEl.addEventListener('click', function () {
        var username = document.querySelector("#submit-text").value;
        if (username === "" || username === null || username.length < 1 || username.length > 16){
            alert("Must enter a username between 1 and 16 characters to save highscore");
        }
        saveHighscore(username);
        toggleHighScores();
    });
}
function startQuiz() {
    // Start countdown
    countdown(60);
    index = 0;
    nextQuestion(index);

}
function nextQuestion(index) {
    clearMain();
    if (index === 10) {
        inputNameForHighscore();
        return;
    }
    let correct = questions[index].correct;

    var h2El = document.createElement("h2");
    var aEl = document.createElement("button");
    var bEl = document.createElement("button");
    var cEl = document.createElement("button");
    var dEl = document.createElement("button");

    h2El.textContent = questions[index].question;
    aEl.textContent = "A: " + questions[index].a;
    bEl.textContent = "B: " + questions[index].b;
    cEl.textContent = "C: " + questions[index].c;
    dEl.textContent = "D: " + questions[index].d;
    aEl.setAttribute("class", "a question btn");
    bEl.setAttribute("class", "b question btn");
    cEl.setAttribute("class", "c question btn");
    dEl.setAttribute("class", "d question btn");
    aEl.addEventListener('click', function () {
        if (correct === 'a') {
            score++;
            display("Correct");
        } else {
            display("Incorrect");
        }
        nextQuestion(index);
    });
    bEl.addEventListener('click', function () {
        if (correct === 'b') {
            score++;
            display("Correct");
        } else {
            display("Incorrect");
        }
        nextQuestion(index);
    });
    cEl.addEventListener('click', function () {
        if (correct === 'c') {
            score++;
            display("Correct");
        } else {
            display("Incorrect");
        }
        nextQuestion(index);
    });
    dEl.addEventListener('click', function () {
        if (correct === 'd') {
            score++;
            display("correct");
        } else {
            display("incorrect");
        }
        nextQuestion(index);
    });
    mainEl.appendChild(h2El);
    mainEl.appendChild(aEl);
    mainEl.appendChild(bEl);
    mainEl.appendChild(cEl);
    mainEl.appendChild(dEl);
    index++;
    return;
}
function display(stringy) {
    var answer = document.createElement("h2");
    answer.textContent = stringy;
    correctEl.appendChild(answer);
    var timeInterval = setInterval(function () {
        correctEl.removeChild(answer);
        clearInterval(timeInterval);
    }, 2000);
}


// Helper methods below
function clearMain() {
    while (mainEl.firstChild) {
        mainEl.removeChild(mainEl.firstChild);
    }
}
highScoreEl.addEventListener('click', function () {
    toggleHighScores();
})
startQuizEl.addEventListener('click', function () {
    startQuiz();
})
highScoreEl.addEventListener('click'), function () {
    toggleHighScores();
}

// TODO
// Decrement time if question answered incorrectly
// Quiz ending when out of time
// Toggle highscores, showing highscores