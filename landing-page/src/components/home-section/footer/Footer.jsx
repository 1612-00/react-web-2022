import React from "react";
import "./footer.scss";
import {
    footerInfo,
    footerAbout,
    footerCollections,
    footerPlace
} from "../../../config/Footer";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__col">
                <div className="footer__col__title">{footerInfo.title}</div>
                <div className="footer__col__socials">
                    {footerInfo.social.map((item, index) => (
                        <div className="footer__col__social" key={index}>
                            {item.icon}
                        </div>
                    ))}
                </div>
                <div className="footer__col__info">
                    {footerInfo.info.map((item, index) => (
                        <div className="footer__col__info__item" key={index}>
                            <div className="footer__col__info__item__icon">
                                {item.icon}
                            </div>
                            <div className="footer__col__info__item__value">
                                {item.value.map((item1, index1) => (
                                    <div
                                        className="footer__col__info__item__value__element"
                                        key={index1}
                                    >
                                        {item1}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="footer__col">
                <div className="footer__col__title">{footerAbout.title}</div>
                <div className="footer__col__options">
                    {footerAbout.value.map((item, index) => (
                        <div className="footer__col__options__item" key={index}>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
            <div className="footer__col">
                <div className="footer__col__title">
                    {footerCollections.title}
                </div>
                <div className="footer__col__options">
                    {footerCollections.value.map((item, index) => (
                        <div className="footer__col__options__item" key={index}>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
            <div className="footer__col">
                <div className="footer__col__title">{footerPlace.title}</div>
            </div>
        </div>
    );
};

export default Footer;
