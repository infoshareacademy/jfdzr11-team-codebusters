import { useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../../AuthContext/AuthContext';
import { Navbar, Footer } from '../index';
import styles from './Layout.module.css';

const Layout = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={styles.app}>
      {/* navbar */}
      <div>
        {currentUser?.email ? (
          <div className={styles.navbar}>
            <Navbar />
          </div>
        ) : null}
      </div>
      {/* page content */}
      <div className={styles.page_content}>
        <Outlet />
      </div>
      {/* footer */}
      <div>
        {currentUser?.email ? (
          <div className={styles.footer}>
            <Footer />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Layout;
