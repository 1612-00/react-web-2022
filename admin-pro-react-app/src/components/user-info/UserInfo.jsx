import React, { useContext } from 'react';
import images from '../../constants/images';
import './userInfo.scss';
import { AuthContext } from './../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const userInfoSelected = [
    {
        icon: <i class='bx bx-user'></i>,
        text: 'My Profile',
        link: '/profile',
    },
    {
        icon: <i class='bx bx-star'></i>,
        text: 'My Balance',
        link: '/balance',
    },
    {
        icon: <i class='bx bx-customize'></i>,
        text: 'Customize',
        link: '/customize',
    },
];

const userInfoSetting = [
    {
        icon: <i class='bx bx-brightness'></i>,
        text: 'Setting',
        link: '/setting',
    },
];

const UserTab = ({ tab, handleShowBox }) => {
    return (
        <Link
            className='user-tab'
            to={tab.link}
            onClick={() => handleShowBox(false)}
        >
            <div className='user-tab__icon'>{tab.icon}</div>
            <div className='user-tab__text'>{tab.text}</div>
        </Link>
    );
};

const UserInfo = ({ show, handleShowBox }) => {
    // Auth Context
    const {
        state: { user },
        logout,
    } = useContext(AuthContext);

    return (
        <div className={`box-user ${show === true ? 'show' : ''}`}>
            <div className='box-user__top'>
                <div className='box-user__top__img'>
                    <img src={images.user1} alt='' />
                </div>
                <div className='box-user__top__info'>
                    <span className='box-user__top__info__name'>
                        {user.fullName}
                    </span>
                    <span className='box-user__top__info__email'>
                        {user.email}
                    </span>
                </div>
            </div>
            <div className='box-user__selected'>
                {userInfoSelected.map((item, index) => (
                    <UserTab
                        tab={item}
                        key={index}
                        handleShowBox={handleShowBox}
                    />
                ))}
                <hr />
            </div>
            <div className='box-user__setting'>
                {userInfoSetting.map((item, index) => (
                    <UserTab
                        tab={item}
                        key={index}
                        handleShowBox={handleShowBox}
                    />
                ))}
                <hr />
            </div>
            <div className='box-user__logout'>
                <button onClick={() => logout()}>Logout</button>
            </div>
        </div>
    );
};

export default UserInfo;
