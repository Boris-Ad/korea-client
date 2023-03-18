import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { addCustomer } from '../api/customer.api';
import CustomerForm from '../components/account/customer-form/CustomerForm';
import { actionErrors } from '../utils';

const CreatePage: React.FC = () => {
  return (
    <>
      <CustomerForm />
    </>
  );
};

export default CreatePage;

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const objectFormData = Object.fromEntries(formData);

  const errors = actionErrors(formData, 'description');
  //  description исключение
  if (errors.length > 0) {
    return errors.shift();
  }

  await addCustomer(objectFormData);
  return redirect('/' + params.path);
}
