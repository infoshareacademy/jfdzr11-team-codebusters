import { FormEvent, useRef } from 'react';
import useAuth from '../../../AuthContext/AuthContext';
import styles from '../Auth.module.css'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();

  const navigate = useNavigate()

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
      navigate('/')
    } catch (error) {
      console.log(error);
    }
    formRef.current?.reset();
  };

  return (
    <div className={styles.form_wrapper}>
      <form onSubmit={loginHandler} ref={formRef} className={styles.form}>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="email">Password:</label>
        <input type="password" name="password" id="password" />
        <button type="submit">Log In</button>
        <p>Forgot your password?</p>
        <p>New to Health Keeper ? <Link to='/register'>Sign Up</Link> </p>
      </form>
    </div>
  );
};

export default Login;
