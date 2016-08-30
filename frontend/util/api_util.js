var ApiActions = require('../actions/api_actions');

module.exports = {
  // fetchGame: function () {
  //   $.ajax({
  //     type: 'GET',
  //     url: 'api/games',
  //     success: function (game) {
  //       ApiActions.receiveGame(game);
  //     },
  //     error: function(data) {
  //       console.log(data);
  //     }
  //   });
  // },

  createGame: function (formData, success) {
    $.ajax({
      type: 'POST',
      url: 'api/games',
      data: { game: formData },
      success: function(formData) {
        ApiActions.receiveGame(formData);
        success && success();
      },
      error: function(data) {
        console.log(data);
      }
    });
  },

  fetchPlayer: function (player_id) {
    $.ajax({
      type: 'GET',
      url: 'api/players/' + player_id,
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
  }
};
