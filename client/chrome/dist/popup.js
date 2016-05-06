'use strict';

var enviornment = 'dev';

var envParams = {
  dev: {
    url: 'http://localhost'
  },

  production: {
    url: 'http://ec2-54-86-26-97.compute-1.amazonaws.com'
  }
};

function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function (tabs) {
    var tab = tabs[0];

    var icon = tab.favIconUrl;
    var url = tab.url;

    callback(url, icon);
  });
}

function renderStatus(statusText) {
  document.getElementById('url').textContent = statusText;
}

function renderIcon(icon) {
  document.getElementById('image-result').src = icon;
}

// when extention window is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // inject js/myScript into current tab
  getCurrentTabUrl(function (url, icon) {
    // render icon and url to the popup
    renderIcon(icon);
    renderStatus(url);
    // add snippet
    $('body').on('click', 'button .snippet', function () {
      console.log('save snippet fired');
    });
    // add tag

    $('body').on('click', '#save', function () {
      console.log('save button clicked!');

      chrome.tabs.query({ active: true, currentWindow: true }, function (activeTabs) {
        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
          console.log('message recieved!', request.selection);
          var snippet = request.selection;
          sendResponse({ from: 'popup', msg: 'card saved!' });
          // assemble request body
          var userId = 1;
          var data = {
            user_id: userId,
            icon: icon,
            url: url,
            snippet: snippet
          };

          console.log(envParams[enviornment]);
          $.ajax({
            type: 'POST',
            url: envParams[enviornment].url + ':3000/v1/cards',
            data: data,
            success: function success(result) {
              console.log(result);
            },
            dataType: 'json'
          });
        });

        chrome.tabs.executeScript(activeTabs[0].id, { file: 'dist/myScript.js', allFrames: true });
      });
    });
  });
});