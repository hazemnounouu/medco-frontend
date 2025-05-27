import { createContext, useState, useCallback, useEffect } from 'react';

export const AuthContext = createContext({
    token: null,
    isLoggedIn: false,
    userId: null,
    role: null,
    login: (userId, token, role) => { },
    logout: () => { },
    isAdmin: false,
});

const getUserData = () => {
    let userData = {
        token: null,
        userId: null,
        role: null
    };

    try {
        const localStorageResult = JSON.parse(localStorage.getItem('userData'));

        if (localStorageResult) {
            userData = localStorageResult;
        }
    } catch (error) {
        console.error(error);
    }

    return userData;
};

const AuthContextProvider = ({ children }) => {
    const [userSession, setUserSession] = useState(getUserData());
    const { token, userId, role } = userSession;

    const login = useCallback((userId, token) => {
        setUserSession({
            token,
            userId,
            role
        });
        localStorage.setItem(
            'userData',
            JSON.stringify({
                userId,
                token,
                role
            })
        );
    }, []);

    const logout = useCallback(() => {
        setUserSession({
            token: null,
            userId: null,
            role: null
        });
        localStorage.removeItem('userData');
    }, []);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (storedData && storedData.token) {
            login(
                storedData.userId,
                storedData.token,
                storedData.role
            );
        }
    }, [login]);

    const value = {
        isLoggedIn: !!token,
        token,
        userId,
        role,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;