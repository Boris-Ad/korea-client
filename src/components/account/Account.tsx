import React from 'react';
import { useLocation } from 'react-router-dom';
import { useCustomer } from '../../store';
import CustomLink from '../ui/CustomLink';
import CustomerOrdersList from './customer-orders-list/CustomerOrdersList';
import './style.scss';

const Account: React.FC = () => {
  const [customer, tg_id] = useCustomer(state => [state.customer, state.tg_id]);
  const authorization = Boolean(customer);
  const location = useLocation();

  return (
    <div className="account">
      <h3>Адрес для доставки:</h3>
      {authorization ? (
        <div className="account-delivery">
          <ul>
            <li>Город: {customer?.city}</li>
            <li>Улица: {customer?.street}</li>
            <li>Дом: {customer?.house}</li>
            <li>Дополнительно: {customer?.description}</li>
          </ul>
          <CustomLink path="/edit">Редактировать</CustomLink>
        </div>
      ) : (
        <CustomLink path={`${location.pathname}/create`}>Создать</CustomLink>
      )}

      <h3>Мои заказы</h3>
      <div className="account-orders">
        {customer && (
          <>
            <CustomerOrdersList id={customer?.id} status={'expect'} />
            <CustomerOrdersList id={customer?.id} status={'completed'} />
          </>
        )}
      </div>
      {tg_id === '761362383' && <CustomLink path="/admin">AdminPage</CustomLink>}
    </div>
  );
};

export default Account;
