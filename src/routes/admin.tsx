import type { ActionFunctionArgs } from 'react-router-dom';
import { addProduct } from '../api/product.api';
import Admin from '../components/admin/Admin';
import Header from '../components/header/Header';
import { actionErrors, getPackagesFromFormData } from '../utils';

const AdminPage: React.FC = () => {
  return (
    <>
      <Header text="Управление" />
      <Admin />
    </>
  );
};

export default AdminPage;

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const file = formData.get('img') as File;
  const name = formData.get('name') as string;
  const packages = getPackagesFromFormData(formData);
  const errors = actionErrors(formData);

  if (file.name === '') {
    errors.push('img');
  }

  if (errors.length > 0) {
    return errors.shift();
  }

  await addProduct(file, name, packages);

  return 'ok';
}

