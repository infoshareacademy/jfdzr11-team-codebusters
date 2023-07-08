import './App.css';
import { Routes, Route } from 'react-router-dom';
import {
  Layout,
  Login,
  Register,
  Dashboard,
  ForgotPassword,
  ResultsList,
  Medicine,
  MeasurementsList,
  AddNewMeasurement,
  AddMeasurementEntry,
  MyProfile,
  PersonalData,
} from './components/index';
import PrivateRoute from './utils/PrivateRoute';
import { useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './api/firebase/firebase';
import { DataContext } from './DataContext/DataContext';
import { db } from './api/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';


function App() {
  const { setCurrentUser, setIsFetchingUserData, isFetchingUserData } =
    useContext(AuthContext);
  const { setUserData } = useContext(DataContext);

  const getUserData = async (userID) => {
    try {
      const userRef = doc(db, 'users', userID);
      const userData = await getDoc(userRef).then((snapshot) =>
        snapshot.data()
      );
      setUserData(userData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setCurrentUser(user);
        getUserData(user.uid);
        console.log(user);
      } else {
        setCurrentUser({ email: '' });
        console.log('wylogowano');
      }
      setIsFetchingUserData(false);
    });
    return unsubscribe;
  }, [setIsFetchingUserData, setCurrentUser]);

  // display the message during loading state
  if (isFetchingUserData) {
    return <p>Loading...</p>;
  }

  return (
    <div className='app_container'>
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* Public routes */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />

          {/* Private routes */}
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/medicine' element={<Medicine />} />
            <Route path='/myprofile' element={<MyProfile />} />
            <Route path='/myprofile/personaldata' element={<PersonalData />} />

            <Route path='/results-list' element={<ResultsList />} />
            <Route
              path='/results-list/measurements'
              element={<MeasurementsList />}
            />
            <Route
              path='/results-list/measurements/addNew'
              element={<AddNewMeasurement />}
            />
            <Route
              path='/results-list/measurements/:measurementName/addEntry'
              element={<AddMeasurementEntry />}
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
