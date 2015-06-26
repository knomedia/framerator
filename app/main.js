var React = require('react');
var PlayerStore = require('./stores/player_store');
var HeaderBar = require('./components/header_bar');
var FrameRotator = require('./components/frame_rotator');
var playerStoreListener = require('./mixins/player_store_listener');

var Main = React.createClass({

  mixins: [playerStoreListener],

  componentDidMount () {
    if (this.state.active) {
      this.scheduleRotation(100);
    }
  },

  scheduleRotation (delay) {
    delay = delay || this.state.displayDuration;
    window.setTimeout(this.rotateUrls, delay);
  },

  rotateUrls () {
    if (this.state.active) {
      var idx = this.state.currentIndex;
      idx++;
      if (idx >= this.state.urls.length) {
        idx = 0;
      }
      this.setState({currentIndex: idx}, this.scheduleRotation);
    }
  },

  handleStop () {
    this.setState({active: false});
  },

  render () {
    var url = this.state.urls[this.state.currentIndex];
    return (
      <div>
        <HeaderBar onStop={this.handleStop} />
        { (url)?
          <FrameRotator url={url} />
          : null
        }
      </div>
    );
  }

});

module.exports = Main;
