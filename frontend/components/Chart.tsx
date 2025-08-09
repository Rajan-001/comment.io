// components/PieChart.tsx
'use client';

import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  positive: number;
  negative: number;
  neutral: number;
}

export default function PieChart({ positive, negative, neutral }: PieChartProps) {
  const data = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        label: 'Comment Sentiment',
        data: [positive, negative, neutral],
        backgroundColor: ['#4CAF50', '#F44336', '#FF9800'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return <div className='w-56 h-56 '>
  <Pie data={data} options={options} />;
  </div>
}