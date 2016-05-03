function getCurrentTabUrl(callback) {
  let queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {

    let tab = tabs[0];

    let icon = tab.favIconUrl;
    let url = tab.url;

    callback(url, icon);
  });
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

function renderIcon(icon) {
  document.getElementById('image-result').src = icon;
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url, icon) {

    renderStatus(url);
    renderIcon(icon);
    
    $( "body" ).on("click", "#save", function() {
      
      console.log('save button clicked!');

    });

  });
});