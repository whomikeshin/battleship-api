var React = require('react'),
    BoardStore = require('../stores/board'),
    ApiUtil = require('../util/api_util');

function _getAllCells () {
  return BoardStore.all ();
}

module.exports = React.createClass({
  getInitialState: function () {
    return {
      cells: _getAllCells()
    };
  },

  _onChange: function () {
    var cells = _getAllCells();

    this.setState({
      cells: cells
    });
  },

  componentDidMount: function () {
    this.onChangeToken = BoardStore.addListener(this._onChange);
    ApiUtil.createBoard();
  },

  componentWillUnmount: function () {
    this.onChangeToken.remove();
  },

  render: function () {
    var cells = this.state.cells;

    return (
      <div className="wrapper">
        <ul className="board">
          {cells.map(function (cell) {
            return <div
              key={cell.id}
              className={cell.status}
            />;
          })}
        </ul>
      </div>
    );
  },
});
