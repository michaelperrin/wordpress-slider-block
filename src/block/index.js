import edit from './edit';
import save from './save';
import metadata from './block.json';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType('compo/slider', {
  ...metadata,
  title: __('Slider block'),
  icon: 'universal-access-alt',
  category: 'layout',
  edit,
  save,
});
