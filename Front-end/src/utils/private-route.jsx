import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../pages/auth/login/index';

const PrivateRoute = ({ allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="auth/login" replace />;
  }

  if (!allowedRoles.includes(user.roleId)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;