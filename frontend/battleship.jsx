var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),

    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    hashHistory = ReactRouter.hashHistory,
    IndexRoute = ReactRouter.IndexRoute,

    App = require('./components/App');

var router = (
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
  </Router>
);


document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById('root');
  ReactDOM.render(router, root);
});
