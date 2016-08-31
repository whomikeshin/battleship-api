var React = require('react'),
    PlayerForm = require('./player_form'),
    PlayerStore = require('../stores/player');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      player: null
    };
  },

  componentDidMount: function () {
    this.onChangeToken = PlayerStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.onChangeToken.remove();
  },

  render: function () {
    var player = this.state.player;

    if (!player) {
      return <PlayerForm/>;
    }

    return (
      <div>
        <h3>Player: {player.initials}</h3>
      </div>
    );
  },

  _onChange: function () {
    this.setState({
      player: PlayerStore.currentPlayer()
    });
  },
});
