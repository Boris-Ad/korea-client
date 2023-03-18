import { useLoaderData } from 'react-router-dom';
import { getProducts } from '../api/product.api';
import OnSaleList from '../components/on-sale/OnSaleList';
import { IProduct } from '../types';

const OnSalePage: React.FC = () => {
  const products = useLoaderData() as Array<IProduct>;

  return (
    <>
      <OnSaleList products={products} />
    </>
  );
};

export default OnSalePage;

export async function loader() {
  return await getProducts();
}
