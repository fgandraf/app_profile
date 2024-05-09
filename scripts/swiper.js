var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    initialSlide: 4,
    slideToClickedSlide:true,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    mousewheel: true,
    coverflowEffect: {
        rotate: 30,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    }
    });