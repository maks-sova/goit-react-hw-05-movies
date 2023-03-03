import { Link, useLocation } from 'react-router-dom';
import css from './OneMovieLi.module.css';
import PropTypes from 'prop-types';

const OneMovieLi = ({ name, title, to }) => {
  const location = useLocation();
  return (
    <li className={css.listItem}>
      <Link to={to} className={css.link} state={{ from: location }}>
        {title ?? name}
      </Link>
    </li>
  );
};

export default OneMovieLi;

OneMovieLi.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  to: PropTypes.string.isRequired,
};
