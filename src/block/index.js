const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

// import { Slide } from '../slide-block/block';
import { IconButton } from '@wordpress/components';

import edit from './edit';
import Swiper from 'swiper';

registerBlockType('mp/slider-block', {
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
