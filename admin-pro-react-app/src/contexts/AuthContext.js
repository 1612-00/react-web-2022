import { createContext, useReducer, useEffect } from 'react';
import { AuthReducer } from './../reducers/AuthReducer';
import { SET_AUTH, apiUrl, LOCAL_STORAGE_TOKEN_NAME } from './constant';
import axios from 'axios';
import setAuthToken from './../ultil/setAuthToken';

const initialState = {
    isAuthenticated: false,
    user: null,
    isLoading: false,
};

export const AuthContext = createContext(initialState);

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // Authenticated User
    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
        }

        try {
            const res = await axios.get(`${apiUrl}/auth`);

            if (res.data.success) {
                dispatch({
                    type: SET_AUTH,
                    payload: {
                        isAuthenticated: true,
                        user: res.data.user,
                    },
                });
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            setAuthToken(null);
            dispatch({
                type: SET_AUTH,
                payload: {
                    isAuthenticated: false,
                    user: null,
                },
            });
        }
    };

    useEffect(() => loadUser(), []);

    // Login
    const loginUser = async (user) => {
        try {
            const res = await axios.post(`${apiUrl}/auth/login`, user);
            if (res.data.success) {
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    res.data.assetToken
                );
                dispatch({
                    type: SET_AUTH,
                    payload: {
                        isAuthenticated: true,
                        user: res.data.user,
                    },
                });
                loadUser();
                return true;
            }
        } catch (error) {
            if (error.response.data) return error.response.data;
            return false;
        }
    };

    // Register
    const registerUser = async (user) => {
        try {
            const res = await axios.post(`${apiUrl}/auth/register`, user);
            if (res.data.success) {
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    res.data.assetToken
                );
                dispatch({
                    type: SET_AUTH,
                    payload: {
                        isAuthenticated: true,
                        user: res.data.user,
                    },
                });
                loadUser();
                return true;
            }
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return false;
        }
    };

    // Logout
    const logout = async () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        dispatch({
            type: SET_AUTH,
            payload: {
                isAuthenticated: false,
                user: null,
            },
        });
    };

    // Update info
    const updateInfo = async (userUpdate) => {
        const { fullName, phoneNumber, address, dob } = userUpdate;

        if (!fullName) {
            return { success: false, message: 'Missing name' };
        }

        if (
            fullName === state.user.fullName &&
            phoneNumber === state.user.phoneNumber &&
            address === state.user.address &&
            dob === state.user.dob
        ) {
            return { success: false, message: 'There is not change' };
        }

        try {
            const userId = state.user._id;
            const res = await axios.put(`${apiUrl}/auth/`, {
                userId,
                userUpdate,
            });

            if (res.data.success) {
                dispatch({
                    type: SET_AUTH,
                    payload: {
                        isAuthenticated: true,
                        user: res.data.user,
                    },
                });
                return { success: true, message: 'Update successfully' };
            }
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: 'Server error' };
        }
    };

    const AuthContextData = {
        state,
        loginUser,
        registerUser,
        logout,
        updateInfo,
    };

    return (
        <AuthContext.Provider value={AuthContextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
