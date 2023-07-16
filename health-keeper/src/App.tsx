import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  Layout,
  Login,
  Register,
  Calendar,
  ForgotPassword,
  ResultsList,
  MedicineMain,
  MeasurementsList,
  AddNewMeasurement,
  AddMeasurementEntry,
  MyProfile,
  PersonalData,
  FindMedicine,
  MyMedicine,
} from "./components/index";
import PrivateRoute from "./utils/PrivateRoute";
import { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./api/firebase/firebase";
import { DataContext } from "./DataContext/DataContext";
import { db } from "./api/firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { UserData } from "./DataContext/dataTypes";
import { Toaster, toast } from "react-hot-toast";

function App() {
  const { setCurrentUser, setIsFetchingUserData, isFetchingUserData } =
    useContext(AuthContext);
  const { setUserData } = useContext(DataContext);

  const getUserData = async (userID: string) => {
    try {
      const docRef = doc(db, "users", userID);
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        const userData = docSnap.data();
        setUserData(userData as UserData);
      });

      return () => unsubscribe();
    } catch (error) {
      toast.error("Błąd pobierania danych użytkownika");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        getUserData(user.uid);
        console.log(user);
      } else {
        console.log("wylogowano");
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
    <div className="app_container">
      <Toaster
        containerStyle={{
          top: "170px",
        }}
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Private routes */}
          <Route element={<PrivateRoute />}>
            {/* <Route path="/" element={<Dashboard />} /> */}
            <Route path="/" element={<Calendar />} />
            <Route path="/medicine" element={<MedicineMain />} />
            <Route path="/medicine/find" element={<FindMedicine />} />
            <Route path="/medicine/mymedicine" element={<MyMedicine />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/myprofile/personaldata" element={<PersonalData />} />

            <Route path="/results-list" element={<ResultsList />} />
            <Route
              path="/results-list/measurements"
              element={<MeasurementsList />}
            />
            <Route
              path="/results-list/measurements/addNew"
              element={<AddNewMeasurement />}
            />
            <Route
              path="/results-list/measurements/:measurementName/addEntry"
              element={<AddMeasurementEntry />}
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
