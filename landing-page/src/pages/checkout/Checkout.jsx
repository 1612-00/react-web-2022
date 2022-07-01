import { Checkbox, FormControlLabel } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import TopNav from "../../components/topNav/TopNav";
import { formatNumber } from "../../constants/Algorithm";
import { CartContext } from "../../contexts/CartContext";
import { ProductContext } from "../../contexts/ProductContext";
import "./checkout.scss";

const CheckOutCustomerInfo = ({ info, setInfo }) => {
    const name = useRef();
    const phone = useRef();
    const address = useRef();

    const handleChangeInput = () => {
        const newInfo = {
            ...info,
            name: name.current.value,
            phone: phone.current.value,
            address: address.current.value
        };

        setInfo(newInfo);
    };

    return (
        <div className="customer-info">
            <input
                ref={name}
                className="input-checkout"
                type="text"
                placeholder="Full Name..."
                required
                onChange={handleChangeInput}
            />
            <input
                ref={phone}
                className="input-checkout"
                type="text"
                placeholder="Phone Number..."
                required
                onChange={handleChangeInput}
            />
            <input
                ref={address}
                className="input-checkout"
                type="text"
                placeholder="Address..."
                required
                onChange={handleChangeInput}
            />
        </div>
    );
};

const OtherAddress = ({ info, setInfo }) => {
    const [activeAnotherAddress, setActiveAnotherAddress] = useState(false);

    const handleClick = () => {
        setActiveAnotherAddress(!activeAnotherAddress);
    };

    return (
        <div className="other-address">
            <div className="other-address__check-box">
                <FormControlLabel
                    control={<Checkbox onClick={handleClick} />}
                    label="Delivery to another address?"
                />
            </div>
            <div
                className={`other-address__form ${
                    activeAnotherAddress ? "active" : ""
                }`}
            >
                <CheckOutCustomerInfo info={info} setInfo={setInfo} />
            </div>
        </div>
    );
};

const ProductInfo = ({ item, getProductById }) => {
    const [productGet, setProductGet] = useState(null);

    useEffect(() => {
        // Get info product in cart
        getProductById(item.id).then((value) => {
            setProductGet(value);
        });
    }, []);

    return (
        <>
            {productGet ? (
                <>
                    <div className="checkout__detail__content__product__left">
                        {productGet.name} x {item.amount}
                    </div>
                    <div className="checkout__detail__content__product__right">
                        {productGet.price}
                    </div>
                </>
            ) : null}
        </>
    );
};

const Checkout = () => {
    const noteRef = useRef();
    const navigate = useNavigate();

    const {
        cartState: { products },
        loadCart,
        checkout
    } = useContext(CartContext);

    const { getProductById } = useContext(ProductContext);

    const [customerInfo, setCustomerInfo] = useState({
        name: "",
        phone: "",
        address: ""
    });
    const [otherInfo, setOtherInfo] = useState({
        name: "",
        phone: "",
        address: "",
        note: ""
    });

    const [totalPrice, setTotalPrice] = useState(0);

    const infoRef = useRef();

    useEffect(() => {
        let total = 0;
        products.forEach((element) => {
            getProductById(element.id).then((value) => {
                total += value.price * element.amount;
                setTotalPrice(total);
            });
        });
    }, [products]);

    const handleSetInfo = (value) => {
        setCustomerInfo(value);
    };
    const handleSetAnotherInfo = (value) => {
        setOtherInfo(value);
    };

    const handleChangeInput = () => {
        const newOtherInfo = {
            ...otherInfo,
            note: noteRef.current.value
        };
        setOtherInfo(newOtherInfo);
    };

    const handleCheckout = () => {
        if (
            customerInfo.name === "" &&
            customerInfo.phone === "" &&
            customerInfo.address === ""
        ) {
            infoRef.current.scrollIntoView();
            alert("Please enter all information!");
        } else {
            checkout(customerInfo, otherInfo, products).then((value) => {
                if (value) alert("Order successfully!");
                localStorage.removeItem("cart");
                loadCart();
                navigate("/cart");
            });
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="checkout">
            <TopNav />
            <div className="checkout__wrapper">
                {/* ============================DETAIL============================= */}
                <div className="checkout__detail">
                    <div className="checkout__detail__container">
                        <div className="checkout__detail__title">
                            Your order
                        </div>
                        <div className="checkout__detail__content">
                            {/* =========================HEADER=========================*/}
                            <div className="checkout__detail__content__header">
                                <div className="checkout__detail__content__header__left">
                                    Product
                                </div>
                                <div className="checkout__detail__content__header__right">
                                    Into Money
                                </div>
                            </div>
                            {/* =========================PRODUCT=========================*/}
                            {products.map((item, index) => (
                                <div
                                    key={index}
                                    className="checkout__detail__content__product"
                                >
                                    <ProductInfo
                                        item={item}
                                        getProductById={getProductById}
                                    />
                                </div>
                            ))}
                            {/* =========================PRICE=========================*/}
                            <div className="checkout__detail__content__price">
                                <div className="checkout__detail__content__price__left">
                                    Retail Price
                                </div>
                                <div className="checkout__detail__content__price__right">
                                    {formatNumber(totalPrice)} VND
                                </div>
                            </div>
                            <div className="checkout__detail__content__price">
                                <div className="checkout__detail__content__price__left">
                                    Delivery Costs
                                </div>
                                <div className="checkout__detail__content__price__right shipping">
                                    <div className="checkout__detail__content__price__right shipping-item">
                                        <div className="shipping-item__title">
                                            Shipping Price:
                                        </div>
                                        <div className="bold-text">
                                            {formatNumber(30000)} VND
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="checkout__detail__content__price">
                                <div className="checkout__detail__content__price__left">
                                    Final Price
                                </div>
                                <div className="checkout__detail__content__price__right">
                                    <div className="bold-text">
                                        {formatNumber(totalPrice + 30000)} VND
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ============================METHOD============================= */}
                <div className="checkout__method">
                    <div className="checkout__method__container">
                        <div className="checkout__method__title">
                            Payment Method: Cash On Delivery
                        </div>
                    </div>
                </div>
                {/* ============================ADDRESS============================= */}
                <div className="checkout__address" ref={infoRef}>
                    <div className="checkout__address__left">
                        <div className="checkout__address__left__title">
                            Customer Information
                        </div>
                        <CheckOutCustomerInfo
                            info={customerInfo}
                            setInfo={handleSetInfo}
                        />
                    </div>
                    <div className="checkout__address__right">
                        <OtherAddress
                            info={otherInfo}
                            setInfo={handleSetAnotherInfo}
                        />
                        <div className="checkout__address__right__note">
                            <div className="checkout__address__right__note__title">
                                Note
                            </div>
                            <textarea
                                ref={noteRef}
                                onChange={handleChangeInput}
                                placeholder="Order notes, for example, more detailed delivery time or location instructions"
                            ></textarea>
                        </div>
                    </div>
                </div>
                {/* ============================BTN============================= */}
                <div className="checkout__btn">
                    <button
                        className="btn-sm btn-second"
                        onClick={handleCheckout}
                    >
                        Checkout
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Checkout;
