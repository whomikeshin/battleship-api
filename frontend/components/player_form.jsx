var React = require('react'),
    ApiUtil = require ('../util/api_util');
    History = require('react-router').History;

module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {
      initials: ""
    };
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var router = this.context.router;

    ApiUtil.createPlayer(this.state, function() {
      router.push("/");
    });
  },

  render: function () {
    return (
      <div className="player-form">
        <h3>Enter Initials To Start</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="initials">Initials</label>
          <input onChange={this._updateInitials} type="text" value={this.state.initials}/>
          <br/>
          <br/>
          <button className="submit">Submit</button>
        </form>
      </div>
    )
  },

  _updateInitials: function (e) {
    this.setState({ initials: e.currentTarget.value });
  },
});
