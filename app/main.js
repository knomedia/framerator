var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;


var Main = React.createClass({

  render () {
    return (
      <div>
        <RouteHandler />
      </div>
    );
  }

});

module.exports = Main;
