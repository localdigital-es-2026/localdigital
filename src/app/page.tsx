import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import dynamic from "next/dynamic";

const Solution = dynamic(() => import("@/components/Solution"));
const Services = dynamic(() => import("@/components/Services"));
const CaseStudies = dynamic(() => import("@/components/CaseStudies"));
const Process = dynamic(() => import("@/components/Process"));
const About = dynamic(() => import("@/components/About"));
const CTA = dynamic(() => import("@/components/CTA"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Problem />
      <Solution />
      <Services />
      <CaseStudies />
      <Process />
      <About />
      <CTA />
      <FAQ />
      <Footer />
    </main>
  );
}
