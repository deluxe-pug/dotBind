console.log('myScript fired!')

var message = {
  from: 'myScript',
  selection: window.getSelection().toString()
}

chrome.runtime.sendMessage(message, function(response) {
  console.log(response.msg);
});