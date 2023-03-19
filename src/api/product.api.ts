import { IPackages, IProduct } from '../types';
import { api } from './index';

export const addProduct = async (file: File, name: string, packages: IPackages) => {
  const formData = new FormData();
  formData.append('banner', file);
  formData.append('name', name);
  formData.append('packages', JSON.stringify(packages));
  const res = await api.post('product', { body: formData }).json();
  console.log(res);

  return res;
};

export const getProducts = async (): Promise<Array<IProduct>> => {
  return await api.get('product').json();
};

export const getProduct = async (id: number) => {
  return await api.get('product/' + id).json();
};

export const deleteProduct = async (file: string) => {
  return await api.delete('product/' + file).json();
};
