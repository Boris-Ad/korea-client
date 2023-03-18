import { ICustomer } from '../types';
import { api } from './index';

export const addCustomer = async (customer: Record<string, FormDataEntryValue>) => {
  const response = await api
    .post('customer', {
      json: {
        tg_id: customer.tg_id,
        city: customer.city,
        street: customer.street,
        house: customer.house,
        description: customer.description,
      },
    })
    .json();

  return response;

};

export const getCustomer  = async (tg_id: string) : Promise<ICustomer> => {
  return await api.get('customer/' + tg_id).json();
};

export const updateCustomer = async (customer: Record<string, FormDataEntryValue>) => {
  const response = await api
    .put('customer', {
      json: {
        tg_id: customer.tg_id,
        city: customer.city,
        street: customer.street,
        house: customer.house,
        description: customer.description,
      },
    })
    .json();

  return response;

};
