import { useLocation, useNavigate } from 'react-router-dom';
import { useBasket, useCustomer, useModal } from '../../store';
import CustomButton from '../ui/CustomButton';
import BasketProductList from './basket-product-list/BasketProductList';
import './style.scss';

const Basket: React.FC = () => {
  const { clearBasket, totalPrice, productsInBasket } = useBasket(state => ({
    totalPrice: state.totalPrice,
    productsInBasket: state.products,
    clearBasket: state.clearBasket,
  }));
  const navigate = useNavigate();
  const location = useLocation();

  const authorization = Boolean(useCustomer(state => state.customer));

  const openModal = useModal(state => state.openModal);

  const price = Object.keys(totalPrice).reduce((sum, item) => sum + totalPrice[item].price, 0);

  return (
    <div className="basket">
      <div className="basket-body">
        <BasketProductList productsInBasket={productsInBasket} clearBasket={clearBasket} />
      </div>
      <div className="basket-footer">
        {Boolean(productsInBasket.length) && (
          <>
            <p>Вся сумма: {price} руб.</p>
            <CustomButton onClick={() => (authorization ? openModal() : navigate(`${location.pathname}/create`))}>
              Заказать
            </CustomButton>
          </>
        )}
      </div>
    </div>
  );
};

export default Basket;
