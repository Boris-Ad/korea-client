import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/header/Header';

const OrdersPage: React.FC = () => {
  const location = useLocation();
  console.log(location.state.orders);

  return (
    <>
      <Header text="Orders" />
    </>
  );
};

export default OrdersPage;
