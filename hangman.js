var words = ["JAVASCRIPT", "GITHUB", "DEVELOPER", "DIJKSTRA", "SOFTWARE"
            ,"EXCEPTION", "LINUX", "COFFEE", "WEBSITE", "PYTHON", "ECLIPSE"
            ,"NETBEANS", "FACEBOOK"];
var word = "";
var riddledWord = "";
var guessedIndices = new Set();
var remainingTries = 6;

function newGame() {
  remainingTries = 6;
  // draw socket first
  draw();
  // clear set of guessed indices
  guessedIndices = new Set()
  // clear board (from possible previous game) to set up a new one
  clearRiddleBoard();
  clearKeyboard();
  // Pick random word
  word = words[Math.floor(Math.random() * words.length)];
  createRiddleGaps(guessedIndices);
  createKeyboard();
  displayRemainingGuesses();
}

function guess(guessedChar) {
  // correct guess or now?
  if(word.includes(guessedChar)) {
    for(var i=0; i < word.length; i++) {
      if (word[i].toUpperCase() === guessedChar) guessedIndices.add(i);
    }
    if(guessedIndices.size > 0) {
      createRiddleGaps(guessedIndices);
    }
    if(guessedIndices.size == word.length) {
      gameWon();
      return;
    }
  } else {
    remainingTries--;
    draw();
    displayRemainingGuesses();
    if(remainingTries == 0) {
      gameOver();
      return;
    }
  }
  document.getElementById(guessedChar + "_button").disabled = true;
}

function createRiddleGaps(alreadyGuessedIndices) {
  clearRiddleBoard();
  riddledWord = "";
  var gap = document.createElement("div");
  for(var i = 0; i < word.length; i++) {
    if (alreadyGuessedIndices.has(i)) {
      riddledWord += word.charAt(i) + " ";
    } else {
      riddledWord += "_ ";
    }
  }
  var riddledWordHTML = document.createTextNode(riddledWord);
  gap.appendChild(riddledWordHTML);
  gap.classList.add("char");
  document.getElementById("riddleBoard").appendChild(gap);
}

function createKeyboard() {
  console.log("Creating keyboard...")
  var keyboard = document.getElementById("keyboard");
  for (var i = 0; i < 26; i++) {
    var charButton = document.createElement("button");
    charButton.type = "button";
    charButton.classList.add("charButton");
    charButton.type = "button";
    var char = String.fromCharCode(i+65);
    charButton.id = char + "_button"
    charButton.addEventListener('click', function() {guess(this.innerHTML)});
    var charText = document.createTextNode(char)
    charButton.appendChild(charText);
    keyboard.appendChild(charButton);
    // only 13 (half) buttons per row
    if (i == 12) {
      var lineBreak = document.createElement("br");
      keyboard.appendChild(lineBreak);
    }
  }
}

function displayRemainingGuesses() {
  clearRemainingGuesses();
  var remGu = document.getElementById("remainingGuesses");
  var remainingText = document.createTextNode("Remaining guesses: " + remainingTries);
  remGu.appendChild(remainingText);
}

function gameWon() {
    window.alert("Congratulations, you found the right word!");
    clearWholeBoard();
}

function gameOver() {
    window.alert("GAME OVER!");
    clearWholeBoard();
}

function clearRiddleBoard() {
  var board = document.getElementById("riddleBoard");

  while(board.firstChild) {
    board.removeChild(board.firstChild);
  }
}

function clearKeyboard() {
  var keyboard = document.getElementById("keyboard");

  while(keyboard.firstChild) {
    keyboard.removeChild(keyboard.firstChild);
  }
}

function clearRemainingGuesses() {
  var remGu = document.getElementById("remainingGuesses");

  while(remGu.firstChild) {
    remGu.removeChild(remGu.firstChild);
  }
}

function clearWholeBoard() {
  clearRiddleBoard();
  clearKeyboard();
  clearRemainingGuesses();
}

// draw depending on remaining tries a part of the hanging guy
function draw() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  switch(remainingTries) {
    case 6:
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.lineWidth = 10;
        ctx.moveTo(30, 360);
        ctx.lineTo(270, 360);
        ctx.stroke();

        ctx.moveTo(240, 360);
        ctx.lineTo(240, 40);
        ctx.stroke();

        ctx.moveTo(245, 40);
        ctx.lineTo(90, 40);
        ctx.stroke();

        ctx.lineTo(90, 90);
        ctx.stroke();
        break;
    case 5:
        // draw head
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(90, 108, 20, 0, 2*Math.PI);
        ctx.stroke();
        break;
    case 4:
       // draw body
       ctx.moveTo(90, 130);
       ctx.lineTo(90, 210);
       ctx.stroke();
       break;
    case 3:
       // draw left arm
       ctx.moveTo(90, 150);
       ctx.lineTo(50, 120);
       ctx.stroke();
       break;
    case 2:
        // draw right arm
        ctx.moveTo(90, 150);
        ctx.lineTo(130, 120);
        ctx.stroke();
        break;
    case 1:
        // draw left leg
        ctx.moveTo(90, 208);
        ctx.lineTo(40, 260);
        ctx.stroke();
        break;
    case 0:
        // draw right leg
        ctx.moveTo(90, 208);
        ctx.lineTo(140, 260);
        ctx.stroke();
        break;
  }
}
