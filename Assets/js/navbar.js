$(function() {
    
    //jQuery to collapse the navbar on scroll
    $(window).scroll(function() {
        if ($(".navbar").offset().top > 0) {
            $(".navbar-fixed-top").addClass("top-navbar-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-navbar-collapse");
        }
    });

    //jQuery for page scrolling feature - requires jQuery Easing plugin
    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'jswing');
        event.preventDefault();
    });

    //JavaScript to make navbar auto-collapse on mobile
    $('.nav a').on('click', function() {
        if ($('.navbar-toggle').is(':visible'))
            $('.navbar-toggle').click();
    });
})