var React = require('react'),
    GameStore = require('../stores/game'),
    Board = require('./board');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <Board/>
      </div>
    );
  }
});
