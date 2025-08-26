import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";

const ServiceSection = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      img: "/assets/LC.png",
      title: "Luxury Cars",
      description: "Arrive in Style & Sophistication",
    },
    {
      img: "/assets/OT.png",
      title: "Outstation Trips",
      description: "Seamless Journeys Beyond Boundaries",
    },
    {
      img: "/assets/HR.png",
      title: "Hourly Rentals",
      description: "Executive Rides for Busy Days",
    },
    {
      img: "/assets/HR.png",
      title: "Airport Transfers",
      description: "Punctual Transfers, Right on Time",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-background min-h-screen">
      <Navbar />

      {/* Section Heading */}
      <div className="mt-[6rem] text-center px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-4">
          Discover What We Offer
        </h2>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-12">
          Choose from our exclusive range of services designed to elevate your
          journey. From luxury cars to airport transfers, we’ve got you covered.
        </p>
      </div>

      {/* Services Grid */}
      <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 mb-20">
        {services.map((service, i) => (
          <div
            key={i}
            onClick={() => setSelectedService(service.title)}
            className="group flex flex-col cursor-pointer rounded-2xl bg-[#1E1E1E] border border-gray-700 overflow-hidden shadow-lg transition-all duration-300 hover:scale-105"
          >
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={service.img}
                alt={service.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col items-start justify-center p-6 flex-grow">
              <h3 className="inline-flex items-center gap-x-2 text-xl font-semibold text-white mb-2">
                {service.title}
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </h3>
              <p className="text-gray-400 text-sm sm:text-base text-left">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedService && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-[#111] text-white rounded-2xl shadow-2xl p-6 w-96 relative border border-gray-700">
            <h2 className="mb-4 text-2xl font-bold text-gradient">
              Book {selectedService}
            </h2>

            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              className="flex flex-col gap-4"
            >
              {/* REQUIRED: Web3Forms Access Key */}
              <input
                type="hidden"
                name="access_key"
                value="404eff62-5e41-4d9b-8d7d-31e36b7123aa"/>

              {/* Add service name */}
              <input type="hidden" name="service" value={selectedService} />

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="rounded-md border border-gray-700 bg-[#1E1E1E] p-3 focus:outline-none focus:ring-2 focus:ring-[#B8A171]"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="rounded-md border border-gray-700 bg-[#1E1E1E] p-3 focus:outline-none focus:ring-2 focus:ring-[#B8A171]"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="rounded-md border border-gray-700 bg-[#1E1E1E] p-3 focus:outline-none focus:ring-2 focus:ring-[#B8A171]"
              />

              <button
                type="submit"
                className="rounded-md bg-gradient-to-r from-[#B8A171] to-[#FFF2CC] text-black font-semibold py-3 hover:opacity-90 transition-all"
              >
                Submit Request
              </button>
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="text-sm text-gray-400 hover:text-white transition-all mt-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer bgColor="bg-[#1A1A1A]" />
    </div>
  );
};

export default ServiceSection;
