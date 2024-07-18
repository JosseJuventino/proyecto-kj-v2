
import Footer from "@/components/Footer";
import BannerInfo from "@/components/BannerInfo";
import { bannerInfoIndex } from "@/data/data";
import Header from "@/components/Header";

export default function Home() {
  
  return (
    <div className="bg-background-primary">
      <Header />
      <BannerInfo bannerInformation={bannerInfoIndex} />
      <Footer />
    </div>
  );
}
