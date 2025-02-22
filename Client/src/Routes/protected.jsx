import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { isAuthenticated, role } = useSelector((state) => state.user); 

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        if (role === "student") return <Navigate to="/courses" />;
        if (role === "provider") return <Navigate to="/provider-dashboard" />;
        if (role === "admin") return <Navigate to="/admin-dashboard" />;
        
        return <Navigate to="/unauthorized" />;
    }

    return children;
};
