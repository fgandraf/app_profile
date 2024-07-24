$(function() {
    var isDesktop = !window.matchMedia("screen and (max-width: 500px)").matches;

    if (isDesktop) {
        jQuery(window).scroll(function() {
            var scroll = jQuery(window).scrollTop();

            var footerContainer = jQuery("#desktop-footer__container");
            var footerDesktop = jQuery("#desktop-footer-section");
            if (scroll >= window.innerHeight) {
                footerContainer.addClass('display-flex');
                footerDesktop.addClass('display-flex');
            } else {
                footerContainer.removeClass('display-flex');
                footerDesktop.removeClass('display-flex');
            }

            var mainElementHeight = jQuery("main").outerHeight();
            var navMenu = jQuery("nav");
            if (scroll >= mainElementHeight) 
                navMenu.addClass('display-none');
            else 
                navMenu.removeClass('display-none');
        });

    } else {
        jQuery(window).scroll(function () {
            var scroll = jQuery(window).scrollTop();

            var footerMobile = jQuery("#mobile-footer-section");
            if (scroll >= window.innerHeight) 
                footerMobile.addClass('display-flex');
            else 
                footerMobile.removeClass('display-flex');
            
        });
    }
});
