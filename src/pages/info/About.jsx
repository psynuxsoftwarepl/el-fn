import React from 'react';
import Footer from '../../layouts/Footer';

const About = () => (
  <div className="bg-black text-white min-h-screen pt-20">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-8 text-center">About Us</h1>
      <div className="space-y-6 text-base md:text-lg text-gray-300 leading-relaxed">
        <p>
          Founded in June 2025, Eleqt was born from a bold ambition to redefine how premium India moves. More than just a ride, Eleqt is a statement of elegance, intelligence, and intention.
        </p>
        <p>
          It began with a simple question: What if luxury, sustainability, and smart design could come together to create the perfect urban commute for CXOs, HNIs, and elite travelers?
        </p>
        <p>
          At Eleqt, we offer pre-scheduled, chauffeur-driven rides designed to deliver precision, peace of mind, and unmatched elegance. No last-minute cancellations. No compromises on comfort. Just seamless journeys powered by technology and thoughtful service.
        </p>
        <p>
          Our rides go beyond transportation; they’re crafted for comfort, calm, and class. Every vehicle is clean and equipped with thoughtful amenities like refreshments, water bottles, magazines, curated music, and self-controlled climate settings. Every ride is pre-planned, and every chauffeur is trained to uphold professionalism, discretion, and courtesy. Expect crisp interiors, quiet drives, punctual arrivals, and a genuine respect for your time and space.
        </p>
        <p>
          Whether you're heading to the airport, attending a boardroom meeting, a daily city ride, or moving between moments in your day; Eleqt brings clarity, quiet, and care to every kilometer.
        </p>
        <p className="font-semibold text-white">
          Welcome to Eleqt. Where every ride is electrified with an elegant experience.
        </p>
      </div>
    </div>
     <Footer bgColor={"bg-[#090909]"} />
    {/* bgColor="bg-gray-900" */}
  </div>
);

export default About;
