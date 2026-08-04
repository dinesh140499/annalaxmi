import '../../assets/styles/home.css';
import Banner from "../../components/home/Banner";
import TopCategory from '../../components/home/top-category/TopCategory';
import FeaturedProducts from '../../components/home/featured-products/FeaturedProducts';
import Highlights from '../../components/home/highlights/Highlights';
import Supersaver from '../../components/home/Supersaver/Supersaver';
import FeatureBrands from '../../components/home/feature-brands/FeatureBrands';
import NewProducts from '../../components/home/new-products/NewProducts';
import AvailableDevice from '../../components/home/available-device/AvailableDevice';
import Subscribe from '../../components/home/Subscribe';

const Home = () => {
  return (
    <>
      <Banner />
      <TopCategory />
      <FeaturedProducts />
      <Highlights />
      <Supersaver />
      <FeatureBrands />
      <NewProducts />
      <AvailableDevice />
      <Subscribe />
    </>
  );
};

export default Home;
