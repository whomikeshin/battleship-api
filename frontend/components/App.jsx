var React = require('react'),
    Player = require('./player'),
    Game = require('./game');

var App = React.createClass({
  render: function () {
    return (
      <div className="main">
        <h1>Battleship</h1>
        <Player/>
        <Game/>
      </div>
    );
  },
});

module.exports = App;
