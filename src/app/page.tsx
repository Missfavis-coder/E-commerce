import Blog from "@/components/home/bloG";
import HeroSection from "@/components/home/hero-section";
import MiniShop from "@/components/home/min-shop";
import PopularCategories from "@/components/home/popular-categories";
import ShopByBranch from "@/components/home/shop-by-brand";
import Header from "@/components/home/navbar";
import Footer from "@/components/home/footer";


export default function Home() {
  return (
    <div>
      <Header/>
    <div className="md:px-2">
      <HeroSection/>
      <MiniShop/>
      <PopularCategories/>
      <ShopByBranch/>
      <Blog/>
    </div>
      <Footer/>
    </div>
  );
}
