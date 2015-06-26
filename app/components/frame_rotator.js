var React = require('react');

var FrameRotator = React.createClass({

  propTypes: {
    url: React.PropTypes.string.isRequired
  },

  getInitialState () {
    return {
      previousUrl: undefined,
      currentUrl: undefined
    }
  },

  componentDidMount () {
    window.setTimeout( () =>
      this.setState({
        currentUrl: this.props.url
      }),
      100 );
  },

  componentWillReceiveProps (newProps) {
    if (this.props.url !== newProps.url) {
      this.setState({
        previousUrl: this.state.currentUrl,
        currentUrl: newProps.url
      });

    }
  },

  render () {
    return (
      <div className="FrameRotator">
        <iframe key={this.state.previousUrl}
                ref='iframe2'
                src={this.state.previousUrl}
                allowTransparency={true}
        />
        <iframe key={this.state.currentUrl}
                ref='iframe1'
                src={this.state.currentUrl}
                allowTransparency={true}
        />
      </div>
    );
  }

});

module.exports = FrameRotator;
