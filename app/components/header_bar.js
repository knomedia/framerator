var React = require('react');
var PlayerStore = require('../stores/player_store');
var playerStoreListener = require('../mixins/player_store_listener');

var HeaderBar = React.createClass({

  mixins: [playerStoreListener],

  propTypes: {
    onStop: React.PropTypes.func.isRequired
  },

  getInitialState () {
    return {
      showing: false
    }
  },

  handlePlayPauseClick (active) {
    PlayerStore.setState({active: active});
  },

  renderPlayPause () {
    if (PlayerStore.getState().active) {
      return (
        <button className='pure-button primary' onClick={this.handlePlayPauseClick.bind(this, false)}>
          Stop
        </button>
      );
    } else {
      return (
        <button className='pure-button primary' onClick={this.handlePlayPauseClick.bind(this, true)}>
          Play
        </button>
      );
    }
  },

  render () {
    var cx = "HeaderBar";
    if (this.state.showing) {
    }
    return (
      <div className={cx}
      >
        {this.renderPlayPause()}
        <div>
          duration between urls: {this.state.displayDuration}
        </div>
        <div>
          currently on: {this.state.currentIndex} of {this.state.urls.length}
        </div>

      </div>
    );
  }

});

module.exports = HeaderBar;
