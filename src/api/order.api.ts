import { IFullOrder } from '../types';
import { api } from './index';

export const addOrder = async (total_price: number, products: string, address: string, customer_id: string) => {
  const response = await api
    .post('order', {
      json: {
        data: new Date().toLocaleDateString('ru-RU'),
        total_price,
        products,
        address,
        status: false,
        customer_id,
      },
    })
    .json();

  return response;
};

export const getOrdersForCustomer = async (id: string, status: boolean): Promise<Array<IFullOrder>> => {
  return await api.get('order', { searchParams: { customer_id: id, status } }).json();
};

export const updateOrder = async (id: string) => {
  const response = await api
    .put('order', {
      json: {
        id,
        status: true,
      },
    })
    .json();

  return response;
};

export const getHistoryOrders = async (status: string): Promise<IFullOrder[]> => {
  const check = status === 'completed';
  return await api.get('history-orders', { searchParams: { status: check } }).json();
};
