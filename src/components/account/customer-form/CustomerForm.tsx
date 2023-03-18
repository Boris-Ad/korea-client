import React from 'react';
import { Form, useActionData, useParams } from 'react-router-dom';
import { useCustomer } from '../../../store';
import CustomButton from '../../ui/CustomButton';
import CustomInput from '../../ui/CustomInput';
import CustomLink from '../../ui/CustomLink';
import CustomTextarea from '../../ui/CustomTextarea';
import './style.scss';

const CustomerForm: React.FC = () => {
  const errors = useActionData() as string;
  const params = useParams();
  const [tg_id, customerData] = useCustomer(state => [state.tg_id, state.customer]);

  const inputs = [
    { label: 'Город', name: 'city', defaultValue: 'Орел', readonly: true },
    { label: 'Улица', name: 'street', defaultValue: customerData?.street },
    { label: 'Дом', name: 'house', defaultValue: customerData?.house },
    { label: 'tg_id', name: 'tg_id', defaultValue: tg_id, hidden: true },
  ];

  return (
    <Form method={Boolean(customerData) ? 'put' : 'post'} className="edit-form">
      <h3>Адрес доставки</h3>
      {inputs.map(input => (
        <CustomInput key={input.name} {...input} error={errors} />
      ))}
      <CustomTextarea label={'Дополнительно'} defaultValue={customerData?.description} />
      <div className="button-group">
        <CustomButton>Сохранить</CustomButton>

        <CustomLink path={params.path ? `/${params.path}` : '/account'}>Отмена</CustomLink>
      </div>
    </Form>
  );
};

export default CustomerForm;
