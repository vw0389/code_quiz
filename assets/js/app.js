var timeEl = document.querySelector('#time');
var mainEl = document.querySelector('#main');
var highScoreEl = document.querySelector('#highscores');
var correctEl = document.querySelector('#correct');
var score = 0;
var index = 0;
var timeLeft = 60;
var highscores = [];
var questions = getQuestions();

function getQuestions() {
    var request = new XMLHttpRequest();
    request.open("GET", "./assets/js/questions.json", false);
    request.send(null)
    var my_JSON_object = JSON.parse(request.responseText);
    return my_JSON_object;
}
function countdown() {
    var timeInterval = setInterval(function () {
        var text = "";
        if (timeLeft > 1) {
            text = 'Time: ' + timeLeft + ' seconds remaining';
            timeLeft--;
        } else if (timeLeft === 1) {
            text = 'Time: ' + timeLeft + ' second remaining';
            timeLeft--;
        } else if (timeLeft === -60) {
            clearInterval(timeInterval);
        } else if (timeLeft <= 0) {
            clearInterval(timeInterval);
            inputNameForHighscore();
        }
        timeEl.textContent = text;
    }, 1000);
}
function gotWrong() {
    timeLeft = timeLeft - 5;
}

function toggleHighScores() {
    // Toggled high scores, stop timer, stop IP quiz and display high scores

    score = 0;
    timeLeft = -60;
    timeEl.style.display = "none";
    clearMain();

    getHighscores();
    if (highScoreEl.textContent === "Back to Quiz") {

        displayQuiz();
        return;
    }
    if (highscores.length === 0) {
        h1El = document.createElement("h1");
        h1El.textContent = "There are no highscores.";
        mainEl.appendChild(h1El);
        highScoreEl.textContent = "Back to Quiz";
    } else {
        h2El = document.createElement("h2");
        h2El.textContent = "Highscores:"
        mainEl.appendChild(h2El);
        highScoreEl.textContent = "Back to Quiz";
        tableEl = document.createElement("table");

        for (var i = 0; i < highscores.length; i++) {
            rowEl = document.createElement("tr");
            userEl = document.createElement("td");
            scoreEl = document.createElement("td");
            userEl.textContent = highscores[i].username;
            scoreEl.textContent = highscores[i].score;

            rowEl.appendChild(userEl);
            rowEl.appendChild(scoreEl);
            tableEl.appendChild(rowEl);
        }
        mainEl.appendChild(tableEl);
    }


}
function displayQuiz() {
    score = 0;
    index = 0;
    timeLeft = 60;

    clearMain();
    // make view highscores button contain "View Highscores"
    highScoreEl.textContent = "View Highscores";
    // Make timer show up
    timeEl.style.display = "block";
    h2El = document.createElement("h2");
    buttonEl = document.createElement("button");
    buttonEl.setAttribute("id", "start");
    buttonEl.setAttribute("class", "btn");
    buttonEl.textContent = "Start";
    h2El.textContent = "Start Your Quiz!";
    mainEl.appendChild(h2El);
    mainEl.appendChild(buttonEl);
    buttonEl.addEventListener('click', function () {
        startQuiz();
    })

    // Start quiz text & button
}
function saveHighscore(userScore) {

    highscores.push(userScore);
    var stringified = JSON.stringify(highscores);
    localStorage.setItem('scores', stringified);

}
function getHighscores() {
    var jsonArray = localStorage.getItem('scores');
    if (jsonArray === null) {
        return -1;
    }
    highscores = JSON.parse(jsonArray);
}
function inputNameForHighscore() {
    timeLeft = 0;
    clearMain();
    h1El = document.createElement("h1");
    p1El = document.createElement("p");
    p2El = document.createElement("p");
    inputEl = document.createElement("input");
    submitEl = document.createElement("button");
    h1El.textContent = "Congratulations!";
    p1El.textContent = "Your scored " + score + " out of 10!";
    p2El.textContent = "Enter a name for highscores";
    submitEl.textContent = "submit";
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("id", "submit-text");
    inputEl.setAttribute("name", "text-submit");
    submitEl.setAttribute("id", "submit");
    mainEl.appendChild(h1El);
    mainEl.appendChild(p1El);
    mainEl.appendChild(p2El);
    mainEl.appendChild(inputEl);
    mainEl.appendChild(submitEl);
    submitEl.addEventListener('click', function () {
        debugger;
        var username = document.querySelector("#submit-text").value;
        if (username === "" || username === null || username.length < 1 || username.length > 16) {
            alert("Must enter a username between 1 and 16 characters to save highscore");
            inputNameForHighscore();
            return;
        }
        var userObject = {
            username: username,
            score: score
        }
        saveHighscore(userObject);
        toggleHighScores();
    });
}
function startQuiz() {
    // Start countdown
    countdown();
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
            gotWrong();
        }
        nextQuestion(index);
    });
    bEl.addEventListener('click', function () {
        if (correct === 'b') {
            score++;
            display("Correct");
        } else {
            display("Incorrect");
            gotWrong();
        }
        nextQuestion(index);
    });
    cEl.addEventListener('click', function () {
        if (correct === 'c') {
            score++;
            display("Correct");
        } else {
            display("Incorrect");
            gotWrong();
        }
        nextQuestion(index);
    });
    dEl.addEventListener('click', function () {
        if (correct === 'd') {
            score++;
            display("correct");
        } else {
            display("incorrect");
            gotWrong();
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

function clearMain() {
    while (mainEl.firstChild) {
        mainEl.removeChild(mainEl.firstChild);
    }
}

highScoreEl.addEventListener('click', function () {
    toggleHighScores();
})

getHighscores();
displayQuiz();