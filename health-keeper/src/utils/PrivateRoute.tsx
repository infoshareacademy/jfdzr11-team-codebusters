import { Navigate, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';

const PrivateRoute = () => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation()
  console.log(currentUser.email)


  return <>{currentUser?.email ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />}</>;
};

export default PrivateRoute;
