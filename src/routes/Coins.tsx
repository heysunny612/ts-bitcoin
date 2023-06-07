import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import Title from '../components/Title';
import { fetchCoinsPrice } from '../api/coins';
import { ICoinPrice } from '../type/interfaces';

const Table = styled.table`
  width: 100%;
  text-align: center;
  font-size: 13px;
  th {
    padding: 0.8rem 0;
    font-weight: bold;
    background-color: #f9fafc;
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #eeeeee;
    &:nth-child(3) {
      background-color: #eef0f5;
    }
  }
  tr {
    border-bottom: 1px solid #eeeeee;
    &:hover {
      background-color: #f4f5f8;
    }
  }
  td {
    padding: 0.2rem 1rem;
    text-align: right;
    &:nth-child(3) {
      background-color: #f9fafc;
      font-weight: bold;
    }

    &.red {
      color: #ff0000;
    }
    &.blue {
      color: blue;
    }
  }
`;

const Coin = styled.div`
  width: 100%;
  height: 100%;
  text-align: left;
  vertical-align: top;
  a:hover {
    text-decoration: underline;
    font-weight: bold;
    display: block;
  }
  img {
    vertical-align: middle;
  }
`;

const Loader = styled.p`
  text-align: center;
`;

const Icon = styled.img`
  margin: 0 1rem;
  width: 2rem;
  height: 2rem;
`;

export default function Coins() {
  const {
    isLoading,
    error,
    data: coins,
  } = useQuery<ICoinPrice[]>('coins', async () => await fetchCoinsPrice(''));

  return (
    <>
      {isLoading && <Loader>로딩중입니다</Loader>}
      {error && <p>something is wrong...</p>}
      <Title title='디지털자산' />
      <Table>
        <colgroup>
          <col width='50' />
          <col width='250' />
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>랭킹</th>
            <th>코인</th>
            <th>현재가격</th>
            <th>24시간</th>
            <th>일주일</th>
            <th>1개월</th>
            <th>1년</th>
            <th>시가총액</th>
          </tr>
        </thead>
        <tbody>
          {coins
            ?.slice(0, 100)
            .map(({ id, name, symbol, rank, quotes: { USD } }) => (
              <tr key={id}>
                <td>{rank}</td>
                <td>
                  <Coin>
                    <Link to={`/${id}/price`}>
                      <Icon
                        src={`https://coinicons-api.vercel.app/api/icon/${symbol.toLowerCase()}`}
                        alt={symbol}
                      />
                      {name}
                    </Link>
                  </Coin>
                </td>
                <td>
                  $
                  {USD.price > 99
                    ? Number(USD.price.toFixed(2)).toLocaleString()
                    : USD.price.toFixed(5)}
                </td>
                <td className={`${getPositive(USD.percent_change_24h)}`}>
                  {USD.percent_change_24h}%
                </td>
                <td className={`${getPositive(USD.percent_change_7d)}`}>
                  {USD.percent_change_7d}%
                </td>
                <td className={`${getPositive(USD.percent_change_30d)}`}>
                  {USD.percent_change_30d}%
                </td>
                <td className={`${getPositive(USD.percent_change_1y)}`}>
                  {USD.percent_change_1y}%
                </td>
                <td>${USD.market_cap.toLocaleString()} </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}
const getPositive = (num: number) => {
  const isPositive = Math.sign(num);
  return isPositive === -1 ? 'red' : isPositive === 1 ? 'blue' : '';
};
