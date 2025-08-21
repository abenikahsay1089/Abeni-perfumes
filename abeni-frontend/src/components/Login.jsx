import { useMutation } from '@tanstack/react-query';
import apiClient from '../api/client';

const Login = () => {
  const { mutate: login, isLoading } = useMutation((credentials) =>
    apiClient.post('/auth/login', credentials)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    login(
      { email: e.target.email.value, password: e.target.password.value },
      {
        onSuccess: (data) => {
          localStorage.setItem('token', data.token);
          // Redirect to dashboard
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button disabled={isLoading}>Login</button>
    </form>
  );
};