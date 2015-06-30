var React = require('react');
var PlayerStore = require('../stores/player_store');
var playerStoreListener = require('../mixins/player_store_listener');

var Edit = React.createClass({

  mixins: [playerStoreListener],

  handleSubmit (e) {
    e.preventDefault();
    var newState = {
      displayDuration: this.refs.displayDuration.getDOMNode().value
    }
    PlayerStore.setState(newState);
  },

  renderForm () {
    return (
      <form className='pure-form' onSubmit={this.handleSubmit}>
        <label htmlFor='displayDuration'>
          Display Duration
        </label>
        <input type='text'
               ref='displayDuration'
               id='displayDuration'
               defaultValue={this.state.displayDuration}
               autoFocus={true}
               className='pure-input'
        />
        <button type='submit' className='pure-button'>Save</button>
      </form>
    );
  },

  renderUrl (url) {
    return (
      <div key={url} className='pure-g'>
        <div className='pure-u-1-12'>
          <button>d</button>
        </div>
        <div className='pure-u-11-12'>
          {url}
        </div>
      </div>
    );
  },

  renderUrlManager () {
    var urls = this.state.urls.map(this.renderUrl);
    return (
      <div>
        <h2>Urls</h2>
        {urls}
      </div>
    );
  },

  render () {
    return (
      <div className='Edit'>
        <h1>Framerator Settings</h1>
        {this.renderForm()}
        {this.renderUrlManager()}
      </div>
    );
  }

});

module.exports = Edit;
