import { Navigate } from 'react-router-dom';
import useAuth from '../AuthContext/AuthContext';
import { Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { currentUser } = useAuth();

  return <>{currentUser ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default PrivateRoute;
