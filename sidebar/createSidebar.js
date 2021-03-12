var context = 'introduction';
function loadManualContent() {
    var url_context = "https://quick-manual.herokuapp.com/" + context;
    console.log(url_context);
    $.ajax({
        method: "GET",
        url: url_context,     // swap /introduction depending on docs [ WILL CHANGE ON NEXT PUSH WITH DYNAMIC ALGO ]
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
        var getFromUrl = req.url.split('http://192.168.100.36/desk#modules/');  // https://*.dedicate.hooman.design/*
        console.log(getFromUrl[1]);
        if (getFromUrl[1] != undefined) { context = getFromUrl[1].toLowerCase(); }
        reloadManualContent();
    }
    
    sendResponse({ });
})