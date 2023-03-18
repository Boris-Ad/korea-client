import React from 'react';
import { Form } from 'react-router-dom';
import { updateOrder } from '../../../api/order.api';
import { useTelegram } from '../../../hooks/useTelegram';
import { IFullOrder } from '../../../types';
import CustomButton from '../../ui/CustomButton';
import './style.scss';

interface HistoryOrdersProps {
  history: IFullOrder[];
  completed: boolean;
}

const HistoryOrders: React.FC<HistoryOrdersProps> = ({ history, completed }) => {
  const { setBackButton } = useTelegram();
  setBackButton('/admin');

  return (
    <div className="history-orders">
      {history.map(order => (
        <ul key={order.id}>
          <li>{order.data}</li>
          <li>{order.products}</li>
          <li>{order.address}</li>
          <li>{order.total_price}руб</li>
          {!completed && (
            <li className="status">
              <Form replace>
                <CustomButton onClick={() => updateOrder(order.id)}>Выполнен</CustomButton>
              </Form>
            </li>
          )}
        </ul>
      ))}
    </div>
  );
};

export default HistoryOrders;
