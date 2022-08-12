import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { useQuery } from 'urql';
import { GetUnitsDocument, GetUnitsQuery } from '../gql/generated/graphql';
import AuthForm from '../components/AuthForm';

const Register: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>

      <AuthForm isRegister />
    </div>
  );
};

export default Register;
