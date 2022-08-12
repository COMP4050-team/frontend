import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { useQuery } from 'urql';
import { GetUnitsDocument, GetUnitsQuery } from '../gql/generated/graphql';
import AuthForm from '../components/AuthForm';

const Login: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>

      <AuthForm />
    </div>
  );
};

export default Login;
