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
        console.log('message recieved!', request.doBindAccesToken);
        localStorage.setItem('doBindAccesToken', request.doBindAccesToken);
        localStorage.setItem('gitHubId', request.gitHubId);
        sendResponse({ from: 'background', msg: 'got the message in background!' });
      }
    });
  });

})();
