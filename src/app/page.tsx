import Header from "../components/layout/Header";
import Hero from "../components/home/Hero";
import SportsCategories from "../components/home/SportsCategories";
import WhyChooseUs from "../components/home/WhyChooseUs";
import ManufacturingProcess from "../components/home/ManufacturingProcess";
import Footer from "../components/layout/Footer";
import CustomCursor from "../components/customcursor";
import GlobalReach from "../components/home/GlobalReach";
import FactorySection from "../components/home/FactorySection";
import FeaturedProducts from "../components/home/featuredproducts";
import Reveal from "../components/animation/Reveal";
import { getHeroBanner } from "../services/admin/heroBanner.service";


export default async function Home() {
  const heroBanner = await getHeroBanner();
  return (
    <>
    <CustomCursor />

      <Header />
      <Hero image={heroBanner?.image ?? ""} />


      <Reveal>
      <SportsCategories />
      </Reveal>

      <Reveal>
         <WhyChooseUs />
      </Reveal>
      <Reveal>
         <ManufacturingProcess />
      </Reveal>
      <Reveal>
          <FeaturedProducts />
      </Reveal>
      <Reveal>
         <FactorySection />
      </Reveal>
      <Reveal>
         <GlobalReach />
      </Reveal>
     
     
    
     
     
      
    </>
  );
}