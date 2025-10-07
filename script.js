const Gameboard = (function () {
  const currentGameBoard = [
    [null, null, null], 
    [null, null, null], 
    [null, null, null]
  ];

  const trackTurnArray = [];

  const getScore = () => {
    console.log("Current score board:")
    console.log(currentGameBoard.map(row => [...row]));
    return currentGameBoard
  };

  const pushPlayerTurnToArray = function (player) {
    trackTurnArray.push(player.name);
  }
  
  const trackTurnOrder = function (player) {
    console.log(trackTurnArray)
  }

  const validateTurnOrder = function (player) {
    const turnLen = trackTurnArray.length
    if (trackTurnArray[turnLen - 1] === player.name) {
    console.log(
      `Invalid input. On turn ${turnLen + 1}, ${player.name} ` +
      `tried to play a second turn in a row!`
    );
      return true;
    }
  }

  const validateInRangeBoardInput = function(player, row, column) {
    if (row > 2 || column > 2) {
      console.log(
        `Invalid input. On turn ${trackTurnArray.length + 1}, ${player.name} ` + 
        `tried to input the "${player.sign}" sign in cell ` +
        `(${row + 1},${column + 1}) which is out of range!`
      )
      return true
    }
  }
    
  const validateEmptyBoardInput = function (player, row, column) {
      if (currentGameBoard[row][column] !== null) {
        console.log(
          `Invalid input. On turn ${trackTurnArray.length + 1}, ${player.name} ` + 
          `tried to input the "${player.sign}" sign in a non empty cell!`
        )
        return true
    }
  }

  const checkIfGameIsWon = function (player) {
    if (trackTurnArray.length < 5) {
      return
    }

    const winConfigurationArray = [
      [currentGameBoard[0][0], currentGameBoard[0][1], currentGameBoard[0][2]],   // First line 
      [currentGameBoard[1][0], currentGameBoard[1][1], currentGameBoard[1][2]],   // Second line
      [currentGameBoard[2][0], currentGameBoard[2][1], currentGameBoard[2][2]],   // Third line
      [currentGameBoard[0][0], currentGameBoard[1][0], currentGameBoard[2][0]],   // First column
      [currentGameBoard[0][1], currentGameBoard[1][1], currentGameBoard[2][1]],   // Second column
      [currentGameBoard[0][2], currentGameBoard[1][2], currentGameBoard[2][2]],   // Third column
      [currentGameBoard[0][0], currentGameBoard[1][1], currentGameBoard[2][2]],   // First diagonal
      [currentGameBoard[0][2], currentGameBoard[1][1], currentGameBoard[2][0]],   // Second diagonal
    ];

    const winArray = winConfigurationArray.filter(
      winConfig => winConfig.every(cell => cell === winConfig[0])
    );

    if (winArray) {
      console.log(`Game is over, ${player.name} has won!`)
      return true
    }
  }

  const checkIfGameIsTied = function () {
    if (trackTurnArray.length === 9) {
      console.log(`Game is over, it's a tie!`)
      return true
    }
  }

  const playTurn = function (player, row, column) {
    if (validateTurnOrder(player)) {
      return;
    }
    if (validateInRangeBoardInput(player, row, column)) {
      return;
    }
    if (validateEmptyBoardInput(player, row, column)) {
      return;
    }

    pushPlayerTurnToArray(player);
    trackTurnOrder();
    currentGameBoard[row][column] = player.sign
    console.log(
      `On turn ${trackTurnArray.length}, ${player.name} placed the "${player.sign}" symbol ` +
      `in row ${row + 1} and column ${column + 1}.`
    );

    getScore()

    if (checkIfGameIsWon(player)) {
      return
    }
    checkIfGameIsTied()
  };

  return { getScore, playTurn, trackTurnOrder};

})();


function createPlayer(name, sign) {
  return { name, sign };
}




// DOM Manipulation //

const mainContainer = document.querySelector("#main-container");
const startGameButton = document.querySelector("#start-game-button");

startGameButton.addEventListener("click", () => {
  startGameButton.remove()

  const startGameButtonDialogue = document.getElementById("input-players-names-dialogue");
  startGameButtonDialogue.showModal()
})


const submitPlayersInput = document.getElementById("submit-form-button");
submitPlayersInput.addEventListener("click", () => {
  const gameBoardContainer = document.createElement("div");
  gameBoardContainer.id = "game-board-container";
  gameBoardContainer.style.display = "grid";
  gameBoardContainer.style.gridTemplateColumns = "repeat(3, minmax(100px, 150px))";
  gameBoardContainer.style.gridTemplateRows = "repeat(3, minmax(100px, 150px))";
  mainContainer.appendChild(gameBoardContainer)

  for (let i = 0; i < 9; i++) {
    const gameBoardCell = document.createElement("div");
    gameBoardCell.className = "game-board-cell";
    
    gameBoardCell.setAttribute("data-row", Math.floor(i / 3) + 1);
    gameBoardCell.setAttribute("data-column", (i % 3) + 1);

    gameBoardCell.style.border = "solid 1px black";

    gameBoardContainer.appendChild(gameBoardCell);
  }

  gameBoardContainer.querySelectorAll(".game-board-cell[data-row='1']").forEach((element) => {
    element.style["border-top"] = "none"
  })
  gameBoardContainer.querySelectorAll(".game-board-cell[data-row='3']").forEach((element) => {
    element.style["border-bottom"] = "none"
  })
  gameBoardContainer.querySelectorAll(".game-board-cell[data-column='1']").forEach((element) => {
    element.style["border-left"] = "none"
  })  
  gameBoardContainer.querySelectorAll(".game-board-cell[data-column='3']").forEach((element) => {
    element.style["border-right"] = "none"
  })
})


const player1 = createPlayer("Omarrrr", "X");
const player2 = createPlayer("Ali", "O");



// const playerOneContainer = document.querySelector('.player-container[data-player="1"]');
// playerOneContainer.textContent = `${player1.name} (${player1.sign})`

// const playerTwoContainer = document.querySelector('.player-container[data-player="2"]');
// playerTwoContainer.textContent = `${player2.name} (${player2.sign})`


