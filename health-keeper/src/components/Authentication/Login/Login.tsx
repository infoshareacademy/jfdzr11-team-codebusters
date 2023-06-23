import { FormEvent, useRef } from 'react';
import useAuth from '../../../AuthContext/AuthContext';

const Login = () => {
  const { login } = useAuth();

  const formRef = useRef<HTMLFormElement>(null);

  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email: string = (
      e.currentTarget.elements.namedItem('email') as HTMLInputElement
    ).value;
    const password: string = (
      e.currentTarget.elements.namedItem('password') as HTMLInputElement
    ).value;

    try {
      await login(email, password);
      console.log('Logged in successfully');
    } catch (error) {
      console.log(error);
    }
    formRef.current?.reset();
  };

  return (
    <form onSubmit={loginHandler} ref={formRef}>
      <label htmlFor="email">Email:</label>
      <input type="email" name="email" id="email" />
      <label htmlFor="email">Password:</label>
      <input type="password" name="password" id="password" />
      <button type="submit">Log In</button>
      <p>Forgot your password?</p>
      <p>New to Health Keeper ? Sign Up </p>
    </form>
  );
};

export default Login;
