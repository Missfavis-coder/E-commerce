import Blog from "@/components/home/bloG";
import HeroSection from "@/components/home/hero-section";
import MiniShop from "@/components/home/min-shop";
import PopularCategories from "@/components/home/popular-categories";
import ShopByBranch from "@/components/home/shop-by-brand";
import Header from "@/components/home/navbar";


export default function Home() {
  return (
    <div>
      <Header/>
      <HeroSection/>
      <MiniShop/>
      <PopularCategories/>
      <ShopByBranch/>
      <Blog/>
    </div>
  );
}
