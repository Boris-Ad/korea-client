import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { updateCustomer } from '../api/customer.api';
import CustomerForm from '../components/account/customer-form/CustomerForm';
import { actionErrors } from '../utils';

const EditPage: React.FC = () => {
  return (
    <>
      <CustomerForm />
    </>
  );
};

export default EditPage;

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const objectFormData = Object.fromEntries(formData);
  

  const errors = actionErrors(formData, 'description');
  //  description исключение
  if (errors.length > 0) {
    return errors.shift();
  }

  await updateCustomer(objectFormData);
  return redirect('/account');
}
