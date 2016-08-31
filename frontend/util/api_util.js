var ApiActions = require('../actions/api_actions');

module.exports = {
  fetchBoard: function (boardId) {
    $.ajax({
      type: 'GET',
      url: 'api/boards/' + boardId,
      success: function (board) {
        ApiActions.receiveBoard(board);
      },
      error: function(data) {
        console.log(data);
      }
    });
  },

  createGame: function (formData, callback) {
    $.ajax({
      type: 'POST',
      url: 'api/games',
      data: { game: formData },
      success: function(formData) {
        ApiActions.receiveGame(formData);
        callback && callback();
      },
      error: function(data) {
        console.log(data);
      }
    });
  },

  fetchPlayer: function (playerId) {
    $.ajax({
      type: 'GET',
      url: 'api/players/' + playerId,
      success: function (player) {
        ApiActions.receivePlayers([player]);
      },
      error: function (data) {
        console.log(data);
      }
    });
  },

  createPlayer: function(formData, callback) {
    $.ajax({
      type: 'POST',
      url: 'api/players',
      data: { player: formData },
      success: function (currentPlayer) {
        ApiActions.currentPlayerReceived(currentPlayer);
        callback && callback();
      },
      error: function (data) {
        console.log(data);
      }
    });
  },

  createBoard: function(formData, success) {
    $.ajax({
      type: 'POST',
      url: 'api/boards',
      data: { board: formData },
      success: function (board) {
        ApiActions.receiveBoard(board);
        callback && callback();
      },
      error: function (data) {
        console.log(data);
      }
    });
  }
};
