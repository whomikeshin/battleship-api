var React = require('react'),
    GameStore = require('../../stores/game');

var Game = React.createClass({
  render: function () {
    var board = [
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "] ];

    return (
      <div className="board">
        {board}
      </div>
    );
  }
});

module.exports = Game;
