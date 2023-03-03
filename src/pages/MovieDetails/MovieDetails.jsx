import css from './MovieDetails.module.css';
import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect, Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { key } from '../../services/data';

const MoviesDetails = () => {
  const [error, setError] = useState('');
  const [details, setDetails] = useState({});
  const { movieId } = useParams();
  const location = useLocation();

  useEffect(() => {
    const searchMovieDetails = async () => {
      setError('');
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&language=eu-US`
        );
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        setError('Oops, something goes wrong');
      }
    };

    searchMovieDetails();
  }, [movieId]);

  const basic = 'https://image.tmdb.org/t/p/w500';
  const noPosterImg =
    'https://freedesignfile.com/upload/2018/11/Characters-in-film-design-elements-background-vector-graphic-715.jpg';

  const path = details.poster_path;
  const date = details.release_date ?? details.first_air_date;
  const year = date ? date.slice(0, 4) : '';

  const genresMovie = details.genres
    ? details.genres.map(genre => genre.name).join(', ')
    : '';

  const backLinkHref = location.state?.from ?? '/';

  return error === '' ? (
    <div>
      <Link to={backLinkHref} className={css.linkGoBack}>
        <FaLongArrowAltLeft style={{ marginRight: '10px' }} /> Go back
      </Link>

      <div className={`${css.flex} ${css.border}`}>
        <div className={css.image}>
          <img
            src={details.poster_path ? `${basic}${path}` : noPosterImg}
            alt="actor face"
          />
        </div>
        <div>
          <p className={css.title}>
            {details.title ?? details.name} ({year})
          </p>

          <p className={css.score}>
            Use score: {Math.round(details.vote_average * 10)} %
          </p>
          <p className={css.overview}>Overview</p>
          <p className={css.text}>{details.overview}</p>
          <p className={css.genres}>Genres</p>
          <p className={css.text}>{genresMovie}</p>
        </div>
      </div>
      <div className={css.border}>
        <p className={css.text}>Additional information</p>
        <ul className={css.listLink}>
          <li>
            <Link to="cast" state={{ from: backLinkHref }} className={css.link}>
              Cast
            </Link>
          </li>
          <li>
            <Link
              to="reviews"
              state={{ from: backLinkHref }}
              className={css.link}
            >
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  ) : (
    <p>{error}</p>
  );
};

export default MoviesDetails;
