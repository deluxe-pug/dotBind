var saveLink = function() {

  // need login if not authorized

  

};


var saveLinkToPocket = function(tab, options) {
    var title           = options.title || tab.title || "";
    var url             = options.url || tab.url  || "";
    var showSavedIcon   = (typeof options.showSavedIcon !== 'undefined') ? options.showSavedIcon : true;


    // Load the notification UI in the page to show the overlay
    loadNotificationUIIntoPage(tab, url, 'save', function() {

        // Check for valid url and present it to the user if it's not valid
        if (!isValidURL(url)) {
            showInvalidURLNotification(tab);
            return;
        }

        // Add the url to Pocket
        ril.add(title, url, {
            actionInfo: options.actionInfo,
            success: function(data) {
                var itemid = null;
                if (typeof data.action_results == 'object'
                    && data.action_results.length
                    && typeof data.action_results[0] == 'object') {
                    itemid = data.action_results[0].item_id;
                }
                onSaveSuccess(tab, showSavedIcon, itemid);

            },
            error: function(status, xhr) {
                // Not authorized
                if (status === 401) {
                    if (listenerReady) {
                        messageWaiting = '';
                        delayedMessageData = {};
                        sendMessageToTab(tab, {"status": "unauthorized"});
                    }
                    else {
                        delayedMessageData = {
                            'status': 'unauthorized'
                        };
                        messageWaiting = 'unauthorized';
                    }
                    authentication.showLoginWindow(function() {
                        saveLinkToPocket(tab, options);
                    });
                    return;
                }

                // Handle error message
                onSaveError(tab, xhr);

                // Error callback
                if (options.error) { options.error(status, xhr); }
            }
        });
    });
};


function loadNotificationUIIntoPage(tab, url, action, callback) {


    // Has script been injected?
    executeScriptInTabWithCallback(tab, 'window.___PKT__INJECTED;', function(results) {
        if ( !results[0] ) injectCSSJS(tab);
    });

    if (url) {
        var premstatus  = getSetting("premium_status");
        var savecount   = (typeof getSetting("saveCount") == 'undefined') ? 1 : parseInt(getSetting("saveCount"));

        executeScriptInTab(tab, "window.___PKT__URL_TO_SAVE = '" + url
            + "'; window.___PKT__PREM_STATUS = '" + premstatus
            + "'; window.___PKT__SAVE_COUNT = '" + savecount + "';");

        setSetting("saveCount",savecount+1);

    }

    executeScriptFromURLInTabWithCallback(tab, pkt.i18n.getFilePathForPocketOverlayLocalization(), function() {
        executeScriptFromURLInTabWithCallback(tab, 'js/r-new.js', callback);
    });
}

// document.addEventListener('DOMContentLoaded', function() {
//   var checkPageButton = document.getElementById('checkPage');
//   checkPageButton.addEventListener('click', function() {

//     chrome.tabs.getSelected(null, function(tab) {
//       d = document;

//       var f = d.createElement('form');
//       f.action = 'http://gtmetrix.com/analyze.html?bm';
//       f.method = 'post';
//       var i = d.createElement('input');
//       i.type = 'hidden';
//       i.name = 'url';
//       i.value = tab.url;
//       f.appendChild(i);
//       d.body.appendChild(f);
//       f.submit();
//     });
//   }, false);
// }, false);