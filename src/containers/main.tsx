import React from 'react';
import Sidebar from '../components/sidebar';
import Gallery from './gallery';
import * as css from './main.module.css';

const Main: React.FC = () => {
  return <main className={css.main}>
    <Sidebar />
    <Gallery />
  </main>
};

export default Main;
