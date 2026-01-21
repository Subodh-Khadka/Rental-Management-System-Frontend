import { useState, useEffect } from "react";
import MonthlyChargeTable from "../Components/MonthlyCharge/MonthlyChargeTable";
import useMonthlyCharge from "../hooks/useMonthlyCharge";
import useRooms from "../hooks/UseRooms"; // hook to fetch rooms

export default function MonthlyCharge() {
  const {
    loadMonthlyChargesByRoomAndMonth,
    updateMonthlyChargeInState,
    monthlyCharges,
    isLoading,
    error,
  } = useMonthlyCharge();
  const { rooms } = useRooms();

  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  // Default current month YYYY-MM
  const currentMonth = new Date();
  const defaultMonth = `${currentMonth.getFullYear()}-${String(
    currentMonth.getMonth() + 1,
  ).padStart(2, "0")}`;

  // On rooms load, select first room + load charges
  useEffect(() => {
    if (rooms.length > 0) {
      const firstRoomId = rooms[0].roomId;
      setSelectedRoom(firstRoomId);
      setSelectedMonth(defaultMonth);
      loadMonthlyChargesByRoomAndMonth(firstRoomId, defaultMonth);
    }
  }, [rooms]);

  const handleFilter = async () => {
    if (!selectedRoom || !selectedMonth) return;
    await loadMonthlyChargesByRoomAndMonth(selectedRoom, selectedMonth);
  };

  const handleClear = () => {
    setSelectedRoom("");
    setSelectedMonth("");
  };

  return (
    <>
      <section className="bg-white p-4 rounded-2xl shadow-lg mb-4">
        <div className="flex flex-col md:flex-row md:items-end gap-3">
          {/* Room selector */}
          <div className="flex flex-col">
            <label className="font-bold">Select Room</label>
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="bg-stone-100 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="">-- Select Room --</option>
              {rooms.map((room) => (
                <option key={room.roomId} value={room.roomId}>
                  {room.roomTitle}
                </option>
              ))}
            </select>
          </div>

          {/* Month selector */}
          <div className="flex flex-col">
            <label className="font-bold">Select Month</label>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-stone-100 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Filter / Clear buttons */}
          <button
            type="button"
            onClick={handleFilter}
            className="px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700"
            disabled={!selectedRoom || !selectedMonth}
          >
            Filter
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-400"
            disabled={!selectedRoom && !selectedMonth}
          >
            Clear
          </button>

          <div className="md:ml-auto text-sm text-gray-600">
            Showing <span className="font-bold">{monthlyCharges.length}</span>{" "}
            charges
          </div>
        </div>
      </section>

      {isLoading && <h1>Loading charges...</h1>}
      {error && <h1 className="text-red-600">{error}</h1>}

      <MonthlyChargeTable
        monthlyChargeData={monthlyCharges}
        onUpdate={updateMonthlyChargeInState}
      />
    </>
  );
}
