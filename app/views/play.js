var React = require('react');
var HeaderBar = require('../components/header_bar');
var FrameRotator = require('../components/frame_rotator');

var Play = React.createClass({

  render () {
    return (
      <div>
        <HeaderBar />
        <FrameRotator />
      </div>
    );
  }

});

module.exports = Play;
