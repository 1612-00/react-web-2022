import React, { useState, useContext, useEffect } from "react";
import Footer from "../../components/footer/Footer";
import TopNav from "../../components/topNav/TopNav";
import { CartContext } from "../../contexts/CartContext";
import { formatNumber } from "../../constants/Algorithm";
import Button from "../../components/button/Button";
import "./cart.scss";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContext";
import LocationForm from "../../components/location-form/LocationForm";

const CartTableItem = ({
    item,
    removeProduct,
    changeAmountOfProduct,
    index,
    getProductById
}) => {
    const [productGet, setProductGet] = useState(null);

    useEffect(() => {
        // Get info product in cart
        getProductById(item.id).then((value) => {
            setProductGet(value);
        });
    }, []);

    const handleRemove = () => {
        removeProduct(index);
    };

    const handleChangeAmount = (event) => {
        if (event.target.value > 0 && event.target.value < 100)
            changeAmountOfProduct(index, event.target.value);
    };

    return (
        <>
            {productGet ? (
                <tr className="row">
                    <td className="row__btn-remove" onClick={handleRemove}>
                        <i class="bx bx-x"></i>
                    </td>
                    <td className="row__detail">
                        <img
                            src={`http://localhost:4000/${productGet.image
                                .split("\\")
                                .slice(1)}`}
                            alt=""
                        />
                        <div className="row__detail__name">
                            {productGet.name}
                        </div>
                    </td>
                    <td className="row__size">Size {item.size}</td>
                    <td className="row__price">
                        {formatNumber(productGet.price)} VND
                    </td>
                    <td className="row__amount">
                        <input
                            type="number"
                            min="1"
                            max="100"
                            defaultValue={item.amount}
                            onChange={handleChangeAmount}
                        />
                    </td>
                    <td className="row__total">
                        {formatNumber(productGet.price * item.amount)} VND
                    </td>
                </tr>
            ) : (
                <></>
            )}
        </>
    );
};

const CartPayment = ({ retailPrice, shippingPrice = 30000 }) => {
    const [address, setAddress] = useState("Quận Thanh Xuân, Hà Nội");

    const handleChangeAddress = (newAddress) => {
        setAddress(newAddress);
    };

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/checkout");
    };

    return (
        <div className="cart-payment">
            <div className="cart-payment__discount-code">
                <input type="text" placeholder="Enter discount code..." />
                <Button className="btn-sm btn-second">Apply</Button>
            </div>
            <div className="cart-payment__bill">
                <div className="cart-payment__bill__title">
                    Bill Information
                </div>
                <div className="cart-payment__bill__content">
                    <div className="cart-payment__bill__content__row">
                        <div className="cart-payment__bill__content__row__text">
                            Retail Price
                        </div>
                        <div className="cart-payment__bill__content__row__value">
                            {formatNumber(retailPrice)} VND
                        </div>
                    </div>
                    <div className="cart-payment__bill__content__row">
                        <div className="cart-payment__bill__content__row__text">
                            Delivery Costs
                        </div>
                        <div className="cart-payment__bill__content__row__value shipping">
                            <div className="cart-payment__bill__content__row__value shipping-item">
                                <div className="shipping-item__title">
                                    Shipping Price:
                                </div>
                                <div className="bold-text">
                                    {formatNumber(shippingPrice)} VND
                                </div>
                            </div>
                            <div className="cart-payment__bill__content__row__value shipping-item">
                                <div className="shipping-item__title">
                                    Shipping To:
                                </div>
                                <div className="bold-text">{address}</div>
                            </div>
                            <div className="cart-payment__bill__content__row__value change-address">
                                <div className="change-address__text">
                                    Change Address
                                </div>{" "}
                                <i class="bx bx-package"></i>
                            </div>
                            <LocationForm
                                onChangeAddress={handleChangeAddress}
                            />
                        </div>
                    </div>
                    <div className="cart-payment__bill__content__row">
                        <div className="cart-payment__bill__content__row__text">
                            Final Price
                        </div>
                        <div className="cart-payment__bill__content__row__value">
                            <div className="bold-text">
                                {formatNumber(retailPrice + shippingPrice)} VND
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cart-payment__bill__btn">
                    <button className="btn-sm btn-second" onClick={handleClick}>
                        Proceed To Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

const Cart = () => {
    const {
        cartState: { products },
        removeProduct,
        changeAmountOfProduct
    } = useContext(CartContext);

    const { getProductById } = useContext(ProductContext);

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let total = 0;
        products.forEach((element) => {
            getProductById(element.id).then((value) => {
                total += value.price * element.amount;
                setTotalPrice(total);
            });
        });
    }, [products]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="cart">
            <TopNav />
            <div className="cart__wrapper">
                {products.length !== 0 ? (
                    <>
                        <table className="cart__wrapper__table">
                            <thead className="cart__wrapper__table__head">
                                <tr>
                                    <th></th>
                                    <th>Product</th>
                                    <th>Size</th>
                                    <th>Price</th>
                                    <th>Amount</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody className="cart__wrapper__table__body">
                                {products.map((item, index) => (
                                    <CartTableItem
                                        item={item}
                                        key={index}
                                        index={index}
                                        changeAmountOfProduct={
                                            changeAmountOfProduct
                                        }
                                        removeProduct={removeProduct}
                                        getProductById={getProductById}
                                    />
                                ))}
                            </tbody>
                        </table>
                        <CartPayment retailPrice={totalPrice} />
                    </>
                ) : (
                    <div className="cart__wrapper__empty">
                        <div className="cart__wrapper__empty__text">
                            The cart is empty!
                        </div>
                        <Link to="/shop" className="cart__wrapper__empty__btn">
                            <Button className="btn-second btn-sm">
                                Back to shop
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Cart;
