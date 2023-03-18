import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { sendDataToBot } from '../../api/bot.api';
import { addOrder } from '../../api/order.api';
import { useTelegram } from '../../hooks/useTelegram';
import { useBasket, useCustomer, useExistExpectOrders, useModal } from '../../store';
import CustomButton from '../ui/CustomButton';
import ModalOrder from './modal-order/ModalOrder';
import './style.scss';

const Modal: React.FC = () => {
  const navigate = useNavigate();
  const [products, price,clearBasket] = useBasket(state => [state.products, state.totalPrice,state.clearBasket]);
  const customerData = useCustomer(state => state.customer);
  const closeModal = useModal(state => state.closeModal);
  const refContent = React.useRef<HTMLDivElement>(null);
  const totalPrice = Object.values(price).reduce((sum, i) => sum + i.price, 0);
  const setExpect = useExistExpectOrders(state => state.setFileName)
  const [orderedProducts, setOrderedProducts] = React.useState<Array<string>>([]);

  const handleClose = () => {
    refContent.current?.classList.remove('active');
  };

  const confirm = async () => {
    const products = orderedProducts.toString();
    const address = [customerData?.city,customerData?.street,customerData?.house ].toString()
    const {queryId} = useTelegram()

    if (customerData) {
      await addOrder(totalPrice, products, address, customerData.id);
      clearBasket();
      setExpect(true)
      refContent.current?.classList.remove('active');
      // navigate('/account');
      if(queryId){
        sendDataToBot('Сейчас заказы не принимаются',queryId)
      }
     

    } else {
      throw new Error('Произошла ошибка, попробуйте еще раз.');
    }
  };

  return (
    <div className="modal">
      <div ref={refContent} className="modal-content active" onTransitionEnd={() => closeModal()}>
        <div className="modal-header">
          <p>Подтверждение</p>
          <IoCloseOutline className="close-icon" onClick={handleClose} />
        </div>
        <div className="modal-body">
          <div className="orders">
            {products.map(item => (
              <ModalOrder
                key={item.id}
                productIDAndPackages={item}
                price={price[item.id].price}
                setOrderedProducts={setOrderedProducts}
              />
            ))}

            <p className="orders-total-price">Итого: {totalPrice}руб</p>
          </div>
          <h4>Доставка на адрес:</h4>
          <p>
            {customerData?.city} ул.{customerData?.street} д.{customerData?.house}
          </p>
          <p>{customerData?.description}</p>
          <CustomButton onClick={confirm}>Все верно, заказать</CustomButton>
        </div>
        <div className="modal-footer">
          <p>В течение 10 минут вам в телеграмм придет сообщение о готовности заказа и точном времени доставки</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
