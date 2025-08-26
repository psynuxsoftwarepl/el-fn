import { Navigate } from "react-router-dom";

import RootLayout from "@/layouts/RootLayout";
import Auth from "@/pages/auth/Auth";
import AuthWrapper from "@/pages/auth/AuthWrapper";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import Login from "@/pages/auth/Login";
import OtpVerification from "@/pages/auth/OtpVerification";
import Register from "@/pages/auth/Register";
import ResetPassword from "@/pages/auth/ResetPassword";
import Home from "@/pages/home/Home";
import NotFound from "@/pages/notfound/NotFound";
import About from "@/pages/info/About";
import Privacy from "@/pages/info/Privacy";
import Cancellation from "@/pages/info/Cancellation";
import Terms from "@/pages/info/Terms";
import FAQ from "@/pages/info/FAQ";
import OutstationTrips from "@/pages/bookings/OutstationTrips";
import HourlyRental from "@/pages/bookings/HourlyRental";
import FareSummary from "@/pages/bookings/FareSummary";
import OutstationFareSummary from "@/pages/bookings/OutstationFareSummary";
import LuxuryCars from "@/pages/luxuryCars/LuxuryCars";
import LuxuryCarDetails from "@/pages/luxuryCars/LuxuryCarDetails";
import AirportTransfers from "@/pages/bookings/AirportTransfer";
import FeatureNotAvail from "@/pages/FeatureNotAvail";
import User from "@/pages/user/User";
import UserWrapper from "@/pages/user/UserWrapper";
import Profile from "@/pages/user/Profile";
import Bookings from "@/pages/user/Bookings";
import ProtectedRoute from "@/components/wrappers/ProtectedRoute";
import EditProfile from "@/pages/user/EditProfile";
import RecoverUser from "@/pages/user/RecoverUser";
import EventExperienceSection from "@/pages/events/EventExperienceSection";
import PaymentStatus from "@/pages/paymets/PaymentStatus";
// import FAQ from "@/pages/info/FAQ";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="auth" element={<AuthWrapper />}>
        {/* <Route path="login" element={<Login />} /> */}
        {/* <Route path="register" element={<Register />} /> */}
        <Route index element={<Auth />} />
        <Route path="otp-verify/:email/:phone" element={<OtpVerification />} />
        <Route path="password/forgot" element={<ForgotPassword />} />
        <Route path="password/reset/:token" element={<ResetPassword />} />
      </Route>

      <Route path="user" element={<Navigate to="/user/profile" />} />

      <Route
        path="user/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="user/bookings"
        element={
          <ProtectedRoute>
            <Bookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="user/edit"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />

      <Route path="user/recover-account" element={<RecoverUser />} />

      <Route path="/about-us" element={<About />} />
      <Route path="/privacy-policy" element={<Privacy />} />
      <Route path="/cancellation-refund" element={<Cancellation />} />
      <Route path="/terms-and-conditions" element={<Terms />} />
      <Route path="/faq" element={<FAQ />} />

      {/* <Route path="/events" element={<Events />} /> */}
      <Route path="/event-experience" element={<EventExperienceSection />} />
      <Route path="/airport-transfers" element={<FeatureNotAvail />} />
      <Route path="/luxury-cars" element={<FeatureNotAvail />} />
      <Route path="/luxury-cars/:id" element={<FeatureNotAvail />} />
      <Route path="/outstation-trips" element={<OutstationTrips />} />
      <Route path="/hourly-rental" element={<HourlyRental />} />
      <Route path="/hourly-rental/fare-summary" element={<FareSummary />} />
      <Route path="/outstation-trips/fare-summary" element={<FareSummary />} />
      <Route path="/airport-transfers/fare-summary" element={<FareSummary />} />
      <Route path="/payment-status" element={<PaymentStatus />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
// This file defines the routes used in the application.
