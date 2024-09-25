import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const [account, setAccount] = useState(null);

    const handleToken = (newToken) => {
        setToken(newToken);
    }

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem("token", token)
            axios.get("http://localhost:8090/user/authenticated").then(response => {
                setUser({
                    "username": response.data.username,
                    "password": response.data.password,
                    "roles": response.data.roles.map(r => r.authority)
                });
            });
            axios.get("http://localhost:8090/account/authenticated").then(response => {
                setAccount({
                    "accountNumber": response.data.accountNumber,
                    "balance": response.data.balance 
                });
            });
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("token");
            setUser(null);
        }
    }, [token]);

    const contextValue = useMemo(
        () => ({
          token,
          handleToken,
          user,
          setAccount,
          account,
        }),
        [token, user, account]
    );

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthProvider;