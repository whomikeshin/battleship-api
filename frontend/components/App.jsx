var React = require('react'),
    Player = require('./player'),
    Game = require('./game');

var App = React.createClass({
  render: function () {
    return (
      <div className="main">
        <h2>Battleship</h2>
        <Player/>
        <Game/>
      </div>
    );
  },
});

module.exports = App;
