import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DashboardLayout from "./Components/Layout/DashboardLayout";

import Dashboard from "./pages/Dasboard";
import RoomPage from "./pages/RoomPage";
import PaymentPage from "./pages/PaymentPage";
import TenantPage from "./pages/TenantPage";
import RentalContractPage from "./pages/RentalContractPage";
import ChargeTemplate from "./pages/ChargeTemplate";
import MonthlyCharge from "./pages/MonthlyCharge";
import GenerateMonthlyCharge from "./pages/GenerateMonthlyCharge";
import GenerateRentPayment from "./pages/GenerateRentPayment";

import Register from "./pages/Register";
import Login from "./pages/Login";

import ProtectedRoute from "./Components/Auth/ProtectedRoute.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<DashboardLayout />}>
          {/* Public routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/rooms" element={<RoomPage />} />
            <Route path="/tenants" element={<TenantPage />} />
            <Route path="/payments" element={<PaymentPage />} />
            <Route path="/rentalContracts" element={<RentalContractPage />} />
            <Route path="/chargeTemplates" element={<ChargeTemplate />} />
            <Route path="monthlyCharges" element={<MonthlyCharge />} />
            <Route
              path="/generateRentPayments"
              element={<GenerateRentPayment />}
            />
            <Route
              path="/generateMonthlyCharges"
              element={<GenerateMonthlyCharge />}
            />
          </Route>

          {/* <Route path="/" element={<Dashboard />} />
          <Route path="/rooms" element={<RoomPage />} />
          <Route path="/tenants" element={<TenantPage />} />
          <Route path="/payments" element={<PaymentPage />} />
          <Route path="/rentalContracts" element={<RentalContractPage />} />
          <Route path="/chargeTemplates" element={<ChargeTemplate />} />
          <Route path="monthlyCharges" element={<MonthlyCharge />} />
          <Route
            path="/generateRentPayments"
            element={<GenerateRentPayment />}
          />
          <Route
            path="/generateMonthlyCharges"
            element={<GenerateMonthlyCharge />}
          /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
