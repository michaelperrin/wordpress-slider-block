const addSlide = (slides) => {
	return [
		...slides,
		{
			title: '',
			content: '',
		},
	];
};

export default addSlide;
