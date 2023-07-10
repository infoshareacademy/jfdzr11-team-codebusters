import { collection, doc, getDoc } from 'firebase/firestore';
import 'moment/locale/en-gb';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../AuthContext/AuthContext';
import { db } from '../../../api/firebase/firebase';
import { CategoryScale,LinearScale,PointElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

ChartJS.register(CategoryScale, LinearScale,PointElement);

type ResultChartProps = {
  param: string;
};

const ResultChart2 = ({ param }: ResultChartProps) => {
  const [measurementData, setMeasurementData] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.uid;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = collection(db, 'users');
        const userRef = doc(collectionRef, userId);
        const snapshot = await getDoc(userRef);

        if (snapshot.exists()) {
          const data = snapshot.data().measurements;
          const measurementEntries = data[param];
          

          const entries = Object.entries(measurementEntries).map(
            ([entryKey, entryValue]) => ({
              date: entryValue.date.toDate(),
              measurementValue: entryValue.measurementValue,
            })
          );
          entries.sort((a, b) => a.date - b.date);
          setMeasurementData(entries);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [measurementData,param,userId]);

  const getLabel = date => {
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
    label: tooltipItem => {
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
      }
    },
    label: {
      display: false,
    },
    animation: {
      duration: 0,

    }
    
  };

  return (
    <div>
      <Line data={chartData} options={chartOptions}  />
    </div>
  );
};

export default ResultChart2;
