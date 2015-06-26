require('../node_modules/purecss/build/base-min.css');
require('../node_modules/purecss/build/pure-min.css');
require('../node_modules/purecss/build/grids-responsive-min.css');
require('./assets/styles/main.scss');


var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;



var routes = (
  <Route name='main' path='/' handler={require('./main')}>
  </Route>
);


Router.run(routes, function(Handler){
  React.render(<Handler />, document.querySelector('#main'));
});
