var React = require('react');
var PlayerStore = require('../stores/player_store');
var Router = require('react-router');


var DefaultReroute = React.createClass({

  mixins: [Router.Navigation],

  componentWillMount () {
    var urls = PlayerStore.getState().urls;
    if (urls.length) {
      this.transitionTo('play', {id: 1});
    } else {
      this.transitionTo('edit');
    }
  },

  render () {
    return (
      <div>
        ...
      </div>
    );
  }

});

module.exports = DefaultReroute;
