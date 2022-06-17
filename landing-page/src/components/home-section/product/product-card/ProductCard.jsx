import React from "react";
import Button from "../../../button/Button";
import "./productCard.scss";

const ProductCard = ({ data }) => {
    const formatNumber = (num) => {
        var arrayNum = num.toString(10).split("");
        var strNum = "";
        arrayNum.map((n, i) => {
            if (
                (arrayNum.length - 1 - i) % 3 === 0 &&
                i !== arrayNum.length - 1
            )
                strNum += n + ",";
            else strNum += n;
        });

        return strNum;
    };

    return (
        <div className="product-card">
            <div className="product-card__img">
                <img src={data.img} alt="img" />
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
        </div>
    );
};

export default ProductCard;
