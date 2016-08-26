var React = require('react'),
    Player = require('./player');

var App = React.createClass({
  render: function () {
    return (
      <div className="main">
        <h2>Battleship</h2>
        <Player/>
        {this.props.children}
      </div>
    );
  },
});

module.exports = App;
