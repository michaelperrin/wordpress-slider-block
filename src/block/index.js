const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

import edit from './edit';
import metadata from './block.json';
import Swiper from 'swiper';

registerBlockType('compo/slider-block', {
	...metadata,
	title: __('Slider block'),
	icon: 'universal-access-alt',
	category: 'layout',
	edit,

	save: (props) => {
		return (
			<div className="swiper-container">
				<div className="swiper-wrapper">
				</div>

				<div className="swiper-pagination" />

				<div className="swiper-button-prev" />
				<div className="swiper-button-next" />
			</div>
		);
	},
});
