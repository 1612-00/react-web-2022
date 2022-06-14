import React, { useContext, useState } from 'react';
import './profile.scss';
import avatar from '../../assets/img/user1.jpg';
import ProfileTab from './profile-tab/ProfileTab';
import { AuthContext } from './../../contexts/AuthContext';

const boxActionData = [
    {
        icon: <i class='bx bxs-user'></i>,
        text: 'My Frofile',
    },
    {
        icon: <i class='bx bxs-user'></i>,
        text: 'Edit Frofile',
    },
    {
        icon: <i class='bx bxs-lock-alt'></i>,
        text: 'Reset Password',
    },
    {
        icon: <i class='bx bxs-log-in-circle'></i>,
        text: 'Logout',
    },
];

const BoxProfile = ({ user }) => {
    return (
        <div className='box-profile'>
            <div className='box-profile__img'>
                <img src={avatar} alt='' />
            </div>
            <div className='box-profile__name'>
                <div className='box-profile__name__fullName'>
                    {user.fullName}
                </div>
                <div className='box-profile__name__email'>{user.email}</div>
            </div>
            <div className='box-profile__btns'>
                <button className='box-profile__btn chat'>Chat</button>
                <button className='box-profile__btn follow'>Follow</button>
            </div>
        </div>
    );
};

const BoxAction = ({ onChangeTab, logout }) => {
    const [itemActive, setItemActive] = useState(0);

    const handleClickActive = (index) => {
        if (index === 3) {
            logout();
        } else {
            onChangeTab(index);
            setItemActive(index);
        }
    };

    return (
        <div className='box-action'>
            {boxActionData.map((item, index) => (
                <div
                    className={`box-action__item ${
                        itemActive === index ? 'active' : ''
                    }`}
                    key={index}
                    onClick={() => handleClickActive(index)}
                >
                    <div className='box-action__item__icon'>{item.icon}</div>
                    <div className='box-action__item__text'>{item.text}</div>
                </div>
            ))}
        </div>
    );
};

const Profile = () => {
    // Auth Context
    const {
        state: { user },
        logout,
        updateInfo,
    } = useContext(AuthContext);

    const [profileTab, setProfileTab] = useState(0);

    const handleChangeTab = (index) => {
        setProfileTab(index);
    };

    return (
        <div className='profile main-page'>
            <div className='profile__wrapper'>
                <h2 className='profile__title'>Profile Page</h2>
                <div className='profile__content'>
                    <div className='profile__content__action'>
                        <BoxProfile user={user} />
                        <BoxAction
                            onChangeTab={handleChangeTab}
                            logout={logout}
                        />
                    </div>
                    <div className='profile__content__info box-item-layout'>
                        <ProfileTab
                            tabChoose={profileTab}
                            user={user}
                            updateInfo={updateInfo}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
