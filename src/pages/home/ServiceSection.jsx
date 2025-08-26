import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";

const ServiceSection = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      img: "/assets/luxurypr.jpg",
      title: "Luxury Cars",
      description: "Arrive in Style & Sophistication",
    },
    {
      img: "/assets/outstationprs.png",
      title: "Outstation Trips",
      description: "Seamless Journeys Beyond Boundaries",
    },
    {
      img: "/assets/hourleyrnt.jpg",
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
      <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2  gap-6 px-6 mb-20">
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
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 px-4">
    <div className="bg-[#111] text-white rounded-2xl shadow-2xl border border-[#B8A171] flex flex-col md:flex-row w-full max-w-5xl overflow-hidden animate-fadeIn">
      
      {/* LEFT: FORM */}
      <div className="w-full md:w-1/2 p-6 md:p-8">
        <h2 className="mb-4 text-2xl font-bold text-gradient text-center md:text-left">
          Book {selectedService}
        </h2>

        <form
          action="https://api.web3forms.com/submit"
          method="POST"
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            const checkbox = e.target.querySelector("input[name='terms']");
            if (!checkbox.checked) {
              e.preventDefault();
              alert("You must agree to the Terms & Conditions before submitting.");
            }
          }}
        >
          {/* Web3Forms Key */}
          <input
            type="hidden"
            name="access_key"
            value="404eff62-5e41-4d9b-8d7d-31e36b7123aa"
          />
          <input type="hidden" name="service" value={selectedService} />

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            className="rounded-lg border border-gray-700 bg-black/40 p-3 focus:outline-none focus:ring-2 focus:ring-[#B8A171]"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="rounded-lg border border-gray-700 bg-black/40 p-3 focus:outline-none focus:ring-2 focus:ring-[#B8A171]"
            required
          />

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="rounded-lg border border-gray-700 bg-black/40 p-3 focus:outline-none focus:ring-2 focus:ring-[#B8A171]"
          />

          {/* Date & Time */}
          <input
            type="datetime-local"
            name="datetime"
            className="rounded-lg border border-gray-700 bg-black/40 p-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B8A171]"
            required
          />

          {/* Pickup */}
          <input
            type="text"
            name="pickup_location"
            placeholder="Pickup Location"
            className="rounded-lg border border-gray-700 bg-black/40 p-3 focus:outline-none focus:ring-2 focus:ring-[#B8A171]"
            required
          />

          {/* Drop */}
          <input
            type="text"
            name="drop_location"
            placeholder="Drop Location"
            className="rounded-lg border border-gray-700 bg-black/40 p-3 focus:outline-none focus:ring-2 focus:ring-[#B8A171]"
            required
          />


          {/* Toggles: Pet Allowed & Child Seat Required */}
<div className="flex items-center justify-between gap-6 mt-2">
  {/* Pet Allowed */}
  <label className="flex items-center justify-between w-full cursor-pointer">
    <span className="text-gray-300">Pet Allowed?</span>
    <input
      type="checkbox"
      name="pet_allowed"
      value="Yes"
      className="sr-only peer"
    />
    <div className="w-12 h-6 bg-gray-700 rounded-full relative peer-checked:bg-[#B8A171] transition">
      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-6"></div>
    </div>
  </label>

  {/* Child Seat */}
  <label className="flex items-center justify-between w-full cursor-pointer">
    <span className="text-gray-300">Child Seat?</span>
    <input
      type="checkbox"
      name="child_seat"
      value="Yes"
      className="sr-only peer"
    />
    <div className="w-12 h-6 bg-gray-700 rounded-full relative peer-checked:bg-[#B8A171] transition">
      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-6"></div>
    </div>
  </label>
</div>


          {/* Terms */}
          <label className="flex items-center gap-2 mt-2 text-sm text-gray-300">
            <input
              type="checkbox"
              name="terms"
              className="w-4 h-4 accent-[#B8A171] cursor-pointer"
            />
            I agree to the{" "}
            <span className="underline text-[#B8A171] cursor-pointer">
              Terms & Conditions
            </span>
          </label>

          {/* Buttons */}
          <button
            type="submit"
            className="mt-3 rounded-lg bg-gradient-to-r from-[#B8A171] to-[#FFF2CC] text-black font-semibold py-2 hover:opacity-90 transition-all shadow-md"
          >
            Submit Request
          </button>
          <button
            type="button"
            onClick={() => setSelectedService(null)}
            className="text-sm text-gray-400 hover:text-white transition-all mt-1"
          >
            Cancel
          </button>
        </form>
      </div>

      {/* RIGHT: TEXT */}
      <div className="hidden md:flex w-1/2 bg-black/50 flex-col justify-center p-8 animate-slideIn">
        <h3 className="text-3xl font-bold text-[#B8A171] mb-4">
          On-time, Seamless, Smooth Journeys
          With Extra Space and Thoughtful Aminities 
        </h3>
        <p className="text-gray-400 leading-relaxed">
          Whether it's a meeting or me-time, Schedule your ride in advance and Enjoy precision timing, premium comfort, and peace of mind.
        </p>
      </div>
    </div>
  </div>
)}


      {/* <Footer bgColor="bg-[#1A1A1A]" /> */}
    </div>
  );
};

export default ServiceSection;











