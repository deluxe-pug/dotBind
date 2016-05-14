(() => {
  console.log('myScript loaded!');
  // form message with selection to send to popup.js
  const selection = {
    from: 'myScript',
    method: 'sendSelection',
    selected: window.getSelection().toString(),
  };

  // form message with user infomation to send to background.js
  const logInDotBind = {
    from: 'myScript',
    method: 'logInDotBind',
    dotBindAccessToken: localStorage.getItem('dotBindAccessToken'),
    githubUsername: localStorage.getItem('githubUsername'),
    githubId: localStorage.getItem('githubId'),
  }

  // send DotBind user infomation to background.js
  if ( logInDotBind.dotBindAccessToken ) {
    chrome.runtime.sendMessage(logInDotBind, response => console.log(response.msg));
  }
  // send selected text to popup.js
  if ( selection.selected ) {
    chrome.runtime.sendMessage(selection, response => console.log(response.msg));
  }
  // Uncomment to highlight text when being clicked on
  // Potential feature to add
  // $('body').on('mouseup', () => {
  //   $(window.getSelection().baseNode.parentNode).css({ 'background-color': 'yellow' });
  // });

})();
