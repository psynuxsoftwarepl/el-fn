// import React, { useEffect, useState, useContext } from "react";
// import PrimaryButton from "@components/buttons/PrimaryButton";
// import { NavLink } from "react-router";
// import IconClock from "@assets/icons/IconClock.svg?react";
// import IconBag from "@assets/icons/IconBag.svg?react";
// import IconCal from "@assets/icons/IconCal.svg?react";
// import IconGem from "@assets/icons/IconGem.svg?react";
// import { AuthContext } from "@/contexts/Auth";
// import { User } from "lucide-react";

// const Navbar = () => {
//   const [show, setShow] = useState(true);
//   const [scrolled, setScrolled] = useState(false);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const { isAuthenticated } = useContext(AuthContext);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentY = window.scrollY;
//       if (currentY > lastScrollY && currentY > 80) {
//         setShow(false);
//       } else {
//         setShow(true);
//       }
//       setScrolled(currentY > 10);
//       setLastScrollY(currentY);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY]);

//   return (
//     <header>
//       <nav
//         className={`fixed top-0 left-0 w-full z-[9999] h-[4.5rem] sm:h-[5.313rem] transition-all duration-300 ease-in-out
//         ${show ? "translate-y-0" : "-translate-y-full"} 
//         ${
//           scrolled
//             ? "bg-black bg-opacity-90 shadow-md backdrop-blur"
//             : "bg-mobile-bg md:bg-transparent"
//         }
//         `}
//       >
//         <div className="max-w-[1440px] mx-auto px-[1rem] lg:px-[2rem] xl:px-[3rem] h-full flex items-center justify-between gap-8">
//           {/* Logo */}
//           <a
//             className="h-[3.5rem] sm:h-[4.1rem] aspect-[97.87/50] flex-shrink-0 cursor-pointer"
//             href="/"
//           >
//             <img
//               src="/assets/Eleqt Transparent logo.svg"
//               alt="Logo"
//               className="w-full h-full object-contain"
//             />
//           </a>

//           {/* Nav Links */}
//           <div className="hidden md:flex flex-1 justify-center items-center font-semibold text-gradient gap-[3.5rem] text-[1rem] whitespace-nowrap">
//             <NavLink
//               to="/luxury-cars"
//               className={({ isActive }) =>
//                 `transition-all duration-300 ease-in-out hover:scale-105 hover:text-foreground ${
//                   isActive ? "text-foreground" : ""
//                 }`
//               }
//             >
//               Luxury Cars
//             </NavLink>
//             <NavLink
//               to="/outstation-trips"
//               className={({ isActive }) =>
//                 `transition-all duration-300 ease-in-out hover:scale-105 hover:text-foreground ${
//                   isActive ? "text-foreground" : ""
//                 }`
//               }
//             >
//               Outstation Trips
//             </NavLink>
//             <NavLink
//               to="/hourly-rental"
//               className={({ isActive }) =>
//                 `transition-all duration-300 ease-in-out hover:scale-105 hover:text-foreground ${
//                   isActive ? "text-foreground" : ""
//                 }`
//               }
//             >
//               Hourly rentals
//             </NavLink>
//             <NavLink
//               to="/airport-transfers"
//               className={({ isActive }) =>
//                 `transition-all duration-300 ease-in-out hover:scale-105 hover:text-foreground ${
//                   isActive ? "text-foreground" : ""
//                 }`
//               }
//             >
//               Airport Transfers
//             </NavLink>
//           </div>

//           {/* Call + Login/Profile */}
//           <div className="flex items-center gap-4 flex-shrink-0">
//             <a href="tel:+91-9777906587" className="h-full">
//               <div className="bg-gradient-to-r from-[#F9EAC0] to-[#C1A165] p-[1px] rounded-full h-full">
//                 <div className="flex items-center px-[0.75rem] py-[0.3rem] gap-[0.5rem] rounded-full bg-background text-[0.85rem] sm:text-[0.875rem]">
//                   <img
//                     src="/assets/Phone.svg"
//                     alt="phone"
//                     className="w-[0.75rem] sm:w-[0.9rem]"
//                   />
//                   <span className="text-gradient font-medium hidden md:flex">
//                     {import.meta.env.VITE_CONTACT_PHONE}
//                   </span>
//                 </div>
//               </div>
//             </a>

//             {isAuthenticated ? (
//               <PrimaryButton className="flex items-center p-2 rounded-full h-[2.3rem]">
//                 <NavLink to={"/user"}>
//                   <User />
//                 </NavLink>
//               </PrimaryButton>
//             ) : (
//               <PrimaryButton className="h-[2.3rem] px-[1.2rem] py-[0.45rem] rounded-full text-[0.875rem]">
//                 <NavLink to={"/auth"}>Login</NavLink>
//               </PrimaryButton>
//             )}
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Nav */}
//       <nav className="md:hidden fixed bottom-0 left-0 w-full z-[9999] h-24 bg-gradient-to-r from-[#444444] to-[#5F5F5F] pt-[1px] rounded-t-[0.5rem]">
//         <div className="w-full h-full bg-black rounded-t-[0.5rem] flex items-center justify-around">
//           <NavLink
//             to="/luxury-cars"
//             className={({ isActive }) =>
//               `flex flex-col items-center cursor-pointer transition-colors ${
//                 isActive ? "text-white" : "text-gradient hover:text-foreground"
//               }`
//             }
//           >
//             <IconClock />
//             <span>Luxury</span>
//           </NavLink>
//           <NavLink
//             to="/events"
//             className={({ isActive }) =>
//               `flex flex-col items-center cursor-pointer transition-colors ${
//                 isActive ? "text-white" : "text-gradient hover:text-foreground"
//               }`
//             }
//           >
//             <IconGem />
//             <span>Events</span>
//           </NavLink>
//           <NavLink
//             to="/outstation-trips"
//             className={({ isActive }) =>
//               `flex flex-col items-center cursor-pointer transition-colors ${
//                 isActive ? "text-white" : "text-gradient hover:text-foreground"
//               }`
//             }
//           >
//             <IconCal />
//             <span>Outstation</span>
//           </NavLink>
//           <NavLink
//             to="/hourly-rentals"
//             className={({ isActive }) =>
//               `flex flex-col items-center cursor-pointer transition-colors ${
//                 isActive ? "text-white" : "text-gradient hover:text-foreground"
//               }`
//             }
//           >
//             <IconBag />
//             <span>Hourly</span>
//           </NavLink>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;















// import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router";
// import IconClock from "@assets/icons/IconClock.svg?react";
// import IconBag from "@assets/icons/IconBag.svg?react";
// import IconCal from "@assets/icons/IconCal.svg?react";
// import IconGem from "@assets/icons/IconGem.svg?react";

// const Navbar = () => {
//   const [show, setShow] = useState(true);
//   const [scrolled, setScrolled] = useState(false);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentY = window.scrollY;
//       if (currentY > lastScrollY && currentY > 80) {
//         setShow(false);
//       } else {
//         setShow(true);
//       }
//       setScrolled(currentY > 10);
//       setLastScrollY(currentY);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY]);

//   return (
//     <header>
//       <nav
//         className={`fixed top-0 left-0 w-full z-[9999] h-[4.5rem] sm:h-[5.313rem] transition-all duration-300 ease-in-out
//         ${show ? "translate-y-0" : "-translate-y-full"} 
//         ${
//           scrolled
//             ? "bg-black bg-opacity-90 shadow-md backdrop-blur"
//             : "bg-mobile-bg md:bg-transparent"
//         }
//         `}
//       >
//         <div className="max-w-[1440px] mx-auto px-[1rem] lg:px-[2rem] xl:px-[3rem] h-full flex items-center justify-between gap-8">
//           {/* Logo */}
//           <a
//             className="h-[3.5rem] sm:h-[4.1rem] aspect-[97.87/50] flex-shrink-0 cursor-pointer"
//             href="/"
//           >
//             <img
//               src="/assets/Eleqt Transparent logo.svg"
//               alt="Logo"
//               className="w-full h-full object-contain"
//             />
//           </a>

          
//           {/* Call Button */}
//           <div className="flex items-center gap-4 flex-shrink-0">
//             <a href="tel:+91-9777906587" className="h-full">
//               <div className="bg-gradient-to-r from-[#F9EAC0] to-[#C1A165] p-[1px] rounded-full h-full">
//                 <div className="flex items-center px-[0.75rem] py-[0.3rem] gap-[0.5rem] rounded-full bg-background text-[0.85rem] sm:text-[0.875rem]">
//                   <img
//                     src="/assets/Phone.svg"
//                     alt="phone"
//                     className="w-[0.75rem] sm:w-[0.9rem]"
//                   />
//                   <span className="text-gradient font-medium hidden md:flex">
//                     {import.meta.env.VITE_CONTACT_PHONE}
//                   </span>
//                 </div>
//               </div>
//             </a>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Nav */}
//       <nav className="md:hidden fixed bottom-0 left-0 w-full z-[9999] h-24 bg-gradient-to-r from-[#444444] to-[#5F5F5F] pt-[1px] rounded-t-[0.5rem]">
//         <div className="w-full h-full bg-black rounded-t-[0.5rem] flex items-center justify-around">
//           <NavLink
//             to="/luxury-cars"
//             className={({ isActive }) =>
//               `flex flex-col items-center cursor-pointer transition-colors ${
//                 isActive ? "text-white" : "text-gradient hover:text-foreground"
//               }`
//             }
//           >
//             <IconClock />
//             <span>Luxury</span>
//           </NavLink>
//           <NavLink
//             to="/events"
//             className={({ isActive }) =>
//               `flex flex-col items-center cursor-pointer transition-colors ${
//                 isActive ? "text-white" : "text-gradient hover:text-foreground"
//               }`
//             }
//           >
//             <IconGem />
//             <span>Events</span>
//           </NavLink>
//           <NavLink
//             to="/outstation-trips"
//             className={({ isActive }) =>
//               `flex flex-col items-center cursor-pointer transition-colors ${
//                 isActive ? "text-white" : "text-gradient hover:text-foreground"
//               }`
//             }
//           >
//             <IconCal />
//             <span>Outstation</span>
//           </NavLink>
//           <NavLink
//             to="/hourly-rentals"
//             className={({ isActive }) =>
//               `flex flex-col items-center cursor-pointer transition-colors ${
//                 isActive ? "text-white" : "text-gradient hover:text-foreground"
//               }`
//             }
//           >
//             <IconBag />
//             <span>Hourly</span>
//           </NavLink>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;




















import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY && currentY > 80) {
        setShow(false);
      } else {
        setShow(true);
      }
      setScrolled(currentY > 10);
      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header>
      <nav
        className={`fixed top-0 left-0 w-full z-[9999] h-[4.5rem] sm:h-[5.313rem] transition-all duration-300 ease-in-out
        ${show ? "translate-y-0" : "-translate-y-full"} 
        ${
          scrolled
            ? "bg-black bg-opacity-90 shadow-md backdrop-blur"
            : "bg-mobile-bg md:bg-transparent"
        }
        `}
      >
        <div className="max-w-[1440px] mx-auto px-[1rem] lg:px-[2rem] xl:px-[3rem] h-full flex items-center justify-between gap-8">
          {/* Logo */}
          <a
            className="h-[3.5rem] sm:h-[4.1rem] aspect-[97.87/50] flex-shrink-0 cursor-pointer"
            href="/"
          >
            <img
              src="/assets/Eleqt Transparent logo.svg"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </a>

          {/* Call Button */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <a href="tel:+91-9777906587" className="h-full">
              <div className="bg-gradient-to-r from-[#F9EAC0] to-[#C1A165] p-[1px] rounded-full h-full">
                <div className="flex items-center px-[0.75rem] py-[0.3rem] gap-[0.5rem] rounded-full bg-background text-[0.85rem] sm:text-[0.875rem]">
                  <img
                    src="/assets/Phone.svg"
                    alt="phone"
                    className="w-[0.75rem] sm:w-[0.9rem]"
                  />
                  <span className="text-gradient font-medium hidden md:flex">
                    {import.meta.env.VITE_CONTACT_PHONE}
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
