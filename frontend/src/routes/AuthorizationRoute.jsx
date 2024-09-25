import { useAuth } from "../provider/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const AuthorizationRoute = () => {
    const { user } = useAuth();

    if (!user || !user.roles.includes("ROLE_ADMIN")) {
        return <Navigate to="/acceso" />
    }

    return <Outlet />
}

export { AuthorizationRoute };