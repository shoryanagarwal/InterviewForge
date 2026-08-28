import Navbar from "@/components/HomePage/Navbar";
import Hero from "@/components/HomePage/Hero";
import Features from "@/components/HomePage/Feature";
import HowItWorks from "@/components/HomePage/Howitworks";
import About from "@/components/HomePage/About";
import CTA from "@/components/HomePage/CTA";
import Footer from "@/components/HomePage/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05070D] text-white">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <About />
      <CTA />
      <Footer />
      


    </main>
  );
}