import React from 'react';
import {
    comboBoxMonth,
    totalPrice,
    revenueByMonth,
} from '../../constants/data';
import './boxChartLine.scss';
import 'react-circular-progressbar/dist/styles.css';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const BoxChartLine = () => {
    const chartOptions = {
        responsive: true,
        scales: {
            xAxis: {
                display: true,
            },
            yAxis: {
                display: true,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    const chartData = {
        labels: revenueByMonth.labels,
        datasets: [
            {
                fill: false,
                lineTension: 0,
                label: 'Sales Overview',
                data: revenueByMonth.data,
                borderColor: '#398bf7',
                pointHoverRadius: 10,
                pointHoverBackgroundColor: '#398bf7',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: '#398bf7',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
            },
        ],
    };

    return (
        <div className='boxChartLine'>
            <div className='boxChartLine__content'>
                <div className='boxChartLine__content__top'>
                    <div className='boxChartLine__content__top__title'>
                        Sales Overview
                    </div>
                    <div className='boxChartLine__content__top__combo-box'>
                        <select>
                            {comboBoxMonth.map((item, index) => (
                                <option value='item' key={index}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='boxChartLine__content__mid'>
                    {totalPrice.map((item, index) => (
                        <div
                            key={index}
                            className='boxChartLine__content__mid__item'
                        >
                            <div className='boxChartLine__content__mid__item__text'>
                                {item.text}
                            </div>
                            <div className='boxChartLine__content__mid__item__value'>
                                ${item.value}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='boxChartLine__content__bottom'>
                    <Line
                        options={chartOptions}
                        data={chartData}
                        height='80px'
                    />
                </div>
            </div>
        </div>
    );
};

export default BoxChartLine;
