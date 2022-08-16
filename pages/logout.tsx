import axios from 'axios';
import type { NextPage } from 'next';
import { useEffect } from 'react';

const Logout: NextPage = () => {
  useEffect(() => {
    localStorage.removeItem('loggedIn');

    axios
      .get('/api/logout')
      .then(() => {
        window.location.href = '/';
      })
      .catch(() => {
        console.error('Failed to logout');
      });
  }, []);

  return <></>;
};

export default Logout;
