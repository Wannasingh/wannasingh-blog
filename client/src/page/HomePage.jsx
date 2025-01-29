import { NavBar, HeroSection, Footer } from "@/components/WebSection";
import ArticlesSection from "@/components/ArticlesSection";
import { Helmet } from 'react-helmet-async';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Wannasin Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <NavBar />
      <div className="flex-grow">
        <HeroSection />
        <ArticlesSection />
      </div>
      <Footer />
    </div>
  );
}
