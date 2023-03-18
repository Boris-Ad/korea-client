import { useLoaderData, useParams } from 'react-router-dom';
import type { LoaderFunctionArgs } from 'react-router-dom';
import HistoryOrders from '../components/admin/history-orders/HistoryOrders';
import Header from '../components/header/Header';
import { getHistoryOrders } from '../api/order.api';
import { IFullOrder } from '../types';

const HistoryPage: React.FC = () => {
  const history = useLoaderData() as IFullOrder[];
  const params = useParams();
  const completed = params.orders === 'completed';
  return (
    <>
      <Header text={completed ? 'Выполненные заказы' : 'Невыполненные заказы'} />
      <HistoryOrders history={history} completed={completed} />
    </>
  );
};

export default HistoryPage;

export async function loader({ params }: LoaderFunctionArgs) {
  const orders = params?.orders;
  if (orders) return await getHistoryOrders(orders);

  return [];
}
