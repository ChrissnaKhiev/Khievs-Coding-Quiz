var currentQuestion = 0;
var highscoreList = [];
var timer;
var timeRemain = document.querySelector("#count");
var startQuiz = document.querySelector("#startQuiz");
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
            var list = "<button><li>" + questions[currentQuestion].choices.join("</li></button></br><button><li>") + "</li></button>";

            document.querySelector(".answers").innerHTML = list;
        } else if (currentQuestion = questions.length) { //creates page after quiz with highscore stuff

            clearInterval(timer);

            document.querySelector('.questions').textContent = 'All done!';

            list = 'Your final score is ' + count + '.' + "</br>";

            document.querySelector('.answers').innerHTML = list;

            inputInitials = "Enter initials: " + "<input id='userInitials' type='text' name='initials'>" + "<input id='button' type='button' onclick='logInit()' value='Submit'>";

            document.querySelector('.logInitials').innerHTML = inputInitials;
        }
}
function renderHighscores() { //hide quiz and display highscores;

    document.querySelectorAll('.show').forEach(luna =>luna.style.display = "none");
    document.querySelector('.hide').style.display = 'block';

    var startButton = document.querySelector('#startQuiz'); //https://flaviocopes.com/how-to-disable-button-javascript/
    startButton.disabled = true;
    startButton.style.display = 'none';

    sortHscore().forEach(function (p) { //call to the sort for each list object
        var li = document.createElement('li');
        li.textContent = p.intials + " " + p.score;
        scoreList.appendChild(li);
    });
}

function sortHscore() { //creates the list, sorts list, and returns the ordered list
    for (var i = 0; i < localStorage.getItem("playerCount"); i++){
        var playerScore = JSON.parse(localStorage.getItem(i));
        highscoreList.push(playerScore); //adds to the array
    }
    return highscoreList.sort((a, b) => b.score - a.score); //this is sorting can comparing the values from higher to lower
}

function logInit() {
    var playerId = localStorage.getItem('playerCount');
    var input1 = document.getElementById("userInitials"); //gets input from user then sets Item into object
    localStorage.setItem(playerId, JSON.stringify({
        intials: input1.value,
        score: count
    }));
    playerId++; //counter to add players
    localStorage.setItem('playerCount', playerId);
    renderHighscores();
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
            if (count <= 0){// next 2 lines remove the negative timers
                count = 0;
                timeRemain.textContent = count;
                currentQuestion = 5;
                renderQuestion();
            }
        }
    //next 2 lines is what changes the quiz question
    currentQuestion++;
    renderQuestion(); 
}

function clearHs() { //function to clear highscore
    localStorage.clear();
    highscoreList = []; //clear from array
    scoreList.innerHTML = ''; // clear from current html
    renderHighscores(); // rerenders
}


function start() {
    var startButton = document.querySelector('#startQuiz'); //https://flaviocopes.com/how-to-disable-button-javascript/
    startButton.disabled = true;
    startButton.style.display = 'none';  //hides the start quiz button
    if(localStorage.getItem('playerCount') === null)  //see if there playercount in the local storage exists *already*
        localStorage.setItem('playerCount', 0);
    countdown();  
    renderQuestion();  //initialze the quiz
    document.querySelector(".answers").addEventListener("click", event => checkAnswer(event.target.textContent)); // moved to remove double renderQuestion() aka loops this line to move next question
}

function countdown(){
    if (!gameStarted) {
        count = 75;
        timer = setInterval(function() {
            count--;
            timeRemain.textContent = count;
            if (count <= 0){
                clearInterval(timer);
                count = 0;
                timeRemain.textContent = count;
                currentQuestion = 5;
                renderQuestion();
                if (currentQuestion < 5){
                renderQuestion();
                }else {
                    currentQuestion = 5;
                    renderQuestion();
                }
            }
        }, 1000);
        gameStarted = true;
    }
}


startQuiz.addEventListener('click', start);

