import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import FeatureSpotlight from "@/components/FeatureSpotlight";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Problem />
      <Solution />
      <FeatureSpotlight />
      <CTA />
    </main>
  );
}
