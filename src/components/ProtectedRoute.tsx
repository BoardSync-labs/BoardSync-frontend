import { Navigate } from 'react-router-dom';
import { authService } from '@/services/authService';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'member')[];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = ['admin', 'member'],
  redirectTo = '/login'
}) => {
  const user = authService.getUser();
  const isAuthenticated = authService.isAuthenticated();

  // Check if user is logged in
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role
  if (allowedRoles && !allowedRoles.includes(user.user_type)) {
    // Redirect based on user type
    if (user.user_type === 'admin') {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <Navigate to="/member-dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;