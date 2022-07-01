import React, { useEffect, useState } from "react";
import "./product.scss";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import Footer from "../../components/footer/Footer";
import TopNav from "../../components/topNav/TopNav";
import { collectionSize } from "../../config/Categories";
import { formatNumber } from "../../constants/Algorithm";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { ProductContext } from "../../contexts/ProductContext";

const Product = () => {
    const { addProduct } = useContext(CartContext);

    const {
        productState: { products }
    } = useContext(ProductContext);

    const { id } = useParams();
    const navigate = useNavigate();

    const [productChoose, setProductChoose] = useState({
        id: id,
        size: "",
        amount: 1
    });

    const product = products.find((item) => item._id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleAddToCart = () => {
        if (productChoose.size === "") {
            alert("Xin hãy chọn đầy đủ các tùy chọn cho sản phẩm!");
        } else {
            addProduct(productChoose);
            navigate("/cart");
        }
    };

    return (
        <div className="product-page">
            <TopNav />
            <div className="product-page__wrapper">
                <div className="product-page__wrapper__left">
                    <img
                        src={`http://localhost:4000/${product.image
                            .split("\\")
                            .slice(1)}`}
                        alt="img"
                    />
                </div>
                <div className="product-page__wrapper__right">
                    <div className="product-page__wrapper__right__name">
                        {product.name}
                    </div>
                    <div className="product-page__wrapper__right__price">
                        {formatNumber(product.price)} VND
                    </div>
                    <div className="product-page__wrapper__right__category">
                        <div className="product-page__wrapper__right__category__text">
                            Categories:
                        </div>
                        {product.categories.map((item, index) => (
                            <div
                                key={index}
                                className="product-page__wrapper__right__category__item"
                            >
                                {item}
                                {product.categories.length - 1 !== index
                                    ? ", "
                                    : ""}
                            </div>
                        ))}
                    </div>
                    <hr />
                    <div className="product-page__wrapper__right__size">
                        Size:{" "}
                        <div className="product-page__wrapper__right__size__items">
                            {collectionSize.map((item, index) => (
                                <button
                                    className={`product-page__wrapper__right__size__item ${
                                        productChoose.size === item
                                            ? "selected"
                                            : ""
                                    }`}
                                    key={index}
                                    onClick={() =>
                                        setProductChoose({
                                            ...productChoose,
                                            size: item
                                        })
                                    }
                                    hidden={
                                        product.size.find(
                                            (element) => element.value == item
                                        ) !== undefined
                                            ? false
                                            : true
                                    }
                                >
                                    Size {item}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="product-page__wrapper__right__add-cart">
                        <div className="product-page__wrapper__right__add-cart__amount">
                            <input
                                type="number"
                                min="1"
                                max="100"
                                defaultValue={1}
                                onChange={(event) =>
                                    setProductChoose({
                                        ...productChoose,
                                        amount: event.target.value
                                    })
                                }
                            />
                        </div>
                        <div className="product-page__wrapper__right__add-cart__btn">
                            <Button
                                className="btn-second btn-sm"
                                handleClick={handleAddToCart}
                            >
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Product;
