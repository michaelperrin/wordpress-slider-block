import Swiper from 'swiper';

const initSwiper = (element, options = {}) => {
  const defaultOptions = {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };

  const slider = new Swiper(element, { ...defaultOptions, ...options });

  return slider;
}

export default initSwiper;
