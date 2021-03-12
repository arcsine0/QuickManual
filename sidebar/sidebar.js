chrome.runtime.onMessage.addListener(function(req, sender, sendResponse) {
    switch(req.action) {
        case "openManual":
            $('#sidebar').fadeToggle("fast");
            break;
    }
    sendResponse({response: "sidebar opened!"});
});
