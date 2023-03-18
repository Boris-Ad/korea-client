import React from 'react';
import { getProduct } from '../../../api/product.api';
import { IProduct, IProductForBasket } from '../../../types';
import './style.scss';

interface ModalOrderProps {
  productIDAndPackages: IProductForBasket;
  price: number;
  setOrderedProducts: React.Dispatch<React.SetStateAction<string[]>>;
}

const ModalOrder: React.FC<ModalOrderProps> = ({ productIDAndPackages, price, setOrderedProducts }) => {
  const [product, setProduct] = React.useState<IProduct>();

  React.useEffect(() => {
    if (product?.name) {
      setOrderedProducts(prev => [...prev, product?.name]);
    }
  }, [product?.name]);

  React.useEffect(() => {
    getProduct(productIDAndPackages.id).then(res => {
      const one = res as IProduct[];
      setProduct(one[0]);
    });
  }, []);

  const set = Object.entries(productIDAndPackages.packages).filter(item => item[1] !== 0);

  return (
    <div className="modal-order">
      <p className="order-title">{product?.name}</p>
      <div className="order-packages">
        {productIDAndPackages.packages['1шт.'] ? (
          <p>{productIDAndPackages.packages['1шт.']} шт.</p>
        ) : (
          set.map(item => (
            <p key={item[0]}>
              {item[0]} - {item[1]} шт.
            </p>
          ))
        )}
      </div>
      <div className="order-price">
        <p>{price}руб</p>
      </div>
    </div>
  );
};

export default ModalOrder;
