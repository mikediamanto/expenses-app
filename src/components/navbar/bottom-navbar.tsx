import React from 'react';
import styles from './bottom-navbar.module.scss';
import NavLink from '../nav-link/nav-link';
import { MdHome, MdOutlineSettings, MdAdd } from 'react-icons/md';

const BottomNavbar = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink href="/" className={styles.button} activeClass={styles.active}>
        <MdHome height={20} className={styles.icon} />
        Dashboard
      </NavLink>

      <NavLink
        href="/expenses/scan"
        className={styles.float}
        activeClass={styles.active}
      >
        <MdAdd className={styles.icon} />
      </NavLink>

      <NavLink
        href="/settings"
        className={styles.button}
        activeClass={styles.active}
      >
        <MdOutlineSettings className={styles.icon} />
        Settings
      </NavLink>
    </nav>
  );
};

export default BottomNavbar;
