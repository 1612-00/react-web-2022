import { createContext, useReducer } from 'react';
import { themeReducer } from '../reducers/ThemeReducer';
import {
    CHANGE_THEME_MOD,
    CHANGE_TOPNAV_COLOR,
    CHANGE_SIDEBAR_COLOR,
} from './constant';

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
    const initialState = {
        themeMode:
            localStorage.getItem('themeMode') === null
                ? 'light'
                : localStorage.getItem('themeMode'),
        topNavColor:
            localStorage.getItem('topNavColor') === null
                ? 'white'
                : localStorage.getItem('topNavColor'),
        sidebarColor:
            localStorage.getItem('sidebarColor') === null
                ? 'white'
                : localStorage.getItem('sidebarColor'),
    };

    const [themeState, dispatch] = useReducer(themeReducer, initialState);

    const changeThemeMode = (themeMode) => {
        const payload = {
            ...initialState,
            themeMode,
        };
        try {
            dispatch({ type: CHANGE_THEME_MOD, payload: payload });
        } catch (error) {
            console.log(error);
        }
    };

    const changeTopNavColor = (topNavColor) => {
        const payload = {
            ...initialState,
            topNavColor,
        };
        try {
            dispatch({ type: CHANGE_TOPNAV_COLOR, payload: payload });
        } catch (error) {
            console.log(error);
        }
    };

    const changeSidebarColor = (sidebarColor) => {
        const payload = {
            ...initialState,
            sidebarColor,
        };
        try {
            dispatch({ type: CHANGE_SIDEBAR_COLOR, payload: payload });
        } catch (error) {
            console.log(error);
        }
    };

    const themeContextData = {
        themeState,
        changeThemeMode,
        changeTopNavColor,
        changeSidebarColor,
    };

    return (
        <ThemeContext.Provider value={themeContextData}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;
