import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { key } from '../../services/data';
import OneMovieLi from '../../components/OneMovieLi/OneMovieLi';
import css from './Movies.module.css';

const Movies = () => {
  const [error, setError] = useState('');
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(() => {
    const params = searchParams.get('query');
    return params ? params : '';
  });

  const handlerInput = event => {
    if (event.target.value.trim()) {
      document.querySelector('button').removeAttribute('disabled');
    } else {
      document.querySelector('button').setAttribute('disabled', true);
    }
  };

  const submitSearch = event => {
    event.preventDefault();
    setQuery(event.target.elements.query.value.trim());
  };

  useEffect(() => {
    setSearchParams(query !== '' ? { query: query } : {});

    const reset = () => {
      document.querySelector('form').reset();
      document.querySelector('button').setAttribute('disabled', true);
    };

    const searchMovieQuery = async () => {
      setError('');
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${query}&language=en-US&page=1&include_adult=false`
        );
        const data = await response.json();
        if (data.results.length === 0) {
          setError('Sorry, there are no movies for your request');
        }
        setMovies(data.results);
      } catch (error) {
        setError('Oops, something goes wrong');
      }
    };

    if (query) {
      searchMovieQuery();
      reset();
    }
  }, [query, setSearchParams]);

  return (
    <div>
      <form onSubmit={submitSearch}>
        <input
          className={css.input}
          name="query"
          onChange={handlerInput}
        ></input>
        <button className={css.buttonSearch} type="submit" disabled>
          Search
        </button>
      </form>
      <ul className={css.filmList}>
        {movies.length > 0 && !error ? (
          movies.map(({ id, name, title }) => (
            <OneMovieLi key={id} name={name} title={title} to={`${id}`} />
          ))
        ) : (
          <p>{error}</p>
        )}
      </ul>
    </div>
  );
};

export default Movies;
