import axios from 'axios';

const BASE_URL = 'https://api.coinpaprika.com/v1';

export async function fetchCoinsPrice(id?: string | undefined) {
  const data = await axios.get(`${BASE_URL}/tickers/${id ? id : ''} `);
  return data.data;
}

export async function fetchCoinsInfo(id: string) {
  const data = await axios.get(`${BASE_URL}/coins/${id}`);
  return data.data;
}

export async function fetchCoinHistory(id: string) {
  console.log(id);

  const data = await axios.get(
    `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${id}`
  );
  return data.data;
}
