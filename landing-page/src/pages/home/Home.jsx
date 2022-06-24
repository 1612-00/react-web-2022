import React, { useContext, useEffect } from "react";
import Footer from "../../components/footer/Footer";
import Collection from "../../components/home-section/collection/Collection";
import HeaderPage from "../../components/home-section/header-page/HeaderPage";
import ProductList from "../../components/home-section/product/product-list/ProductList";
import TopNav from "../../components/topNav/TopNav";
import { bestSelling } from "../../config/Product";
import { ProductContext } from "../../contexts/ProductContext";
import "./home.scss";

const Home = () => {
    const {
        productState: { products }
    } = useContext(ProductContext);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="home">
            <TopNav />
            <HeaderPage />
            <div className="home__body">
                <Collection />
                <ProductList title="Best selling" listProduct={products} />
                <ProductList
                    title="Feature product"
                    listProduct={products}
                />
                <ProductList title="Flash sale" listProduct={products} />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
