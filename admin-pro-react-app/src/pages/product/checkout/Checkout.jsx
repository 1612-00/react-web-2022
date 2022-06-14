import React, { useState } from 'react';
import './checkout.scss';
import {
    InputLabel,
    OutlinedInput,
    FormControl,
    Button,
    RadioGroup,
    FormControlLabel,
    Radio,
    Checkbox,
} from '@mui/material';
import {
    checkoutOrderListData,
    productBillData,
} from './../../../configs/productData';

const Checkout = () => {
    const [valueCheckout, setValueCheckout] = useState(checkoutOrderListData);
    const [valuePayment, setValuePayment] = useState('directBank');
    const [showMoreAddress, setShowMoreAddress] = useState(false);

    let valueUpdate = structuredClone(valueCheckout);

    // Handle show password
    const handleChangeValueCheckout = (index, event) => {
        valueUpdate[index].data = event.target.value;
        setValueCheckout(valueUpdate);
    };

    const handleChangePayment = (event) => {
        setValuePayment(event.target.value);
    };

    const shipMore = () => {
        setShowMoreAddress(!showMoreAddress);
    };

    return (
        <div className='checkout main-page'>
            <div className='checkout__wrapper'>
                <div className='checkout__info box-item-layout'>
                    <div className='box-title'>Full Order List</div>
                    <div className='checkout__info__inputs'>
                        {checkoutOrderListData.map((item, index) => (
                            <FormControl key={index} fullWidth sx={{ m: 1 }}>
                                <InputLabel htmlFor={item.id}>
                                    {item.title}
                                </InputLabel>
                                <OutlinedInput
                                    id={item.id}
                                    type={
                                        item.type !== 'checkbox'
                                            ? item.type
                                            : 'text'
                                    }
                                    label={item.title}
                                    placeholder='Enter here...'
                                    valueCheckout={valueCheckout[index].data}
                                    onChange={(e) =>
                                        handleChangeValueCheckout(index, e)
                                    }
                                />
                            </FormControl>
                        ))}
                    </div>
                    <FormControlLabel
                        className='checkout__info__checkbox'
                        control={<Checkbox onClick={shipMore} />}
                        label='SHIP TO A DIFFERENT ADDRESS?'
                    />
                    <div
                        className={`checkout__info__moreAddress ${
                            showMoreAddress === true ? 'show' : ''
                        }`}
                    >
                        {checkoutOrderListData.map((item, index) => (
                            <FormControl key={index} fullWidth sx={{ m: 1 }}>
                                <InputLabel htmlFor={item.id}>
                                    {item.title}
                                </InputLabel>
                                <OutlinedInput
                                    id={item.id}
                                    type={
                                        item.type !== 'checkbox'
                                            ? item.type
                                            : 'text'
                                    }
                                    label={item.title}
                                    placeholder='Enter here...'
                                    valueCheckout={valueCheckout[index].data}
                                    onChange={(e) =>
                                        handleChangeValueCheckout(index, e)
                                    }
                                />
                            </FormControl>
                        ))}
                    </div>
                    <div className='checkout__info__note'>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <InputLabel htmlFor='note'>Order Notes</InputLabel>
                            <OutlinedInput
                            className="checkout__info__note__input"
                                id='note'
                                type='text'
                                label='Order Notes'
                                placeholder='Enter here...'
                                // valueCheckout={valueCheckout[index].data}
                                    // onChange={(e) =>
                                    //     handleChangeValueCheckout(index, e)
                                    // }
                            />
                        </FormControl>
                    </div>
                </div>
                <div className='checkout__order box-item-layout'>
                    <div className='box-title'>Your Order</div>
                    <div className='checkout__order__voucher'>
                        <input
                            type='text'
                            className='checkout__order__voucher__input'
                        />
                        <button className='checkout__order__voucher__btn'>
                            APPLY
                        </button>
                    </div>
                    <div className='checkout__order__bill'>
                        {productBillData.map((item, index) => (
                            <div
                                className='checkout__order__bill__item'
                                key={index}
                            >
                                <div className='checkout__order__bill__content'>
                                    <div className='checkout__order__bill__content__item__left'>
                                        {item.text}
                                    </div>
                                    <div className='checkout__order__bill__content__item__right'>
                                        {item.data}
                                    </div>
                                </div>
                                <hr />
                            </div>
                        ))}
                    </div>
                    <div className='checkout__order__payment'>
                        <FormControl>
                            <RadioGroup
                                value={valuePayment}
                                onChange={handleChangePayment}
                            >
                                <FormControlLabel
                                    value='directBank'
                                    control={<Radio />}
                                    label='Direct Bank Transfer'
                                    checked={valuePayment === 'directBank'}
                                />
                                <FormControlLabel
                                    value='paypal'
                                    control={<Radio />}
                                    label='Paypal'
                                    checked={valuePayment === 'paypal'}
                                />
                                <FormControlLabel
                                    value='creditCard'
                                    control={<Radio />}
                                    label='Credit Card'
                                    checked={valuePayment === 'creditCard'}
                                />
                                <FormControlLabel
                                    value='cashOnDelivery'
                                    control={<Radio />}
                                    label='Cash on Delivery'
                                    checked={valuePayment === 'cashOnDelivery'}
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className='checkout__order__btnOrder'>
                        <Button variant='contained' size='large'>
                            Place Order
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
