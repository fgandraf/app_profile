var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    initialSlide: 0,
    slideToClickedSlide:true,
    grabCursor: true,
    loop: true,
    centeredSlides: true,
    slidesPerView: "auto",
    mousewheel: false,
    coverflowEffect: {
        rotate: 30,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    }
});