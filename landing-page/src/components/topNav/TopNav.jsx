import React, { useState } from 'react';
import UserInfo from '../user-info/UserInfo';
import './topNav.scss';

const TopNav = () => {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [boxInfoState, setBoxInfoState] = useState(false);

    const handleOpenMenu = () => {
        setIsOpenMenu(!isOpenMenu);
    };

    const showBoxInfo = () => {
        setBoxInfoState(!boxInfoState);
    };

    return (
        <div className={`topNav ${isOpenMenu ? 'active' : ''}`}>
            <div className='topNav__content'>
                <div className='topNav__content__left'>
                    <i class='bx bx-menu-alt-left' onClick={handleOpenMenu}></i>
                </div>
                <div className='topNav__content__logo'>Logo</div>
                <div className='topNav__content__right'>
                    <div className='topNav__content__right__cart'>
                        <i class='bx bx-cart'></i>
                    </div>
                    <div className='topNav__content__right__user'>
                        <i class='bx bx-user' onClick={showBoxInfo}></i>
                    </div>
                    <UserInfo
                        show={boxInfoState === true ? true : false}
                        handleShowBox={showBoxInfo}
                    />
                </div>
            </div>
            <div className='topNav__menu'>
                <div className='topNav__menu__x'>
                    <i class='bx bx-x' onClick={handleOpenMenu}></i>
                </div>
                <div className='topNav__menu__top'>Logo</div>
                <ul className='topNav__menu__container'>
                    <li className='topNav__menu__item'>
                        <i class='bx bx-home'></i>
                        <div className='topNav__menu__item__label'>
                            Trang chủ
                        </div>
                    </li>
                    <li className='topNav__menu__item'>
                        <i class='bx bxs-component'></i>
                        <div className='topNav__menu__item__label'>
                            Sản phẩm
                        </div>
                    </li>
                    <li className='topNav__menu__item'>
                        <i class='bx bx-cart'></i>
                        <div className='topNav__menu__item__label'>
                            Giỏ hàng
                        </div>
                    </li>
                    <li className='topNav__menu__item'>
                        <i class='bx bx-search'></i>
                        <div className='topNav__menu__item__label'>
                            Tìm kiếm
                        </div>
                    </li>
                    <li className='topNav__menu__item'>
                        <i class='bx bx-help-circle'></i>
                        <div className='topNav__menu__item__label'>Hỗ trợ</div>
                    </li>
                    <li className='topNav__menu__item'>
                        <i class='bx bx-log-out-circle'></i>
                        <div className='topNav__menu__item__label'>Logout</div>
                    </li>
                </ul>
            </div>
            <div className='topNav__overlay'></div>
        </div>
    );
};

export default TopNav;
