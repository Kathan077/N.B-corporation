import Hero from '../components/home/Hero/Hero';
import Principles from '../components/home/Principles/Principles';
import WhyChooseUs from '../components/home/WhyChooseUs/WhyChooseUs';
import Applications from '../components/home/Applications/Applications';
import Brands from '../components/home/Brands/Brands';

import Testimonials from '../components/common/Testimonials/Testimonials';
import FeaturedProducts from '../components/home/FeaturedProducts/FeaturedProducts';
import Impact from '../components/home/Impact/Impact';
import Footer from '../components/layout/Footer/Footer';

const Home = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Principles />
      <WhyChooseUs />
      <Applications />
       <Testimonials />
      <FeaturedProducts />
   
     <Brands />
      <Impact />
      <Footer />
    </main>
  );
};

export default Home;
