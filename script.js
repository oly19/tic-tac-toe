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

const player1 = createPlayer("Omar", "X");
const player2 = createPlayer("Ali", "O");


// DOM Manipulation //

const mainContainer = document.querySelector("#main-container");
const gameBoardContainer = document.createElement("div");
gameBoardContainer.textContent = "test";