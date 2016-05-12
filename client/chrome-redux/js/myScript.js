(() => {
  console.log('myScript loaded!');
  // form message to send to popup.js
  const message = {
    from: 'myScript',
    selection: window.getSelection().toString(),
  };
  // send mesage to popup.js
  chrome.runtime.sendMessage(message, response => console.log(response.msg));

  // $('body').on('mouseup', () => {
  //   $(window.getSelection().baseNode.parentNode).css({ color: 'red' });
  // });
})();
