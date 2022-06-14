import React from 'react';
import { circularProgressBarData } from '../../constants/data';
import './boxChartCircle.scss';
import { Doughnut } from 'react-chartjs-2';

import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Title, Tooltip, Legend);

const BoxChartCircle = () => {
    const options = {
        elements: {
            arc: {
                borderWidth: 0,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    const data = {
        maintainAspectRatio: false,
        responsive: true,
        datasets: [
            {
                data: [300, 50, 100, 50],
                backgroundColor: ['#1e88e5', '#26c6da', '#745af2', '#eceff1'],
                hoverBackgroundColor: [
                    '#0d62a8',
                    '#16919f',
                    '#5340b2',
                    '#adb0b1',
                ],
            },
        ],
        labels: ['Mobile', 'Tablet', 'Desktop', 'Other'],
    };

    return (
        <div className='boxChartCircle'>
            <div className='boxChartCircle__content'>
                <div className='boxChartCircle__content__top'>
                    <div className='boxChartCircle__content__top__title'>
                        Visit Separation
                    </div>
                </div>
                <div className='boxChartCircle__content__mid'>
                    <Doughnut
                        data={data}
                        options={options}
                        style={{ width: '5%', height: '5%' }}
                    />
                </div>
                <div className='boxChartCircle__content__bottom'>
                    {circularProgressBarData.map((item, index) => (
                        <div key={index}>
                            <div className='boxChartCircle__content__bottom__item'>
                                <div className='boxChartCircle__content__bottom__item__text'>
                                    {item.text}
                                </div>
                                <div className='boxChartCircle__content__bottom__item__value'>
                                    {item.value}%
                                </div>
                            </div>
                            <div className='progress-bar-hr'>
                                <hr />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BoxChartCircle;
