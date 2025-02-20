import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { isAuthenticated, role } = useSelector((state) => state.user); // Get auth & role from Redux

    // If user is not logged in, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // If roles are defined and the user's role is not in the allowed list, redirect to role-based dashboard
    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        if (role === "student") return <Navigate to="/courses" />;
        if (role === "provider") return <Navigate to="/provider-dashboard" />;
        if (role === "admin") return <Navigate to="/admin-dashboard" />;
        
        return <Navigate to="/unauthorized" />;
    }

    return children; // Allow access if authenticated and role is allowed
};
