(() => {
  
  $('body').on('mouseup', () => {
    console.log(window.getSelection().toString());
  });

})();
