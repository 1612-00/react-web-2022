import React, { useContext, useEffect } from 'react';
import './ordersProduct.scss';
import { ProductContext } from './../../../contexts/ProductContext';
import { ordersTableHead } from '../../../configs/productData';

const OrdersProduct = () => {
    // Product Context
    const {
        productState: { products },
        getAllProducts
    } = useContext(ProductContext);

    useEffect(() => getAllProducts(), []);

    return (
        <div className='orders-product main-page'>
            <div className='orders-product__wrapper box-item-layout'>
                <div className='orders-product__content'>
                    <div className='box-title'>Full Order List</div>
                    <table className='orders-product__table'>
                        <thead>
                        <tr className='orders-product__table__head'>
                            {ordersTableHead.map((item, index) => (
                                <th
                                    key={index}
                                    className={`orders-product__table__head__item ${
                                        item === 'Title' ? 'table-row-left' : ''
                                    }`}
                                >
                                    {item}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((item, index) => (
                            <tr
                                className='orders-product__table__row'
                                key={index}
                            >
                                <td className='orders-product__table__row__img'>
                                    <img
                                        src={
                                            'http://localhost:4000/' + (item.image.split('\\').slice(1))
                                        }
                                        alt='img'
                                    />
                                </td>
                                <td className='orders-product__table__row__name table-row-left'>
                                    {item.name}
                                </td>
                                <td className='orders-product__table__row__price'>
                                    ${item.price}
                                </td>
                                <td className='orders-product__table__row__btnAdd table-row-center'>
                                    <button>Add To Cart</button>
                                </td>
                                <td className='orders-product__table__row__total'>
                                    {item.total}
                                </td>
                                <td className='orders-product__table__row__btnRemove table-row-center'>
                                    <i class='bx bx-trash'></i>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrdersProduct;
