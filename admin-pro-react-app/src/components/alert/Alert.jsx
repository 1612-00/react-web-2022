import React from 'react';
import './alert.scss';

const Alert = ({ active, success, message }) => {
    return (
        <div className={`alert ${success} ${active}`}>
            <div className='alert__text'>{message}</div>
            <div className='alert__icon'>
                <i class='bx bx-x'></i>
            </div>
        </div>
    );
};

export default Alert;
