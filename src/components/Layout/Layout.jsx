import { Outlet, NavLink } from 'react-router-dom';
import { Suspense } from 'react';
import Loader from '../Loader/Loader';
import css from './Layout.module.css';

const Layout = () => {
  return (
    <div>
      <ul className={css.list}>
        <li className={css.item}>
          <NavLink to="/" className={css.link}>
            Home
          </NavLink>
        </li>
        <li className={css.item}>
          <NavLink to="movies" className={css.link}>
            Movies
          </NavLink>
        </li>
      </ul>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;
