import React from 'react';
import BasketProductItem from '../basket-product-item/BasketProductItem';
import CustomButton from '../../ui/CustomButton';
import './style.scss';
import { IProductForBasket } from '../../../types';

interface BasketProductListProps {
  productsInBasket: IProductForBasket[];
  clearBasket: () => void;
}

const BasketProductList: React.FC<BasketProductListProps> = ({ productsInBasket, clearBasket }) => {
  return Boolean(!productsInBasket.length) ? (
    <h3>Корзина пуста</h3>
  ) : (
    <div className="basket-product-list">
      {productsInBasket.map(productFromBasket => (
        <BasketProductItem key={productFromBasket.id} productFromBasket={productFromBasket} />
      ))}

      <CustomButton onClick={() => clearBasket()}>Удалить все</CustomButton>
    </div>
  );
};

export default BasketProductList;
