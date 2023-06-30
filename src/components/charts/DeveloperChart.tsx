import { getDeveloperChart } from '@src/apis/chart';
import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { styled } from 'styled-components';

ChartJS.register(ArcElement, Tooltip, Legend);

const DeveloperChart = () => {
  const [labels, setLabels] = useState<string[]>([]);
  const [count, setCount] = useState<number[]>([]);

  const fetchDeveloperChart = async () => {
    const DeveloperData = await getDeveloperChart();
    const labelsData: string[] = Object.keys(DeveloperData);
    const countData: number[] = Object.values(DeveloperData);

    setLabels(labelsData);
    setCount(countData);
  };

  useEffect(() => {
    fetchDeveloperChart();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: 'portfolio',
        data: count,
        backgroundColor: [
          'rgba(107, 246, 95, 0.25)',
          'rgba(27, 150, 17, 0.30)',
          'rgba(0, 183, 241, 0.25)',
          'rgba(27, 214, 79, 0.25)',
          'rgba(219, 255, 0, 0.25)',
          'rgba(255, 245, 0, 0.25)',
          'rgba(0, 241, 183, 0.25)',
        ],
        borderColor: ['#6BF65F', '#1B9611', '#00B7F1', '#1BD64F', '#DBFF00', '#FFF500', '#00F1B7'],
        borderWidth: 3,
      },
    ],
  };

  const options = {
    // responsive: false,
    // maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return <StDoughutChart data={data} options={options} />;
};

const StDoughutChart = styled(Doughnut)`
  width: 100%;
`;

export default DeveloperChart;
