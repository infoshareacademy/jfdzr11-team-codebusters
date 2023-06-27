import './App.css';
import { Routes, Route } from 'react-router-dom';
import {
  Layout,
  Login,
  Register,
  Dashboard,
  ForgotPassword,
  ResultsList,
  MeasurementsList,
  AddNewMeasurement
} from './components/index';
import PrivateRoute from './utils/PrivateRoute';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './api/firebase/firebase';

function App() {
  const { currentUser, setCurrentUser, setIsFetchingUserData } =
    useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setCurrentUser(user);
        console.log(user);
        setIsFetchingUserData(false);
      } else {
        setCurrentUser({ email: '' });
        console.log('wylogowano');
        setIsFetchingUserData(false);
      }
    });
    return unsubscribe;
  }, [setIsFetchingUserData,setCurrentUser]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* Private routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/results-list" element={<ResultsList />} />
            <Route
              path="/results-list/measurements"
              element={<MeasurementsList />}
            />
            <Route path="/results-list/measurements/add" element={<AddNewMeasurement/>} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
