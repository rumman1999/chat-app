import { createContext, useCallback, useEffect, useState } from "react";
import { baseURL, postRequest } from "../utils/services";
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    });
    const [loginError, setLoginError] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem("User");
        // console.log("user from storage", JSON.parse(user));
        setUser(JSON.parse(user));
    }, []);

    const updateRegisteredUserInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    // console.log("registerInfo ", registerInfo);

    const registerUser = useCallback(async (e) => {
        e.preventDefault();
        setIsRegisterLoading(true);
        setRegisterError(null);

        // console.log("registerInfo inside registerUser", registerInfo);

        const response = await postRequest(
            `${baseURL}/users/register`,
            JSON.stringify(registerInfo)
        );

        setIsRegisterLoading(false);

        if (response.error) {
            return setRegisterError(response);
        }

        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
        return response
    }, [registerInfo]);

    const updateLoginUserInfo = useCallback((info) => {
        setLoginInfo(info);
    }, []);

    const loginUser = useCallback(async (e) => {
        e.preventDefault();
        setLoginError(null);
        console.log(loginInfo);

        const response = await postRequest(
            `${baseURL}/users/login`,
            JSON.stringify(loginInfo)
        );

        if (response.error) {
            return setLoginError(response);
        }

        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
        return response
    }, [loginInfo]);

    const logoutUser = useCallback(() => {
        localStorage.removeItem("User");
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider value={{
            user, setUser,
            registerUser, updateRegisteredUserInfo,
            isRegisterLoading, setIsRegisterLoading,
            registerError, setRegisterError,
            registerInfo, setRegisterInfo,
            logoutUser, loginUser,
            loginInfo, updateLoginUserInfo, loginError
        }}>
            {children}
        </AuthContext.Provider>
    );
}

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};
