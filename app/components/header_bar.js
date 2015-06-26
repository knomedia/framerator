import React from 'react';

var HeaderBar = React.createClass({

  getInitialState () {
    return {
      showing: false

    }
  },

  renderHeader () {
    if (this.state.showing) {
      return (
        <div className='HeaderBar'>
          HEADER
        </div>
      );
    }
  },

  render () {
    return (
      <div>{this.renderHeader()}</div>
    );
  }

});

export default HeaderBar;
