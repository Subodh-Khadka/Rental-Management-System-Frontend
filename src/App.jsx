import { useEffect, useState } from "react";
import "./App.css";
import RoomTable from "./Components/Rooms/RoomTable";
import { getRooms } from "./api/roomService";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./Components/Layout/DashboardLayout";
import Dashboard from "./pages/Dasboard";

function App() {
  const [rooms, setRooms] = useState([]);

  const loadRooms = async () => {
    try {
      const response = await getRooms();
      const data = response.data;
      console.log(data);
      setRooms(data);
    } catch (errors) {
      console.log(errors.message);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Layout with sidebar */}
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/room" element={<RoomTable roomData={rooms} />} />
          {/* <Route path="/tenants" element={<Tenants />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
