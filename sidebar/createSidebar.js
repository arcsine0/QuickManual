$(document).ready(function() {
    var sidebar_el = 
    `
    <div id="sidebar">
        <div id="sidebar-content"></div>
    </div>
    `;
    $('body').append(sidebar_el);
    $.ajax({
        method: "GET",
        url: "https://quick-manual.herokuapp.com/introduction",     // swap /introduction depending on docs [ WILL CHANGE ON NEXT PUSH WITH DYNAMIC ALGO ]
        dataType: "html",
        success: (data) => {
            $('#sidebar-content').html(data);
        },
        error: (err) => {
            console.log(err);
        }
    });
});