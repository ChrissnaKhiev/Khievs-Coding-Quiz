var chosenQuestion = "";
var chosenAnswer = "";
var timeRemain = document.querySelector("#count");
var startQuiz = document.querySelector("#startQuiz");
var timer;
var count;



var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["string","booleans","alerts","numbers"],
        answer: 2
    },
    {
        question: "The condition in a if/else statement in enclosed within __.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: 3
    },
    {
        question: "Arrays in Javascript can be used to store __.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: 4
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
    
    for (var i = 0; i < questions.length; i++){
        
    chosenQuestion = document.querySelector(".questions").textContent = questions[i].question;

    //I got this outcome from this with tweaks https://stackoverflow.com/questions/11128700/create-a-ul-and-fill-it-based-on-a-passed-array

    var list = "<button><li>" + questions[i].choices.join("</li></button><button><li>") + "</li></button>";

    chosenAnswer = document.querySelector(".answers").innerHTML = list; //adds list to the html code
    }
    
}



function start() {
    countdown();
    renderQuestion();
}

function countdown(){
    count = 75;
    setInterval(function() {
        count--;
        timeRemain.textContent = count;

        // if (count >= 0) {   
        //     endQs;
        // }
    }, 1000);
}


startQuiz.addEventListener('click', start);

