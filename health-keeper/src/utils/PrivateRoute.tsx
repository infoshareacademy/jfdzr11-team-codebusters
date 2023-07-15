import { Navigate, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';

const PrivateRoute = () => {
  const { currentUser, isFetchingUserData } = useContext(AuthContext);
  const location = useLocation();
  console.log(isFetchingUserData);

  return (
    <>
      {!currentUser?.email && !isFetchingUserData ? (
        <Navigate to="/login" state={{ from: location }} replace />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PrivateRoute;
