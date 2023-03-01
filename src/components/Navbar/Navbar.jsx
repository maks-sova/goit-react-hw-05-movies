import { NavLink } from 'react-router-dom';

import items from './items';
import css from './Navbar.module.css';

const Navbar = () => {
  const navigators = items.map(({ id, text, link }) => (
    <li key={id}>
      <NavLink to={link} className={css.link}>
        {text}
      </NavLink>
    </li>
  ));
  return <ul className={css.menu}>{navigators}</ul>;
};
export default Navbar;
