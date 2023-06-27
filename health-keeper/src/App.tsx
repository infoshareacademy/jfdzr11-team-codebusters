import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Layout, Login, Register, Dashboard,ForgotPassword } from './components/index';
import PrivateRoute from './utils/PrivateRoute';
import { useContext, useEffect } from 'react';
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
  const { currentUser, setCurrentUser } = useContext(AuthContext);
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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      getUserData(user.uid);
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
          {/* Private routes */}
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/myprofile' element={<MyProfile />}/>
            <Route path='/myprofile/personaldata' element={<PersonalData />} />
            <Route path='/myprofile/personaldata/:editData' element={<PersonalDataEdit />} />
         
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

