import React, { useState, useEffect, useContext } from 'react';
import './themeSetting.scss';
import { ThemeContext } from './../../contexts/ThemeContext';
import { themeMode, colorChoose } from '../../configs/themeValue';

const ColorChoose = ({ type, stateColor }) => {
    // Context
    const { changeTopNavColor, changeSidebarColor } = useContext(ThemeContext);

    const [currColor, setCurrColor] = useState(stateColor);

    // Set color of topNav and sidebar
    const setColor = (color) => {
        setCurrColor(color);
        localStorage.setItem(`${type}Color`, color);
        if (type === 'topNav') changeTopNavColor(color);
        if (type === 'sidebar') changeSidebarColor(color);
    };

    const changeColor = (color) => {
        setCurrColor(color);
        setColor(color);
    };

    useEffect(() => {
        localStorage.setItem(`${type}Color`, currColor);
        const colorClass = colorChoose.find(
            (item) =>
                item.class === localStorage.getItem(`${type}Color`, 'white')
        );

        if (colorClass !== null) setCurrColor(colorClass.id);
    }, [currColor, type]);

    return (
        <>
            <div
                className={`color-choose__white`}
                onClick={() => changeColor('white')}
            >
                <div className={`color-choose__white__checked`}>
                    {currColor === 'white' ? (
                        <i class='bx bx-check'></i>
                    ) : (
                        <i class='bx bx-circle'></i>
                    )}
                </div>
            </div>
            <div
                className={`color-choose__black`}
                onClick={() => changeColor('black')}
            >
                <div className={`color-choose__black__checked`}>
                    {currColor === 'black' ? (
                        <i class='bx bx-check'></i>
                    ) : (
                        <i class='bx bx-circle'></i>
                    )}
                </div>
            </div>
            <div
                className={`color-choose__purple`}
                onClick={() => changeColor('purple')}
            >
                <div className={`color-choose__purple__checked`}>
                    {currColor === 'purple' ? (
                        <i class='bx bx-check'></i>
                    ) : (
                        <i class='bx bx-circle'></i>
                    )}
                </div>
            </div>
            <div
                className={`color-choose__green`}
                onClick={() => changeColor('green')}
            >
                <div className={`color-choose__green__checked`}>
                    {currColor === 'green' ? (
                        <i class='bx bx-check'></i>
                    ) : (
                        <i class='bx bx-circle'></i>
                    )}
                </div>
            </div>
            <div
                className={`color-choose__red`}
                onClick={() => changeColor('red')}
            >
                <div className={`color-choose__red__checked`}>
                    {currColor === 'red' ? (
                        <i class='bx bx-check'></i>
                    ) : (
                        <i class='bx bx-circle'></i>
                    )}
                </div>
            </div>
            <div
                className={`color-choose__blue`}
                onClick={() => changeColor('blue')}
            >
                <div className={`color-choose__blue__checked`}>
                    {currColor === 'blue' ? (
                        <i class='bx bx-check'></i>
                    ) : (
                        <i class='bx bx-circle'></i>
                    )}
                </div>
            </div>
        </>
    );
};

const ModChoose = ({ left, right, isChoose }) => {
    // Context
    const { themeState, changeThemeMode } = useContext(ThemeContext);

    // State
    const [modChoose, setModChoose] = useState(isChoose);

    const [currMode, setCurrMode] = useState(themeState.themeMode);

    // Set theme mod
    const setMode = (mode) => {
        setCurrMode(mode.id);
        localStorage.setItem('themeMode', mode.class);
        changeThemeMode(mode.class);
    };

    // Click button
    const clickLeft = () => {
        setModChoose('left');
        if (left === 'Light') setMode(themeMode[0]);
    };
    const clickRight = () => {
        setModChoose('right');
        if (left === 'Light') setMode(themeMode[1]);
    };

    useEffect(() => {
        localStorage.setItem('themeMode', currMode);
        const themeClass = themeMode.find(
            (item) => item.class === localStorage.getItem('themeMode', 'light')
        );

        if (themeClass !== null) setCurrMode(themeClass.id);
    }, [currMode]);

    return (
        <div className='mod-choose'>
            <div
                className={`mod-choose__left ${
                    modChoose === 'left' ? 'checked' : ''
                }`}
                onClick={clickLeft}
            >
                {left}
            </div>
            <div
                className={`mod-choose__right ${
                    modChoose === 'right' ? 'checked' : ''
                }`}
                onClick={clickRight}
            >
                {right}
            </div>
        </div>
    );
};

const ThemeSetting = () => {
    // Theme Context
    const { themeState } = useContext(ThemeContext);

    const [isOpenSetting, setIsOpenSetting] = useState(false);

    const openSetting = () => {
        setIsOpenSetting(!isOpenSetting);
    };

    return (
        <>
            <div
                className={`theme-setting ${
                    isOpenSetting === true ? 'settingOpen' : ''
                }`}
            >
                <div className='overlay-themeSetting'></div>
                <div className='theme-setting__btn' onClick={openSetting}>
                    {isOpenSetting === true ? (
                        <i class='bx bx-x'></i>
                    ) : (
                        <i class='bx bx-cog'></i>
                    )}
                </div>
                <div className='theme-setting__content'>
                    <div className='theme-setting__content__top'>
                        <div className='theme-setting__content__top__text'>
                            Theme Customizer
                        </div>
                        <div className='theme-setting__content__top__sub'>
                            Customize & Preview in Real Time
                        </div>
                    </div>
                    <hr />
                    <div className='theme-setting__content__main'>
                        <div className='theme-setting__content__main__item'>
                            <div className='theme-setting__content__main__item__text'>
                                Topbar Color
                            </div>
                            <div className='color-choose topNavChangeColor'>
                                <ColorChoose
                                    type='topNav'
                                    stateColor={themeState.topNavColor}
                                />
                            </div>
                        </div>
                        <div className='theme-setting__content__main__item'>
                            <div className='theme-setting__content__main__item__text'>
                                Sidebar Color
                            </div>
                            <div className='color-choose sidebarChangeColor'>
                                <ColorChoose
                                    type='sidebar'
                                    stateColor={themeState.sidebarColor}
                                />
                            </div>
                        </div>
                        <div className='theme-setting__content__main__item'>
                            <div className='theme-setting__content__main__item__text'>
                                Change Mod
                            </div>
                            <ModChoose
                                className='changeMode'
                                left='Light'
                                right='Dark'
                                isChoose={
                                    themeState.themeMode === 'light'
                                        ? 'left'
                                        : 'right'
                                }
                            />
                        </div>
                        <div className='theme-setting__content__main__item'>
                            <div className='theme-setting__content__main__item__text'>
                                Change Direction
                            </div>
                            <ModChoose
                                className='changeDirection'
                                left='LTR'
                                right='RTL'
                                isChoose='left'
                            />
                        </div>
                        <div className='theme-setting__content__main__item'>
                            <div className='theme-setting__content__main__item__text'>
                                Change Layout
                            </div>
                            <ModChoose
                                className='changeLayout'
                                left='Vertical'
                                right='Horizontal'
                                isChoose='left'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ThemeSetting;
