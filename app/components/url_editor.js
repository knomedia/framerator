var React = require('react');

var UrlEditor = React.createClass({

  propTypes: {
    url: React.PropTypes.string.isRequired,
    store: React.PropTypes.object.isRequired
  },

  getInitialState () {
    return {
      editing: false
    }
  },

  handleFocus (e) {
    this.setState({editing: true}, function() {
      this.refs.urlField.getDOMNode().focus();
    }.bind(this));
  },

  handleBlur (e) {
    var value = this.refs.urlField.getDOMNode().value;
    if (value !== this.props.url) {
      this.updateUrl(value);
    }
    this.setState({editing: false});
  },

  handleKeyUp (e) {
    if (e.key === 'Enter') {
      this.refs.link.getDOMNode().focus();
    }
  },

  handleDeleteClick () {
    var message = this.props.url + '\n\n Delete it?';
    if (confirm(message)) {
      var allUrls = this.getAllUrls();
      var index = this.getUrlIndex();
      allUrls.splice(1, 1);
      this.props.store.setState({urls: allUrls});
    }
  },

  updateUrl (newUrl) {
    var allUrls = this.getAllUrls();
    var index = this.getUrlIndex();
    allUrls[index] = newUrl;
    this.props.store.setState({urls: allUrls});
  },

  getUrlIndex () {
    var allUrls = this.getAllUrls();
    var index = allUrls.indexOf(this.props.url);
    return index;
  },

  getAllUrls () {
    return this.props.store.getState().urls;
  },


  renderUrl (url) {
    if (this.state.editing) {
      return (
        <input type='text'
               className='pure-input pure-u-1'
               defaultValue={url}
               onBlur={this.handleBlur}
               onKeyUp={this.handleKeyUp}
               ref='urlField'
        />
      );
    } else {
      return (
        <span tabIndex={0} onFocus={this.handleFocus}>{url}</span>
      );
    }
  },

  render () {
    var url = this.props.url
    return (
      <div key={url} className='pure-g'>
        <div className='pure-u-1-24'>
          <button className='non-button' onClick={this.handleDeleteClick}>
            <i className='icon-cancel-circled-outline red' />
          </button>
        </div>
        <div className='pure-u-1-24'>
          <a href={url} target='_blank' ref='link'>
            <i className='icon-link' />
          </a>
        </div>
        <div className='pure-u-22-24'>
          {this.renderUrl(url)}
        </div>
      </div>
    );
  }

});

module.exports = UrlEditor;
