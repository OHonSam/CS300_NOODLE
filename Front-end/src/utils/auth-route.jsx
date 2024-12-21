// AuthRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { RoleId } from './roleId';

const AuthRoute = () => {
  const { user, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    // Redirect based on user role
    switch (user.roleId) {
      case RoleId.ADMIN:
        return <Navigate to="/admin/dashboard" replace />;
      case RoleId.TEACHER:
        return <Navigate to="/teacher/dashboard" replace />;
      case RoleId.STUDENT:
        return <Navigate to="/student/dashboard" replace />;
      default:
        return <Navigate to="/unauthorized" replace />;
    }
  }

  // If not authenticated, allow access to auth routes
  return <Outlet />;
};

export default AuthRoute;