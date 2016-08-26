var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Modal = require("react-modal"),

    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    hashHistory = ReactRouter.hashHistory,

    Game = require('./components/game');

var router = (
  <Router history={hashHistory}>
    <Route path="/" component={Game}/>
  </Router>
);


document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById('root');
  Modal.setAppElement(root);
  ReactDOM.render(router, root);
});
