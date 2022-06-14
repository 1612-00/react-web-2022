import React, { useContext } from 'react';
import './sidebar.scss';
import images from '../../constants/images';
import sidebarNav from './../../configs/sidebarNav';
import SidebarNavItem from './../sidebarNavItem/SidebarNavItem';
import { AuthContext } from './../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    // Auth Context
    const {
        state: { user },
    } = useContext(AuthContext);

    return (
        <div className='sidebar'>
            <Link to='/profile' className='sidebar__user'>
                <img src={images.user1} alt='' />
                <div className='sidebar__user__name'>{user.fullName}</div>
            </Link>
            <hr />
            <div className='sidebar__menu'>
                {sidebarNav.map((item, index) => (
                    <SidebarNavItem item={item} key={index} />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
