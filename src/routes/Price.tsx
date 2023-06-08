import { useOutletContext } from 'react-router-dom';
import { ICoinPrice } from '../type/interfaces';
import { styled } from 'styled-components';
import { useQuery } from 'react-query';
import { fetchCoinsPrice } from '../api/coins';
import Loading from '../components/Loading';

interface IPriceProps {
  coinId: string;
}

const PriceList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  align-items: center;
  gap: 1rem;
  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f4f5f8;
    padding: 1rem;
    width: 100%;
    font-weight: bold;
    color: #333;
    &.red {
      color: red;
    }
    &.blue {
      color: blue;
    }
    span {
      display: block;
      margin-bottom: 1rem;
      font-size: 12px;
      font-weight: normal;
      color: #000;
    }
  }
`;

export default function Price() {
  const { coinId } = useOutletContext<IPriceProps>();

  const {
    isLoading,
    error,
    data: price,
  } = useQuery<ICoinPrice>(
    ['coinPrice', coinId],
    () => fetchCoinsPrice(coinId as unknown as string),
    { refetchInterval: 5000 }
  );

  return (
    <>
      {isLoading && <Loading />}
      {error && <p>OOPS TRY AGAIN</p>}
      {price && (
        <PriceList>
          <li>
            <span>현재가격</span>$
            {price?.quotes.USD.price || 0 > 99
              ? Number(price?.quotes.USD.price.toFixed(2)).toLocaleString()
              : price?.quotes.USD.price.toFixed(5)}
          </li>
          <li>
            <span>시가총액</span>$
            {price?.quotes.USD.market_cap.toLocaleString()}
          </li>
          <li
            className={`${getPositive(
              price?.quotes.USD.market_cap_change_24h
            )}`}
          >
            <span>시가총액 변동률 (24h)</span>
            {price?.quotes.USD.market_cap_change_24h}%
          </li>
          <li>
            <span>24시간 거래량</span>$
            {price?.quotes.USD.volume_24h.toLocaleString()}
          </li>
          <li
            className={`${getPositive(
              price?.quotes.USD.volume_24h_change_24h
            )}`}
          >
            <span>24시간 거래량 변동률</span>
            {price?.quotes.USD.volume_24h_change_24h}%
          </li>
          <li
            className={`${getPositive(price?.quotes.USD.percent_change_15m)}`}
          >
            <span>가격 상승률 (15분)</span>
            {price?.quotes.USD.percent_change_15m}%
          </li>
          <li
            className={`${getPositive(price?.quotes.USD.percent_change_30m)}`}
          >
            <span>가격 상승률 (30분)</span>
            {price?.quotes.USD.percent_change_30m}%
          </li>
          <li className={`${getPositive(price?.quotes.USD.percent_change_1h)}`}>
            <span>가격 상승률 (60분)</span>
            {price?.quotes.USD.percent_change_1h}%
          </li>
          <li className={`${getPositive(price?.quotes.USD.percent_change_6h)}`}>
            <span>가격 상승률 (6시간)</span>
            {price?.quotes.USD.percent_change_6h}%
          </li>
          <li
            className={`${getPositive(price?.quotes.USD.percent_change_12h)}`}
          >
            <span>가격 상승률 (12시간)</span>
            {price?.quotes.USD.percent_change_12h}%
          </li>
          <li
            className={`${getPositive(price?.quotes.USD.percent_change_24h)}`}
          >
            <span>가격 상승률 (24시간)</span>
            {price?.quotes.USD.percent_change_24h}%
          </li>
          <li
            className={`${getPositive(price?.quotes.USD.percent_change_30d)}`}
          >
            <span>가격 상승률 (30일)</span>
            {price?.quotes.USD.percent_change_30d}%
          </li>
          <li className={`${getPositive(price?.quotes.USD.percent_change_1y)}`}>
            <span>가격 상승률 (1년)</span>
            {price?.quotes.USD.percent_change_1y}%
          </li>
        </PriceList>
      )}
    </>
  );
}

const getPositive = (num?: number) => {
  const isPositive = Math.sign(num || 0);
  return isPositive === -1 ? 'red' : isPositive === 1 ? 'blue' : '';
};
