import React from "react";
import HeroSection from "./HeroSection";
import { useNavigate } from "react-router-dom";

const EventStatsSection = () => {
  const navigate = useNavigate();

  return (
    <HeroSection className="bg-[url('/assets/eleqt-events.jpg')] bg-center bg-cover">
      <div className="relative z-10 max-w-6xl mx-auto text-center px-4 py-12 flex flex-col items-center w-full min-h-[500px]">
        
        {/* === MODIFIED SECTION START === */}
        <div className="mb-32 -mt-88 text-center">
          <img
            src="/assets/Eleqt Transparent logo.svg"
            alt="Eleqt Logo"
            className="h-12 md:h-20 w-auto mx-auto mb-2"
          />
          <p className="uppercase text-white text-base md:text-xl tracking-widest font-bold">
            FOR EVENTS
          </p>
        </div>
        {/* === MODIFIED SECTION END === */}

        <div className="mb-10 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-6 mt-38">
          {[
            { value: "05+", label: "Weddings Served" },
            { value: "15+", label: "Venue Collaborations" },
            { value: "25+", label: "Event Organizer Partners" },
          ].map((item, index) => (
            <div
              key={index}
              className="border border-[#B8A171] rounded-md py-12 px-8 bg-[#111111] bg-opacity-30 backdrop-blur-md"
            >
              <h3 className="text-6xl font-bold text-[#B8A171]">{item.value}</h3>
              <p className="mt-3 text-gray-300 text-base">{item.label}</p>
            </div>
          ))}
        </div>

        <div>
          <button
            onClick={() => navigate("/event-experience")}
            className="border border-[#B8A171] text-white hover:bg-gradient-to-r from-[#B8A171] to-[#FFF2CC] hover:text-black transition px-8 py-2 rounded-full text-sm font-medium"
          >
            Explore More
          </button>
        </div>

      </div>
    </HeroSection>
  );
};

export default EventStatsSection;