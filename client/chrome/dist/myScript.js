'use strict';

{
  console.log('myScript loaded!');

  var message = {
    from: 'myScript',
    selection: window.getSelection().toString()
  };

  chrome.runtime.sendMessage(message, function (response) {
    return console.log(response.msg);
  });
}