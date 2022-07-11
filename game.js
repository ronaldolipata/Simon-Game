var color = ["green", "red", "yellow", "blue"];
var storedRandomColor = [];
var storedPlayerColor = [];
var numberOfColors = document.querySelectorAll(".btn").length;
var gameStart = false;
var level = -1;

// Game Start
function start() {
  if (!gameStart) {
    nextSequence();
    gameStart = true;
  } else {
    console.log("The game is already started!");
  }
}

// Start the game by pressing any key
document.addEventListener("keydown", function() {
  start();
});

// Start the game by pressing the title
document.querySelector("#level-title").addEventListener("click", function() {
  start();
});

// Click colors and game functions
for (var i=0; i<numberOfColors; i++) {
  document.querySelectorAll(".btn")[i].addEventListener("click", function () {
  var playerChosenColor = this.id;
  storedPlayerColor.push(playerChosenColor);
  makeSound(playerChosenColor);
  animation(playerChosenColor);
  checkAnswer(storedPlayerColor.length - 1)
  });
}

function checkAnswer(currentLevel) {
  if (!gameStart) {
    makeSound("wrong");
    gameOver();
  } else {
    if (storedRandomColor[currentLevel] === storedPlayerColor[currentLevel]) {
      
      if (storedRandomColor.length === storedPlayerColor.length) {
        setTimeout(function () {
          storedPlayerColor = [];
          nextSequence();
        }, 1000);
        
      }
    } else {
      makeSound("wrong");
      gameOver();
    }
  }
}

// Next random color
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = color[randomNumber];
  storedRandomColor.push(randomColor);
  level++;
  document.querySelector("#level-title").textContent = "Level " + level;
  makeSound(randomColor);
  animation(randomColor);
}

// Make sound
function makeSound(playerChosenColor) {
  var sound = new Audio("sounds/" + playerChosenColor + ".mp3");
  sound.play();
}

// Make animation
function animation(playerChosenColor) {
  document.querySelector("." + playerChosenColor).classList.add("pressed");

  setTimeout(function () {
    document.querySelector("." + playerChosenColor).classList.remove("pressed");
  }, 100);
}

// Game over
function gameOver() {
  document.body.classList.add("game-over");

  setTimeout(function () {
    document.body.classList.remove("game-over");
  }, 100);

  setTimeout(function () {
    document.querySelector("#level-title").innerHTML = "Press Here or Any Key to Start";
  }, 1000);

  gameStart = false;
  level = -1;
  storedRandomColor = [];
  storedPlayerColor = [];
}