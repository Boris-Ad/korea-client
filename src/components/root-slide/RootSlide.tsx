import { shallow } from 'zustand/shallow';
import { useBasket } from '../../store';
import { IProduct, IPackages, IProductForBasket } from '../../types';
import { setCurrent } from '../../utils';
import CustomButton from '../ui/CustomButton';
import './style.scss';

interface RootSlideProps {
  product: IProduct;
}

const RootSlide: React.FC<RootSlideProps> = ({ product }) => {
  const { productsInBasket, addProduct } = useBasket(
    state => ({
      addProduct: state.addProduct,
      productsInBasket: state.products,
    }),
    shallow
  );

  const setProductInBasket = () => {
    const productData: IProductForBasket = { id: product.id, packages: product.packages };

    if (productsInBasket.findIndex(p => p.id === product.id) < 0) {
      addProduct(productData);
    } else {
      console.log('Этот товар уже есть в корзине!');
    }
  };

  const packages = Object.entries(product.packages) as Array<[keyof IPackages, number]>;

  return (
    <div className="root-slide">
      <img src={'https://server.1333670-cw25746.tw1.ru/images/' + product.filename} alt={product.name} />
      <div className="context">
        <div className="text">
          <h3>{product.name}</h3>
          {packages.map(([name, prise]) => (
            <p key={name}>
              {name} - {setCurrent(prise)}
            </p>
          ))}
        </div>
        <CustomButton onClick={setProductInBasket}>В корзину</CustomButton>
      </div> 
    </div>
  );
};

export default RootSlide;
