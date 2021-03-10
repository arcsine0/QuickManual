// function openManual() {
//     alert('test');
// }


chrome.runtime.onMessage.addListener(function(req, sender, sendResponse) {
    if (req.action == "openManual") {
        var sidebar_el = `<div id="sidebar"></div>`;
        $('body').append(sidebar_el);
    }
    sendResponse({response: "sidebar opened!"});
});

// chrome.runtime.onConnect.addListener((port) => {
//     port.onMessage.addListener((msg) => {
//         if (msg.action == "openManual") {
//             console.log('action received!');
//         }
//         return true;
//     })
// })