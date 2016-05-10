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
    const title = tab.title;

    callback(url, icon, title);
  });
}

function renderUrl(url) {
  document.getElementById('url').textContent = url;
}

function renderIcon(icon) {
  document.getElementById('image-result').src = icon;
}

function renderContent(content) {
  document.getElementById('content').textContent = content;
}

function renderTitle(title) {
  document.getElementById('title').textContent = title;
}

// when extention window is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabProps((url, icon, title) => {

    renderIcon(icon);
    renderUrl(url);
    renderTitle(title);

    let domain = url.replace(/https?:\/\//, '');
    domain = domain.replace(/\/(.)+/, '');

    const data = {
      card: {
        icon,
        url,
        title,
        domain,
        code: null,
        text: null,
        note: null,
      },
      username: 'public',
      tags: [],
    };
    // send message to current tab
    chrome.tabs.query({ active: true, currentWindow: true }, activeTabs => {
      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log('message recieved!', request.selection);
        sendResponse({ from: 'popup', msg: 'card saved!' });
        // render icon and url to the popup
        // save selection from tab
        if (request.selection) {
          console.log('request.selection: ', request.selection);
          data.card.code = request.selection;
          renderContent(request.selection);
          // TODO: toggle content
          $('body').on('click', '.code', () => {
            data.card.code = request.selection;
            data.card.text = null;
            $(this).prop('checked', true);
            $('.text input').prop('checked', false);
            console.log(data.card.code);
          });

          $('body').on('click', '.text', () => {
            data.card.text = request.selection;
            data.card.code = null;
            $(this).prop('checked', true);
            $('.code input').prop('checked', false);
            console.log(data.card.text);
          });
        }
      });

      // inject js/myScript into current tab
      chrome.tabs.executeScript(
        activeTabs[0].id, { file: 'js/myScript.js', allFrames: true }
      );
    });

    // add tag
    $('body').on('click', 'button.tag', () => {
      const tag = $('input.tag').val().toLowerCase();
      if (tag) {
        $('ul.tags').append($('<li>').text(tag));
        data.tags.push(tag);
        $('input.tag').val('');
      }
    });
    // save note
    $('body').on('click', 'button.note', () => {
      data.card.note = $('input.note').val();
      if (data.card.note) {
        console.log('note saved!: ', data.card.note);
        $('#note').text(data.card.note);
      }
    });

    // save card
    $('body').on('click', '#save', () => {
      console.log('data sending to api end point v1/cards', data);

      $.ajax({
        type: 'POST',
        url: `${envParams[enviornment].url}:3000/v1/cards`,
        data,
        success: result => { console.log(result); },
        dataType: 'json',
      });
    });
  });
});
