// Global var
var secondsLeft = 150;
var wrongAnswer = 10;
var currentScore = 0;
var timerCountDown;
var initials;

var timer = document.querySelector("#timer");
var questions = document.querySelector("#questions");
var choices = document.querySelector("#choices");
var intro = document.querySelector("#intro");
var startBtn = document.querySelector("#startBtn");
var divQuiz = document.querySelector("#quiz");
var divScore = document.querySelector("#scoreEntry");
var endScore = document.querySelector("#finalScore");
var scoreBtn = document.querySelector("#scoreBtn");
var initialsInput = document.querySelector("#userInitials");
var questionIndex = 0;

startBtn.addEventListener("click", startGame);
scoreBtn.addEventListener("click", addScore);

// Quiz Questions 
var codeQuestions = [
    {
      question: "An if/else statement is enclosed with:",
      possibleAnswers: ["Parentheses", "Curly Brackets", "Square Brackets", "Quotations"],
      correctAnswer: "Curly Brackets" 
    },
    {
      question: "To target HTML element, you would target it by its:",
      possibleAnswers: ["Class", "Title", "ID", "Semantic tag"],
      correctAnswer: "ID"
    },
    {
      question: "Where is the right place to put a Javascript?",
      possibleAnswers: ["The head section", "The body section", "Neither the body or head sections", "Either the body or head sections"],
      correctAnswer: "The body section"
    },
    {
      question: "Which value is not a falsy value?",
      possibleAnswers: ["False", "Null", "Undefined", "Unknown"],
      correctAnswer: "Unknown" 
    },
    {
      question: "Where should you declare global variables?",
      possibleAnswers: ["At the beginning of the .js file", "Inside a variable", "At the end of the .js file", "Nowhere"],
      correctAnswer: "At the beginning of the .js file" 
    },
    {
      question: "What is the proper way to set alternate text for an image element?",
      possibleAnswers: ["<img src='picture.jpg' alt='This is my alternate text' />", "<img src='picture.jpg' text='This is my alternate text' />", "<img src='picture.jpg' img='This is my alternate text' />", "<img src='picture.jpg' caption='This is my alternate text' />"],
      correctAnswer: "<img src='picture.jpg' alt='This is my alternate text' />" 
    },
    {
      question: "Data stored in sessionStorage will persist after the window is closed. (True or False)",
      possibleAnswers: ["True", "False", "", ""],
      correctAnswer: "False" 
    },
    {
      question: "Where is the correct place to link a stylesheet?",
      possibleAnswers: ["At the top of the <body> tag", "At the bottom of the <body> tag", "Between the <head> tags", "Between the <title> tags"],
      correctAnswer: "Between the <head> tags" 
    },
    {
      question: "What is the proper way to style all <button> and all <a> elements?",
      possibleAnswers: ["a button {\r\n  border: 2px\r\n}", "a:button {\r\n  border: 2px\r\n}", "button, a {\r\n  border: 2px\r\n}", "button a {\r\n  border: 2px\r\n}"],
      correctAnswer: "button, a {\r\n  border: 2px\r\n}" 
    },
    {
      question: "Which of the following is a JavaScript object?",
      possibleAnswers: ["var newBook = {title: 'Lion King'};", "var newBook = 'Charlie and the chocolate factory';", "var newBook = ['title', 'the day i dreamt about sports'];", "var newBook = [title: 'chickenhead'];"],
      correctAnswer: "var newBook = {title: 'Lion King'}" 
    }
    ];

    // When timer ends or questions are answered thn the game ends 
    function endGame() {
    divQuiz.innerHTML = "";
    currentScore += secondsLeft;
    clearInterval(timerCountdown);
    timer.innerHTML = "";
  
    //High Score
    divQuiz.setAttribute("style", "display: block");
    // Saves in local storage
    endScore.textContent = "Your final score is " + currentScore + ".";
  }
  
  function addScore() {
    initials = initialsInput.value.toUpperCase();
    if(initials === null) {
      alert("You need to enter your initials!")
    }
  
    var setScore = {
      initial: initials,
      score: currentScore
    }
    console.log(setScore);
  
    var scoreArray = JSON.parse(localStorage.getItem("scoreArray"));
    if (scoreArray == null) {
      scoreArray =[]
    }
    scoreArray.push(setScore);
    localStorage.setItem("scoreArray", JSON.stringify(scoreArray));
    window.location.replace("./high-scores.html");
  }
  
  //loop through questions
  function answerQuestion(event) {
    if(codeQuestions[questionIndex].correctAnswer === this.textContent) {
      currentScore++;
      questionIndex++;
      if(questionIndex == codeQuestions.length) {
        endGame()
      }  
      else {nextQuestion()
      };
    }
    //If qrong answer is provided
    else {
      secondsLeft -= wrongAnswer;
      if(secondsLeft<= 0) {
        endGame()
      };
      timer.textContent = "Time: " + secondsLeft;
      questionIndex++;
      if(questionIndex == codeQuestions.length) {
        endGame()
      }
      else{
        nextQuestion()
      };
    }
  }
  
  function startGame() {
    //Start Timer
    timer.textContent = "Time: " + secondsLeft;
    timerCountdown = setInterval( function() {
      secondsLeft--;
      timer.textContent = "Time: " + secondsLeft;
      if(secondsLeft <= 0) {
        endGame();
      }
    },
      1000)
    
      startBtn.setAttribute("style", "display: none");
      intro.setAttribute("style", "display: none");
  
    nextQuestion();
  }
  
  function nextQuestion() {
    choices.innerHTML = ""
    questions.textContent = codeQuestions[questionIndex].question;
  
    for(var i = 0; i < codeQuestions[questionIndex].possibleAnswers.length; i ++) {
      var choiceOption = document.createElement("li");
      choiceOption.setAttribute("style", "line-height: 3")
      var choiceBtn = document.createElement("button");
      choiceBtn.textContent = codeQuestions[questionIndex].possibleAnswers[i];
      choiceBtn.addEventListener("click", answerQuestion);
      choiceOption.appendChild(choiceBtn);
      choices.appendChild(choiceOption);
    }
  };
  