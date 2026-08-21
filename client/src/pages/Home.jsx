import React, { useState, useEffect } from 'react';
import Hero from '../components/home/Hero/Hero';
import Principles from '../components/home/Principles/Principles';
import WhyChooseUs from '../components/home/WhyChooseUs/WhyChooseUs';
import Applications from '../components/home/Applications/Applications';
import Brands from '../components/home/Brands/Brands';
import Testimonials from '../components/common/Testimonials/Testimonials';
import FeaturedProducts from '../components/home/FeaturedProducts/FeaturedProducts';
import Impact from '../components/home/Impact/Impact';
import Footer from '../components/layout/Footer/Footer';
import { fetchHomeContent } from '../services/homeService';

const Home = () => {
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    fetchHomeContent().then((data) => {
      if (data) setHomeData(data);
    });
  }, []);

  return (
    <main className="min-h-screen">
      {(!homeData?.hero || homeData.hero.isActive !== false) && (
        <Hero content={homeData?.hero} />
      )}
      {(!homeData?.principles || homeData.principles.isActive !== false) && (
        <Principles content={homeData?.principles} />
      )}
      {(!homeData?.whyChooseUs || homeData.whyChooseUs.isActive !== false) && (
        <WhyChooseUs content={homeData?.whyChooseUs} />
      )}
      {(!homeData?.applications || homeData.applications.isActive !== false) && (
        <Applications content={homeData?.applications} />
      )}
      {(!homeData?.testimonials || homeData.testimonials.isActive !== false) && (
        <Testimonials content={homeData?.testimonials} />
      )}
      {(!homeData?.featuredProducts || homeData.featuredProducts.isActive !== false) && (
        <FeaturedProducts content={homeData?.featuredProducts} />
      )}
      {(!homeData?.brands || homeData.brands.isActive !== false) && (
        <Brands content={homeData?.brands} />
      )}
      {(!homeData?.impact || homeData.impact.isActive !== false) && (
        <Impact content={homeData?.impact} />
      )}
      <Footer />
    </main>
  );
};

export default Home;
