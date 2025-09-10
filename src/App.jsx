import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DashboardLayout from "./Components/Layout/DashboardLayout";

import Dashboard from "./pages/Dasboard";
import RoomPage from "./pages/RoomPage";
import PaymentPage from "./pages/PaymentPage";
import TenantPage from "./pages/TenantPage";
import RentalContractPage from "./pages/RentalContractPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/rooms" element={<RoomPage />} />
          <Route path="/tenants" element={<TenantPage />} />
          <Route path="/payments" element={<PaymentPage />} />
          <Route path="/rentalContracts" element={<RentalContractPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
