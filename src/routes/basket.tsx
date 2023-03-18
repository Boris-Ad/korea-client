import { getProducts } from '../api/product.api';

import Basket from '../components/basket/Basket';
import Header from '../components/header/Header';

const BasketPage: React.FC = () => {
  return (
    <>
     <Header text="Корзина" />
      <Basket />
    </>
  );
};

export default BasketPage;


