import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Auth/ProtectedRoute.jsx";
import DashboardLayout from "./Layout/DashboardLayout.jsx";
import Dashboard from "../pages/Dasboard.jsx";
import RoomPage from "../pages/RoomPage";
import PaymentPage from "../pages/PaymentPage";
import TenantPage from "../pages/TenantPage";
import RentalContractPage from "../pages/RentalContractPage";
import ChargeTemplate from "../pages/ChargeTemplate";
import MonthlyCharge from "../pages/MonthlyCharge";
import GenerateMonthlyCharge from "../pages/GenerateMonthlyCharge";
import GenerateRentPayment from "../pages/GenerateRentPayment";
import TransactionPage from "../pages/TransactionPage.jsx";
import Register from "../pages/Register";
import Login from "../pages/Login";

function AppRoutes() {
  return (
    <Routes>
      {/* Layout wrapper */}
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
          <Route path="/monthlyCharges" element={<MonthlyCharge />} />
          <Route path="transaction" element={<TransactionPage />} />
          <Route
            path="/generateRentPayments"
            element={<GenerateRentPayment />}
          />
          <Route
            path="/generateMonthlyCharges"
            element={<GenerateMonthlyCharge />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
