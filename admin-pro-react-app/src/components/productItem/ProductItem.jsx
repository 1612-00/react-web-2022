import React from 'react';
import './productItem.scss';

const ProductItem = ({ title, item }) => {
    const { image, name, total, price } = item;

    return (
        <div className='product-item'>
            <div className='box-title'>{title}</div>
            <div className='product-item__content'>
                <div className='product-item__content__img'>
                    <img
                        src={
                            typeof image !== 'object'
                                ? 'http://localhost:4000/' +
                                  image.split('\\').slice(1)
                                : URL.createObjectURL(image)
                        }
                        alt='img'
                    />
                    {
                        // image not found or like object
                        typeof image === 'object' || image === '' ? (
                            ''
                        ) : (
                            <div className='product-item__content__img__actions'>
                                <i class='bx bx-cart-alt'></i>
                                <i class='bx bxs-heart'></i>
                            </div>
                        )
                    }
                </div>
                <div className='product-item__content__sub'>
                    <div className='product-item__content__sub__left'>
                        <div className='product-item__content__sub__left__name'>
                            {name !== '' ? name : 'Product Name'}
                        </div>
                        <div className='product-item__content__sub__left__ratingBar'>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star-half'></i>
                        </div>
                        <div className='product-item__content__sub__left__stock'>
                            Stock: {total !== '' ? total : '0'}
                        </div>
                    </div>
                    <div className='product-item__content__sub__right'>
                        <div className='product-item__content__sub__right__price'>
                            ${price !== '' ? price : '0'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
