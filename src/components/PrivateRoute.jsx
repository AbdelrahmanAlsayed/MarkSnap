import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AppContext";
import PropTypes from 'prop-types';


function PrivateRoute({ children }) {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/signin" state={{ path: location.pathname }} />
    }

    return children;
}

PrivateRoute.propTypes = {  // to make children ois not missing the props validation
    children: PropTypes.node.isRequired
};

export default PrivateRoute;
