// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAllowed, redirectPath = '/'

, children }) => {

if (!isAllowed) {
    {/*replace true bach ma ykounch fi historique navigation*/}
return <Navigate to={redirectPath} replace />;
}

return children ? children : <Outlet />;
};

export default ProtectedRoute;