import { useState, useEffect } from 'react';
import css from './Reviews.module.css';
import { useParams } from 'react-router-dom';
import { key } from '../../services/data';

const Reviews = () => {
  const [error, setError] = useState('');
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const searchMovieReviews = async () => {
      setError('');
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${key}&language=en-US&page=1`
        );
        const data = await response.json();
        setReviews(data.results);
      } catch (error) {
        setError('Oops, something goes wrong');
      }
    };

    searchMovieReviews();
  }, [movieId]);

  return error === '' ? (
    <div>
      <ul className={css.reviewList}>
        {reviews.length > 0 ? (
          reviews.map(({ id, author, content }) => (
            <li key={id}>
              <p className={css.author}>{`Author: ${author}`}</p>
              <p className={css.text}>{content}</p>
            </li>
          ))
        ) : (
          <p className={css.text}>We don't have any reviews for this movie</p>
        )}
      </ul>
    </div>
  ) : (
    <p>{error}</p>
  );
};

export default Reviews;
