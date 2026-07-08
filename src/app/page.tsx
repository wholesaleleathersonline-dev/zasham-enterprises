import Header from "../components/layout/Header";
import Hero from "../components/home/Hero";
import SportsCategories from "../components/home/SportsCategories";
import WhyChooseUs from "../components/home/WhyChooseUs";
import ManufacturingProcess from "../components/home/ManufacturingProcess";
import Footer from "../components/layout/Footer";
import CustomCursor from "../components/customcursor";
import GlobalReach from "../components/home/GlobalReach";

export default function Home() {
  return (
    <>
    <CustomCursor />
      <Header />
      <Hero />
      <SportsCategories />
      <WhyChooseUs />
      <ManufacturingProcess />
      <GlobalReach />
      <Footer />
    </>
  );
}