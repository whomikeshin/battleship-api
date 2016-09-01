var React = require('react'),
    GameStore = require('../stores/game'),
    PlayerStore = require('../stores/player'),
    BoardStore = require('../stores/board'),
    Board = require('./board'),
    ApiUtil = require('../util/api_util'),
    GameActions = require('../actions/game_actions');

function _getCurrentPlayer () {
  return PlayerStore.currentPlayer();
}

function _getGameStatus () {
  return GameStore.gameStatus();
}

module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    var player = _getCurrentPlayer(),
        gameStatus = _getGameStatus(),
        playerId;

    if (player) {
      playerId = player.id
    }

    return {
      player_id: playerId,
      computer_id: 1,
      gameStatus: gameStatus
    }
  },

  componentDidMount: function () {
    this.onPlayerChangeToken = PlayerStore.addListener(this._onPlayerChange)
    this.onGameChangeToken = GameStore.addListener(this._onGameChange)
  },

  componentWillUnmount: function () {
    this.onPlayerChangeToken.remove();
    this.onGameChangeToken.remove();
  },

  render: function () {
    var playerId = this.state.player_id,
        computerId = this.state.computer_id;

    if (!playerId) {
      return <div></div>
    }

    return (
      <div>
        <h3>{this.state.gameStatus}</h3>
          <button
            className="start"
            onClick={this._onClick.bind(this, this.state)}>Start
          </button>
        <Board playerId={playerId}/>
      </div>
    );
  },

  _onPlayerChange: function () {
    var currentPlayer = PlayerStore.currentPlayer();

    this.setState({
      player_id: currentPlayer.id
    })
  },

  _onGameChange: function () {
    var gameStatus = _getGameStatus();

    this.setState({
      gameStatus: gameStatus
    })
  },

  _onClick: function (gameInfo) {
    ApiUtil.createGame(gameInfo);
  }
});
