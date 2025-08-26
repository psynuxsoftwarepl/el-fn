import React from 'react';
import Footer from '../../layouts/Footer';

const Privacy = () => (
  <div className="bg-black text-white min-h-screen pt-20">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-8">
        Privacy Policy
      </h1>
      <div className="space-y-6 text-base md:text-lg text-gray-300 leading-relaxed">
        <p>
          The terms "We" / "Us" / "Our"/ “Company” individually and collectively refer to M/s Psynuxsoftware Pvt Ltd, the parent company that owns and operates "Eleqt Mobility", and the terms "You" / "Your" / "Yourself" refer to the individual accessing or using our services through the Eleqt website or Mobile Application (“Platform”).
        </p>
        <p>
          This Privacy Policy is an electronic record in the form of an electronic contract formed under the Information Technology Act, 2000, and the rules made thereunder, and the amended provisions of electronic documents/records in various statutes as amended by the Information Technology Act, 2000. This Privacy Policy does not require any physical, electronic, or digital signature.
        </p>
        <p>
          This Privacy Policy is a legally binding document between You and the Company (both terms defined above). The terms of this Privacy Policy will be effective upon Your acceptance of the same (directly or indirectly in electronic form, by using the Company’s “Website” or by the Mobile Application) and will govern the relationship between You and the Company for Your use of the Website.
        </p>
        <p>
          This document is published and shall be construed following the provisions of the Information Technology (reasonable security practices and procedures and sensitive personal data or information) rules, 2011, under the Information Technology Act, 2000; which require publishing of the Privacy Policy for collection, use, storage, and transfer of sensitive personal data or information.
        </p>
        <p>
          Please read this Privacy Policy carefully. By using the Website, You indicate that You understand, agree, and consent to this Privacy Policy. If You do not agree with the terms of this Privacy Policy, please do not use the Website.
        </p>
        <p>
          By providing Us with Your Information or by making use of the facilities provided by Us, You hereby consent to the collection, storage, processing, and transfer of any or all of Your “Personal Information” and “Non-Personal Information” by Us as specified under this Privacy Policy. You further agree that such collection, use, storage, and transfer of Your Information shall not cause any loss or wrongful gain to You or any other person.
        </p>

        <div>
          <h2 className="text-xl font-semibold text-[color:var(--color-gradient-start)] mt-6">User Information:</h2>
          <p className="mt-4">
            To avail of certain Services on Our Website, users may be required to provide certain information, namely:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4 mt-2">
            <li>Your mobile number</li>
            <li>Your name</li>
            <li>Your email address</li>
          </ul>
          <p className="mt-4">
            The Information supplied by the users enables Us to improve Our Services and provide You with the most user-friendly experience.
          </p>
          <p className="mt-4">
            Any information will not be considered sensitive if it is freely available and accessible in the public domain or is furnished under the Right to Information Act, 2005, or any other law for the time being in force.
          </p>
          <p className="mt-4">
            In addition to any Personal Information or other information that You choose to submit to Us, we and Our third-party service provider may use a variety of technologies that automatically (or passively) collect certain information whenever You visit or interact with the Services (“Usage Information”). This Usage Information may include the browser that You are Using, the URL that referred You to Our Services, and all of the areas within Our Services that You visit and interact with, among other information.
          </p>
          <p className="mt-4">
            All required information is service-dependent, and we may use the above-said User information to maintain, protect, and improve Our Services and for developing new services. We will use the Personal Information You have chosen to provide Us for the purpose for which You provided it. We will not use it for any other purpose without Your consent. We might, on occasion, use this information to notify You of any important changes or any special promotions that may be of interest to You. You can opt out of receiving such material at any time by emailing Us and asking to be removed from the notification or mailing list.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-[color:var(--color-gradient-start)] mt-6">Information Sharing:</h2>
          <p className="mt-4">
            There will be occasions when it will be necessary for Us to disclose Your Personal Information to third parties. We may be required to disclose Your Personal Information to third parties to provide the Services You have requested. However, the disclosure will only be made where it is necessary to fulfil the purpose for which You disclosed Your Personal Information. Otherwise than as stated above, we do not disclose Personal Information that You may give Us to any organisation or person outside Our Company unless You have authorized Us to do so.
          </p>
          <p className="mt-4">
            We will share the sensitive Personal Information to any third party without obtaining the prior consent of the User in the following limited circumstances:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4 mt-2">
            <li>When it is requested or required by law or by any court or governmental agency or authority to disclose, for the purpose of verification of identity, or the prevention, detection, investigation, including cyber incidents, or for prosecution and punishment of offences. These disclosures are made in good faith and in the belief that such disclosure is reasonably necessary for enforcing these Terms; for complying with the applicable laws and regulations.</li>
            <li>We propose to share such information within its group companies and officers and employees of such group companies for the purpose of processing Personal Information on its behalf. We also ensure that these recipients of such information agree to process such information based on Our instructions and in compliance with this Privacy Policy and any other appropriate confidentiality and security measures.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-[color:var(--color-gradient-start)] mt-6">Information Security:</h2>
          <p className="mt-4">
            We take appropriate security measures to protect against unauthorised access to or unauthorised alteration, disclosure or destruction of data. These include internal reviews of Our data collection, storage and processing practices and security measures, including appropriate encryption and physical security measures to guard against unauthorized access to systems where we store personal data.
          </p>
          <p className="mt-4">
            All information gathered on Our Website is securely stored within Our controlled database. The database is stored on servers secured behind a firewall; access to the servers is password-protected and strictly limited. However, as effective as Our security measures are, no security system is impenetrable. We cannot guarantee the security of Our database, nor can we guarantee that the information You supply will not be intercepted while being transmitted to Us over the Internet.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-[color:var(--color-gradient-start)] mt-6">Changes to Privacy Policy:</h2>
          <p className="mt-4">
            From time to time, we may amend or update this Privacy Policy. When this occurs, we will post the new version of the Privacy Policy on Our Website. You can periodically review this Privacy Policy so that You remain informed as to how we are protecting Your Personal Information.
          </p>
        </div>
      </div>
    </div>
      <Footer bgColor={"bg-[#090909]"} />

  </div>
);

export default Privacy;
