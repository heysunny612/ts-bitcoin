import { useOutletContext } from 'react-router-dom';
import { fetchCoinHistory } from '../api/coins';
import { useQuery } from 'react-query';
import { ICoinHistory } from '../type/interfaces';
import Loading from '../components/Loading';
import ReactApexChart from 'react-apexcharts';

interface IChartProps {
  coinId: string;
}

export default function Chart() {
  const { coinId } = useOutletContext<IChartProps>();
  const { isLoading, error, data } = useQuery<ICoinHistory[]>(
    ['history', coinId],
    () => fetchCoinHistory(coinId),
    { retry: 0, refetchInterval: 10000 }
  );

  return (
    <div>
      {isLoading && <Loading />}
      {error && <p>Sorry chart no available </p>}
      {data && (
        <ReactApexChart
          type='candlestick'
          series={[
            {
              name: 'price',
              data: data.map((price) => ({
                x: new Date(price.time_close),
                y: [price.open, price.high, price.low, price.close],
              })),
            },
          ]}
          options={{
            theme: {
              mode: 'light',
            },
            chart: {
              type: 'candlestick',
              width: 300,
              height: 300,
              toolbar: { show: false },
              background: '#f9fafc',
            },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              axisBorder: { show: false },
              type: 'datetime',
              tooltip: { enabled: false },
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
            stroke: { curve: 'smooth', width: 4 },
            grid: { show: false },
            tooltip: { y: { formatter: (value) => `${value.toFixed(2)}` } },
          }}
        />
      )}
    </div>
  );
}
