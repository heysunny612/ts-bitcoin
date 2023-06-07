import { useOutletContext } from 'react-router-dom';
import { fetchCoinHistory } from '../api/coins';
import { useQuery } from 'react-query';
import { ICoinHistory } from '../type/interfaces';

interface IChartProps {
  coinId: string;
}

export default function Chart() {
  const { coinId } = useOutletContext<IChartProps>();
  const { isLoading, error, data } = useQuery<ICoinHistory[]>(
    ['history', coinId],
    () => fetchCoinHistory(coinId)
  );
  console.log(data);

  return <div>{coinId}</div>;
}
