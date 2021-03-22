var context = 'desk';
function loadManualContent() {
    var dataObj = {};
    var manualContent = $('#sidebar-content');
    var url_context = "https://quick-manual.herokuapp.com/" + context;
    chrome.storage.local.get(null, result => {
        if (result[context] != undefined) { 
            manualContent.html(result[context]);
        }
        else {
            $.ajax({
                method: "GET",
                url: url_context,     
                dataType: "html",
                success: (data) => {
                    manualContent.html(data); 
                    dataObj[context] = data.toString();
                    chrome.storage.local.set(dataObj, () => { console.log(`data stored: ${context}`); });
                },
                error: (err) => {
                    console.log(err);
                }
            });
        }
    })
}

function reloadManualContent() {
    $('#sidebar-content').empty();
    loadManualContent();
}
$(document).ready(function() {
    
    var sidebar_el = 
    `
    <div id="sidebar">
        <div id="sidebar-content">
            
        </div>
    </div>
    `;
    $('body').append(sidebar_el);
    
    loadManualContent();
});

chrome.runtime.onMessage.addListener(function(req, sender, sendResponse) {
    if (req.status === 'complete') {
        var urlArr = req.url.split('/');
        var queryArr = new Array();
        var storeUrl = false;
        for(urlStr of urlArr) {
            if (urlStr.includes('desk')) { storeUrl = true; } 
            if (storeUrl === true) { queryArr.push(urlStr); }
        }
        if (queryArr[1] != undefined) { context = queryArr[1].toLowerCase(); }
        reloadManualContent();
    }
    sendResponse({ });
})