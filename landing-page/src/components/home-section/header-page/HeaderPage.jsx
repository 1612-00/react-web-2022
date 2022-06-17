import React from "react";
import "./headerPage.scss";
import HomeSection from "../HomeSection";
import Button from "../../button/Button";

const HeaderPage = () => {
    return (
        <HomeSection
            className="header-page"
            contentClassName="overlay"
            bgImage={
                "https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400&q=80"
            }
        >
            <div className="overlay"></div>
            <div className="header-page__content">
                <div className="header-page__content__main-text title">
                    UPGRADE YOUR SUNDAYS
                </div>
                <div className="header-page__content__sub-text">
                    Enjoy secret offers up to -70% off
                </div>
                <div className="header-page__content__btn">
                    <Button className="btn-main">Buy now</Button>
                </div>
                <div className="header-page__content__sub-btn">
                    Discover the experience
                </div>
            </div>
        </HomeSection>
    );
};

export default HeaderPage;
