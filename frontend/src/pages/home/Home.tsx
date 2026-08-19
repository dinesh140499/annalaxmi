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
import SEO from '../../components/common/SEO';

const Home = () => {
  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://grainpulse.com/#organization',
        name: 'GrainPulse',
        url: 'https://grainpulse.com',
        logo: 'https://grainpulse.com/grainpulse-logo.png',
        description: 'Pure, authentic, farm-fresh organic pulses, ancient grains, and cold-pressed oils.',
        sameAs: [
          'https://facebook.com/grainpulse',
          'https://instagram.com/grainpulse',
          'https://twitter.com/grainpulse'
        ]
      },
      {
        '@type': 'WebSite',
        '@id': 'https://grainpulse.com/#website',
        url: 'https://grainpulse.com',
        name: 'GrainPulse Pure Foods',
        publisher: {
          '@id': 'https://grainpulse.com/#organization'
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://grainpulse.com/search?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      }
    ]
  };

  return (
    <>
      <SEO
        title="Pure Organic Pulses, Ancient Grains & Cold-Pressed Oils"
        description="Shop 100% pure, unpolished pulses, heritage grains, cold-pressed oils, and farm-fresh grocery from GrainPulse. Direct from farm to kitchen."
        canonicalUrl="/"
        jsonLd={homeJsonLd}
      />
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
