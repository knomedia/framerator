var React = require('react');
var PlayerStore = require('../stores/player_store');
var playerStoreListener = require('../mixins/player_store_listener');
var urlHelper = require('../lib/url_helper')(PlayerStore);
var Router = require('react-router');
var Link = Router.Link;

var HeaderBar = React.createClass({

  mixins: [playerStoreListener, Router.State],

  getCurrentIndex () {
    var paramIndex = parseInt(this.getParams().id, 10);
    if (isNaN(paramIndex)) {
      paramIndex = 0
    }
    return paramIndex;
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
        <button className='pure-button HeaderBar__Controls__button'
                onClick={this.handlePlayPauseClick.bind(this, false)}
                style={{fontSize: '1.0em'}}
        >
          ■
        </button>
      );
    } else {
      return (
        <button className='pure-button HeaderBar__Controls__button'
                onClick={this.handlePlayPauseClick.bind(this, true)}
                style={{fontSize: '0.5em'}}
        >
          ▶
        </button>
      );
    }
  },

  renderControls () {
    var index = this.getCurrentIndex();
    var prevIndex = urlHelper.prevIndex(index);
    var nextIndex = urlHelper.nextIndex(index);
    return (
      <div className='HeaderBar__Controls' style={{fontSize: '1.8em'}}>
        <Link to='play'
              params={{id: prevIndex}}
              className='pure-button HeaderBar__Controls__button'
        >
          ‹
        </Link>
        {this.renderPlayPause()}
        <Link to='play'
              params={{id: nextIndex}}
              className='pure-button HeaderBar__Controls__button'
        >
          ›
        </Link>
      </div>

    );
  },

  getDisplayIndex () {
    var displayIndex = this.state.currentIndex;
    if (displayIndex === 0) {
      displayIndex = this.state.urls.length
    }
    return displayIndex;
  },

  getDisplayUrl () {
    return urlHelper.getCurrentUrl(this.getCurrentIndex());
  },

  renderCurrentInfo () {
    return (
      <div className='HeaderBar__CurrentInfo'>
        <div>
          <a href={this.getDisplayUrl()}>{this.getDisplayUrl()}</a>
        </div>
        <div>
          {this.getCurrentIndex()} of {this.state.urls.length}
        </div>
      </div>
    );
  },

  render () {
    var cx = "HeaderBar";
    return (
      <div className={cx}>
        <div>
          <Link className='HeaderBar__Editlink' to='edit'>⚙</Link>
        </div>
        {this.renderControls()}
        {this.renderCurrentInfo()}
      </div>
    );
  }

});

module.exports = HeaderBar;
