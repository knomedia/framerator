import React from 'react';

var HeaderBar = React.createClass({

  propTypes: {
    onStop: React.PropTypes.func.isRequired
  },

  getInitialState () {
    return {
      showing: false
    }
  },

  render () {
    var cx = "HeaderBar";
    if (this.state.showing) {
    }
    return (
      <div className={cx}
      >
        HEADER
        <button className='pure-button primary' onClick={this.props.onStop}>
          Stop
        </button>
      </div>
    );
  }

});

export default HeaderBar;
