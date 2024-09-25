import Logout from "../pages/Logout";
import Login from "../pages/Login";
import { ProtectedRoute } from "./ProtectedRoute"
import { AuthorizationRoute } from "./AuthorizationRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Page404 from "../pages/404";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Dashboard from "../pages/DashBoard";
import Transfer from "../pages/Transfer";
import Accounts from "../pages/administrator/Accounts";

const Routes = () => {

    const routesForAuthorization = [
        {
            path: "/",
            element: <AuthorizationRoute />,
            children: [
                {
                    path: "/cuentas",
                    element: <Accounts />
                },
            ]
        }
    ] 

    const routesForAuthenticated = [
        {
            path: "/",
            element: <ProtectedRoute />,
            children: [
                {
                    path: "/inicio",
                    element: <Dashboard />
                },
                {
                    path: "/transacciones",
                    element: <Transfer />
                },
                {
                    path: "/salir",
                    element: <Logout />
                }
            ]
        }
    ];

    const routesForNotAuthenticated = [
        {
            path: "",
            element: <Home />
        },
        {
            path: "/acceso",
            element: <Login />
        },
        {
            path: "/registro",
            element: <Register />
        },
    ];

    const router = createBrowserRouter([
        {
            path: '/',
            errorElement: <Page404 />,
            children: [
                ...routesForNotAuthenticated,
                ...routesForAuthenticated,
                ...routesForAuthorization
            ]
        }
    ]);

    return <RouterProvider router={router}></RouterProvider>
}

export default Routes;