import React, { useContext, useEffect } from 'react';
import ProductItem from '../../components/productItem/ProductItem';
import './product.scss';
import { ProductContext } from './../../contexts/ProductContext';

const Product = () => {
    // Product Context
    const {
        productState: { products },
        getAllProducts
    } = useContext(ProductContext);

    useEffect(() => getAllProducts(), []);

    return (
        <div className='product main-page'>
            <div className='product__wrapper'>
                <div className='product__content'>
                    {products.map((item, index) => (
                        <ProductItem key={index} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Product;
