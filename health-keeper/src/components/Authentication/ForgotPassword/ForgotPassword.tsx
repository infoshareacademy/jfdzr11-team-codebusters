import { sendPasswordResetEmail } from '@firebase/auth';
import { FormEvent } from 'react';
import { auth } from '../../../api/firebase/firebase';
import { useNavigate, Link } from 'react-router-dom';
import styles from './ForgotPassword.module.css'
import toast from 'react-hot-toast';

const ForgotPassword = () => {

const navigate = useNavigate()
  const passwordResetHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const email: string = (
      e.currentTarget.elements.namedItem('email') as HTMLInputElement
    ).value;
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Mail wysłany');
      navigate('/login')
    } catch (error) {
      toast.error('Nie udało się wysłać maila');
    }
  };

  return (
    <div className={styles.form_wrapper}>
    <Link to="/login" className={styles.backIcon} />
    <span className={styles.header}>Przypomnij hasło</span>
    <form onSubmit={passwordResetHandler} className={styles.form}>
      <label htmlFor="email">E-mail</label>
      <input type="email" name="email" id="email"/>
      <button type='submit'>Wyślij</button>
    </form>
    </div>
  );
};

export default ForgotPassword;
