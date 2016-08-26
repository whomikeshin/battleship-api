var ApiActions = require('../actions/api_actions');

module.exports = {
  fetchGame: function () {
    $.ajax({
      type: 'GET',
      url: 'api/games',
      success: function (game) {
        ApiActions.receiveGame(game);
      },
      error: function(data) {
        console.log(data);
      }
    });
  },

  fetchPlayer: function (player_id) {
    $.ajax({
      type: 'GET',
      url: 'api/players' + player_id,
      success: function (player) {
        ApiActions.receivePlayers([player]);
      },
      error: function (data) {
        console.log(data);
      }
    });
  },
};
