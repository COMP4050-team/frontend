import type { NextPage } from 'next';
import { useEffect } from 'react';

const Logout: NextPage = () => {
  useEffect(() => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('token');
  }, []);

  return <></>;
};

export default Logout;
