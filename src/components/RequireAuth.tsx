import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface Props {
  allowedRoles: string[];
}

function RequireAuth(props: Props) {
  const authorization = useAuth();
  const location = useLocation();

  return props.allowedRoles.includes(authorization?.auth?.role) ? (
    <Outlet />
  ) : authorization?.auth?.accessToken != '' ? (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='/' state={{ from: location }} replace />
  );
}

export default RequireAuth;
