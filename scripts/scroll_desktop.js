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
            var headerContent = jQuery("#header__content");
            if (scroll >= window.innerHeight)
            {
                headerContent.addClass('blur')

            }
            else 
            {
                headerContent.removeClass("blur");

            }
        });

    }

});