var urlHelper = require ('../../app/lib/url_helper');
var assert = require('assert');

describe('url_helper', function() {

  describe('wrapWithinRange', function(){
    it('returns number as is when already in range', function(){
      var results = urlHelper().wrapWithinRange(3, 6);
      assert.equal(results, 3);
    });

    it('returns 1, when number is greater than max', function(){
      var results = urlHelper().wrapWithinRange(7, 6);
      assert.equal(results, 1);
    });

    it('returns max, when number is less than one zero', function(){
      var results = urlHelper().wrapWithinRange(0, 6);
      assert.equal(results, 6);
    });
  });

  describe('nextIndex - prevIndex', function(){
    beforeEach(function() {
      this.store = {
        getState: function() {
          return {
            urls: {
              length: 4 // 4 items, 0 - 3
            }
          }
        }
      }
    });
    it('returns next index when within available items', function(){
      var results = urlHelper(this.store).nextIndex(2);
      assert.equal(results, 3);
    });
    it('wraps to 1 when next index is outside of items', function(){
      var results = urlHelper(this.store).nextIndex(4);
      assert.equal(results, 1);
    });
    it('returns prev index when within available items', function(){
      var results = urlHelper(this.store).prevIndex(2);
      assert.equal(results, 1);
    });
    it('wraps to last items when prev index is outside of items', function(){
      var results = urlHelper(this.store).prevIndex(0);
      assert.equal(results, 4);
    });
  });

  describe('getting urls', function(){
    beforeEach(function() {
      this.store = {
        getState: function() {
          return {
            urls: [
              'url1',
              'url2',
              'url3',
            ]
          }
        }
      }
    });
    describe('getCurrentUrl', function(){
      it('returns the store url at the display index', function(){
        var url = urlHelper(this.store).getCurrentUrl(1);
        assert.equal(url, 'url1');
      });

      it('forces param to an integer', function(){
        var url = urlHelper(this.store).getCurrentUrl('2');
        assert.equal(url, 'url2');
      });

      it('returns 1st element if param isnt a number', function(){
        var url = urlHelper(this.store).getCurrentUrl('fdsa');
        assert.equal(url, 'url1');
      });
    });

    describe('getNextUrl', function(){
      it('returns next url from given display index', function(){
        var url = urlHelper(this.store).getNextUrl(1);
        assert.equal(url, 'url2');
      });
      it('returns first url if next is our of range', function(){
        var url = urlHelper(this.store).getNextUrl(3);
        assert.equal(url, 'url1');
      });
    });

    describe('getPrevUrl', function(){
      it('returns next url from given index', function(){
        var url = urlHelper(this.store).getPrevUrl(2);
        assert.equal(url, 'url1');
      });
      it('returns first url if next is our of range', function(){
        var url = urlHelper(this.store).getPrevUrl(1);
        assert.equal(url, 'url3');
      });
    });
  });
});

