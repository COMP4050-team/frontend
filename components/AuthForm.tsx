import { useState } from 'react';
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
        localStorage.setItem('loggedIn', 'true');
        window.location.href = '/';
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col items-center justify-center lg:justify-start gap-4'>
        {/* Display the error if it exists */}
        {error && <p className='text-red-600'>{error}</p>}

        <label>
          Email
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='form-control block w-full px-4 py-2 text-xl font-normal bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:bg-white focus:border-blue-600 focus:outline-none text-gray-800'
          />
        </label>

        <label>
          Password
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='form-control block w-full px-4 py-2 text-xl font-normal  bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:bg-white focus:border-blue-600 focus:outline-none text-gray-800'
          />
        </label>
        <button type='submit'>{isRegister ? 'Register' : 'Login'}</button>
      </div>
    </form>
  );
};

export default AuthForm;
