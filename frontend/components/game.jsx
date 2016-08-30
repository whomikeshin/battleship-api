var React = require('react'),
    History = require('react-router').History,

    GameStore = require('../stores/game'),
    PlayerStore = require('../stores/player'),
    Board = require('./board'),
    ApiUtil = require('../util/api_util');

function _getCurrentPlayer () {
  return PlayerStore.currentPlayer();
}

module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    var player = _getCurrentPlayer(),
        playerId;

    if (player) {
      playerId = player.id
    }

    return {
      player_id: playerId,
      computer_id: 1
    }
  },

  componentDidMount: function () {
    this.onChangeToken = PlayerStore.addListener(this._onPlayerChange)
  },

  componentWillUnmount: function () {
    this.onChangeToken.remove();
  },

  render: function () {
    var playerId = this.state.player_id;

    if (!playerId) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <h3>Start Game</h3>
          <button
            className="start"
            onClick={this._onClick.bind(this, this.state)}>Start
          </button>
        <Board/>
      </div>
    );
  },

  _onPlayerChange: function () {
    var currentPlayer = PlayerStore.currentPlayer();

    this.setState({
      player_id: currentPlayer.id
    })
  },

  _onClick: function (gameInfo) {
    // var success = function () {
    //   router.push("/");

    ApiUtil.createGame(gameInfo);
  }
});