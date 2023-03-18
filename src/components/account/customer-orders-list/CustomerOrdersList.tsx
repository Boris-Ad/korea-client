import React from 'react';
import { useGetCustomerOrders } from '../../../hooks';
import './style.scss';

interface ExpectOrdersListProps {
  id: string;
  status: 'expect' | 'completed';
}
const CustomerOrdersList: React.FC<ExpectOrdersListProps> = ({ id, status }) => {
  const orders = useGetCustomerOrders(id, status);
  const checkExpect = status === 'expect' && Boolean(orders?.length);
  const checkCompleted = status === 'completed' && Boolean(orders?.length);

  return orders ? (
    <div className="expect-orders-list">
      {checkExpect && <h3>В ожидании:</h3>}
      {checkCompleted && <h3>Доставлено:</h3>}

      {orders.map(order => (
        <ul key={order.id} className={checkExpect ? 'red-border' : undefined}>
          <li>Дата заказа: {order.data}</li>
          <li>Продукт: {order.products}</li>
          <li>Сумма: {order.total_price}руб</li>
        </ul>
      ))}
    </div>
  ) : (
    <></>
  );
};

export default CustomerOrdersList;
