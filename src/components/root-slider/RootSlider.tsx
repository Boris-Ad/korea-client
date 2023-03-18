import { useRouteLoaderData } from 'react-router-dom';
import { IProduct } from '../../types';
import RootSlide from '../root-slide/RootSlide';
import './style.scss';

const RootSlider: React.FC = () => {
  const products = useRouteLoaderData('home') as IProduct[];
  return (
    <div className="root-slider">
      <div className="title">
        <h2>Сегодня в продаже:</h2>
      </div>

      <div className="slider-box">
        {products.map(product => (
          <RootSlide key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RootSlider;
