/*
 * where store is an object that has a getState() and that state has:
 *  - currentIndex int
 *  - urls array
 *
 */

var getDefaultStore = function () {
  return {
    getState () {
      return {
        urls: [],
        currentIndex: 0
      }
    }
  }
}


module.exports = function (store) {

  var _store = store || getDefaultStore();

  function getCurrentUrl (displayIndex) {
    var index = convertToArrayIndex(displayIndex);
    return _store.getState().urls[index];
  }

  function getNextUrl (displayIndex) {
    var index = convertToArrayIndex(displayIndex);
    var offsetIndex = wrapWithinRange(index + 1, _store.getState().urls.length - 1, 0);
    return _store.getState().urls[offsetIndex];
  }

  function getPrevUrl (displayIndex) {
    var index = convertToArrayIndex(displayIndex);
    var offsetIndex = wrapWithinRange(index - 1, _store.getState().urls.length - 1, 0);
    return _store.getState().urls[offsetIndex];
  }

  function convertToArrayIndex (displayIndex) {
    return (coerceNumber(displayIndex) - 1);
  }

  function coerceNumber(num) {
    var index = parseInt(num, 10);
    if (isNaN(index)) {
      index = 1;
    }
    return wrapWithinRange(index, _store.getState().urls.length);
  }

  function nextIndex (index) {
    index += 1;
    index = wrapWithinRange(index, _store.getState().urls.length);
    return index;
  }

  function prevIndex (index) {
    index -= 1;
    index = wrapWithinRange(index, _store.getState().urls.length);
    return index;
  }

  function wrapWithinRange (number,  max, min) {
    if (min === undefined) {
      min = 1
    }
    if (number > max) {
      number = min;
    } else if (number < min) {
      number = max
    }
    return number
  }

  return {
    getCurrentUrl: getCurrentUrl,
    getNextUrl: getNextUrl,
    getPrevUrl: getPrevUrl,
    wrapWithinRange: wrapWithinRange,
    nextIndex: nextIndex,
    prevIndex: prevIndex
  }
}
