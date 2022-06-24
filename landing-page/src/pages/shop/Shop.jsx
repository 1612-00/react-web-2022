import React, { useContext, useState } from "react";
import "./shop.scss";
import SearchForm from "../../components/search-form/SearchForm";
import { collections, collectionSize } from "../../config/Categories";
import Slider from "@mui/material/Slider";
import Button from "../../components/button/Button";
import ProductGrid from "../../components/home-section/product/product-grid/ProductGrid";
import TopNav from "../../components/topNav/TopNav";
import Footer from "../../components/footer/Footer";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { ProductContext } from "../../contexts/ProductContext";

const FilterByCollection = () => (
    <div className="filter">
        <div className="filter__title">Product Category</div>
        {collections.map((item, index) => (
            <div className="filter__item" key={index}>
                <Link
                    to={`/shop/${item.params}`}
                    className="filter__item__parent"
                >
                    {item.title}
                </Link>
                {item.options && (
                    <div className="filter__item__children">
                        {item.options.map((item1, index1) => (
                            <Link
                                to={`/shop/${item.params}/${item1.params}`}
                                className="filter__item__child"
                                key={index1}
                            >
                                {item1.text}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        ))}
    </div>
);

const FilterByPrice = () => {
    const [value, setValue] = React.useState([500000, 1150000]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="filter">
            <div className="filter__title">Price</div>
            <Slider
                value={value}
                min={500000}
                max={1150000}
                step={100000}
                onChange={handleChange}
                valueLabelDisplay="auto"
                style={{ color: "black" }}
            />
            <div className="filter__price">
                <div className="filter__price__range">
                    From: {value[0]} VND - To: {value[1]} VND
                </div>
                <div className="filter__price__btn">
                    <Button className="btn-sm btn-second">Filter</Button>
                </div>
            </div>
        </div>
    );
};

const FilterBySize = () => {
    return (
        <div className="filter">
            <div className="filter__title">Size</div>
            <div className="filter__size">
                {collectionSize.map((item, index) => (
                    <div className="filter__size__item" key={index}>
                        Size {item}
                    </div>
                ))}
            </div>
        </div>
    );
};

const Shop = () => {
    const {
        productState: { products }
    } = useContext(ProductContext);

    const { category, category2 } = useParams();
    const [listFilterByCategory, setListFilterByCategory] = useState([]);

    // Search product by name
    const searchByName = (key) => {
        setListFilterByCategory(
            products.filter((item) =>
                // Chuẩn hóa 2 xâu về dạng tiếng Việt không dấu
                item.name
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/đ/g, "d")
                    .replace(/Đ/g, "D")
                    .includes(
                        key
                            .toLowerCase()
                            .toLowerCase()
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                            .replace(/đ/g, "d")
                            .replace(/Đ/g, "D")
                    )
            )
        );
    };

    // get data by params
    const getDataByParams = () => {
        if (category === undefined) setListFilterByCategory(products);
        else if (category2 === undefined)
            setListFilterByCategory(
                products.filter((item) =>
                    item.categories.find((item1) => item1 === category)
                )
            );
        else {
            const filterByCategory1 = products.filter((item) =>
                item.categories.find((item1) => item1 === category)
            );
            setListFilterByCategory(
                filterByCategory1.filter((item) =>
                    item.categories.find((item1) => item1 === category2)
                )
            );
        }
    };

    useEffect(() => {
        getDataByParams();
    }, [category, category2]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="shop">
            <TopNav />
            <div className="shop__wrapper">
                <div className="shop__wrapper__navbar">
                    <SearchForm searchByName={searchByName} />
                    <div className="shop__wrapper__navbar__filter">
                        <FilterByCollection />
                        <FilterBySize />
                        <FilterByPrice />
                    </div>
                </div>
                <div className="shop__wrapper__content">
                    {listFilterByCategory.length > 0 ? (
                        <ProductGrid listProduct={listFilterByCategory} />
                    ) : (
                        "There are no products in the catalog!"
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Shop;
