const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.blockEditor;

import { IconButton } from '@wordpress/components';

const TEMPLATE = [
	['mp/slide-block', {}]
];

registerBlockType('mp/slider-block', {
	title: __('Slider block'),
	icon: 'universal-access-alt',
	category: 'layout',

	edit: ({ className }) => {
		return (
			<div className={className}>
				<div className="slides">
					<InnerBlocks template={TEMPLATE} allowedBlocks={['mp/slide-block']} />
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
