var React = require('react');
var PlayerStore = require('../stores/player_store');
var playerStoreListener = require('../mixins/player_store_listener');
var UrlEditor = require('../components/url_editor');
var Router = require('react-router');
var Link = Router.Link;

var Edit = React.createClass({

  mixins: [playerStoreListener],

  handleSubmit (e) {
    e.preventDefault();
    var newState = {
      displayDuration: this.refs.displayDuration.getDOMNode().value
    }
    PlayerStore.setState(newState);
  },

  handleAddClick () {
    var allUrls = this.state.urls;
    allUrls.push('http://example.com');
    PlayerStore.setState({urls: allUrls}, function() {
      // wait for it
      window.setTimeout(function() {
        var urls = document.querySelectorAll('.UrlEditor__Url');
        urls[urls.length - 1].focus();
      }.bind(this), 100);
    });
  },

  handleUploadClick () {
    this.refs.fileInput.getDOMNode().click();
  },

  handleFileSelect (e) {
    var fileInput = this.refs.fileInput.getDOMNode();
    window.fileInput = fileInput;
    var file = fileInput.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      var st = JSON.parse(e.target.result);
      PlayerStore.setState(st);
    }
    reader.readAsText(file);
  },

  getDownloadData () {
    var settings = JSON.stringify(PlayerStore.getState());
    return "data:text/json," + settings;
  },

  renderForm () {
    return (
      <form className='pure-form' onSubmit={this.handleSubmit}>
        <label htmlFor='displayDuration' style={{paddingRight: '10px'}}>
          Display Duration
        </label>
        <input type='text'
               ref='displayDuration'
               id='displayDuration'
               defaultValue={this.state.displayDuration}
               autoFocus={true}
               onBlur={this.handleSubmit}
               className='pure-input'
        />
        <button type='submit' className='pure-button primary'>
          <i className='icon-floppy' />
        </button>
      </form>
    );
  },

  renderUrl (url, i) {
    return (
      <UrlEditor key={url + i} url={url} store={PlayerStore} />
    );
  },

  renderUrlManager () {
    var urls = this.state.urls.map(this.renderUrl);
    return (
      <div>
        <div className='pure-g'>
          <div className='pure-u-1-12'>
            <h2>Urls</h2>
          </div>
          <div className='pure-u-11-12'>
            <button className='non-button primary-font'
                    style={{marginTop: '23px'}}
                    onClick={this.handleAddClick}
            >
              <i className='icon-plus-outline' />
            </button>
          </div>
        </div>
        {urls}
      </div>
    );
  },

  renderHeading () {
    return (
      <div className='pure-g'>
        <div className='pure-u-2-3'>
          <h1>Framerator Settings</h1>
        </div>
        <div className='pure-u-1-3' style={{textAlign: 'right', marginTop: '22px'}}>
          <input type='file'
                 ref='fileInput'
                 style={{display: 'none'}}
                 onChange={this.handleFileSelect}
          />
          { (this.state.urls.length) ?

            (<a className='pure-button primary Edit__Button'
               download='framerator_settings.json'
               href={this.getDownloadData()}
            >
              <i className='icon-download-outline' />
            </a>)
          : null }
          <button className='pure-button primary Edit__Button'
                  onClick={this.handleUploadClick}
          >
            <i className='icon-upload-outline' />
          </button>
          <Link to='play' params={{id: 1}} className='pure-button primary'>
            ▶
          </Link>
        </div>
      </div>
    );
  },

  renderImportExport () {
    return (
      <div className='pure-g'>
        <div className='pure-u-1-8'>
        </div>
        <div className='pure-u-1-8'>
        </div>
      </div>
    );
  },

  render () {
    return (
      <div className='Edit'>
        {this.renderHeading()}
        {this.renderImportExport()}
        {this.renderForm()}
        {this.renderUrlManager()}
      </div>
    );
  }

});

module.exports = Edit;
