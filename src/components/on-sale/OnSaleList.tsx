import { useSubmit } from 'react-router-dom';
import { IProduct } from '../../types';
import CustomButton from '../ui/CustomButton';
import './style.scss';

interface OnSaleListProps {
  products: IProduct[];
}

const OnSaleList: React.FC<OnSaleListProps> = ({ products }) => {
    const submit = useSubmit();
    const deleteProduct= (filename:string)=> {
        submit(null, { method: "post", action: `/${filename}/destroy` });
    }
  return (
    <div className="on_sale-list">
      <h3>Продукты в продаже</h3>
      <ul>
        {products &&
          products.map(product => (
            <li key={product.id}>
              {product.name}
              <CustomButton onClick={() => deleteProduct(product.filename)} >Удалить</CustomButton>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default OnSaleList;
