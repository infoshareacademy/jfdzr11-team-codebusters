import { FormEvent } from 'react';
import styles from '../Auth.module.css';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../api/firebase/firebase';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../api/firebase/firebase';

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name: string = (
      e.currentTarget.elements.namedItem('name') as HTMLInputElement
    ).value;
    const lastName: string = (
      e.currentTarget.elements.namedItem('lastName') as HTMLInputElement
    ).value;
    const email: string = (
      e.currentTarget.elements.namedItem('email') as HTMLInputElement
    ).value;
    const confirmEmail: string = (
      e.currentTarget.elements.namedItem('confirmEmail') as HTMLInputElement
    ).value;
    const password: string = (
      e.currentTarget.elements.namedItem('password') as HTMLInputElement
    ).value;
    const confirmPassword: string = (
      e.currentTarget.elements.namedItem('confirmPassword') as HTMLInputElement
    ).value;

    // check if password and email match
    if (email !== confirmEmail || password !== confirmPassword) {
      console.log('Passwords or emails are not the same!');
      return;
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log('Registration succesful!');

        const userId = userCredential.user?.uid;

        const user = {
          loginData: {
            email,
          },
          personalData: {
            email,
            name,
            lastName,
          },
          measurements: {
            tętno: {},
            ciśnienie: {},
            puls: {},
            nawodnienie: {},
            waga: {},
            cukier: {},
          },
          reminders: [],
        };
        navigate('/');
        // add user to database
        await setDoc(doc(db, 'users', userId), user);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={styles.form_wrapper}>
      <Link to="/login" className={styles.backIcon} />
      <h1 className={styles.app_name}>HealthKeeper</h1>
      <span className={styles.header}>Zarejestruj się</span>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="name">Imię</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="lastName">Nazwisko</label>
        <input type="text" name="lastName" id="lastName" />
        <label htmlFor="email">E-mail</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="confirmEmail">Potwierdź e-mail</label>
        <input type="email" name="confirmEmail" id="confirmEmail" />
        <label htmlFor="password">Hasło</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="confirmPassword">Potwierdź hasło</label>
        <input type="password" name="confirmPassword" id="confirmPassword" />
        <button type="submit">Zarejestruj się</button>
      </form>
    </div>
  );
};

export default Register;
