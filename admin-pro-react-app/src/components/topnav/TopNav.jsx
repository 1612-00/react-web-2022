import React, { useState } from 'react';
import './topNav.scss';
import images from './../../constants/images';
import UserInfo from '../user-info/UserInfo';
import { Link } from 'react-router-dom';

const TopNav = () => {
    const [sideBarStatus, setSideBarStatus] = useState(0);
    const [boxInfoState, setBoxInfoState] = useState(false);

    const hideSideBar = () => {
        if (sideBarStatus === 0) {
            document.querySelector('.sidebar').classList.add('hide');
            document.querySelector('.topNav').classList.add('hide');
            document.querySelector('.main').classList.add('hide');
            setSideBarStatus(1);
        } else {
            document.querySelector('.sidebar').classList.remove('hide');
            document.querySelector('.topNav').classList.remove('hide');
            document.querySelector('.main').classList.remove('hide');
            setSideBarStatus(0);
        }
    };

    const showBoxInfo = () => {
        setBoxInfoState(!boxInfoState);
    };

    return (
        <div className='topNav'>
            <Link to='/' className='topNav__logo'>
                <svg
                    width='30'
                    height='30'
                    viewBox='0 0 30 30'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M7.62296 1.96269C5.32296 3.16269 3.02296 5.46269 1.82296 7.86269C-4.77704 20.7627 7.62296 33.6627 21.723 28.7627C24.123 27.9627 25.623 27.8627 27.423 28.7627L29.823 29.8627V20.7627C29.823 9.66269 27.823 4.96269 21.823 1.86269C16.923 -0.637312 12.423 -0.637312 7.62296 1.96269ZM20.923 8.76269C24.823 12.7627 24.823 16.9627 20.923 20.9627C18.923 22.9627 17.023 23.8627 14.823 23.8627C12.623 23.8627 10.723 22.9627 8.72296 20.9627C4.82296 16.9627 4.82296 12.7627 8.72296 8.76269C10.723 6.76269 12.623 5.86269 14.823 5.86269C17.023 5.86269 18.923 6.76269 20.923 8.76269Z'
                        id='fill1OfLogo'
                    ></path>
                    <path
                        d='M11.823 12.3627C10.323 14.1627 10.823 16.8627 13.123 18.2627C16.523 20.4627 20.423 15.5627 17.823 12.3627C16.223 10.4627 13.423 10.4627 11.823 12.3627Z'
                        id='fill2OfLogo'
                    ></path>
                </svg>
                <div className='topNav__logo__text active'>adminPro</div>
            </Link>
            <div className='topNav__content'>
                <div className='topNav__content__left'>
                    <div className='topNav__content__left__btn-toggle'>
                        <i class='bx bx-menu' onClick={hideSideBar}></i>
                    </div>
                    <div className='topNav__content__left__about'>About</div>
                </div>
                <div className='topNav__content__right'>
                    <div className='topNav__content__right__chat'>
                        <i class='bx bx-chat'></i>
                    </div>
                    <div className='topNav__content__right__envelope'>
                        <i class='bx bx-envelope'></i>
                    </div>
                    <div className='topNav__content__right__user'>
                        <img src={images.user1} alt='' onClick={showBoxInfo} />
                        <UserInfo
                            show={boxInfoState === true ? true : false}
                            handleShowBox={setBoxInfoState}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopNav;
