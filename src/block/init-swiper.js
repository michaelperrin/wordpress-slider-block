import Swiper from 'swiper';

const initSwiper = (element) => {
	const slider = new Swiper(element, {
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
	});

	return slider;
}

export default initSwiper;
