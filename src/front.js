/**
 * Swiper script for front-end
 */

import Swiper from 'swiper';

function onSwiperReady() {
	document.addEventListener('DOMContentLoaded', () => {
		new Swiper('.swiper-container', {
			slidesPerView: 3,
			spaceBetween: 104,
			breakpoints: {
				768: {
					slidesPerView: 1,
					spaceBetween: 20,
				},
			},
			pagination: {
				el: '.swiper-pagination',
			},

			// Navigation arrows
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
	});
}

onSwiperReady();
