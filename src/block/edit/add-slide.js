const addSlide = (slides) => {
  return [
    ...slides,
    {
      title: '',
      content: '',
      url: '',
    },
  ];
};

export default addSlide;
