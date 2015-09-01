/***
* Retrieves stored note information for the related tab.
*/
function getNote(cleaned_url) {
  chrome.storage.sync.get(cleaned_url, function(chrotes) {
    // detect if chrote exists
    if (typeof chrotes[cleaned_url] == "undefined") {
      // create initial chrote with no note
      setNote(cleaned_url, "")

      // retrieve newly created chrote
      chrome.storage.sync.get(cleaned_url, function(chrotes) {
        // send message with newly created chrote
        chrome.runtime.sendMessage({note: chrotes[cleaned_url].note});
      });
    } else {
      // send message with retrieved chrote
      chrome.runtime.sendMessage({note: chrotes[cleaned_url].note});
    }
  });
}

/***
* Sets stored note information for the related tab.
*/
function setNote(cleaned_url, note) {
  // initialize chrotes object
  var chrotes = {};

  // create chrote object with cleaned_url
  chrotes[cleaned_url] = {};

  // add note data to chrote object
  chrotes[cleaned_url]["note"] = note;

  chrome.storage.sync.set(chrotes);
}
