// when popup window is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  //if the user is not logged in
  if ( !localStorage.getItem('dotBindAccessToken') ) {
    // append a login button
    $('body').prepend($('<button id="login" class="btn waves-effect indigo btn-small" type="submit" name="action">Login</button>'));
    $('body').prepend($('<h6>You are not logged in yet!</h6>'));
    $('body').on('click', '#login', () => {
      chrome.tabs.create({url: `${envParams[enviornment].url}:8000`});
      window.close();
    });
  }

  getCurrentTabProps((url, icon, title) => {

    // render icon and url to the popup
    // save selection from tab
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
      // username: 'public',
      username: localStorage.getItem('githubUsername'),
      tags: [],
    };
    // send message to current tab
    chrome.tabs.query({ active: true, currentWindow: true }, activeTabs => {

      // inject js/myScript into current tab
      chrome.tabs.executeScript(
        activeTabs[0].id, { file: 'js/myScript.js', allFrames: true }
      );

      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log('here is the request', request);

        if (request.method === 'sendSelection') {
          console.log('message recieved in popup!', request.selected);
          sendResponse({ from: 'popup', msg: 'message recieved from popups!' });
          console.log('request.selected: ', request.selected);
          data.card.code = request.selected;
          renderContent(request.selected);

          // toggle content type
          $('body').on('click', '.code', () => {
            data.card.code = request.selected;
            data.card.text = null;
            $(this).prop('checked', true);
            $('.text input').prop('checked', false);
            console.log(data.card.code);
          });

          $('body').on('click', '.text', () => {
            data.card.text = request.selected;
            data.card.code = null;
            $(this).prop('checked', true);
            $('.code input').prop('checked', false);
            console.log(data.card.text);
          });
        }
      });
    });
    // add tags
    function addTags() {
      if ( !!$('input.tag').val() ) {
        const tags = $('input.tag').val().toLowerCase().split(' ');
        console.log(tags);
        tags.forEach((tag) => {
          let $tag = $('<div class="chip"></div>').text(tag);
          $tag.append($('<i class="material-icons">close</i>'));
          $('ul.tags').append($tag);
          data.tags.push(tag);
          $('input.tag').val('');
        });
      }
    };

    $('body').on('click', 'button.tag', addTags);
    $('input.tag').keypress((event) => {
      if ( event.which === 13 ) { addTags(); }
    });
    // delete tag
    $('ul.tags').on('click','.chip i.material-icons', (event) => {
      let $tag = $(event.target).parent();
      let index = data.tags.indexOf($tag.text().replace('close', ''));
      data.tags.splice(index, 1)
      console.log('tags after delete: ',data.tags);
      $tag.remove();
    });
    // save card
    const accesstoken = localStorage.getItem('dotBindAccessToken');
    // const accesstoken = 'dotBind';

    $('body').on('click', '#save', () => {
      if ( accesstoken ) {
        // save note
        if ( !!$('input.note').val() ) {
          data.card.note = $('input.note').val();
        }
        console.log('data sending to api end point v1/cards', data);
        $.ajax({
          type: 'POST',
          url: `${envParams[enviornment].url}:3000/v1/cards?access_token=${accesstoken}`,
          data,
          success: result => {
            console.log(result);
            window.close();
          },
          dataType: 'json',
        });
      } else {
        $('body').append($('<div>You are not logged in yet!</div>'));
      }

    });
  });
});

// ************* setting environment ***********
const enviornment = 'dev';

const envParams = {
  dev: {
    url: 'http://localhost',
  },
  production: {
    url: 'http://www.dotbind.io',
  },
};

// ************* helper functions *************
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
  document.getElementById('content').textContent = resolveContent(content);
}

function renderTitle(title) {
  document.getElementById('title').textContent = title;
}

function resolveContent(content) {
  return content.length > 120 ? content.substring(0,120) + '...' : content;
}
