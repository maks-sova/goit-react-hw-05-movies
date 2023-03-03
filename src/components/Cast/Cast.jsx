import { useState, useEffect } from 'react';
import css from './Cast.module.css';
import { BsFillCircleFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { key } from '../../services/data';

const Cast = () => {
  const [error, setError] = useState('');
  const [credits, setCredits] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const searchMovieCredits = async () => {
      setError('');
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${key}&language=en-US`
        );
        const data = await response.json();
        setCredits(data.cast);
      } catch (error) {
        setError('Oops, something goes wrong');
      }
    };

    searchMovieCredits();
  }, [movieId]);

  const basic = 'https://image.tmdb.org/t/p/w500';
  const noPosterImg =
    'https://freedesignfile.com/upload/2018/11/Characters-in-film-design-elements-background-vector-graphic-715.jpg';

  return error === '' ? (
    <div>
      <ul className={css.castList}>
        {credits.map(({ cast_id, profile_path, name, character }) => (
          <li key={cast_id}>
            <img
              src={profile_path ? `${basic}${profile_path}` : noPosterImg}
              className={css.profile}
              alt="actor face"
            />
            <p className={`${css.text} ${css.displayFlex}`}>
              <BsFillCircleFill
                style={{
                  height: '10px',
                  width: '10px',
                  marginRight: '10px',
                }}
              />
              {name}
            </p>

            <p className={css.text}>Character: {character}</p>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <p>{error}</p>
  );
};

export default Cast;
