import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import Title from '../components/Title';
import { fetchCoinsPrice } from '../api/coins';
import { ICoinPrice } from '../type/interfaces';
import { useState } from 'react';
import { RiArrowDownSFill } from 'react-icons/ri';
import Loading from '../components/Loading';

const Table = styled.table`
  width: 100%;
  text-align: center;
  font-size: 13px;
  th {
    padding: 0.8rem 0;
    font-weight: bold;
    background-color: ${(props) => props.theme.bgTable};

    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #eeeeee;

    &:nth-child(3) {
      background-color: #eef0f5;
      button {
        color: #333 !important;
      }
    }

    button {
      background-color: transparent;
      color: ${(props) => props.theme.textColor};
      outline: none;
      &.active {
        font-weight: bold;
        text-decoration: underline;
      }
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
    color: #000000;
    &:nth-child(1) {
      text-align: center;
    }
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
  } = useQuery<ICoinPrice[]>('coins', async () => await fetchCoinsPrice(), {
    refetchInterval: 5000,
  });

  const filters = [
    '랭킹',
    '코인',
    '현재가격',
    '24시간',
    '일주일',
    '1개월',
    '1년',
    '시가총액',
  ];

  const [filter, setFilter] = useState(filters[0]);
  const filteredCoins = getFilteredCoins(coins?.slice(0, 100) || [], filter);

  return (
    <>
      {isLoading && <Loading />}
      {error && <p style={{ color: '#000000' }}>OOPS! TRY AGAIN</p>}
      <Title title='디지털자산' />
      <Table>
        <colgroup>
          <col width='100' />
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
            {filters.map((value, idx) => (
              <th key={idx}>
                <button
                  onClick={() => setFilter(value)}
                  className={value === filter ? 'active' : ''}
                >
                  {value} <RiArrowDownSFill />
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredCoins?.map(({ id, name, symbol, rank, quotes: { USD } }) => (
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

function getFilteredCoins(coins: ICoinPrice[], filter: string) {
  switch (filter) {
    case '랭킹':
      return coins;
    case '코인':
      return coins.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
    case '현재가격':
      return coins.sort((a, b) => b.quotes.USD.price - a.quotes.USD.price);
    case '24시간':
      return coins.sort(
        (a, b) =>
          b.quotes.USD.percent_change_24h - a.quotes.USD.percent_change_24h
      );
    case '일주일':
      return coins.sort(
        (a, b) =>
          b.quotes.USD.percent_change_7d - a.quotes.USD.percent_change_7d
      );
    case '1개월':
      return coins.sort(
        (a, b) =>
          b.quotes.USD.percent_change_30d - a.quotes.USD.percent_change_30d
      );
    case '1년':
      return coins.sort(
        (a, b) =>
          b.quotes.USD.percent_change_1y - a.quotes.USD.percent_change_1y
      );
    case '시가총액':
      return coins.sort(
        (a, b) => b.quotes.USD.market_cap - a.quotes.USD.market_cap
      );
  }
}
