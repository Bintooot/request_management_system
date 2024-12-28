import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./view/admin/Dashboard";
import RequestPending from "./view/admin/RequestPending";
import ApprovedRequest from "./view/admin/ApprovedRequest";
import History from "./view/admin/History";
import Login from "./view/auth/user/Login";
import Register from "./view/auth/user/Register";
import UserAccount from "./view/admin/UserAccount";
import AdminAccount from "./view/admin/AdminAccounts";
import Accounts from "./view/admin/Accounts";
import Index from "./view/landingpage";
import Userdashboard from "./view/user/Dashboard";
import CrateRequest from "./view/user/CreateRequest";
import Inqure from "./view/user/Inqure";
import Profile from "./view/user/Profile";
import RequestRecord from "./view/user/RequestRecords";
import FixedLayout from "./components/Layout/FixedLayout";
import AdminLayout from "./components/Layout/adminlayout";
import PageNotFound from "./view/landingpage/PageNotFound";
import AboutUs from "./view/landingpage/AboutUs";
import ContactUs from "./view/landingpage/ContactUs";
import LandingPageLayout from "./components/Layout/LandingPageLayout";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Landing Page */}
          <Route element={<LandingPageLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Admin Side */}
          <Route element={<AdminLayout />}>
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/request-pending" element={<RequestPending />} />
            <Route path="/approved-request" element={<ApprovedRequest />} />
            <Route path="/history" element={<History />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/user-account" element={<UserAccount />} />
            <Route path="/admin-account" element={<AdminAccount />} />
          </Route>

          {/* User Side */}
          <Route element={<FixedLayout />}>
            <Route path="/user-dashboard" element={<Userdashboard />} />
            <Route path="/create-request" element={<CrateRequest />} />
            <Route path="/inqure" element={<Inqure />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/request-record" element={<RequestRecord />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
