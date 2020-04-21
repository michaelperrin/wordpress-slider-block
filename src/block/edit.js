/**
 * WordPress dependencies
 */
import {
	useRef,
} from '@wordpress/element';
import {
	withNotices,
} from '@wordpress/components';
import { compose, withInstanceId } from '@wordpress/compose';
import {
	BlockIcon,
	InnerBlocks,
	MediaPlaceholder,
	withColors,
	ColorPalette,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { withDispatch } from '@wordpress/data';
import controls from './edit/controls';

/**
 * Internal dependencies
 */
import icon from './icon';
import {
	IMAGE_BACKGROUND_TYPE,
	VIDEO_BACKGROUND_TYPE,
	backgroundImageStyles,
} from './shared';

/**
 * Module Constants
 */
const ALLOWED_MEDIA_TYPES = [ 'image', 'video' ];
const INNER_BLOCKS_TEMPLATE = [
	[ 'core/paragraph', {
		align: 'center',
		fontSize: 'large',
		placeholder: __( 'Write title…' ),
	} ],
];

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

	const {
		backgroundType,
		minHeight,
		url,
	} = attributes;

	const onSelectMedia = (media) => {
		if (!media || !media.url) {
			setAttributes({ url: undefined, id: undefined });
			return;
		}
		let mediaType;
		// for media selections originated from a file upload.
		if (media.media_type) {
			if (media.media_type === IMAGE_BACKGROUND_TYPE) {
				mediaType = IMAGE_BACKGROUND_TYPE;
			} else {
				// only images and videos are accepted so if the media_type is not an image we can assume it is a video.
				// Videos contain the media type of 'file' in the object returned from the rest api.
				mediaType = VIDEO_BACKGROUND_TYPE;
			}
		} else { // for media selections originated from existing files in the media library.
			if (
				media.type !== IMAGE_BACKGROUND_TYPE &&
				media.type !== VIDEO_BACKGROUND_TYPE
			) {
				return;
			}
			mediaType = media.type;
		}

		setAttributes({
			url: media.url,
			id: media.id,
			backgroundType: mediaType,
			...(mediaType === VIDEO_BACKGROUND_TYPE ?
				{ focalPoint: undefined, hasParallax: undefined } :
				{}
			),
		});
	};

	const style = {
		...(
			backgroundType === IMAGE_BACKGROUND_TYPE ?
				backgroundImageStyles(url) :
				{}
		),
		backgroundColor: overlayColor.color,
		minHeight,
	};

	const hasBackground = !!(url || overlayColor.color);

	if (!hasBackground) {
		const placeholderIcon = <BlockIcon icon={icon} />;
		const label = __('Slider!!');

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
					onSelect={onSelectMedia}
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

	const classes = className;

	return (
		<>
			{controls}
			<div>

				<div
					data-url={url}
					style={style}
					className={classes}
				>
					{VIDEO_BACKGROUND_TYPE === backgroundType && (
						<video
							ref={videoRef}
							className="wp-block-cover__video-background"
							autoPlay
							muted
							loop
							src={url}
						/>
					)}
					<div className="wp-block-cover__inner-container">
						<InnerBlocks
							template={INNER_BLOCKS_TEMPLATE}
						/>
					</div>
				</div>
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
