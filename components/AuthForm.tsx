import { useState } from 'react';
import styles from './AuthForm.module.css';
import axios from 'axios';

interface AuthFormProps {
  isRegister?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Post to /api/login or /api/register
    // If successful, redirect to /
    try {
      const res = await axios.post(
        `/api/${isRegister ? 'register' : 'login'}`,
        {
          email,
          password,
        },
      );

      if (res.status === 200) {
        window.location.href = '/';
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Display the error if it exists */}
      {error && <p className={styles.error}>{error}</p>}

      <label className={styles.label}>
        Email
        <input
          className={styles.input}
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className={styles.label}>
        Password
        <input
          className={styles.input}
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button className={styles.button} type='submit'>
        {isRegister ? 'Register' : 'Login'}
      </button>
    </form>
  );
};

export default AuthForm;
