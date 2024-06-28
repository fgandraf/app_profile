$(function() {
    var isDesktop = !window.matchMedia("screen and (max-width: 500px)").matches;
    
    if (isDesktop) {
        var navMenu = jQuery("nav");
        var footerContainer = jQuery(".footer__container");
        var footerDesktop = jQuery("#footer__desktop");

        jQuery(window).scroll(function() {
            var scroll = jQuery(window).scrollTop();
            var windowHeight = window.innerHeight;

            if (scroll >= windowHeight) {
                footerContainer.addClass('display-flex');
                footerDesktop.addClass('display-flex');

            } else {
                footerContainer.removeClass('display-flex');
                footerDesktop.removeClass('display-flex');
            }

            if (scroll >= windowHeight*2.3) {
                navMenu.addClass('display-none');
            } else {
                navMenu.removeClass('display-none');
            }
        });

        // For all platform
        var header = jQuery("#section__principal");
        jQuery(window).scroll(function() {
            var scroll = jQuery(window).scrollTop();
            var windowHeight = window.innerHeight;

            if (scroll >= windowHeight) {
                header.addClass('display-none');
            } else {
                header.removeClass("display-none");
            }
        });
    }

});
