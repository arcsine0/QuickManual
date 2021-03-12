chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {action: "openManual"}, function(response) { 
            console.log(response);
         });  
    });
});

chrome.tabs.onUpdated.addListener((tab, info) => {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){

        chrome.tabs.sendMessage(tabs[0].id, {status: info.status, url: tabs[0].url}, function(response) { 
            console.log(response);
         });  
    });
});