import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import AuthForm from '../components/AuthForm';

const Login: NextPage = () => {
  return (
    <div className={styles.container}>
      <AuthForm />
    </div>
  );
};

export default Login;
