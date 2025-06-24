import Header from "@/sections/Header";
import Hero from "@/sections/Hero";
import Features from "@/sections/Features";
import Testimonials from "@/sections/Testimonials";
import CallToAction from "@/sections/CallToAction";
import Footer from "@/sections/Footer";
import DashboardPreview from "@/sections/Dashboard";
import ProcurementStepper from "@/sections/ProcurementStepper";
import ScrollStepperCards from "@/sections/ScrollStepperCard";

export default function Home() {
  return (
    <div className="">
      <Header />
      <Hero />
      <DashboardPreview />
      <CallToAction />
      <Features />
      <ProcurementStepper />
      <ScrollStepperCards />
      <Testimonials />
      <Footer />
    </div>
  );
}
