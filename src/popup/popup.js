// GLOBALS
var stored_title;
var stored_url;
var cleaned_url;
var note;
var background = chrome.extension.getBackgroundPage();

// Event listener for popup close
addEventListener("unload", function (event) {
  note = document.getElementById('note').innerHTML;
  background.setNote(cleaned_url, note);
}, true);

// Event listener for popup open
document.addEventListener('DOMContentLoaded', function() {
  getTabInfo(function(tab) {
    stored_title = tab.title;
    stored_url = tab.url;
    cleaned_url = stored_url.replace(/[\s\:\?\/\=\#\-]/g, '');

    // gets note
    background.getNote(cleaned_url);

    // retrieves & displays note contents
    chrome.runtime.onMessage.addListener(function(request, sender) {
      document.getElementById('note').innerHTML = request.note;
      document.getElementById('tab_title').textContent = stored_title;
    });
  });
});

/***
* Returns (async) active tab information
*/
function getTabInfo(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    callback(tab);
  });
}
