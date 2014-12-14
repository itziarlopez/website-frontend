$(function() {
    $('#mail').replaceWith(function() {
        var s = $(this).text().replace(' [d] ', '.').replace(' [a] ', '@').replace(' [d] ', '.');
        return '<a href="mailto:' + s + '">' + s + '</a>';
    });
});