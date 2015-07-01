var PlayerStore = require('js-store').createStore({}, 'player');

function setDefault(attr, def) {
  if (!PlayerStore.getState()[attr]) {
    var st = {};
    st[attr] = def;
    PlayerStore.setState(st);
  }
}
setDefault('displayDuration', 7000);
setDefault('active', true);
setDefault('urls', []);

module.exports = PlayerStore;
