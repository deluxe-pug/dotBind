'use strict';

(function () {
  // console.log('myScript loaded!');
  // console.log(document.domain);
  // form message with selection to send to popup.js
  var selection = {
    from: 'myScript',
    method: 'sendSelection',
    selected: window.getSelection().toString()
  };

  // form message with user infomation to send to background.js
  var logInDotBind = {
    from: 'myScript',
    method: 'logInDotBind',
    dotBindAccessToken: localStorage.getItem('dotBindAccessToken'),
    githubUsername: localStorage.getItem('githubUsername'),
    githubId: localStorage.getItem('githubId')
  };

  var logOutDotBind = {
    from: 'myScript',
    method: 'logOutDotBind'
  };

  // when user is on dotbind.io
  if (document.domain === 'localhost' || document.domain === 'www.dotbind.io') {
    // send DotBind user infomation to background.js
    if (logInDotBind.dotBindAccessToken) {
      chrome.runtime.sendMessage(logInDotBind, function (response) {
        return console.log(response.msg);
      });
    } else {
      chrome.runtime.sendMessage(logOutDotBind, function (response) {
        return console.log(response.msg);
      });
    }
  }

  // send selected text to popup.js
  if (selection.selected) {
    chrome.runtime.sendMessage(selection, function (response) {
      return console.log(response.msg);
    });
  }

  // Uncomment to highlight text when being clicked on
  // Potential feature to add
  // $('body').on('mouseup', () => {
  //   $(window.getSelection().baseNode.parentNode).css({ 'background-color': 'yellow' });
  // });
})();