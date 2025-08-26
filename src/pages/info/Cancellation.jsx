import React from 'react';
import Footer from '../../layouts/Footer';

const Cancellation = () => (
  <div className="bg-black text-white min-h-screen pt-20">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-8">
        Cancellation & Refund
      </h1>
      <div className="space-y-8 text-base md:text-lg text-gray-300 leading-relaxed">
        
        <p>
          At Eleqt, we understand that plans can change. Our cancellation and refund policy is designed to offer clarity, convenience, and respect for your time and commitment.
        </p>

        <div>
          <h2 className="text-xl font-semibold text-[color:var(--color-gradient-start)] mt-6">Cancellation Policy:</h2>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>You can cancel your ride anytime before the scheduled pickup time.</li>
            <li>No cancellation charges will apply if the cancellation is made at least 30 minutes prior to the scheduled pickup.</li>
            <li>For cancellations made less than 30 minutes before the pickup time, a nominal convenience fee may be charged to compensate for vehicle dispatch and scheduling efforts.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-[color:var(--color-gradient-start)] mt-6">No-Show Policy:</h2>
          <p className="mb-2">Our chauffeur will wait at the designated pickup location for up to 30 minutes beyond the scheduled pickup time. If we are unable to reach you or locate you within that window:</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>The ride will be considered a "No-Show".</li>
            <li>In such cases, the full booking amount may be chargeable, and no refund will be issued.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-[color:var(--color-gradient-start)] mt-6">Refunds:</h2>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>If your cancellation is eligible for a refund, it will be processed automatically.</li>
            <li>Refunds typically reflect in your original payment method within 3–7 business days, depending on your bank or payment gateway.</li>
            <li>If you do not receive your refund within the stated timeline, please contact our support team at Email: <a href="mailto:eleqtmobility@gmail.com" className=" text-[color:var(--color-gradient-start)] hover:underline">eleqtmobility@gmail.com</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-[color:var(--color-gradient-start)] mt-6">Exceptions:</h2>
          <p className="mb-2">
            ELEQT reserves the right to cancel any ride under unforeseen circumstances, including but not limited to vehicle unavailability, force majeure events, or safety concerns.
          </p>
          <p className="font-semibold text-white">In such Cases: You will receive a full refund, and we will assist you with priority rebooking at your convenience.</p>
        </div>

      </div>
    </div>
         <Footer bgColor={"bg-[#090909]"} />

  </div>
);

export default Cancellation;
