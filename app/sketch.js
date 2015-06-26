(function() {
  var urls = [
    "https://grafana.insops.net/#/dashboard/script/request.js?app=Canvas&controller=files&action=index",
    "https://grafana.insops.net/#/dashboard/script/request.js?app=Canvas&users=files&action=index",
    "https://grafana.insops.net/#/dashboard/script/request.js?app=Canvas&controller=app_center&action=index",
    "https://grafana.insops.net/#/dashboard/script/request.js?app=Canvas&controller=quizzes-quiz_submissions_api&action=index",
    "https://grafana.insops.net/#/dashboard/script/request_db.js?app=Canvas&controller=quizzes-quiz_submissions_api&action=index"
  ];

  var index = -1;
  var intervalId;
  var SHOW_DURATION = 10000;
  var APPROX_LOAD_TIME = 2000;
  showNextPage();

  intervalId = window.setInterval(showNextPage, SHOW_DURATION);

  function showNextPage() {
    index = nextIndex(index, urls.length);
    buildFrame(urls[index]);
  }

  function kickoff () {
    document.querySelector('#stop').addEventListener('click', onStopClick);
  }

  function killPreviousFrames(iframe) {
    [].forEach.call(
      document.querySelectorAll('iframe'),
      function(frame) {
        if (frame !== iframe) {
          frame.remove();
        }
      });
  }

  function buildFrame(url) {
    var main = document.querySelector('#main');
    var iframe = document.createElement('iframe');
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.seamless = 'seamless';
    console.log(url);
    iframe.onload = function() {
      console.log('iframe loaded');
      main.appendChild(iframe);
      setTimeout(function() {
        killPreviousFrames(iframe);
      }, APPROX_LOAD_TIME);
    }();
    iframe.src = url;
  }

  function nextIndex(i, length) {
    var idx = i + 1;
    if (idx >= length) {
      idx = 0;
    }
    return idx;
  }

  function onStopClick() {
    window.clearInterval(intervalId);
  }

  kickoff();
})();
