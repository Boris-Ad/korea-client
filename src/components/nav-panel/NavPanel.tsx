import React from 'react';
import { IoCartOutline, IoPersonOutline, IoHomeOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import { getOrdersForCustomer } from '../../api/order.api';
import { useBasket, useCustomer, useExistExpectOrders } from '../../store';

import './style.scss';

const NavPanel: React.FC = () => {
  const products = useBasket(store => store.products, shallow);
  const expect = useExistExpectOrders(state => state.expect);
  const customer = useCustomer(state => state.customer);
  const setExpect = useExistExpectOrders(state => state.setFileName);

  async function checkExpect() {
    if (customer) {
      const res = await getOrdersForCustomer(customer.id, false);
      const expect = res.find(order => order.status === false);
      setExpect(Boolean(expect));
    } else {
      setExpect(false);
    }
  }

  React.useEffect(() => {
    checkExpect();
  }, []);

  return (
    <nav className="nav-panel">
      <NavLink to={'/'}>
        <IoHomeOutline />
      </NavLink>
      <NavLink to={'basket'}>
        <IoCartOutline />
        {Boolean(products.length) && <div className="marker" />}
      </NavLink>
      <NavLink to={'account'}>
        <IoPersonOutline />
        {expect && <div className="marker" />}
      </NavLink>
    </nav>
  );
};

export default NavPanel;
