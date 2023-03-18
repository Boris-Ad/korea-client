import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTelegram } from '../../hooks/useTelegram';
import CustomLink from '../ui/CustomLink';
import FormProduct from './form-product/FormProduct';
import './style.scss';



const Admin: React.FC = () => {

const { setBackButton } = useTelegram();
setBackButton('/account');

  return (
    <div className="admin">
      <h3>Добавить продукт</h3>
      <FormProduct />
      <h3>Заказы</h3>
      <div className="button-group">
        <CustomLink  path="/history/completed">Выполненные</CustomLink>
        <CustomLink  path="/history/expect">Невыполненные</CustomLink>
      </div>
      <Outlet />
    </div>
  );
};

export default Admin;
