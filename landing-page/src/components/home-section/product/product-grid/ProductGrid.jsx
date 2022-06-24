import React from "react";
import { useState } from "react";
import Button from "../../../button/Button";
import HomeSection from "../../HomeSection";
import ProductCard from "../product-card/ProductCard";
import "./productGrid.scss";

const ProductGrid = ({ listProduct }) => {
    const [page, setPage] = useState(0);

    const handleLoadMore = () => {
        setPage(page + 1);
    }

    return (
        <HomeSection className="product-grid">
            <div className="product-grid__content">
                {listProduct.slice(0, (page + 1) * 9).map((item, index) => (
                    <div className="product-grid__content__item" key={index}>
                        <ProductCard data={item} />
                    </div>
                ))}
            </div>
            <div className="product-grid__btn-load-more">
                {(page < Math.floor(listProduct.length / 9)) && (
                    <button className="btn-sm btn-second" onClick={handleLoadMore}>
                        Load more
                    </button>
                )}
            </div>
        </HomeSection>
    );
};

export default ProductGrid;
