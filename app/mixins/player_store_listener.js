var PlayerStore = require('../stores/player_store');

module.exports = {

  getInitialState () {
    var st = PlayerStore.getState();
    return {
      urls: st.urls,
      currentIndex: st.currentIndex,
      displayDuration: st.displayDuration,
      active: st.active
    }
  },

  componentDidMount () {
    PlayerStore.addChangeListener(this.onPlayerStoreChange);
  },

  componentWillUnmount () {
    PlayerStore.removeChangeListener(this.onPlayerStoreChange);
  },

  onPlayerStoreChange () {
    var st = PlayerStore.getState();
    var newState = {
      urls: st.urls,
      currentIndex: st.currentIndex,
      displayDuration: st.displayDuration,
      active: st.active
    }
    this.setState(st);
  },
}
