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

import MyProfile from './components/MyProfile/MyProfile';
import PersonalData from './components/MyProfile/PersonalData/PersonalData';
import { DataContext } from './DataContext/DataContext';
import {db} from './api/firebase/firebase'
import {doc, getDoc} from 'firebase/firestore'
import PersonalDataEdit from './components/MyProfile/PersonalData/PersonalDataEdit/PersonalDataEdit'

function App() {
  const { currentUser, setCurrentUser, setIsFetchingUserData } =
    useContext(AuthContext);
  const {setUserData} = useContext(DataContext)

  const getUserData = async (userID) => {
        try{
        
            const userRef = doc(db, "users", userID);
            const userData = await getDoc(userRef).then(snapshot => 
                  snapshot.data()
            )
            setUserData(userData);
        }catch(error){
            console.error(error);
        }
    }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setCurrentUser(user);
        setCurrentUser(user);
        getUserData(user.uid);
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
    )}

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
            <Route path='/' element={<Dashboard />} />
            <Route path='/myprofile' element={<MyProfile />}/>
            <Route path='/myprofile/personaldata' element={<PersonalData />} />
            <Route path='/myprofile/personaldata/:editData' element={<PersonalDataEdit />} />
         
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

