import { FormEvent, useRef } from 'react';
import styles from '../Auth.module.css';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../api/firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import {auth} from '../../../api/firebase/firebase'

const Register = () => {

  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate()

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
        const userCredential = await createUserWithEmailAndPassword(auth,email, password);
        console.log('Registration succesful!');

        const userId = userCredential.user?.uid;

        const user = {
          loginData: {
            email,
            password,
          },
          personalData:{
          name,
          lastName,
          email,
          password,
          measurements: {
            tętno: {},
            ciśnienie: {},
            puls: {},
            nawodnienie: {},
            waga: {},
            cukier: {},
          },
        },
        };
        // add user to database
        console.log(userId);
        await setDoc(doc(db, 'users', userId), user);
        // reset form fields
        formRef.current?.reset();
      } catch (error) {
        console.log(error);
      }
      try {
        await signOut(auth);
        console.log('Logged out successfully!')
        navigate('/login')
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={styles.form_wrapper}>
      <form onSubmit={handleSubmit} className={styles.form} ref={formRef}>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="lastName">Last name:</label>
        <input type="text" name="lastName" id="lastName" />
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="confirmEmail">Confirm email:</label>
        <input type="email" name="confirmEmail" id="confirmEmail" />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="confirmPassword">Confirm password:</label>
        <input type="password" name="confirmPassword" id="confirmPassword" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
