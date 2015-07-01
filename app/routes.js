require('./assets/fontello/css/animation.css');
require('./assets/fontello/css/fontello.css'); // font icons
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
    <Route name='edit' path='edit' handler={require('./views/edit')} />
    <Route name='play' path=':id' handler={require('./views/play')} />
    <DefaultRoute handler={require('./views/default_reroute')} />
  </Route>
);


Router.run(routes, function(Handler){
  React.render(<Handler />, document.querySelector('#main'));
});
