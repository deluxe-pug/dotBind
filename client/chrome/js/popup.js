const enviornment = 'dev';

const envParams = {
  dev: {
    url: 'http://localhost',
  },

  production: {
    url: 'http://ec2-54-86-26-97.compute-1.amazonaws.com',
  },
};


function getCurrentTabProps(callback) {
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
  getCurrentTabProps((url, icon) => {
    // render icon and url to the popup
    renderIcon(icon);
    renderStatus(url);

    let domain = url.replace(/https?:\/\//, '');
    domain = domain.replace(/\/(.)+/, '');

    let data = {
      card: {
        icon,
        url,
        domain,
        content: null,
        note: null,
      },
      username: 'public',
      tags: [],
    };

    // add tag
    $('body').on('click', 'button.tag', () => {
      const tag = $('input.tag').val();
      if (tag) {
        $('ul.tags').append($('<li>').text(tag));
        data.tags.push(tag);
        $('input.tag').val('');
      }
    });
    // add note
    $('body').on('click', 'button.note', () => {
      data.note = $('input.note').val();
      if (data.note) {
        $('ul.notes').append($('<li>').text(data.note));
        $('input.note').val('');
      }
    });

    // save card
    $('body').on('click', '#save', () => {

      console.log('--> save button clicked!');
      console.log(JSON.stringify(data));

      $.ajax({
        type: 'POST',
        url: `${envParams[enviornment].url}:3000/v1/cards`,
        data: data,
        success: result => { console.log(result); },
        dataType: 'json',
      });


      // chrome.tabs.query({ active: true, currentWindow: true }, activeTabs => {
      //   chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      //     console.log('message recieved!', request.selection);
      //     sendResponse({ from: 'popup', msg: 'card saved!' });

      //     data.card.content = request.selection;
      //     console.log(data);

      //     if (request.selection) {
      //       console.log(data);

      //       $.ajax({
      //         type: 'POST',
      //         url: `${envParams[enviornment].url}:3000/v1/cards`,
      //         data,
      //         success: result => { console.log(result); },
      //         dataType: 'json',
      //       });
      //     }
      //   });

      //   // inject js/myScript into current tab
      //   chrome.tabs.executeScript(
      //     activeTabs[0].id, { file: 'dist/myScript.js', allFrames: true }
      //   );
      // });

    });
  });
});
