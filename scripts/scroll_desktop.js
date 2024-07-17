$(function() {
    
    var isDesktop = !window.matchMedia("screen and (max-width: 500px)").matches;

    if (isDesktop) {
        
        jQuery(window).scroll(function() {
            var scroll = jQuery(window).scrollTop();
            

            // Show footer when scroll
            var footerContainer = jQuery(".footer__container");
            var footerDesktop = jQuery("#footer__desktop");
            if (scroll >= window.innerHeight) {
                footerContainer.addClass('display-flex');
                footerDesktop.addClass('display-flex');

            } else {
                footerContainer.removeClass('display-flex');
                footerDesktop.removeClass('display-flex');
            }


            // Hide navbar when reach footer
            var mainElementHeight = jQuery("main").outerHeight();
            var navMenu = jQuery("nav");
            if (scroll >= mainElementHeight) 
                navMenu.addClass('display-none');
             else 
                navMenu.removeClass('display-none');
        

            // Hide header when reach main
            var header = jQuery("#section__principal");
            var headerContent = jQuery("#header__content");
            if (scroll >= window.innerHeight)
            {
                header.addClass('display-none');
                headerContent.addClass('blur')

            }
            else 
            {
                header.removeClass("display-none");
                headerContent.removeClass("blur");

            }
        });

    }

});