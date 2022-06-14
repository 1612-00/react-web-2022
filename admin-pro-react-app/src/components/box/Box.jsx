import React from 'react';
import './box.scss';

const Box = ({ item }) => {
    return (
        <div className='box'>
            <div className='box__content'>
                <div className='box__content__img'>
                    <img src={item.img} alt='' />
                </div>
                <div className='box__content__value'>
                    <div className='box__content__value__title'>
                        {item.text}
                    </div>
                    <div className='box__content__value__value'>
                        {item.value}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Box;
