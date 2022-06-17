import React from "react";
import Collection from "../components/home-section/collection/Collection";
import Footer from "../components/home-section/footer/Footer";
import HeaderPage from "../components/home-section/header-page/HeaderPage";
import ProductList from "../components/home-section/product/product-list/ProductList";
import { bestSelling } from "../config/Product";
import "./home.scss";

const Home = () => {
    return (
        <div className="home">
            <HeaderPage />
            <div className="home__body">
                <Collection />
                <ProductList title="Best selling" listProduct={bestSelling} />
                <ProductList
                    title="Feature product"
                    listProduct={bestSelling}
                />
                <ProductList title="Flash sale" listProduct={bestSelling} />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
