var React = require('react');
var PlayerStore = require('../stores/player_store');
var playerStoreListener = require('../mixins/player_store_listener');
var Router = require('react-router');

var intervalId;

var urlHelper = require('../lib/url_helper')(PlayerStore);

var FrameRotator = React.createClass({

  mixins: [playerStoreListener, Router.State],

  getInitialState () {
    return {
      previousUrl: undefined,
      currentUrl: undefined
    }
  },

  componentDidMount () {
    if (this.state.active) {
      //this.scheduleRotation(100);
    }
    //window.setTimeout( () =>
      //this.setState({
      //  currentUrl: this.props.url
      //}),
      //100 );
  },

  scheduleRotation (delay) {
    //delay = delay || this.state.displayDuration;
    //window.setTimeout(this.rotateUrls, delay);
  },

  rotateUrls () {
    //if (this.state.active) {
    //  var idx = this.state.currentIndex;
    //  idx++;
    //  if (idx >= this.state.urls.length) {
    //    idx = 0;
    //  }
    //  PlayerStore.setState({currentIndex: idx}, this.scheduleRotation);
    //}
  },

  componentWillReceiveProps (newProps) {
    //if (this.props.url !== newProps.url) {
    //  this.setState({
    //    previousUrl: this.state.currentUrl,
    //    currentUrl: newProps.url
    //  });
    //}
  },

  getCurrentIndex () {
    var paramIndex = parseInt(this.getParams().id, 10);
    if (isNaN(paramIndex)) {
      paramIndex = 0
    }
    return paramIndex;
  },

  getUrlTriad () {
    var index = this.getCurrentIndex();
    return {
      index: index,
      current: urlHelper.getCurrentUrl(index),
      next: urlHelper.getNextUrl(index),
      prev: urlHelper.getPrevUrl(index)
    }
  },

  renderUrlList (currentUrl) {
    return this.state.urls.map(function(u) {
      var style = {};
      if (u === currentUrl) {
        style = {
          color: 'red'
        }
      }
      return (<div style={style} key={u}>{u}</div>)
    });
  },

  renderBoxes () {
    var triad = this.getUrlTriad();
    var style = {
      float: 'left',
      width: '350px',
      height: '300px',
      marginRight: '3px',
      overflow: 'none',
      background: '#EEE',
      color: '#BBB',
      fontSize: '1.1em',
    }
    return (
      <div>

        <div style={style}>
          {triad.prev}
        </div>

        <div style={style}>
          {triad.current}
        </div>

        <div style={style}>
          {triad.next}
        </div>

        {this.renderUrlList(triad.current)}
      </div>
    );
  },

  renderIframes () {
    var triad = this.getUrlTriad();
    return (
      <div>
      {this.renderUrlList(triad.current)}
      <div className="FrameRotator">
        <iframe key={triad.prev}
                ref='iframe0'
                src={triad.prev}
                style={{display: 'none'}}
                allowTransparency={true}
        />
        <iframe key={triad.current}
                ref='iframe1'
                src={triad.current}
                allowTransparency={true}
        />
        <iframe key={triad.next}
                ref='iframe2'
                src={triad.next}
                style={{display: 'none'}}
                allowTransparency={true}
        />
      </div>
      </div>
    );
  },

  render () {
    return this.renderIframes();
  }

});

module.exports = FrameRotator;
