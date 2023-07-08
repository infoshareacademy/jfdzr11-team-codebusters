import { FormEvent, useContext, useRef } from 'react';
import styles from '../Auth.module.css';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../api/firebase/firebase';
import { AuthContext } from '../../../AuthContext/AuthContext';


const Login = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

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
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in successfully');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
    formRef.current?.reset();
  };

  return (
    <>
      <div className={styles.form_wrapper}>
        <h1 className={styles.app_name}>HealthKeeper</h1>
        <span className={styles.header}>Zaloguj się</span>
        <form onSubmit={loginHandler} ref={formRef} className={styles.form}>
          <label htmlFor="email">E-mail</label>
          <input type="email" name="email" id="email" />
          <label htmlFor="email">Hasło</label>
          <input type="password" name="password" id="password" />
          <button type="submit">Zaloguj się</button>
          <Link to='/forgot-password'>Nie pamiętam hasła</Link>
          <Link to="/register">Nie masz jeszcze konta?</Link> 
        </form>
      </div>
    </>
  );
};

export default Login;
