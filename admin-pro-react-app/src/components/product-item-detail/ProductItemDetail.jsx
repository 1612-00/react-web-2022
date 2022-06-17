import React from "react";
import "./productItemDetail.scss"
import Dialog from "@mui/material/Dialog";

const ProductItemDetail = ({ open, handleClose, item }) => {
    const { image, name, total, price } = item;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            className="dialog-detail"
            maxWidth="80%"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div className="product-detail">
                <div className="product-detail__img">
                    <img
                        src={
                            typeof image !== "object"
                                ? "http://localhost:4000/" +
                                  image.split("\\").slice(1)
                                : URL.createObjectURL(image)
                        }
                        alt="img"
                    />
                </div>
                <div className="product-detail__content">
                    <div className="product-detail__content__name">{name}</div>
                    <div className="product-detail__content__desc">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Non, nam ex dignissimos quos, illum nulla laborum labore
                        obcaecati quam excepturi iure est assumenda quae, vitae
                        temporibus illo! Est, quisquam explicabo?
                    </div>
                    <div className="product-detail__content__price">
                        ${price}
                    </div>
                    <div className="product-detail__content__total">
                        Total: {total}
                    </div>
                    <div className="product-detail__content__quantity">
                        Quantity: 
                        <input
                            type="number"
                            min="1"
                            max="30"
                            defaultValue={1}
                        />
                    </div>
                    <div className="product-detail__content__btns">
                        <div className="product-detail__content__btn">Buy Now</div>
                        <div className="product-detail__content__btn">Add to Cart</div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default ProductItemDetail;
