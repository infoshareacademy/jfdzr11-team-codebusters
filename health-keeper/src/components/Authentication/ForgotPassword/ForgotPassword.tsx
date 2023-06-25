import { sendPasswordResetEmail } from '@firebase/auth';
import { FormEvent } from 'react';
import { auth } from '../../../api/firebase/firebase';
import { useNavigate } from 'react-router';

const ForgotPassword = () => {

const navigate = useNavigate()
  const passwordResetHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const email: string = (
      e.currentTarget.elements.namedItem('email') as HTMLInputElement
    ).value;
    try {
      await sendPasswordResetEmail(auth, email);
      console.log('Link email sent');
      navigate('/login')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={passwordResetHandler}>
      <label htmlFor="email">Email:</label>
      <input type="email" name="email" id="email" />
      <button type='submit'>Wyślij</button>
    </form>
  );
};

export default ForgotPassword;
