// import React, { useState, useContext } from "react";
// import {
//   Briefcase,
//   User,
//   Phone,
//   Calendar,
//   LogIn,
//   ChevronRight,
//   PartyPopper,
//   MessageSquare,
// } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import axios from "axios";
// import Footer from "../../layouts/Footer";
// import { AuthContext } from "../../contexts/Auth";

// const FeatureListItem = ({ icon, text }) => (
//   <li className="flex items-center space-x-3">
//     <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 text-white flex items-center justify-center">
//       {icon}
//     </span>
//     <span className="text-gray-300">{text}</span>
//   </li>
// );

// export default function App() {
//   const { isAuthenticated } = useContext(AuthContext);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const handleEventSubmit = async (data) => {
//     // Check if user is authenticated
//     if (!isAuthenticated) {
//       toast.error("Please login to submit an event request");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const baseURL =
//         import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

//       const payload = {
//         organizerName: data.name,
//         organizerPhone: `+91${data.phone}`,
//         eventType: data.eventType,
//         desc: data.description,
//       };

//       const response = await axios.post(`${baseURL}/api/v1/events/`, payload, {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.data.success) {
//         toast.success(response.data.message);
//         setIsSubmitted(true);
//         reset();
//       }
//     } catch (error) {
//       console.error("Error creating event:", error);

//       if (error.response?.data?.message) {
//         toast.error(error.response.data.message);
//       } else if (error.response?.status === 401) {
//         toast.error("Please login to submit an event request");
//       } else if (error.response?.status === 400) {
//         toast.error("Please check your input data");
//       } else {
//         toast.error("Failed to submit event request. Please try again.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return (
//     <div className="bg-black text-white font-['Inter'] min-h-screen mt-[5.5rem]">
//       <div>
//         <header className="relative w-full">
//           <div className="w-full h-[60vh] max-h-[700px]">
//             <img
//               src="/assets/eleqt-events.jpg"
//               alt="Elegant event setting with hanging lanterns"
//               className="w-full h-full object-cover"
//             />
//           </div>

//           <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent"></div>
//         </header>

//         <main>
//           <section className="my-container text-center -mt-24 relative z-10 py-12 md:py-20">
//             <h1
//               className="text-4xl md:text-6xl font-bold mb-4"
//               style={{
//                 backgroundImage:
//                   "linear-gradient(132.73deg, #B8A171 0%, #FFF2CC 100%)",
//                 WebkitBackgroundClip: "text",
//                 backgroundClip: "text",
//                 color: "transparent",
//                 paddingBottom: "0.15em",
//               }}
//             >
//               Make Arrivals Memorable
//             </h1>
//             <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
//               From weddings to corporate galas, Events are all about moments that matter. The way your guests arrive sets the tone. Elevate the experience by offering seamless, premium rides your guests will remember.
//             </p>
//           </section>

//           <section className="my-container mb-16 md:mb-24">
//             <h2
//               className="text-3xl md:text-4xl font-bold text-center mb-12"
//               style={{
//                 backgroundImage:
//                   "linear-gradient(132.73deg, #B8A171 0%, #FFF2CC 100%)",
//                 WebkitBackgroundClip: "text",
//                 backgroundClip: "text",
//                 color: "transparent",
//                 paddingBottom: "0.15em",
//               }}
//             >
//               Craft the Perfect First Impression
//             </h2>
//             <div className="grid md:grid-cols-3 gap-8">
//               <div className="bg-[#111111] p-6 rounded-lg border border-gray-800">
//                 <h3 className="text-xl font-semibold mb-4">
//                   Personalised Solutions
//                 </h3>
//                 <p className="text-gray-400 mb-6">
//                   No matter the size or style of your event, we fine-tune our services to match its character and your expectations.
//                 </p>
//                 <ul className="space-y-5">
//                   <FeatureListItem
//                     icon={
//                       <img
//                         src="/assets/car.svg"
//                         alt="Car Icon"
//                         className="w-10 h-10"
//                       />
//                     }
//                     text="Smooth Venue Commutes"
//                   />
//                   <FeatureListItem
//                     icon={
//                       <img
//                         src="/assets/clock-2.svg"
//                         alt="Clock Icon"
//                         className="w-10 h-10"
//                       />
//                     }
//                     text="Adaptive Schedules"
//                   />
//                   <FeatureListItem
//                     icon={
//                       <img
//                         src="/assets/add.svg"
//                         alt="Add Icon"
//                         className="w-10 h-10"
//                       />
//                     }
//                     text="Bespoke Ride Enhancements"
//                   />
//                 </ul>
//               </div>

//               <div className="bg-[#111111] p-6 rounded-lg border border-gray-800 flex flex-col items-center text-center">
//                 <h3 className="text-xl font-semibold mb-4">Trained to Impress</h3>
//                 <p className="text-gray-400 mb-6">
//                   Our event chauffeurs are handpicked for their expertise, etiquette, and flawless service.
//                 </p>
//                 <div className="w-24 h-24 my-4">
//                   <img
//                     src="/assets/driver.svg"
//                     alt="Driver Icon"
//                     className="w-full h-full object-contain"
//                   />
//                 </div>
//               </div>

//               <div className="bg-[#111111] p-6 rounded-lg border border-gray-800">
//                 <h3 className="text-xl font-semibold mb-4">
//                   Exclusive Concierge Support
//                 </h3>
//                 <p className="text-gray-400 mb-6">
//                   A dedicated representative to manage every on-ground detail with precision.
//                 </p>
//                 <ul className="space-y-5">
//                   <FeatureListItem
//                     icon={
//                       <img
//                         src="/assets/whatsapp.svg"
//                         alt="Whatsapp Icon"
//                         className="w-10 h-10"
//                       />
//                     }
//                     text="Real-Time Updates"
//                   />
//                   <FeatureListItem
//                     icon={
//                       <img
//                         src="/assets/scan.svg"
//                         alt="Tracking Icon"
//                         className="w-10 h-10"
//                       />
//                     }
//                     text="Live Support & Monitoring"
//                   />
//                 </ul>
//               </div>
//             </div>
//           </section>

//           <section className="my-container grid lg:grid-cols-5 gap-16 items-center mb-20 md:mb-32">
//   <div className="bg-black p-12 rounded-2xl border border-[#B8A171] lg:col-span-2 shadow-xl">
//     {isSubmitted ? (
//       <div className="text-center py-8">
//         <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
//           <svg
//             className="w-8 h-8 text-white"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//           >
//             <path
//               fillRule="evenodd"
//               d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//               clipRule="evenodd"
//             />
//           </svg>
//         </div>
//         <h3 className="text-xl font-bold text-yellow-400 mb-2">
//           Request Submitted!
//         </h3>
//         <p className="text-gray-400 mb-4">
//           We've received your event request and will contact you
//           within 48 hours.
//         </p>
//         <button
//           onClick={() => setIsSubmitted(false)}
//           className="px-6 py-2 bg-[#B8A171] text-black font-semibold rounded-md hover:opacity-90 transition"
//         >
//           Submit Another Request
//         </button>
//       </div>
//     ) : (
//       <form
//         action="https://api.web3forms.com/submit"
//         method="POST"
//         className="space-y-6"
//         onSubmit={() => setIsSubmitted(true)}
//       >
//         {/* REQUIRED: Web3Forms Access Key */}
//         <input
//           type="hidden"
//           name="access_key"
//           value="414167a4-d0b2-45ae-a114-9bba03900a1c"
//         />

//         {/* Event Type */}
//         <div className="relative">
//           <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B8A171]">
//             🎉
//           </span>
//           <select
//             name="eventType"
//             required
//             className="w-full bg-[#1A1A1A] text-yellow-100 p-4 pl-10 rounded-md border border-[#B8A171] focus:ring-2 focus:ring-[#B8A171] transition"
//           >
//             <option value="" className="text-gray-500">
//               Celebration Type
//             </option>
//             <option value="corporate event">Corporate Event</option>
//             <option value="concert/exhibition">Concert/Exhibition</option>
//             <option value="conference">Conference</option>
//             <option value="wedding">Wedding</option>
//             <option value="other">Other</option>
//           </select>
//         </div>

//         {/* Name */}
//         <div className="relative">
//           <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B8A171]">
//             👤
//           </span>
//           <input
//             type="text"
//             name="name"
//             placeholder="Your Name"
//             required
//             className="w-full bg-[#1A1A1A] text-yellow-100 placeholder-gray-400 p-4 pl-10 rounded-md border border-[#B8A171] focus:ring-2 focus:ring-[#B8A171] transition"
//           />
//         </div>

//         {/* Phone */}
//         <div className="relative">
//           <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B8A171]">
//             📞
//           </span>
//           <input
//             type="tel"
//             name="phone"
//             placeholder="Phone Number"
//             required
//             className="w-full bg-[#1A1A1A] text-yellow-100 placeholder-gray-400 p-4 pl-10 rounded-md border border-[#B8A171] focus:ring-2 focus:ring-[#B8A171] transition"
//           />
//         </div>

//         {/* Description */}
//         <div className="relative">
//           <span className="absolute left-3 top-5 transform -translate-y-1/2 text-[#B8A171]">
//             📝
//           </span>
//           <textarea
//             name="description"
//             placeholder="Describe Your Event Details & Requirements"
//             rows="6"
//             required
//             className="w-full bg-[#1A1A1A] text-yellow-100 placeholder-gray-400 p-4 pl-10 rounded-md border border-[#B8A171] focus:ring-2 focus:ring-[#B8A171] transition"
//           ></textarea>
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full font-semibold py-4 px-6 rounded-xl text-black text-lg transition-transform transform hover:scale-105"
//           style={{
//             backgroundImage:
//               "linear-gradient(132.73deg, #B8A171 0%, #FFF2CC 100%)",
//           }}
//         >
//           Get a Callback
//         </button>
//       </form>
//     )}
//   </div>

//   <div className="text-center lg:text-left lg:col-span-3">
//     <h2
//       className="text-4xl md:text-5xl font-bold mb-4"
//       style={{
//         backgroundImage:
//           "linear-gradient(132.73deg, #B8A171 0%, #FFF2CC 100%)",
//         WebkitBackgroundClip: "text",
//         backgroundClip: "text",
//         color: "transparent",
//         paddingBottom: "0.15em",
//       }}
//     >
//       Curate an Experience to Remember
//     </h2>
//     <p className="text-lg text-gray-400">
//       Planning something special? Share your event details, and we’ll get back to you with a personalized plan within 48 hours.
//     </p>
//   </div>
// </section>

//         </main>
//       </div>
//       <Footer />
//     </div>
//   );
// }







import React, { useState } from "react";
import Footer from "../../layouts/Footer";

const FeatureListItem = ({ icon, text }) => (
  <li className="flex items-center space-x-3">
    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 text-white flex items-center justify-center">
      {icon}
    </span>
    <span className="text-gray-300">{text}</span>
  </li>
);

export default function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.target);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const data = await res.json();

      if (data.success) {
        setIsSubmitted(true);
        e.target.reset();
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white font-['Inter'] min-h-screen mt-[5.5rem]">
      <div>
        <header className="relative w-full">
          <div className="w-full h-[60vh] max-h-[700px]">
            <img
              src="/assets/eleqt-events.jpg"
              alt="Elegant event setting with hanging lanterns"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent"></div>
        </header>

        <main>
          {/* Hero Section */}
          <section className="my-container text-center -mt-24 relative z-10 py-12 md:py-20">
            <h1
              className="text-4xl md:text-6xl font-bold mb-4"
              style={{
                backgroundImage:
                  "linear-gradient(132.73deg, #B8A171 0%, #FFF2CC 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                paddingBottom: "0.15em",
              }}
            >
              Make Arrivals Memorable
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              From weddings to corporate galas, Events are all about moments
              that matter. The way your guests arrive sets the tone. Elevate the
              experience by offering seamless, premium rides your guests will
              remember.
            </p>
          </section>

          {/* Features Section */}
          <section className="my-container mb-16 md:mb-24">
            <h2
              className="text-3xl md:text-4xl font-bold text-center mb-12"
              style={{
                backgroundImage:
                  "linear-gradient(132.73deg, #B8A171 0%, #FFF2CC 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                paddingBottom: "0.15em",
              }}
            >
              Craft the Perfect First Impression
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#111111] p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold mb-4">
                  Personalised Solutions
                </h3>
                <p className="text-gray-400 mb-6">
                  No matter the size or style of your event, we fine-tune our
                  services to match its character and your expectations.
                </p>
                <ul className="space-y-5">
                  <FeatureListItem
                    icon={
                      <img
                        src="/assets/car.svg"
                        alt="Car Icon"
                        className="w-10 h-10"
                      />
                    }
                    text="Smooth Venue Commutes"
                  />
                  <FeatureListItem
                    icon={
                      <img
                        src="/assets/clock-2.svg"
                        alt="Clock Icon"
                        className="w-10 h-10"
                      />
                    }
                    text="Adaptive Schedules"
                  />
                  <FeatureListItem
                    icon={
                      <img
                        src="/assets/add.svg"
                        alt="Add Icon"
                        className="w-10 h-10"
                      />
                    }
                    text="Bespoke Ride Enhancements"
                  />
                </ul>
              </div>

              <div className="bg-[#111111] p-6 rounded-lg border border-gray-800 flex flex-col items-center text-center">
                <h3 className="text-xl font-semibold mb-4">
                  Trained to Impress
                </h3>
                <p className="text-gray-400 mb-6">
                  Our event chauffeurs are handpicked for their expertise,
                  etiquette, and flawless service.
                </p>
                <div className="w-24 h-24 my-4">
                  <img
                    src="/assets/driver.svg"
                    alt="Driver Icon"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="bg-[#111111] p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold mb-4">
                  Exclusive Concierge Support
                </h3>
                <p className="text-gray-400 mb-6">
                  A dedicated representative to manage every on-ground detail
                  with precision.
                </p>
                <ul className="space-y-5">
                  <FeatureListItem
                    icon={
                      <img
                        src="/assets/whatsapp.svg"
                        alt="Whatsapp Icon"
                        className="w-10 h-10"
                      />
                    }
                    text="Real-Time Updates"
                  />
                  <FeatureListItem
                    icon={
                      <img
                        src="/assets/scan.svg"
                        alt="Tracking Icon"
                        className="w-10 h-10"
                      />
                    }
                    text="Live Support & Monitoring"
                  />
                </ul>
              </div>
            </div>
          </section>

          {/* Web3Forms Section */}
          <section className="my-container grid lg:grid-cols-5 gap-16 items-center mb-20 md:mb-32">
            <div className="bg-black p-12 rounded-2xl border border-[#B8A171] lg:col-span-2 shadow-xl">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-yellow-400 mb-2">
                    Request Submitted!
                  </h3>
                  <p className="text-gray-400 mb-4">
                    We've received your event request and will contact you
                    within 48 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2 bg-[#B8A171] text-black font-semibold rounded-md hover:opacity-90 transition"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input
                    type="hidden"
                    name="access_key"
                    value="404eff62-5e41-4d9b-8d7d-31e36b7123aa" // replace with your key
                  />

                  {/* Event Type */}
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B8A171]">
                      🎉
                    </span>
                    <select
                      name="eventType"
                      required
                      className="w-full bg-[#1A1A1A] text-yellow-100 p-4 pl-10 rounded-md border border-[#B8A171] focus:ring-2 focus:ring-[#B8A171] transition"
                    >
                      <option value="" className="text-gray-500">
                        Celebration Type
                      </option>
                      <option value="corporate event">Corporate Event</option>
                      <option value="concert/exhibition">
                        Concert/Exhibition
                      </option>
                      <option value="conference">Conference</option>
                      <option value="wedding">Wedding</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Name */}
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B8A171]">
                      👤
                    </span>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      required
                      className="w-full bg-[#1A1A1A] text-yellow-100 placeholder-gray-400 p-4 pl-10 rounded-md border border-[#B8A171] focus:ring-2 focus:ring-[#B8A171] transition"
                    />
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B8A171]">
                      📞
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      required
                      className="w-full bg-[#1A1A1A] text-yellow-100 placeholder-gray-400 p-4 pl-10 rounded-md border border-[#B8A171] focus:ring-2 focus:ring-[#B8A171] transition"
                    />
                  </div>

                  {/* Description */}
                  <div className="relative">
                    <span className="absolute left-3 top-5 transform -translate-y-1/2 text-[#B8A171]">
                      📝
                    </span>
                    <textarea
                      name="description"
                      placeholder="Describe Your Event Details & Requirements"
                      rows="6"
                      required
                      className="w-full bg-[#1A1A1A] text-yellow-100 placeholder-gray-400 p-4 pl-10 rounded-md border border-[#B8A171] focus:ring-2 focus:ring-[#B8A171] transition"
                    ></textarea>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full font-semibold py-4 px-6 rounded-xl text-black text-lg transition-transform transform ${
                      loading ? "bg-gray-500 cursor-not-allowed" : "hover:scale-105"
                    }`}
                    style={{
                      backgroundImage:
                        !loading &&
                        "linear-gradient(132.73deg, #B8A171 0%, #FFF2CC 100%)",
                    }}
                  >
                    {loading ? "Sending..." : "Get a Callback"}
                  </button>

                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}
                </form>
              )}
            </div>

            <div className="text-center lg:text-left lg:col-span-3">
              <h2
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{
                  backgroundImage:
                    "linear-gradient(132.73deg, #B8A171 0%, #FFF2CC 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  paddingBottom: "0.15em",
                }}
              >
                Curate an Experience to Remember
              </h2>
              <p className="text-lg text-gray-400">
                Planning something special? Share your event details, and we’ll
                get back to you with a personalized plan within 48 hours.
              </p>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}
