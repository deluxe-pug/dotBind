function getCurrentTabUrl(callback) {
  let queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {

    let tab = tabs[0];

    let icon = tab.favIconUrl;
    let url = tab.url;

    callback(url, icon);
  });
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
};

function renderIcon(icon) {
  document.getElementById('image-result').src = icon;
};

// when extention window is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // inject js/myScript into current tab

  getCurrentTabUrl(function(url, icon) {
    // render icon and url to the popup 
    renderIcon(icon);
    renderStatus(url);

    $( "body" ).on("click", "#save", function() {
      console.log('save button clicked!');

      chrome.tabs.query({active: true, currentWindow: true}, function(activeTabs) {
        
        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
          console.log('message recieved!', request.selection);
          var highlight = request.selection;
          sendResponse({from: "popup", msg: "card saved!"});

          // $.ajax({
          //   type: "POST",
          //   url: 'http://ec2-54-86-26-97.compute-1.amazonaws.com:3000/v1/cards',
          //   data: {user_id: 22},
          //   success: function(result) {
          //     console.log(result);
          //   },
          //   dataType: 'json'
          // });

        });

        chrome.tabs.executeScript(
          activeTabs[0].id, {file: 'js/myScript.js', allFrames: true}
        );

      });


    });



  });
});