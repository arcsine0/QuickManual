var context = 'introduction';
function loadManualContent() {
    var url_context = "https://quick-manual.herokuapp.com/" + context;
    console.log(url_context);
    $.ajax({
        method: "GET",
        url: url_context,     
        dataType: "html",
        success: (data) => {
            var manualContent = $('#sidebar-content');
            manualContent.html(data);
            
        },
        error: (err) => {
            console.log(err);
        }
    });
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
        // get query from url algo
        var urlArr = req.url.split('/');
        var queryArr = new Array();
        var storeUrl = false;
        for(urlStr of urlArr) {
            if (urlStr.includes('desk#')) { storeUrl = true; } 
            if (storeUrl === true) { queryArr.push(urlStr); }
        }

        console.log(queryArr);
        if (queryArr[1] != undefined) { context = queryArr[1].toLowerCase(); }
        reloadManualContent();
    }
    
    sendResponse({ });
})