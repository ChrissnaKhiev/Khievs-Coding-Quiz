var currentQuestion = 0;
var highscoreList = [];
var timer;
var timeRemain = document.querySelector("#count");
var startQuiz = document.querySelector("#startQuiz");
var score = 0;
var count;
var scoreList = document.querySelector('#highscore-list');
var gameStarted = false;  //allows for countdown check to stop duplicates


var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["string","booleans","alerts","numbers"],
        answer: 2
    },
    {
        question: "The condition in a if/else statement in enclosed within __.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: 2
    },
    {
        question: "Arrays in Javascript can be used to store __.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: 3
    },
    {
        question: "String values must be enclosed within __ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: 2
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["Javacript", "terminal/bash", "for loop", "console log"],
        answer: 3
    }
];

function renderQuestion()
{
    if (currentQuestion < questions.length) //fixed error when at final question 
        
        {
            document.querySelector(".questions").textContent = questions[currentQuestion].question;

            //I got this outcome from this with tweaks https://stackoverflow.com/questions/11128700/create-a-ul-and-fill-it-based-on-a-passed-array
            var list = "<button>" + questions[currentQuestion].choices.join("</button></br><button>") + "</button>";

            document.querySelector(".answers").innerHTML = list;
        } else if (currentQuestion = questions.length) { //creates page after quiz with highscore stuff

            clearInterval(timer);

            document.querySelector('.questions').textContent = 'All done!';

            list = 'Your final score is ' + count + '.' + "</br>";

            document.querySelector('.answers').innerHTML = list;

            inputInitials = "Enter initials: " + "<input id='userInitials' type='text' name='initials'>" + "<input id='button' type='button' onclick='logInit()' value='Submit'>";

            document.querySelector('.logInitials').innerHTML = inputInitials;
        } else {  //initializes the Highscore page;
            renderHighscores();
        }
}
function renderHighscores() { //hide quiz and display highscores;

    document.querySelector('.show').style.display = 'none';
    document.querySelector('.hide').style.display = 'block';

    scoreList.innerHTML = "";

    for (var i = 0; i <= scoreList.length; i++) { //referenced unit 4 activity 26
        var highscoreList = highscoreList[i];
        var li = document.createElement('li');

        li.textContent = highscoreList;
        li.setAttribute("data-index", i);

        highscoreList.appendChild(li);
    }
}

function logInit() {
    var input1 = document.getElementById("userInitials");
    localStorage.setItem("intials", input1.value);
    localStorage.setItem("score", count)
  }

function checkAnswer(answer){
    var keyAnswer = questions[currentQuestion].answer;
    var correctAnswer = questions[currentQuestion].choices[keyAnswer];

        if (answer === correctAnswer){
            document.querySelector(".check").innerHTML = '"Correct"';
        }else{
            document.querySelector(".check").innerHTML = '"Incorrect"';
            count -= 10;
            timeRemain.textContent = count;  //needs to reinitialize the timeRemain
        }
    //next 2 lines is what changes the quiz question
    currentQuestion++;
    renderQuestion(); 
}


function start() {
    var startButton = document.querySelector('#startQuiz'); //https://flaviocopes.com/how-to-disable-button-javascript/
    startButton.disabled = true;
    startButton.style.display = 'none';  //hides the start quiz button
    countdown();  
    renderQuestion();  //initialze the quiz
    document.querySelector(".answers").addEventListener("click", event => checkAnswer(event.target.textContent)); // moved to remove double renderQuestion() aka loops this line to move next question
    document.querySelector("#button").addEventListener("click", renderHighscores())
}

function countdown(){
    if (!gameStarted) {
        count = 75;
        timer = setInterval(function() {
            count--;
            timeRemain.textContent = count;
        }, 1000);
        gameStarted = true;
    }
}


startQuiz.addEventListener('click', start);

