import React from "react";
import SecondaryButton from "@components/buttons/SecondaryButton";
import PrimaryButton from "@components/buttons/PrimaryButton";

const Question = () => {
  return (
    <div className="my-container mb-20 text-center">
      <h2 className="text-gradient mb-9 text-2xl font-medium sm:text-3xl md:text-4xl">
        Got Questions?
      </h2>

      <div className="flex flex-col items-center justify-center gap-8">
        {/* Contact Buttons */}
        <div className="flex w-full max-w-xl justify-between gap-6">
          <SecondaryButton className="w-[150px]">
            <a href="#" className="block w-full py-3 text-lg text-center">
              Read FAQs
            </a>
          </SecondaryButton>
          <SecondaryButton className="w-[150px]">
            <a href="tel:+" className="block w-full py-3 text-lg text-center">
              Call Us
            </a>
          </SecondaryButton>
          <SecondaryButton className="w-[150px]">
            <a href="https://wa.me/" className="block w-full py-3 text-lg text-center">
              WhatsApp
            </a>
          </SecondaryButton>
        </div>

        {/* Family Referral Card */}
        {/* <div className="flex w-full max-w-lg flex-col items-center justify-center gap-4 rounded-lg bg-black p-6">
          <PrimaryButton className="rounded-full px-9 py-3 text-sm font-medium">
            FAMILY REFERRAL
          </PrimaryButton>

          <h3 className="text-gradient px-2 text-2xl font-semibold sm:text-3xl">
            Refer Your Loved Ones, Earn ₹999
          </h3>

          <p className="max-w-md p-1.5 text-sm text-gray-300 sm:text-base">
            Simply refer us to your friends and family. Once they complete the
            first ride with us, you'll receive a guaranteed ₹999 bank transfer
            or redeem it in your next ride as our way of saying thank you.
          </p>

          <PrimaryButton className="rounded-full px-8 py-3 text-base font-semibold">
            Share Now
          </PrimaryButton>

          <img
            src="/assets/fam.png"
            alt="Illustration of a family for the referral program"
            className="my-2.5 w-full max-w-[14rem] aspect-[227/136]"
          />
        </div> */}
      </div>
    </div>
  );
};

export default Question;
