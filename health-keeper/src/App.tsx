import './App.css';
import { Routes, Route } from 'react-router-dom';
import {
  Layout,
  Login,
  Register,
  Dashboard,
  ForgotPassword,
  Medicine,
} from './components/index';
import PrivateRoute from './utils/PrivateRoute';
import { useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './api/firebase/firebase';

function App() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* Public routes */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/medicine' element={<Medicine />} />
          {/* Private routes */}
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/medicine' element={<Medicine />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
