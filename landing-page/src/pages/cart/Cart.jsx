import React, { useState, useContext, useEffect } from "react";
import Footer from "../../components/footer/Footer";
import TopNav from "../../components/topNav/TopNav";
import { CartContext } from "../../contexts/CartContext";
import { formatNumber } from "../../constants/Algorithm";
import Button from "../../components/button/Button";
import "./cart.scss";
import { Link } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContext";

const CartTableItem = ({
    item,
    removeProduct,
    changeAmountOfProduct,
    index
}) => {
    const { getProductById } = useContext(ProductContext);
    const [productGet, setProductGet] = useState(null);

    useEffect(() => {
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

const Cart = () => {
    const {
        cartState: { products },
        removeProduct,
        changeAmountOfProduct
    } = useContext(CartContext);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="cart">
            <TopNav />
            <div className="cart__wrapper">
                {products.length !== 0 ? (
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
                                />
                            ))}
                        </tbody>
                    </table>
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
