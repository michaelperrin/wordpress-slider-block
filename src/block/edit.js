/**
 * WordPress dependencies
 */
import { useRef } from '@wordpress/element';
import { withNotices } from '@wordpress/components';
import { compose, withInstanceId } from '@wordpress/compose';
import {
	BlockIcon,
	MediaPlaceholder,
	withColors,
	ColorPalette,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { withDispatch } from '@wordpress/data';
import { PlainText } from '@wordpress/editor';
import { IconButton } from '@wordpress/components';

/**
 * Internal dependencies
 */
import icon from './icon';
import {
	IMAGE_BACKGROUND_TYPE,
	VIDEO_BACKGROUND_TYPE,
	backgroundImageStyles,
	getAttributesFromMedia,
} from './shared';
import addSlide from './edit/add-slide';
import controls from './edit/controls';

const ALLOWED_MEDIA_TYPES = [ 'image', 'video' ];

const CoverEdit = (props) => {
	const videoRef = useRef(null);

	const onUploadError = (message) => {
		const { noticeOperations } = props;
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice(message);
	}

	const {
		attributes,
		setAttributes,
		className,
		noticeUI,
		overlayColor,
		setOverlayColor,
	} = props;

	const { slides } = attributes;

	/**
	 * Replace the slide at the given index with a new slide in the list of slides
	 *
	 * @param {object} slide
	 * @param {number} slideIndex
	 */
	const replaceSlide = (slide, slideIndex) => {
		const newSlides = Object.assign([], slides, { [slideIndex]: slide });

		console.log(slides, newSlides);

		setAttributes({ slides: newSlides });
	}

	const onSelectMedia = (slide, slideIndex, media) => {
		const newSlide = {
			...slide,
			...getAttributesFromMedia(media)
		}
		replaceSlide(newSlide, slideIndex);
	};

	const renderSlide = (slide, slideIndex) => {
		const hasBackground = !!(slide.url || overlayColor.color); // TODO: use slide specific overlay color instead of a global one

		if (!hasBackground) {
			const placeholderIcon = <BlockIcon icon={icon} />;
			const label = __('Slider');

			return (
				<>
					{controls}
					<MediaPlaceholder
						icon={placeholderIcon}
						className={className}
						labels={{
							title: label,
							instructions: __('Upload an image or video file, or pick one from your media library.'),
						}}
						onSelect={(media) => { onSelectMedia(slide, slideIndex, media) }}
						accept="image/*,video/*"
						allowedTypes={ALLOWED_MEDIA_TYPES}
						notices={noticeUI}
						onError={onUploadError}
					>
						<div
							className="wp-block-cover__placeholder-background-options"
						>
							<ColorPalette
								disableCustomColors={true}
								value={overlayColor.color}
								onChange={setOverlayColor}
								clearable={false}
							/>
						</div>
					</MediaPlaceholder>
				</>
			);
		}

		const style = {
			...(
				slide.backgroundType === IMAGE_BACKGROUND_TYPE ?
					backgroundImageStyles(slide.url) :
					{}
			),
			backgroundColor: overlayColor.color,
			minHeight: slide.minHeight,
		};

		return (
			<div style={style} data-url={slide.url}>
				{VIDEO_BACKGROUND_TYPE === slide.backgroundType && (
					<video
						ref={videoRef}
						className="wp-block-slider-slide-video-background"
						autoPlay
						muted
						loop
						src={slide.url}
					/>
				)}
				<div className="wp-block-cover__inner-container">
					<div className="title">
						<PlainText
							className="slide-title"
							placeholder="Title"
							value={slide.title}
							onChange={title => {
								const newSlide = {
									...slide,
									title,
								};

								replaceSlide(newSlide, slideIndex);
							}}
						/>
					</div>
				</div>
			</div>
		);
	};

	const classes = className;

	return (
		<>
			{controls}
			<div className={classes}>
				<div className="swiper-container slider-container">
					<div className="swiper-wrapper slides">
						{slides.map((slide, index) => (
							<div className="swiper-slid slide" key={`${index}`}>
								{renderSlide(slide, index)}
							</div>
						))}
					</div>

					<div className="swiper-pagination" />

					<div className="swiper-button-prev" />
					<div className="swiper-button-next" />
				</div>

				<IconButton
					icon="plus-alt"
					label="More"
					isDefault
					onClick={() => setAttributes({ slides: addSlide(slides) })}
				>
					Add slide
				</IconButton>
			</div>
		</>
	);
}

export default compose([
	withDispatch((dispatch) => {
		const { toggleSelection } = dispatch('core/block-editor');

		return {
			toggleSelection,
		};
	}),
	withColors({ overlayColor: 'background-color' }),
	withNotices,
	withInstanceId,
])(CoverEdit);
