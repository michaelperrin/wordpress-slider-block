import {
	BlockControls,
	InspectorControls,
	MediaUploadCheck,
	PanelColorSettings,
	__experimentalGradientPickerControl,
	__experimentalGradientPicker,
} from '@wordpress/block-editor';

const toggleParallax = () => {
	setAttributes({
		hasParallax: !hasParallax,
		...(!hasParallax ? { focalPoint: undefined } : {}),
	});
};
const setDimRatio = (ratio) => setAttributes({ dimRatio: ratio });

const controls = () => (
	<>
		<BlockControls>
			{hasBackground && (
				<>
					<MediaUploadCheck>
						<Toolbar>
							<MediaUpload
								onSelect={onSelectMedia}
								allowedTypes={ALLOWED_MEDIA_TYPES}
								value={id}
								render={({ open }) => (
									<IconButton
										className="components-toolbar__control"
										label={__('Edit media')}
										icon="edit"
										onClick={open}
									/>
								)}
							/>
						</Toolbar>
					</MediaUploadCheck>
				</>
			)}
		</BlockControls>
		<InspectorControls>
			{!!url && (
				<PanelBody title={__('Media Settings')}>
					{IMAGE_BACKGROUND_TYPE === backgroundType && (
						<ToggleControl
							label={__('Fixed Background')}
							checked={hasParallax}
							onChange={toggleParallax}
						/>
					)}
					{IMAGE_BACKGROUND_TYPE === backgroundType && !hasParallax && (
						<FocalPointPicker
							label={__('Focal Point Picker')}
							url={url}
							value={focalPoint}
							onChange={(value) => setAttributes({ focalPoint: value })}
						/>
					)}
					<PanelRow>
						<Button
							isDefault
							isSmall
							className="block-library-cover__reset-button"
							onClick={() => setAttributes({
								url: undefined,
								id: undefined,
								backgroundType: undefined,
								dimRatio: undefined,
								focalPoint: undefined,
								hasParallax: undefined,
							})}
						>
							{__('Clear Media')}
						</Button>
					</PanelRow>
				</PanelBody>
			)}
			{hasBackground && (
				<>
					<PanelBody title={__('Dimensions')}>
						<CoverHeightInput
							value={temporaryMinHeight || minHeight}
							onChange={
								(value) => {
									setAttributes({
										minHeight: value,
									});
								}
							}
						/>
					</PanelBody>
					<PanelColorSettings
						title={__('Overlay')}
						initialOpen={true}
						colorSettings={[{
							value: overlayColor.color,
							onChange: (...args) => {
								setAttributes({
									customGradient: undefined,
								});
								setOverlayColor(...args);
							},
							label: __('Overlay Color'),
						}]}
					>
						<__experimentalGradientPickerControl
							label={__('Overlay Gradient')}
							onChange={
								(newGradient) => {
									setAttributes({
										customGradient: newGradient,
										customOverlayColor: undefined,
										overlayColor: undefined,
									});
								}
							}
							value={customGradient}
						/>
						{!!url && (
							<RangeControl
								label={__('Background Opacity')}
								value={dimRatio}
								onChange={setDimRatio}
								min={0}
								max={100}
								step={10}
								required
							/>
						)}
					</PanelColorSettings>
				</>
			)}
		</InspectorControls>
	</>
);

export default controls;
