'use strict';

// when popup window is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  //if the user is not logged in
  if (!localStorage.getItem('dotBindAccessToken')) {
    // append a login button
    $('body').prepend($('<button id="login" class="btn waves-effect indigo btn-small" type="submit" name="action">Login</button>'));
    $('body').prepend($('<h6>You are not logged in yet!</h6>'));
    $('body').on('click', '#login', function () {
      chrome.tabs.create({ url: envParams[enviornment].url + ':8000' });
      window.close();
    });
  }

  getCurrentTabProps(function (url, icon, title) {

    var domain = url.replace(/https?:\/\//, '');
    domain = domain.replace(/\/(.)+/, '');

    // render icon and url to the popup
    // save selection from tab
    renderIcon(icon);
    renderUrl(domain);
    renderTitle(title);

    var data = {
      card: {
        icon: icon,
        url: url,
        title: title,
        domain: domain,
        code: null,
        note: null
      },
      // username: 'public',
      username: localStorage.getItem('githubUsername'),
      tags: []
    };
    // send message to current tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (activeTabs) {

      // inject js/myScript into current tab
      chrome.tabs.executeScript(activeTabs[0].id, { file: 'js/myScript.js', allFrames: true });

      chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        // console.log('here is the request', request);

        if (request.method === 'sendSelection') {
          // console.log('message recieved in popup!', request.selected);
          sendResponse({ from: 'popup', msg: 'message recieved from popups!' });
          // console.log('request.selected: ', request.selected);
          data.card.code = request.selected;
          renderContent(request.selected);
        }
      });
    });
    // add tags
    function addTag() {
      if (!!$('input.tag').val() && $('input.tag').val() !== ' ') {
        var tag = $('input.tag').val().toLowerCase().replace(' ', '');
        var $tag = $('<div class="chip"></div>').text(tag);
        $tag.append($('<i class="material-icons">close</i>'));
        $('ul.tags').append($tag);
        data.tags.push(tag);
        $('input.tag').val('');
      }
    };

    $('input.tag').keypress(function (event) {
      if (event.which === 13 || event.which === 32) {
        addTag();
      }
    });
    // delete tag
    $('ul.tags').on('click', '.chip i.material-icons', function (event) {
      var $tag = $(event.target).parent();
      var index = data.tags.indexOf($tag.text().replace('close', ''));
      data.tags.splice(index, 1);
      // console.log('tags after delete: ',data.tags);
      $tag.remove();
    });
    var accesstoken = localStorage.getItem('dotBindAccessToken');

    // save card
    $('body').on('click', '#save', function () {
      if (accesstoken) {
        // save note
        if (!!$('textarea.note').val()) {
          data.card.note = $('textarea.note').val();
        }
        // add tags
        addTag();
        // save card
        // console.log('data sending to api end point v1/cards', data);
        $.ajax({
          type: 'POST',
          url: envParams[enviornment].url + ':3000/v1/cards?access_token=' + accesstoken,
          data: data,
          success: function success(result) {
            // console.log(result);
            window.close();
          },
          dataType: 'json'
        });
      } else {
        $('body').append($('<div>You are not logged in yet!</div>'));
      }
    });
  });
});

// ************* setting environment ***********
var enviornment = 'production';

var envParams = {
  dev: {
    url: 'http://localhost'
  },
  production: {
    url: 'http://www.dotbind.io'
  }
};

// ************* helper functions *************
function getCurrentTabProps(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function (tabs) {
    var tab = tabs[0];

    var icon = tab.favIconUrl;
    var url = tab.url;
    var title = tab.title;

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
  return content.length > 120 ? content.substring(0, 120) + '...' : content;
}