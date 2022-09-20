var currentQuestion = 0;
var timeRemain = document.querySelector("#count");
var startQuiz = document.querySelector("#startQuiz");
var timer;
var count;
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

function renderQuestion(){

    if (currentQuestion < questions.length) //fixed error when at final question

        document.querySelector(".questions").textContent = questions[currentQuestion].question;

        //I got this outcome from this with tweaks https://stackoverflow.com/questions/11128700/create-a-ul-and-fill-it-based-on-a-passed-array
        var list = "<button>" + questions[currentQuestion].choices.join("</button></br><button>") + "</button>";

        document.querySelector(".answers").innerHTML = list;
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
    document.querySelector(".answers").addEventListener("click", e => checkAnswer(e.target.textContent)); // moved to remove double renderQuestion() aka loops this line to move next question
}

function countdown(){
    if (!gameStarted) {
        count = 75;
        setInterval(function() {
            count--;
            timeRemain.textContent = count;
        }, 1000);
        gameStarted = true;
    };
}


startQuiz.addEventListener('click', start);

