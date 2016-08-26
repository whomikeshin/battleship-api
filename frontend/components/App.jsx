var React = require('react'),
    Player = require('./player'),
    Game = require('./game/game');

var App = React.createClass({
  render: function () {
    return (
      <div className="main">
        <h2>Battleship</h2>
        <Player/>
        <Game/>
        {this.props.children}
      </div>
    );
  },
});

module.exports = App;
