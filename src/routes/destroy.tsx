import { redirect } from 'react-router-dom';
import type { ActionFunctionArgs } from 'react-router-dom';
import { deleteProduct } from '../api/product.api';
export async function action({ params }: ActionFunctionArgs) {
  if (params.file) {
    await deleteProduct(params.file);
  }
  return redirect('/admin');
}
