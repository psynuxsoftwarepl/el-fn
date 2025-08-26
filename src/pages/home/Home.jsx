import React, { useRef } from "react";
import PrimaryButton from "@components/buttons/PrimaryButton";
import HeroSection from "./HeroSection";
import FeaturesCard from "./FeaturesCard";
import ServiceSection from "./ServiceSection";
import SectionEnd from "@layouts/SectionEnd";
import AmenitiesSection from "./AmenitiesSection";
import PreviewRide from "./PreviewRide";
import Question from "./Question";
import Footer from "@layouts/Footer";
import EventStatsSection from "./EventStatsSection";

const Home = () => {
  const serviceSectionRef = useRef(null);

  const scrollToServices = () => {
    serviceSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };
  return (
    <>
      <HeroSection className="bg-center bg-cover bg-[url('/assets/hero_section_car_mobile.png')] md:bg-[url('/assets/hero_section_car_tablet.png')] lg:bg-[url('/assets/hero_section_car_desktop.png')]">
        <div className="flex flex-col items-center w-full max-w-6xl">
          <h1 className="text-gradient font-bold w-full text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight text-center">
            Experience Luxury In Every Ride
          </h1>

          <p className="mt-4 text-lg font-medium text-foreground sm:text-xl md:text-3xl">
            Professional Chauffeurs | Comfortable Cars
          </p>

          <PrimaryButton 
            onClick={scrollToServices}
            className="mt-8 rounded-lg px-8 py-3 text-base font-semibold leading-none sm:px-10 sm:py-4 sm:text-lg"
          >
            Services We Provide
          </PrimaryButton>
        </div>
      </HeroSection>
      <FeaturesCard />
      <SectionEnd className={"mx-auto"} />

      <div ref={serviceSectionRef}>
        <ServiceSection />
      </div>
      <SectionEnd className={"mx-auto"} />
      <AmenitiesSection />
       {/* <SectionEnd className={"mx-auto"} />  */}
      {/* <PreviewRide />  */}
      <SectionEnd className={"mx-auto"} />
      <EventStatsSection />
       <SectionEnd className={"mx-auto"} />
      {/* <Question /> */}
      <Footer bgColor={"bg-[#090909]"} />
    </>
  );
};

export default Home;
