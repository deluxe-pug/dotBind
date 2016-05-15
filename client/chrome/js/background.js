(() => {
  console.log('my background loaded!');

  chrome.tabs.query({ active: true, currentWindow: true }, activeTabs => {
    // inject js/myScript into current tab
    chrome.tabs.executeScript(
      activeTabs[0].id, { file: 'js/myScript.js', allFrames: true }
    );
    // add event listener to recieve message from myScript.js
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      
      if (request.method === "logInDotBind") {
        console.log('message recieved logInDotBind!', request.dotBindAccessToken);
        localStorage.setItem('dotBindAccessToken', request.dotBindAccessToken);
        localStorage.setItem('githubId', request.githubId);
        localStorage.setItem('githubUsername', request.githubUsername)
        sendResponse({ from: 'background', msg: 'got the message in background and saved user info!' });
      }

      if (request.method === "logOutDotBind") {
        console.log('message recieved logOutDotBind!');
        localStorage.clear();
        sendResponse({ from: 'background', msg: 'got the message in background and cleared userinfo!' });
      }

    });
  });

})();
