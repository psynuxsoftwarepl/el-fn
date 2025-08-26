import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../layouts/Footer';
import { ChevronDown } from 'lucide-react';

const categories = ['General', 'Payments', 'Bookings', 'Airport Transfers', 'Hourly Rentals', 'Outstation Trips', 'Policies'];

const faqData = {
  General: [
    {
      question: "What type of car do you use?",
      answer: "For compact yet elegant rides, especially for solo travelers or couples, we offer the MG Windsor. It comfortably fits 1-3 backpacks, making it perfect for airport drops and hourly rentals. But for most bookings, we use Innova Crysta, BYD eMax7 (an Innova-sized electric MPV), both of which comfortably seat 5 adults and offer ample boot space for 3-5 large suitcases. It’s ideal for business rides, city commutes with families or groups, and outstation trips.",
    },
    {
      question: "Do you have luxury car options for weddings?",
      answer: "For weddings, VIP arrivals, and special occasions, we offer a curated selection of luxury sedans and SUVs under our exclusive Luxury Cars section. These rides are available on request for custom bookings, such as groom cars or premium city drives.",
    },
    {
      question: "How long does it take to process a refund?",
      answer: "We issue the refund instantly. Your bank may take 3-7 days to credit this to your account.",
    },
    {
      question: "What happens if my booking status is not confirmed?",
      answer: "Bookings are usually confirmed within 15 minutes. If your booking is declined, we'll issue an instant refund. Depending on your bank, it may take 3-7 days for the amount to reflect.",
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach us at hello@eleqt.in or +91-9777906587 for any assistance.",
    },
    {
      question: "Can I book a ride for someone else?",
      answer: "Yes, you can. During booking, you can update the guest details and enter the traveler’s information. In this case, both you and the traveling guest will receive the relevant details.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept UPI payments (with exciting cashback offers), wallets, Net-banking, pay later, as well as most major credit and debit cards.",
    },
    {
      question: "What is your cancellation policy?",
      answer: "We currently do not charge any cancellation fees. That said, we request you to please inform us at least 3 hours prior as otherwise, it’s a direct loss for us.",
    },
  ],
  Payments: [
    {
      question: "Do you accept international credit cards?",
      answer: "Yes, we do.",
    },
    {
      question: "How long does it take to process a refund?",
      answer: "Refunds typically take 3-7 business days to process. If you have any concerns, feel free to contact our customer support.",
    },
    {
      question: "What happens if my booking status is not confirmed?",
      answer: "Booking status is typically confirmed within 15 minutes. If your booking is not confirmed, declined, or canceled, the amount will be refunded to your account, or you can contact our customer support.",
    },
  ],
  Bookings: [
    {
      question: "Which car do you use?",
      answer: "We use the MG Windsor & BYD eMax7 for Airport Transfers, Hourly Rentals, and Outstation Trips. They've comfortable seats for 3 and 5 adults accordingly, and have enough boot space for 3-5 large suitcases. But you can choose specific models as per your need in the 'Luxury Cars' Booking Section for the Weddings and City Rentals only.",
    },
    {
      question: "How many passengers does your car seat?",
      answer: "The cars can accommodate 3-5 adults (+ driver) comfortably.",
    },
    {
      question: "How much luggage can fit?",
      answer: "The cars can easily fit 3-5 large suitcases.",
    },
    {
      question: "Can I change my trip date/time?",
      answer: "You can modify the pick-up time of your trip from your Trip details page by clicking on the 'Modify Booking' link in front of the trip and then clicking on the 'Edit' button.",
    },
    {
      question: "Can I change my pickup/drop location?",
      answer: "You can modify the pickup/drop location from your Trip details page by clicking on the 'View Details' link in front of the trip and then clicking on the 'Edit' button.",
    },
    {
      question: "Can I add an additional stop?",
      answer: "You can add a stop during the booking process by clicking on the '+' icon next to the location field. You can also add it to an existing booking by clicking on the edit button on the trip detail page and then clicking on the '+' icon next to the location.",
    },
    {
      question: "How can we book 2 cars?",
      answer: "For now, you have to book two separate trips to get two cars. Once you’ve booked the first trip, you can use the 'Re-book' option.",
    },
  ],
  'Airport Transfers': [
    {
      question: "How much buffer should we keep if the flight is landing at X time?",
      answer: "For domestic flights, we suggest keeping your pick-up time 30 minutes after the flight landing time. For international flights, we recommend a 45-minute buffer.",
    },
    {
      question: "Where will the driver pick up at the airport?",
      answer: "The Eleqt cars come to pick you up at the lanes for private cars. You can coordinate directly with the driver to confirm the exact pick-up location.",
    },
    {
      question: "What happens if my flight is delayed? Will the cab stay?",
      answer: "15 minutes of waiting time is included with every airport transfer booking. We can wait longer if there's no impact on the next booking, but this isn't guaranteed, and we reserve the right to cancel after this.",
    },
    {
      question: "What about the waiting charges if my driver has to wait?",
      answer: "Waiting charges apply after a free 15-minute window: ₹100 for every additional 5 minutes. The driver may wait longer if it doesn’t affect other scheduled rides. However, we reserve the right to cancel the ride after 30 minutes of waiting.",
    },
  ],
  'Hourly Rentals': [
    {
      question: "Is there a minimum rental period for city rentals?",
      answer: "The minimum rental period for city rentals is around 2 hours.",
    },
    {
      question: "Are there any limitations on the number of kilometers I can drive during a city rental?",
      answer: "We offer unlimited kilometers for city rentals, as long as it’s within the city limits. Note that this does not include airports.",
    },
    {
      question: "Can I extend my booking hours if needed?",
      answer: "Yes, your booking can be extended subject to availability. The earlier you inform us, the likelier we can extend it. If you need this, please contact us.",
    },
  ],
  'Outstation Trips': [
    {
      question: "What outstation destinations do you cover?",
      answer: "We offer outstation trips to anywhere within a 350 km radius around Bhubaneswar.",
    },
    {
      question: "Do you offer both one-way and round-trip options for outstation travel?",
      answer: "Yes, we offer both one-way and round-trip options for outstation trips.",
    },
    {
      question: "Are there any additional charges I should be aware of?",
      answer: "Toll duty and parking charges are not included in the booking amount and will need to be paid separately. We will inform you of any applicable toll charges during your trip.",
    },
  ],
  Policies: [
    {
      question: "Can I travel with my pets?",
      answer: "Yes, we welcome pets at Eleqt! Please indicate that you are traveling with pets when you book your ride. There is an additional fee of ₹500 for cats and ₹750 for dogs, which goes towards deep cleaning the car.",
    },
    {
      question: "Are there any rules for traveling with pets?",
      answer: "Yes, there are a few guidelines to follow: - Pets must be in carriers or under restraint at all times. - No more than 2 pets are allowed per ride. - Any damage caused to the vehicle by pets must be reimbursed to Eleqt.",
    },
    {
      question: "What is your cancellation policy?",
      answer: "You can check our [Cancellation & Refund] section to know more.",
    },
    {
      question: "What are the waiting charges if my driver has to wait?",
      answer: "Waiting charges apply after a free 15-minute window: ₹100 for every additional 5 minutes. The driver may wait longer if it doesn’t affect other scheduled rides. However, we reserve the right to cancel the ride after 30 minutes of waiting.",
    },
  ],
};


const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('General');
  const [openIndex, setOpenIndex] = useState(0); // Open the first FAQ by default

  const currentFaqs = faqData[activeCategory] || [];

  const renderAnswer = (answer) => {
    const linkRegex = /\[(.*?)\]/;
    const match = answer.match(linkRegex);

    if (match) {
        const linkText = match[1];
        const parts = answer.split(match[0]);
        return (
            <>
                {parts[0]}
                <Link to="/cancellation-refund" className="text-pink-300 hover:underline">
                    {linkText}
                </Link>
                {parts[1]}
            </>
        );
    }
    return answer;
  };


  return (
    <div className="bg-black text-white min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-8 text-center">
          Frequently Asked Questions
        </h1>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(0); // Reset to open the first item of the new category
              }}
              className={`px-4 py-1.5 rounded-full border transition-all duration-200 text-sm sm:text-base
                ${
                  activeCategory === cat
                    ? 'bg-gradient-to-br from-[#B8A171] to-[#FFF2CC] text-black font-semibold border-transparent'
                    : 'border-[#B8A171] text-white hover:bg-white/10'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {currentFaqs.length > 0 ? (
            currentFaqs.map((item, index) => (
              <div key={index} className="border-b border-gray-800 pb-4">
                <button
                  onClick={() => setOpenIndex(index === openIndex ? null : index)} // Toggle the FAQ
                  className="w-full flex justify-between items-center text-left py-3"
                >
                  <span className="text-lg font-medium text-white">{item.question}</span>
                  <ChevronDown
                    className={`h-6 w-6 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    } text-[#B8A171]`}
                  />
                </button>
                {openIndex === index && (
                  <div className="pt-2 pr-8 text-gray-300 text-base sm:text-lg leading-relaxed">
                    {renderAnswer(item.answer)}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No FAQs available for this category yet.</p>
          )}
        </div>
      </div>
    <Footer bgColor={"bg-[#090909]"} />
      
    </div>
  );
};

export default FAQ;
