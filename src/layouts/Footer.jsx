import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Linkedin } from "lucide-react";

const Footer = ({ bgColor, ...props }) => {
  const links = [
    {
      type: "COMPANY",
      items: [
        "About Us",
        "Privacy and policy",
        "Cancellation & refund",
        "Terms and conditions",
      ],
    },
    {
      type: "SERVICES",
      items: [
        "Airport transfers",
        "City rentals",
        "Outstation trips",
        "Event partnerships",
      ],
    },
    {
      type: "SUPPORT",
      items: ["Call us", "Email", "WhatsApp", "FAQs"],
    },
  ];

  const routeMap = {
    "About Us": "/about-us",
    "Privacy and policy": "/privacy-policy",
    "Cancellation & refund": "/cancellation-refund",
    "Terms and conditions": "/terms-and-conditions",
    FAQs: "/faq",
    "Airport transfers": "/",
    "City rentals": "/",
    "Outstation trips": "/",
    "Event partnerships": "/",
  };

  const contactLinks = {
    "Call us": {
      href: `tel:${import.meta.env.VITE_CONTACT_PHONE}`,
      target: "_self",
    },
    Email: {
      href: `mailto:${import.meta.env.VITE_SUPPORT_EMAIL}`,
      target: "_self",
    },
    WhatsApp: {
      href: `https://wa.me/${import.meta.env.VITE_CONTACT_PHONE}`,
      target: "_blank",
    },
  };

  const socialLinks = [
    {
      href: `${import.meta.env.VITE_INSTAGRAM_URL}`,
      icon: <Instagram size={22} />,
    },
    { href: `${import.meta.env.VITE_X_URL}`, icon: <Twitter size={22} /> },
    {
      href: `${import.meta.env.VITE_LINKEDIN_URL}`,
      icon: <Linkedin size={22} />,
    },
  ];

  return (
    <footer
      className={clsx("py-16 sm:py-24 mb-24 md:mb-0", bgColor)}
      {...props}
    >
      <div className="w-full mx-auto px-8 sm:px-12 lg:px-16">
        <div className="flex flex-col items-center gap-12 text-center md:flex-row md:items-start md:justify-between md:text-left">
          {/* logo and address */}
          <div className="flex flex-col items-center md:items-start max-w-sm">
            <img
              src="/assets/Eleqt Transparent logo.svg"
              alt="Eleqt logo"
              className="w-40"
            />
            <p className="mt-6 text-sm text-gray-400 leading-relaxed">
              301, 3rd Floor, Tower-A, O-Hub ,
              SEZ Road, Infocity, Chandaka Industrial Estate ,
              Bhubaneswar, Odisha, 751024
            </p>
            <div className="mt-6 flex items-center gap-5">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* links */}
          <div className="grid grid-cols-2 gap-10 text-left sm:grid-cols-3 sm:gap-16">
            {links.map((link, index) => (
              <div key={index} className="flex flex-col items-start gap-4">
                <h3 className="text-base font-semibold tracking-wider text-white">
                  {link.type}
                </h3>
                <ul className="flex list-none flex-col items-start gap-3">
                  {link.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {contactLinks[item] ? (
                        <a
                          href={contactLinks[item].href}
                          target={contactLinks[item].target}
                          rel="noopener noreferrer"
                        >
                          {item}
                        </a>
                      ) : routeMap[item] ? (
                        <Link to={routeMap[item]}>{item}</Link>
                      ) : (
                        <span>{item}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* rights */}
        <div className="mt-16 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-400">
            2025 © Eleqt Mobility | Psynuxsoftware Pvt Ltd. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
