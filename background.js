chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {action: "openManual"}, function(response) { 
            console.log(response);
         });  
    });
});
