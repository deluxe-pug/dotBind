'use strict';

var enviornment = 'dev';

var envParams = {
  dev: {
    url: 'http://localhost'
  },

  production: {
    url: 'http://ec2-54-86-26-97.compute-1.amazonaws.com'
  }
};

function getCurrentTabProps(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function (tabs) {
    var tab = tabs[0];

    var icon = tab.favIconUrl;
    var url = tab.url;

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
document.addEventListener('DOMContentLoaded', function () {
  getCurrentTabProps(function (url, icon) {
    // render icon and url to the popup
    renderIcon(icon);
    renderStatus(url);

    var domain = url.replace(/https?:\/\//, '');
    domain = domain.replace(/\/(.)+/, '');

    var data = {
      card: {
        icon: icon,
        url: url,
        domain: domain,
        content: null,
        note: null
      },
      username: 'public',
      tags: []
    };

    // add tag
    $('body').on('click', 'button.tag', function () {
      var tag = $('input.tag').val();
      if (tag) {
        $('ul.tags').append($('<li>').text(tag));
        data.tags.push({ name: tag });
        $('input.tag').val('');
      }
    });
    // add note
    $('body').on('click', 'button.note', function () {
      data.note = $('input.note').val();
      if (data.note) {
        $('ul.notes').append($('<li>').text(data.note));
        $('input.note').val('');
      }
    });

    // save card
    $('body').on('click', '#save', function () {

      data = {
        card: {
          url: "test",
          domain: "test",
          content: "test",
          note: "test"
        },
        username: "public",
        tags: [{ name: "react" }, { name: "backbone" }]
      };

      console.log('save button clicked!');
      console.log(data);

      $.ajax({
        type: 'POST',
        url: envParams[enviornment].url + ':3000/v1/cards',
        data: data,
        success: function success(result) {
          console.log(result);
        },
        dataType: 'json'
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