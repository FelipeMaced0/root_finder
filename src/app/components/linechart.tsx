import React from 'react';
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
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart of Function',
    },
  },
  scales: {
    y: {
     position: "center",
    },
    x: {
      position: "center",
    },
  },
};

export default function LineChart(props:any) {

    const data = {
      labels: [-10,2,5,6,0],
        datasets: [
            {
            label: 'Dataset 1',
            data: [-10,2,5,6,0],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
  return <Line options={options} data={data} />;
}
