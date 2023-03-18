import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getCustomer } from '../api/customer.api';
import { IBasket, ICustomer, IModal } from '../types';
import { incrementAndDecrement, sortPackages } from '../utils';

export const useBasket = create<IBasket>()(
  persist(
    set => ({
      products: [],
      totalPrice: {},
      addProduct: dataProduct =>
        set(state => ({
          products: state.products.concat([{ id: dataProduct.id, packages: sortPackages(dataProduct.packages) }]),
        })),

      increment: (id, pac) => set(state => incrementAndDecrement(10, state, id, pac)),
      decrement: (id, pac) => set(state => incrementAndDecrement(0, state, id, pac)),
      removeOneProduct: id =>
        set(state => {
          delete state.totalPrice[id];
          return {
            products: state.products.filter(item => item.id != id),
          };
        }),
      clearBasket: () => set({ products: [], totalPrice: {} }),
      setTotalPrice: (id, price) =>
        set(state => {
          const a = state.totalPrice;
          a[id] = { price };
          return { totalPrice: a };
        }),
    }),
    { name: 'basket' }
  )
);

export const useModal = create<IModal>()(set => ({
  modal: false,
  openModal: () => set(() => ({ modal: true })),
  closeModal: () => set(() => ({ modal: false })),
}));

interface IUseCustomer {
  customer: ICustomer | undefined;
  tg_id: string;
  setId: (id: string) => void;
}

export const useCustomer = create<IUseCustomer>()(
  persist(
    set => ({
      customer: undefined,
      tg_id: '',
      setId: async tg_id => {
        set({ tg_id });
        const customer = await getCustomer(tg_id);
        set({ customer });
      },
    }),
    { name: 'customer' }
  )
);

interface IUseSetFileName {
  fileName: string;
  setFileName: (name?: string) => void;
}

export const useSetFileName = create<IUseSetFileName>()(set => ({
  fileName: 'Файл не выбран',
  setFileName: name => set({ fileName: name ? name : 'Файл не выбран' }),
}));

interface IUseExistExpectOrders {
  expect: boolean;
  setFileName: (expect:boolean) => void;
}

export const useExistExpectOrders = create<IUseExistExpectOrders>()(set => ({
  expect: false,
  setFileName: (expect) => set({expect})
  
}));
