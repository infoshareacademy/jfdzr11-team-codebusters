import 'moment/locale/en-gb';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../AuthContext/AuthContext';
import { CategoryScale, LinearScale, PointElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { DataContext } from '../../../DataContext/DataContext';
import { TooltipItem } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement);

type ResultChartProps = {
  param: string;
};

const ResultChart2 = ({ param }: ResultChartProps) => {
  const [measurementData, setMeasurementData] = useState<
    { date: Date; measurementValue: number }[]
  >([]);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.uid;
  const { userData } = useContext(DataContext);

  useEffect(() => {
    const setData = async () => {
      try {
        if (userData) {
          const data = userData.measurements;
          const measurementEntries = data[param];
          console.log(measurementEntries);

          const dataPoints: Array<{ date: Date; measurementValue: number }> =
            [];
          Object.keys(measurementEntries).forEach(entryKey => {
            const entry = measurementEntries[entryKey];
            const dataPoint = {
              date: entry.date.toDate(),
              measurementValue: entry.measurementValue,
            };
            dataPoints.push(dataPoint);
            console.log(dataPoints);
          });
          
          dataPoints.sort((a, b) => a.date.getTime() - b.date.getTime());
          setMeasurementData(dataPoints);
        }
      } catch (error) {
        console.log(error);
      }
    };
    setData();
  }, [param, userId, userData]);

  const getLabel = (date: Date) => {
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const day = date.getDate();
    return `${day} ${month} ${year}`;
  };

  const chartData = {
    labels: measurementData.map((entry, index) => {
      if (index === 0) {
        return getLabel(entry.date);
      } else {
        const prevEntry = measurementData[index - 1];
        const currentDate = entry.date;
        const prevDate = prevEntry.date;
        if (
          currentDate.getMonth() !== prevDate.getMonth() ||
          currentDate.getFullYear() !== prevDate.getFullYear()
        ) {
          return getLabel(currentDate);
        }
      }
      return '';
    }),
    datasets: [
      {
        data: measurementData.map(entry => entry.measurementValue),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const tooltipOptions = {
    callbacks: {
      label: (tooltipItem: TooltipItem) => {
        const index = tooltipItem.dataIndex;
        const dataPoint = measurementData[index];
        const label = getLabel(dataPoint.date);
        const value = tooltipItem.dataset.data[index];
        return `${label}: ${value}`;
      },
    },
  };
  const chartOptions = {
    plugins: {
      tooltip: tooltipOptions,
      legend: {
        display: false,
      },
    },
    label: {
      display: false,
    },
    animation: {
      duration: 30,
    },
  };

  return (
    <div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default ResultChart2;
