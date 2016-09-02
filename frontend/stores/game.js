var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    GameConstants = require('../constants/game_constants'),
    BoardStore = require('../stores/board');

var GameStore = new Store(AppDispatcher),
    _index = 0,
    _currentGame,
    _gameStatuses = [ "Click Start to Play", "Enter Ship Position", "Enter Guess Position", "Computer Move" ];

function _getPlayerScore () {
  return BoardStore.playerScore();
}

function _getComputerScore () {
  return BoardStore.computerScore();
}

var moves = function () {
  var playerScore = _getPlayerScore(),
      computerScore = _getComputerScore();

  console.log(playerScore);
  console.log(computerScore);

  if (playerScore === 10) {
    alert("YOU WIN!");
  }

  if (computerScore === 10) {
    alert("YOU LOSE!");
  }

  if (_index === 3) {
    BoardStore.checkPlayerCell();
    _index -= 1;
  }
};

GameStore.currentIndex = function () {
  return _index;
};

GameStore.currentGame = function () {
  return _currentGame;
};

GameStore.gameStatus = function () {
  return _gameStatuses[_index];
};

GameStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case GameConstants.GAME_RECEIVED:
      _currentGame = payload.game;
      _index = 1;
      GameStore.__emitChange();
      break;
    case GameConstants.GAME_STARTED:
      _index = 2;
      moves();
      GameStore.__emitChange();
      break;
    case GameConstants.NEXT_INDEX:
      _index += 1;
      moves();
      GameStore.__emitChange();
      break;
    case GameConstants.PREV_INDEX:
      _index -= 1;
      moves();
      GameStore.__emitChange();
      break;
  }
};

module.exports = GameStore;
