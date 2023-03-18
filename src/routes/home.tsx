import { getProducts } from '../api/product.api';
import RootBanner from '../components/root-banner/RootBanner';
import RootSlider from '../components/root-slider/RootSlider';

const HomePage: React.FC = () => {
  return (
    <main className="main">
      <RootBanner />
      <RootSlider />
    </main>
  );
};

export default HomePage;

export async function loader() {
  return getProducts();
}
