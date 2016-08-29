var React = require('react'),
    BoardStore = require('../stores/board');

module.exports = React.createClass({
  render: function () {
    return (
      <div className="wrapper">
        <div className="board">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
});
