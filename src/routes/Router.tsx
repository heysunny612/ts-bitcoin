import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import Coin from './Coin';
import Coins from './Coins';
import Price from './Price';
import Chart from './Chart';

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <Coins /> },
        {
          path: '/:coinId',
          element: <Coin />,
          children: [
            { path: 'price', element: <Price /> },
            { path: 'chart', element: <Chart /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
