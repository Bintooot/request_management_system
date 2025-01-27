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
import Inquire from "./view/user/Inquire";
import Profile from "./view/user/Profile";
import RequestRecord from "./view/user/RequestRecords";
import FixedLayout from "./components/Layout/FixedLayout";
import AdminLayout from "./components/Layout/adminlayout";
import PageNotFound from "./view/landingpage/PageNotFound";
import AboutUs from "./view/landingpage/AboutUs";
import ContactUs from "./view/landingpage/ContactUs";
import LandingPageLayout from "./components/Layout/LandingPageLayout";

import ProtectedRoute from "./components/ProtectedPage/ProtectedRoute"; // Import ProtectedRoute

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Landing Page Routes */}
          <Route element={<LandingPageLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Admin Routes (Protected) */}
          <Route element={<AdminLayout />}>
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute role="admin">
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/request-pending"
              element={
                <ProtectedRoute role="admin">
                  <RequestPending />
                </ProtectedRoute>
              }
            />
            <Route
              path="/approved-request"
              element={
                <ProtectedRoute role="admin">
                  <ApprovedRequest />
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute role="admin">
                  <History />
                </ProtectedRoute>
              }
            />
            <Route
              path="/accounts"
              element={
                <ProtectedRoute role="admin">
                  <Accounts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-account"
              element={
                <ProtectedRoute role="admin">
                  <UserAccount />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-account"
              element={
                <ProtectedRoute role="admin">
                  <AdminAccount />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* User Routes (Protected) */}
          <Route element={<FixedLayout />}>
            <Route
              path="/user-dashboard"
              element={
                <ProtectedRoute role="user">
                  <Userdashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-request"
              element={
                <ProtectedRoute role="user">
                  <CrateRequest />
                </ProtectedRoute>
              }
            />
            <Route
              path="/inquire"
              element={
                <ProtectedRoute role="user">
                  <Inquire />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute role="user">
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/request-record"
              element={
                <ProtectedRoute role="user">
                  <RequestRecord />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Catch-All Route (Page Not Found) */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
