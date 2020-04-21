const save = ({ attributes }) => {
	const { slides } = attributes;

	return (
		<div className="swiper-container">
			<div className="swiper-wrapper">
				{slides.map((slide, index) => (
					<div
						key={`${index}`}
						className="swiper-slide slide front-slide"
						style={`background-image: url('${slide.url}')`}
					>
						<h3 className="title">
							{slide.title}
						</h3>
					</div>
				))}
			</div>

			<div className="swiper-pagination" />

			<div className="swiper-button-prev" />
			<div className="swiper-button-next" />
		</div>
	);
}

export default save;
