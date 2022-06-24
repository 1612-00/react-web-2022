import React from "react";
import { Link } from "react-router-dom";
import { formatNumber } from "../../../../constants/Algorithm";
import Button from "../../../button/Button";
import "./productCard.scss";

const ProductCard = ({ data }) => {
    return (
        <Link to={`/product/${data._id}`} className="product-card">
            <div className="product-card__img">
                <img
                    src={`http://localhost:4000/${data.image.split("\\").slice(1)}`}
                    alt="img"
                />
            </div>
            {data.discount !== 0 && (
                <div className="product-card__discount">
                    - {data.discount} %
                </div>
            )}
            <div className="product-card__content">
                <div className="product-card__content__name">{data.name}</div>
                <div className="product-card__content__type">{data.type}</div>
                <div className="product-card__content__price">
                    {data.discount !== 0 && (
                        <div className="product-card__content__old-price">
                            {formatNumber(data.price) + " VND"}
                        </div>
                    )}

                    <div className="product-card__content__new-price">
                        {data.discount !== 0
                            ? formatNumber(
                                  data.price -
                                      (data.price * data.discount) / 100
                              ) + " VND"
                            : formatNumber(data.price) + " VND"}
                    </div>
                </div>
                <Button className="product-card__content__btn btn-second btn-sm">
                    Add to Cart
                </Button>
            </div>
        </Link>
    );
};

export default ProductCard;
