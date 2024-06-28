$(function () {
    var isMobile = window.matchMedia("screen and (max-width: 500px)").matches;

    if (isMobile) {
        jQuery("nav").addClass('display-flex');
        jQuery("#footer__desktop").addClass('display-none');

        var footerMobile = jQuery("#footer__mobile");
        jQuery(window).scroll(function () {
            var scroll = jQuery(window).scrollTop();
            var windowHeight = window.innerHeight;

            if (scroll >= windowHeight) {
                footerMobile.addClass('display-flex');

            } else {
                footerMobile.removeClass('display-flex');
            }
        });

        // For all platform
        var header = jQuery("#section__principal");
        jQuery(window).scroll(function () {
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
