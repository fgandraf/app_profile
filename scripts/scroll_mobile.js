$(function () {
    var isMobile = window.matchMedia("screen and (max-width: 500px)").matches;

    if (isMobile) {
        
        jQuery(window).scroll(function () {
            var scroll = jQuery(window).scrollTop();

            // Show mobile footer
            var footerMobile = jQuery("#footer__mobile");
            if (scroll >= window.innerHeight) 
                footerMobile.addClass('display-flex');
            else 
                footerMobile.removeClass('display-flex');
            

            // Hide header when reach main
            var headerContent = jQuery("#header__content");
            if (scroll >= window.innerHeight)
            {
                headerContent.addClass('blur');
            }
            else
            {
                headerContent.removeClass("blur");
            }

        });
        
    }

});
