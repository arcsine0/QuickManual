chrome.runtime.onMessage.addListener(function(req, sender, sendResponse) {
    switch(req.action) {
        case "openManual":
            $('#sidebar').fadeToggle("slow");
            break;
    }
    sendResponse({response: "sidebar opened!"});
});
