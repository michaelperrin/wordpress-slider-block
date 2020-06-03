const save = ({ attributes }) => {
  let { slides } = attributes;

  // Remove empty slides
  slides = slides.filter(slide => slide.url !== null);

  return (
    <div className="swiper-container compo-slider-slider-container">
      <div className="swiper-wrapper">
        {slides.map((slide, index) => (
          <div
            key={`${index}`}
            className="swiper-slide slide front-slide"
            style={`background-image: url('${slide.url}')`}
          >
            <h2 className="title">
              {slide.title}
            </h2>

            <div className="content">
              {slide.content}
            </div>
          </div>
        ))}
      </div>

      <div className="swiper-pagination" />

      <div className="swiper-button-prev" />
      <div className="swiper-button-next" />
    </div>
  );
};

export default save;
