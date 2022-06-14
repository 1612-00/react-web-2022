import React, { useContext } from 'react';
import './layout.scss';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './../components/sidebar/Sidebar';
import TopNav from './../components/topnav/TopNav';
import ThemeSetting from '../components/theme-setting/ThemeSetting';
import { ThemeContext } from './../contexts/ThemeContext';
import { AuthContext } from './../contexts/AuthContext';
import Box from './../components/box/Box';
import { CircularProgress } from '@mui/material';

const Layout = () => {
    // Context
    const { themeState } = useContext(ThemeContext);

    // Auth Context
    const {
        state: { isLoading, isAuthenticated },
    } = useContext(AuthContext);

    if (isLoading) {
        return (
            <Box className='spinner'>
                <CircularProgress />
            </Box>
        );
    } else if (!isAuthenticated) {
        return <Navigate to='/auth/login' />;
    } else
    return (
        <div
            className={`layout ${themeState.themeMode} top_nav-color__${themeState.topNavColor} sidebar-color__${themeState.sidebarColor}`}
        >
            <Sidebar />
            <TopNav />
            <div className='main'>
                <div className='overlay'></div>
                <div className='main__content'>
                    <Outlet />
                </div>
            </div>
            <ThemeSetting />
        </div>
    );
};

export default Layout;
