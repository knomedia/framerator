var React = require('react');
var PlayerStore = require('../stores/player_store');
var playerStoreListener = require('../mixins/player_store_listener');
var UrlEditor = require('../components/url_editor');

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
        <button type='submit' className='pure-button primary'>Save</button>
      </form>
    );
  },

  renderUrl (url) {
    return (
      <UrlEditor key={url} url={url} store={PlayerStore} />
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
