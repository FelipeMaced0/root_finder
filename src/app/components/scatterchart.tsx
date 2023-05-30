import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';


ChartJS.register(LinearScale, 
  PointElement, 
  LineElement, 
  Tooltip, 
  Legend
);


export const options = {
  reponsive: true,
  scales: {
    y: {
     beginAtZero: true,
    },
    x: {
      min: -5,
      max: 5
    },
  },
};

const ScatterChart = (props:any) => {
  const data = {
    datasets: [
      {
        label: 'BOUNDERIES',
        data: props? props.bounderies : [{x:0, y:0}],
        backgroundColor: 'rgba(255, 99, 132, 1)',
        pointStyle: "rectRot"
      },
      {
        label: 'ROOT',
        data: props? props.root: [{x:0, y:0}],
        backgroundColor: 'rgba(99, 255, 107, 1)',
        pointRadius: 5,
      }
    ],
  };
  
  return <Scatter options={options} data={data} />;
}

export default ScatterChart;