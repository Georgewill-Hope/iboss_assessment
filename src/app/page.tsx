import CollectionSection from "@/components/collection-section";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import SiteFooter from "@/components/site-footer";

export default function Home() {
  return (
    <main className="mx-auto max-w-360 bg-[#f7f6f0] px-[6%] text-[#27372d] md:px-[7.1%]">
      <Navbar />
      <Hero />
      <CollectionSection />
      <SiteFooter />
    </main>
  );
}
