import initSwiper from './block/init-swiper';

function onSwiperReady() {
	document.addEventListener('DOMContentLoaded', () => {
		initSwiper('.compo-slider-slider-container');
	});
}

onSwiperReady();
