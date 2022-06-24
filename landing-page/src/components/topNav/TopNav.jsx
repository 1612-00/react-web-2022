import { Badge } from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { collections } from "../../config/Categories";
import { CartContext } from "../../contexts/CartContext";
import "./topNav.scss";

const TopNav = () => {
    // Cart context
    const {
        cartState: { products }
    } = useContext(CartContext);

    const topNavRef = useRef(null);
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [boxInfoState, setBoxInfoState] = useState(false);

    const handleOpenMenu = () => {
        setIsOpenMenu(!isOpenMenu);
    };

    const showBoxInfo = () => {
        setBoxInfoState(!boxInfoState);
    };

    return (
        <div ref={topNavRef} className={`topNav ${isOpenMenu ? "active" : ""}`}>
            <div className="topNav__content">
                <div className="topNav__content__left">
                    <Link to="/" className="topNav__content__left__logo">
                        Logo
                    </Link>
                    {/* <div className="topNav__content__left__links__x">
                            <i class="bx bx-x" onClick={handleOpenlinks}></i>
                        </div> */}
                    <ul className="topNav__content__left__links">
                        {collections.map((item, index) => (
                            <Link
                                to={`/shop/${item.params}`}
                                className="topNav__content__left__links__item"
                                key={index}
                            >
                                <div className="topNav__content__left__links__item__label">
                                    {item.title}
                                </div>
                            </Link>
                        ))}
                    </ul>
                </div>
                <div className="topNav__content__right">
                    <Link to="/cart" className="topNav__content__right__cart">
                        <Badge badgeContent={products.length} color="error">
                            <i class="bx bx-cart"></i>
                        </Badge>
                    </Link>
                    {isOpenMenu ? (
                        <i
                            class="bx bx-x"
                            onClick={handleOpenMenu}
                        ></i>
                    ) : (
                        <i
                            class="bx bx-menu"
                            onClick={handleOpenMenu}
                        ></i>
                    )}

                    {/* <div className="topNav__content__right__user">
                        <i class="bx bx-user" onClick={showBoxInfo}></i>
                    </div>
                    <UserInfo
                        show={boxInfoState === true ? true : false}
                        handleShowBox={showBoxInfo}
                    /> */}
                </div>
            </div>
        </div>
    );
};

export default TopNav;
