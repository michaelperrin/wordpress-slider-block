const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.blockEditor;

// import { Slide } from '../slide-block/block';
import { IconButton } from '@wordpress/components';
import Swiper from 'swiper';

const TEMPLATE = [
	['mp/slide-block', {}],
	['mp/slide-block', {}],
];

registerBlockType('mp/slider-block', {
	title: __('Slider block'),
	icon: 'universal-access-alt',
	category: 'layout',

	edit: ({ className }) => {
		const swi = () => {
			console.log('wow 2');
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

				slideClass: 'block-editor-inner-blocks',
				wrapperClass: 'block-editor-block-list__layout'
			});
		};

		return (
			<div>
				<button onClick={() => { console.log('euh'); swi() }}>Swipe!!</button>

				<div className="swiper-container">
					{/* <div className="swiper-wrapper"> */}
						{/* <Slide /> */}
						<InnerBlocks template={TEMPLATE} templateLock="all" allowedBlocks={['mp/slide-block']} />
						{/* <InnerBlocks template={TEMPLATE} allowedBlocks={['mp/slide-block']} /> */}
					{/* </div> */}

					<div className="swiper-pagination" />

					<div className="swiper-button-prev" />
					<div className="swiper-button-next" />
				</div>
			</div>
		);
	},

	save: (props) => {
		return (
			<div className="swiper-container">
				<div className="swiper-wrapper">
					<InnerBlocks.Content />
				</div>

				<div className="swiper-pagination" />

				<div className="swiper-button-prev" />
				<div className="swiper-button-next" />
			</div>
		);
	},
});
