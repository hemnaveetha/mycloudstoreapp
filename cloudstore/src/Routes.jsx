import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import Dashboard from "./DashboardPage";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
);

export default AppRoutes;
