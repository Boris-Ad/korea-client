import React from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import { IProduct, IProductForBasket, IPackages } from '../../../types';
import { IoTrashOutline, IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5';
import './style.scss';
import { useBasket } from '../../../store';

interface BasketProductItemProps {
  productFromBasket: IProductForBasket;
}

const BasketProductItem: React.FC<BasketProductItemProps> = ({ productFromBasket }) => {
  const { removeOneProduct, increment, decrement, setTotalPrice } = useBasket(state => ({
    removeOneProduct: state.removeOneProduct,
    increment: state.increment,
    decrement: state.decrement,
    setTotalPrice: state.setTotalPrice,

  }));
  const products = useRouteLoaderData('basket') as IProduct[];
  const itemProduct = products.find(item => item.id === productFromBasket.id) as IProduct;
  const packagesArr = Object.keys(itemProduct.packages) as Array<keyof IPackages>;
  const price = packagesArr.reduce((sum, item) => {
    return sum + Number(productFromBasket.packages[item]) * Number(itemProduct.packages[item]);
  }, 0);

  const handleDecrement = (packages :keyof IPackages) => {
    decrement(productFromBasket.id, packages)
  }

  
  const handleIncrement = (packages :keyof IPackages) => {
    increment(productFromBasket.id, packages)
  }

  React.useEffect(() => {
  if(price === 0){
    removeOneProduct(productFromBasket.id)
  }
    
    setTotalPrice(productFromBasket.id,price);
   }, [price]);

  return (
    <div className="product-item">
      <img src={'https://server.1333670-cw25746.tw1.ru/images/' + itemProduct?.filename} alt={itemProduct?.name} />
      <div className="content">
        <IoTrashOutline className="trash" onClick={() => removeOneProduct(productFromBasket.id)} />
        <h3>{itemProduct?.name}</h3>
        <div className="package-list">
          {packagesArr.map(packages => (
            <div key={packages} className="product-counter">
              <p>{packages}</p>
              <div className="counter">
                <IoArrowBackOutline onClick={() =>handleDecrement(packages)} />
                <span>{productFromBasket.packages[packages]}</span>
                <IoArrowForwardOutline onClick={() => handleIncrement(packages)} />
              </div>
            </div>
          ))}
        </div>
        <div className="price">
          <h4>
            Всего на: <b>{price.toLocaleString('ru-RU')}</b> руб
          </h4>
        </div>
      </div>
    </div>
  );
};

export default BasketProductItem;
