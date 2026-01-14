import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        console.log("user... is null");
        console.log(location.pathname);
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    return children;
};

export default ProtectedRoute;
