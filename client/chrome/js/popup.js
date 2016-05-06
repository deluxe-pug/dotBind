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
  document.getElementById('url').textContent = statusText;
}

function renderIcon(icon) {
  document.getElementById('image-result').src = icon;
}

// when extention window is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // inject js/myScript into current tab
  getCurrentTabUrl((url, icon) => {
    const snippets = [];
    const notes = [];
    const tags = [];
    // render icon and url to the popup
    renderIcon(icon);
    renderStatus(url);
    // add snippet
    $('body').on('click', 'button.snippet', () => {
      console.log('save snippet fired!');
      if ($('input.snippet').val()) {
        $('ul.snippets').append($('<li>').text($('input.snippet').val()));
        snippets.push(($('input.snippet').val()));
        $('input.snippet').val('');
      }
    });
    // add tag
    $('body').on('click', 'button.tag', () => {
      console.log('save tag fired!');
      if ($('input.tag').val()) {
        $('ul.tags').append($('<li>').text($('input.tag').val()));
        tags.push(($('input.tag').val()));
        $('input.tag').val('');
      }
    });
    // add note
    $('body').on('click', 'button.note', () => {
      console.log('save note fired!');
      if ($('input.note').val()) {
        $('ul.notes').append($('<li>').text($('input.note').val()));
        notes.push(($('input.note').val()));
        $('input.note').val('');
      }
    });

    $('body').on('click', 'button.tag', () => {
      console.log('save tag fired');
    });

    $('body').on('click', '#save', () => {
      console.log('save button clicked!');

      chrome.tabs.query({ active: true, currentWindow: true }, activeTabs => {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
          console.log('message recieved!', request.selection);
          const snippet = request.selection;
          sendResponse({ from: 'popup', msg: 'card saved!' });
          // assemble request body
          // const userId = 1;
          // const data = {
          //   user_id: userId,
          //   icon,
          //   url,
          //   snippet,
          // };

          const data = {
            username: "public",
            card: { url: url },
            snippets: [
               { content: "american" },
               { content: "pie" },
            ],
            tags: [
               {
                 name: "React"
               },
               {
                 name: "Backbone"
               }
            ]
         }

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
