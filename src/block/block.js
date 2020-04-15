/**
 * BLOCK: slider-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

import { PlainText } from '@wordpress/editor';
import { IconButton } from '@wordpress/components';

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType('cgb/block-slider-block', {
	title: __('Slider block'), // Block title.
	icon: 'universal-access-alt', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	attributes: {
		slides: {
			type: 'array',
			source: 'query',
			default: [],
			selector: '.slide',
			query: {
				title: {
					source: 'text',
					selector: 'h3.title',
				},
				content: {
					type: 'string',
					source: 'children',
					selector: '.body',
				},
			},
		},
	},

	edit: ({ className, attributes, setAttributes }) => {
		const { slides } = attributes;

		const removeSlide = (slideToRemove) => {
			setAttributes({
				slides: slides.filter(slide => slide !== slideToRemove),
			});
		};

		const addSlide = () => {
			setAttributes({
				slides: [
					...slides,
					{
						title: '',
						content: '',
					},
				],
			});
		};

		const slideList = slides.map((slide, index) => (
			<div className="slide" key={`${index}`}>
				<div className="remove" onClick={() => removeSlide(slide)}>&times;</div>

				<div className="title">
					<PlainText
						className="slide-title"
						placeholder="Title"
						value={slide.title}
						onChange={title => {
							const newSlides = [...slides];

							newSlides[index] = {
								...slide,
								title,
							};

							setAttributes({ slides: newSlides });
						}}
					/>
				</div>

				<RichText
					className="slide-content"
					placeholder="Slide content"
					value={slide.content}
					onChange={content => {
						const newSlides = [...slides];

						newSlides[index] = {
							...slide,
							content,
						};

						setAttributes({ slides: newSlides });
					}}
				/>
			</div>
		));

		return (
			<div className={className}>
				<div className="slides">
					{slideList}
				</div>

				<div>
					<IconButton
						icon="plus-alt"
						label="More"
						isDefault
						onClick={addSlide}
					>
						Add slide
					</IconButton>
				</div>
			</div>
		);
	},
	save: (props) => {
		const { slides } = props.attributes;

		return (
			<div>
				<div className="slider-container outside-components">
					<div className="swiper-button-prev" />

					<div className="swiper-container">
						<div className="swiper-wrapper">
							{slides.map((slide, index) => (
								<div key={index} className="swiper-slide slide">
									<h3 className="title">
										{slide.title}
									</h3>

									<div className="body">
										<RichText.Content value={slide.content} />
									</div>
								</div>
							))}
						</div>

						<div className="swiper-pagination" />
					</div>

					<div className="swiper-button-next" />
				</div>

				<div className="swiper-pagination" />
			</div>
		);
	},
});
