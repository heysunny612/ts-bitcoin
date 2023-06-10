import { useOutletContext } from 'react-router-dom';
import { fetchCoinHistory } from '../api/coins';
import { useQuery } from 'react-query';
import { ICoinHistory } from '../type/interfaces';
import Loading from '../components/Loading';
import ReactApexChart from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';

interface IChartProps {
  coinId: string;
}

export default function Chart() {
  const isDark = useRecoilValue(isDarkAtom);
  const { coinId } = useOutletContext<IChartProps>();
  const { isLoading, error, data } = useQuery<ICoinHistory[]>(
    ['history', coinId],
    () => fetchCoinHistory(coinId),
    { retry: 0, refetchInterval: 10000 }
  );

  return (
    <div>
      {isLoading && <Loading />}
      {error ? (
        <p style={{ textAlign: 'center', color: '#000000' }}>No Chart</p>
      ) : (
        ''
      )}
      {data && (
        <ReactApexChart
          type='candlestick'
          series={[
            {
              name: 'price',
              data: data.map((price) => ({
                x: new Date(price.time_close * 1000).toISOString().slice(2, 10),
                y: [price.open, price.high, price.low, price.close],
              })),
            },
          ]}
          options={{
            theme: {
              mode: isDark ? 'dark' : 'light',
            },
            chart: {
              type: 'candlestick',
              width: 300,
              height: 300,
              toolbar: { show: false },
              background: '#f9fafc',
            },
            xaxis: {
              labels: { show: true },
              axisTicks: { show: false },
              axisBorder: { show: false },
              tooltip: { enabled: true },
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
