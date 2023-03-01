import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: '9399d8b42729d3a09de5f975ffe36867',
  },
});

export const searchImg = async (name, page) => {
  const { data } = await instance.get('/', {
    params: {
      q: name,
      page,
      instance_adult: 'false',
      language: 'en-US',
    },
  });

  return data;
};
