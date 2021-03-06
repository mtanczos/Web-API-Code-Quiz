
// Mate' Tanczos

let cardTitleElem = document.querySelector(".card-title");
let cardTestElem = document.querySelector(".card-text");
let btnGrpElem = document.querySelector(".btn-group-vertical");
let startBtnContainer = document.querySelector("#startBtn");
let inoutLblElem = document.querySelector("#initialsInputLabel");
let inputEL = document.querySelector('#initialsInput');
let continueBtn = document.querySelector("#continue");
let answerList = document.querySelector("#answer_list");
let showCorrectAnswer = document.querySelector("showCorrectAnswer");
let tableEl = document.querySelector(".table");
let clearBtn = document.querySelector("#clear");
let tableBody = document.querySelector("#scoreArea")

// Incremental counter index letiables
let secondsLeft = 60;
let questionIndex = 0;
let timer;
let score;
let userInit;

// Array letiable to contain the question objects
let questionArr = [{
        question: "What is the HTML tag under which one can write the JavaScript code?",
        answers: ["A - <javascript>", 
        "B - <scripted>", 
        "C - <script>", 
        "D - <js>"],
        correct: "C - <script>",},

    {
        question: "What is the JavaScript syntax for printing values in Console?",
        answers: ["A - print(5)", 
        "B - console.log(5);", 
        "C - console.print(5);", 
        "D - print.console(5);"],
        correct: "B - console.log(5);",},
    {
        question: "What does CSS stand for?",
        answers: ["A - Computer Style Sheets", 
        "B - Colorful Style Sheets", 
        "C - Creative Style Sheets", 
        "D - Cascading Style Sheets"],
        correct: "D - Cascading Style Sheets",},
    {
        question: "Where in an HTML document is the correct place to refer to an external style sheet?",
        answers: ["A - At the end of the document",
         "B - In the <head> section", 
         "C - In the <body> section", 
         "D - In the footer"],
        correct: "B - In the <head> section",},

    {
        question: "What does HTML stand for?",
        answers: ["A - Home Tool Markup Language", 
        "B - Hyper Text Markup Language", 
        "C - Hyperlinks and Text Markup Language", 
        "D - Happy Time Markup Language"],
        correct: "B - Hyper Text Markup Language",},
    {
        question: "Choose the correct HTML element for the largest heading",
        answers: ["A - <head>", "B -  <heading>", "C - <h1>", "D - <h6>"],
        correct: "C - <h1>",},

    {
        question: "which of the following is the correct way of creating an hyperlink in HTML?",
        answers: ["A - <a>www.geeksforgeeks.org <Geeksforgeeks /a>", 
                  "B - <a href=“www.geeksforgeeks.org” Geeksforgeeks /a>",
                  "C - <a href= “www.geeksforgeeks.org”>Geeksforgeeks</a>", 
                  "D - <a link=“www.geeksforgeeks.org” Geeksforgeeks> </a>"],
        correct: "C - <a href= “www.geeksforgeeks.org”>Geeksforgeeks</a>",},

    {
        question: "Which function of an Array object calls a function for each element in the array?",
        answers: ["A - forEach()", "B - every()", "C - forEvery()", "D - each()"],
        correct: "A - forEach()",},

    {
        question: "How is the function called in JavaScript?",
        answers: ["A - call Geekfunc();", "B - call function GeekFunc();", "C - Geekfunc(); ", "D - function Geekfunc();"],
        correct: "D - function Geekfunc();",},

    {
        question: "Which of the following is true about variable naming conventions in JavaScript?",
        answers: ["A - You should not use any of the JavaScript reserved keyword as variable name", 
        "B - JavaScript variable names should not start with a numeral (0-9)", 
        "C - Both of the above", 
        "D - None of the above"],
        correct: "C - Both of the above",}
    ];

// Timer function 
function startTimer() {
    let timerEL = document.querySelector("#timer");
    timer = setInterval(function () {
        secondsLeft--;
        timerEL.textContent = `Timer: ${secondsLeft} seconds`;//diplay timers
        if (secondsLeft <= 0) {
            endQuestions()
        };
    }, 2000); // Timer function set to 1 second interval
};

// End Questions function
function endQuestions() {
    // Resets the timer interval
    clearInterval(timer);

    //hide elements
    hideElements(btnGrpElem);
    hideElements(answerList);
   
    //Show Initials Input
    showElement(inoutLblElem);
    showElement(inputEL);
    showElement(continueBtn);

    // Add content to card
    cardTitleElem.innerHTML = "Your Results";
    // Sets the seconds left as the final score
    score = secondsLeft;
    cardTestElem.innerHTML = `Your final score: ${score}`;
};

// check users answers
function checkUsersAnswers(event) {
    let correctAnswer = questionArr[questionIndex].correct;
    if (event.target.textContent === correctAnswer) {
        document.body.style.backgroundImage = "url('assets/img/fireworks.gif')";
        play("playCorrect")
        setTimeout(function(){ changeBkImage();getNextQuestion();}, 1500);
    } else {
        // Adjust timer by -10 seconds if user gets wrong answer
        play("playWrong")
        alert(`Sorry, the correct answer was "${correctAnswer}"`);
        secondsLeft -= 10;
        getNextQuestion();
    }
};

//play sound
function play(soundType) {
    if(soundType==="playCorrect"){
        var audio = new Audio('assets/sounds/correct.wav');
    } 
    else{
        var audio = new Audio('assets/sounds/wrong.mp3');
    }
    audio.play();
  }

 function changeBkImage() {//change background back to orignal image
        document.body.style.backgroundImage = "url('assets/img/background.jpg')";
  }

// showQuestions Play function
function showQuestions() {
    // Clear element content
    cardTitleElem.innerHTML = "";
    cardTestElem.innerHTML = "";

    // Add content to card
    let temp = questionIndex;
    cardTitleElem.innerHTML = "Question #" + (temp + 1);
    cardTestElem.textContent = questionArr[questionIndex].question;
    showChoicesBtns();
}

function showChoicesBtns() {
    // Clear answerList element 
    answerList.innerHTML = "";

    for (let i = 0; i < questionArr[questionIndex].answers.length; i++) {
        let btn = document.createElement("button");
        btn.textContent = questionArr[questionIndex].answers[i];;
        btn.setAttribute("id", i);
        btn.setAttribute("class", "btn btn-primary");
        answerList.appendChild(btn);
        answerList.addEventListener("click", checkUsersAnswers)
    }
}

// get next question function
function getNextQuestion() {
    // Advance to next question by increasing the questionIndex value
    questionIndex++;
    // Verify condition of next question and 
    if (questionIndex !== questionArr.length) {
        showQuestions();
    } else {
        endQuestions();
    }
}

// *********************************** Start button listeners ***************************************/
function addStartBtn() {
    let startBtn = document.createElement("button");
    startBtn.setAttribute("class", "btn btn-primary btn-lg btn-block");
    startBtn.innerText = 'Start Quiz';
    startBtnContainer.appendChild(startBtn);
    startBtnContainer.setAttribute("style", "width: fit-content; margin: 10px; align-self: center;");
}

startBtn.addEventListener("click", function () {
    startBtn.style.display = "none"
    showQuestions();
    startTimer();
});

//show start button on load
window.addEventListener('load', (event) => {
    document.body.style.backgroundImage = "url('assets/img/background.jpg')";
    addStartBtn();
});

function hideElements(hideMyElem){
    hideMyElem.style.display = "none";
}

function showElement(showMyElem){
    showMyElem.classList.remove("none");
    showMyElem.classList.add("d-block");
}

// Set user initials and score to local storage
function local(event) {
    console.log('test')
    event.preventDefault()

    // Retrieve user initials from input box
    userInit = document.getElementById("initialsInput").value

    // Stores values of user and score to localStorage
    let highScore = localStorage.getItem('highscore');
    if (!highScore) {
        highScore = []
    } else {
        highScore = JSON.parse(highScore)
    }
    let scoreObj = {
        "user": userInit,
        "score": secondsLeft
    };
    highScore.push(scoreObj);
    localStorage.setItem("highscore", JSON.stringify(highScore));
    window.location.assign("index.html")
}
//***************************functions for highscore******************************/
function updateHighScorers() {// Pull recent score stats from local storage
    // Retrieve local storage values
    let highscore = localStorage.getItem("highscore");
    if (highscore) {

        highscore = JSON.parse(highscore)

        highscore = highscore.sort(function (a, b) { //sort highscores
            return b.score - a.score
        });

        // Create table body under table header
        for (let i = 0; i < highscore.length; i++) {
            // Insert last game results
            let dataCells = document.createElement("td");
            let rowElem = document.createElement("tr");
            dataCells.textContent = highscore[i].user;
            let dateCell2 = document.createElement("td");
            dateCell2.textContent = highscore[i].score;
            rowElem.appendChild(dataCells);
            rowElem.appendChild(dateCell2);
            tableBody.appendChild(rowElem);
        }
    }
}

// Update the Leader Board Results
updateHighScorers();

function clearHighScores() {// Clear the body from the table
    localStorage.setItem("highscore", []);// Reset local storage values
    tableBody.remove();// Remove all rows from table 
    updateHighScorers(); // Recall updateHighScorers function to clear cells
}
clearBtn.addEventListener("click", clearHighScores);// Clear button listener