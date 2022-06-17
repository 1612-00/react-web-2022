import React, { useContext, useEffect } from 'react';
import './cart.scss';
import { ProductContext } from './../../../contexts/ProductContext';
import { cartTableHead } from '../../../configs/productData';
import { Link } from 'react-router-dom';

const Cart = () => {
    // Product Context
    const {
        productState: { products },
        getAllProducts
    } = useContext(ProductContext);

    useEffect(() => getAllProducts(), []);

    return (
        <div className='cart main-page'>
            <div className='cart__wrapper box-item-layout'>
                <div className='cart__content'>
                    <div className='box-title'>Full Order List</div>
                    <table className='cart__table'>
                        <thead>
                        <tr className='cart__table__head'>
                            {cartTableHead.map((item, index) => (
                                <th
                                    key={index}
                                    className={`cart__table__head__item ${
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
                                className='cart__table__row'
                                key={index}
                            >
                                <td className='cart__table__row__img'>
                                    <img
                                        src={
                                            'http://localhost:4000/' + (item.image.split('\\').slice(1))
                                        }
                                        alt='img'
                                    />
                                </td>
                                <td className='cart__table__row__name table-row-left'>
                                    {item.name}
                                </td>
                                <td className='cart__table__row__price'>
                                    ${item.price}
                                </td>
                                <td className='cart__table__row__btnAdd table-row-center'>
                                    <input type="number"  min="1" max="30" defaultValue={1} />
                                </td>
                                <td className='cart__table__row__total'>
                                    {item.total}
                                </td>
                                <td className='cart__table__row__btnRemove table-row-center'>
                                    <i class='bx bx-trash'></i>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='cart__option box-item-layout'>
                <Link to={"/product"} className='cart__option-btn'>Continue Shopping</Link>
                <div className="cart__option__checkout">
                    <div className="cart__option__checkout__title">Cart Totals</div>
                    <div className="cart__option__checkout__price subtotal">
                        <div className="cart__option__checkout__price__text">Subtotal</div>
                        <div className="cart__option__checkout__price__value">$250</div>
                    </div>
                    <div className="cart__option__checkout__price">
                        <div className="cart__option__checkout__price__text">Total</div>
                        <div className="cart__option__checkout__price__value">$320</div>
                    </div>
                    <Link to={"/product/checkout"} className='cart__option-btn btn-checkout'>Proceed To Checkout</Link>
                </div>
            </div>
        </div>
    )
}

export default Cart