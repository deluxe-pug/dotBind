const enviornment = 'dev';

const envParams = {
  dev: {
    url: 'http://localhost',
  },

  production: {
    url: 'http://ec2-54-86-26-97.compute-1.amazonaws.com',
  },
};


function getCurrentTabUrl(callback) {
  const queryInfo = {
    active: true,
    currentWindow: true,
  };

  chrome.tabs.query(queryInfo, tabs => {
    const tab = tabs[0];

    const icon = tab.favIconUrl;
    const url = tab.url;

    callback(url, icon);
  });
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

function renderIcon(icon) {
  document.getElementById('image-result').src = icon;
}

// when extention window is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // inject js/myScript into current tab
  getCurrentTabUrl((url, icon) => {
    // render icon and url to the popup
    renderIcon(icon);
    renderStatus(url);

    $('body').on('click', '#save', () => {
      console.log('save button clicked!');

      chrome.tabs.query({ active: true, currentWindow: true }, activeTabs => {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
          console.log('message recieved!', request.selection);
          const highlight = request.selection;
          sendResponse({ from: 'popup', msg: 'card saved!' });

          const userId = 1;
          const data = { user_id: userId, icon, url, highlight };

          console.log(envParams[enviornment]);
          $.ajax({
            type: 'POST',
            url: `${envParams[enviornment].url}:3000/v1/cards`,
            data,
            success: result => { console.log(result); },
            dataType: 'json',
          });
        });

        chrome.tabs.executeScript(
          activeTabs[0].id, { file: 'dist/myScript.js', allFrames: true }
        );
      });
    });
  });
});
