const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.blockEditor;

const TEMPLATE = [
	['core/cover', {}, [
		['core/heading', { placeholder: 'Title' }],
		['core/paragraph', { placeholder: 'Text content...' }],
		['core/button', { text: 'Call to Action' }],
	]
]];

registerBlockType('mp/slide-block', {
	title: __('Slide block'),
	icon: 'universal-access-alt',
	category: 'layout',
	parent: ['mp/slider-block'],

	edit: () => {
		return (
			<div className="slide">
				<InnerBlocks template={TEMPLATE} />
			</div>
		);
	},

	save: (props) => {
		return (
			<div className="swiper-slide slide">
				<InnerBlocks.Content />
			</div>
		);
	},
});
