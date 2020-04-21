const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

import edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType('compo/slider-block', {
	...metadata,
	title: __('Slider block'),
	icon: 'universal-access-alt',
	category: 'layout',
	edit,
	save,
});
