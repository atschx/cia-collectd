(function () {
  var _cia_data = {
    url:      location,
    referer:  document.referrer,
    loadTime: window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart,
    winWidth: window.outerWidth
  };
  var _cia_data_payload = {
    message_type:     "BACK_DATA_REQUEST",
    message_payload:  JSON.stringify(_cia_data)
  };
  chrome.runtime.sendMessage( _cia_data_payload,function() {});
})()
