(() => {
  console.log('myScript loaded!');
  const message = {
    from: 'myScript',
    selection: window.getSelection().toString(),
  };

  chrome.runtime.sendMessage(message, response => console.log(response.msg));

  $('body').on('mouseup', () => {
    $(window.getSelection().baseNode.parentNode).css({ color: 'red' });
  });
})();
