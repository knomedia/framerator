var React = require('react');
var HeaderBar = require('./components/header_bar');
var FrameRotator = require('./components/frame_rotator');

var Main = React.createClass({

  getInitialState () {
    return {
      urls: [
        "https://grafana.insops.net/#/dashboard/script/request.js?app=Canvas&controller=files&action=index",
        "https://grafana.insops.net/#/dashboard/script/request.js?app=Canvas&users=files&action=index",
        "https://grafana.insops.net/#/dashboard/script/request.js?app=Canvas&controller=app_center&action=index",
        "https://grafana.insops.net/#/dashboard/script/request.js?app=Canvas&controller=quizzes-quiz_submissions_api&action=index",
        "https://grafana.insops.net/#/dashboard/script/request_db.js?app=Canvas&controller=quizzes-quiz_submissions_api&action=index"
      ],
      currentIndex: 0,
      displayDuration: 7000,
      active: true
    }
  },

  componentDidMount () {
    this.scheduleRotation(100);
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
        <FrameRotator url={url} />
      </div>
    );
  }

});

module.exports = Main;
