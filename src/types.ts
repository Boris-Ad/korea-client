export interface IRouteErrors {
  status: number;
  statusText: string;
  error: Error;
  data: string;
  message?: string;
}

export interface ISetCheckbox {
  '100': boolean;
  '500': boolean;
  '1000': boolean;
}

export interface IPackages {
  '100гр.'?: number;
  '500гр.'?: number;
  '1000гр.'?: number;
  '1шт.'?: number;
}

export interface IProduct {
  id: number;
  filename: string;
  name: string;
  packages: IPackages;
}

export interface IProductForBasket {
  id: number;
  packages: IPackages;
}

export interface IPrice {
  price: number;
}

export interface IBasket {
  products: IProductForBasket[];
  totalPrice: Record<string, IPrice>;
  addProduct: (productId: IProductForBasket) => void;
  increment: (id: number, pac: keyof IPackages) => void;
  decrement: (id: number, pac: keyof IPackages) => void;
  clearBasket: () => void;
  removeOneProduct: (id: number) => void;
  setTotalPrice: (id: number, price: number) => void;
}

export interface IModal {
  modal: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export interface ICustomer {
  id: string;
  tg_id: string;
  city: string;
  street: string;
  house: string;
  description?: string;
}

export interface IOrder {
  total_price: string;
  address: string;
  customer_id: string;
}
export interface IFullOrder extends IOrder {
  id: string;
  data: string;
  status: boolean;
  products: string
}
