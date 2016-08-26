var React = require('react'),
    ApiUtil = require('../util/api_util'),
    PlayerStore = require('../stores/player');

var Game = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {
      player: null
    };
  },

  componentDidMount: function () {
    this.onPlayerChangeToken = PlayerStore.addListener(this._onPlayerChange);
    ApiUtil.fetchPlayer(this.props.params.id);
  },

  componentWillUnmount: function () {
    this.onPlayerChangeToken.remove();
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({ player: PlayerStore.find(newProps.params.id) });
  },

  render: function () {
    var player = this.state.player;

    if(!player) {
      return <div>...loading</div>;
    }

    return (
      <div className="game">
        <h2>{player.intials}</h2>
        {this.props.children}
      </div>
    );
  },

  _onPlayerChange: function () {
    this.setState({ player: PlayerStore.find(this.props.params.id) });
  },
});

module.exports = Game;
