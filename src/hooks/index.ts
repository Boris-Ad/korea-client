import React from 'react';
import { getOrdersForCustomer } from '../api/order.api';

import { IFullOrder } from '../types';

export const useGetCustomerOrders = (id: string, status: 'completed' | 'expect') => {
  const [orders, setOrders] = React.useState<Array<IFullOrder>>();

  React.useEffect(() => {
    getOrdersForCustomer(id, status === 'completed').then(res => setOrders(res.reverse()));
  }, []);
  return orders;
};


