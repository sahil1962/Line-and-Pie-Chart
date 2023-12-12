import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import weeklyData from './data.json';
import "./pieStyle.css";

const ChartComponent = ({ data }) => {
  const chartRef = useRef(null);
  let originalSizes = null;

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: data.map(item => item.day),
        datasets: [
          {
            label: 'Weekly Data',
            data: data.map(item => item.value),
            backgroundColor: [
              '#13678A',
              '#322955',
              '#012030',
              '#45C4B0',
              '#314955',
              '#E95F8B',
              '#6C95A0'
            ],
            borderWidth: 2
          }
        ]
      },
      options: {
        plugins: {
          title: {
            display: false,
            font: {
              size: 20,
              weight: 'bold'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(16, 119, 163, 0.8)',
            titleColor: 'white',
            bodyColor: 'white'
          },
          legend: {
            display: true,
            position: 'bottom'
          },
          backgroundColor: 'rgba(250, 250, 250)' 
        },
        onHover: (event, elements) => {
          if (elements && elements.length) {
            const segment = elements[0];
            if (!originalSizes) {
              originalSizes = chart.data.datasets[0].data.slice(); 
            }
            const newData = originalSizes.map((size, index) => {
              return index === segment.index ? size * 1.2 : size * 0.8; 
            });
            chart.data.datasets[0].data = newData;
            chart.update();
          }
        },
        onLeave: () => {
          if (originalSizes) {
            chart.data.datasets[0].data = originalSizes;
            chart.update();
            originalSizes = null;
          }
        }
      }
    });

    return () => {
      chart.destroy();
    };
  }, [data]);

  return <canvas ref={chartRef}></canvas>;
};

export default function PieChart() {
  return (
    <div>
      <h2>Weekly Data Pie Chart</h2>
      <div className='PieChart'>
        <ChartComponent data={weeklyData} />
      </div>
    </div>
  );
}
